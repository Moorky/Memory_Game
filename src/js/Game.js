import Board from './Board.js';
import Player from './Player.js';
import ConnectDB from "./ConnectDB.js";
import AI from "./AI.js";

/**
 * Main Controller (handles board and cards with game logic)
 */
class Game {
    // Event variable for event handling (only use as a pointer for event listeners!)
    gameEventPointer;

    /**
     * Creates a game instance.
     *
     * @param {int} cardCount how many unique cards there should be (min 2)
     * @param {int} copyCount how many copies of each unique card (min 2)
     * @param {string} mode which game mode should be played (solo, pvp, pvc)
     * @param {string} player2 username of player 2
     */
    constructor(cardCount, copyCount, mode, player2) {
        // INITS
        this.database = new ConnectDB();
        this.board = new Board(cardCount, copyCount);
        this.player = new Player(this.getUserName(), player2);
        this.ai = new AI(this);

        this.grid = document.querySelector(".grid")
        this.popup = document.querySelector(".popup");
        this.scoreBoard = [document.querySelector(".scoreBoard_1"), document.querySelector(".scoreBoard_2")];
        this.scoreBoardTurn = document.querySelector(".scoreBoard_turn");

        this.cardsID = [];
        this.cardsSelected = [];
        this.cardsWon = 0;
        this.turn = 0;
        this.mode = mode;

        // PREPARATION
        this.grid.innerHTML = "";
        this.scoreBoard.forEach((e, i) => {
            e.innerHTML = this.player.getPlayerName(i) + " " + (this.player.getPlayerScore(i)).toString()
        })
        this.scoreBoardTurn.innerHTML = "It's " + this.player.getPlayerName(this.turn) + "'s turn!";

        // GAME LOGIC
        this.startGame();
    }

    /**
     * Getter for username from database.
     *
     * @returns {string} username
     */
    getUserName() {
        return this.database.getData("username");
    }

    /**
     * Creates a board with the Board class and adds front-end functionality to each card on the board.
     */
    startGame() {
        this.createBoard(this.grid, this.board.getBoardCards());
        this.enableCard();
    }

    /**
     * Creates board, gives each card an image and an ID in front-end.
     */
    createBoard() {
        let dimCounter = 0;
        this.popup.style.display = "none";

        this.board.getBoardCards().forEach((arr, index) => {
            dimCounter = this.createBoardCardsElements(dimCounter, index);
        })
    }

    /**
     * Creates all elements necessary to show the cards in the browser (div, img, etc.).
     *
     * @param dimCounter counter on the x-axis dimension, handling line breaks in the browser
     * @param index which element from the Board class should be handled
     * @returns {number} dimCounter which should be declared as 0 in the parent method for best nested handling
     */
    createBoardCardsElements(dimCounter, index) {
        let divWrap = document.createElement("div");
        let div = document.createElement("div");
        let frontDiv = document.createElement("div");
        let backDiv = document.createElement("div");
        let card = document.createElement("img");

        divWrap.classList.add("flip-card")
        div.classList.add("flip-card-inner");
        frontDiv.classList.add("flip-card-front");
        backDiv.classList.add("flip-card-back");

        card.setAttribute("src", "assets/img/background.jpg");
        card.setAttribute("draggable", "false");
        card.setAttribute("data-id", index.toString());

        frontDiv.appendChild(card);
        div.appendChild(frontDiv);
        div.appendChild(backDiv);
        divWrap.appendChild(div);
        this.grid.appendChild(divWrap);

        // Checks the dimension on the x-axis and causes a break in line when conditions are met
        if (this.board.getBoardDimensionX() === ++dimCounter) {
            dimCounter = 0;
            this.grid.appendChild(document.createElement("br"));
        }

        return dimCounter;
    }

    /**
     * Creates event listener for whenever a card is selected/clicked
     */
    enableCard() {
        this.grid.addEventListener("click", this.gameEventPointer = (e) => {
            this.flipCard(e)
        });
    }

    /**
     * Removes event listener for whenever cards should not be selected/clicked
     */
    disableCard() {
        this.grid.removeEventListener("click", this.gameEventPointer);
    }

    /**
     * Onclick functionality of each card.
     *
     * @param e is the event variable, in this case it's a single card from the card array
     */
    flipCard(e) {
        if (e.composedPath()[3].classList.contains("flip-card-rotate")) {
            return;
        }
        console.log(e);
        let selected = e.composedPath()[0].dataset.id;
        this.cardsSelected.push(this.board.getBoardCards()[selected].getID());
        this.cardsID.push(selected);

        this.getCardBackImage(e, selected);

        if (this.cardsID.length === this.board.getCopyCount()) {
            this.disableCard();
            setTimeout(this.checkForMatch.bind(this), 1000);
        }
    }

    /**
     * Creates the image and element of the back of the card, as soon as the card has been selected.
     *
     * @param e event variable PointerEvent
     * @param selected is the selected card ID
     */
    getCardBackImage(e, selected) {
        let card = document.createElement("img");

        card.setAttribute("src", this.board.getBoardCards()[selected].getImg());
        card.setAttribute("draggable", "false");
        card.setAttribute("data-id", e.composedPath()[0].dataset.id);
        card.classList.add(this.turn === 0 ? "playerOneCardBorder" : "playerTwoCardBorder");

        e.composedPath()[3].classList.add("flip-card-rotate");

        e.composedPath()[2].lastChild.appendChild(card);
    }

    /**
     * Checks if selected cards (cardsSelected[]) are matching by comparing their IDs.
     */
    checkForMatch() {
        let matchCount = 0;
        for (let i = 1; i < this.cardsID.length; i++) {
            if (this.cardsSelected[i - 1] === this.cardsSelected[i] && this.cardsID[i - 1] !== this.cardsID[i]) {
                matchCount++;
            }
        }

        if (matchCount === this.cardsID.length - 1) {
            this.cardsWon += 1;
            this.player.increaseScore(this.scoreBoard, this.turn, this.board.getCopyCount());
            setTimeout(this.checkWon.bind(this), 500)
        } else {
            this.switchTurn();
            this.unselectSelectedCards();
        }

        this.clearSelection();

        if (!(this.mode === "pvc" && this.turn === 1)) {
            this.enableCard();
        } else {
            this.ai.makeTurn();
        }
    }

    /**
     * Checks if game is won by comparing the cards won to the amount of total cards divided by copy count.
     */
    checkWon() {
        if (this.cardsWon === this.board.getBoardCards().length / this.board.getCopyCount()) {
            setTimeout(() => this.popup.style.display = "flex", 300);
            this.disableCard();
            delete this;
        }
    }

    /**
     * Switches turn value between 0 and 1 everytime the method is called.
     * Also shows on the Scoreboard, which players turn it is.
     * Also activates AI, if game mode is PvC.
     */
    switchTurn() {
        this.turn = this.turn === 0 ? 1 : 0;

        this.scoreBoardTurn.innerHTML = "It's " + this.player.getPlayerName(this.turn) + "'s turn!";
        this.scoreBoardTurn.classList.remove(this.turn === 0 ? "fancyText3" : "fancyText2");
        this.scoreBoardTurn.classList.add(this.turn === 0 ? "fancyText2" : "fancyText3");
    }

    /**
     * Clears card selection after a turn
     */
    clearSelection() {
        this.cardsSelected = [];
        this.cardsID = [];
    }

    /**
     * Turns all selected cards back, if they're not matching.
     */
    unselectSelectedCards() {
        let cards = document.querySelectorAll(".flip-card");
        for (let i = 0; i < this.cardsID.length; i++) {
            cards[this.cardsID[i]].classList.remove("flip-card-rotate");
            cards[this.cardsID[i]].firstChild.lastChild.firstChild.remove();
        }
    }
}

export default Game;
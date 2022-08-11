import Board from './Board.js'

/**
 * Main Controller (handles board and cards with game logic)
 */
class Game {

    /**
     * Creates a game instance.
     *
     * @param {int} cardCount how many unique cards there should be (min 2)
     * @param {int} copyCount how many copies of each unique card (min 2)
     * @param {string} mode which game mode should be played (solo, pvp, pvc)
     */
    constructor(cardCount, copyCount, mode) {
        // INITS
        this.board = new Board(cardCount, copyCount);
        this.grid = document.querySelector(".grid")
        this.popup = document.querySelector(".popup");
        this.cardsID = [];
        this.cardsSelected = [];
        this.cardsWon = 0;
        this.mode = mode;

        // CLEAN UP
        this.grid.innerHTML = "";

        // GAME LOGIC
        this.startGame();
    }

    /**
     * Creates a board with the Board class and adds front-end functionality to each card on the board.
     */
    startGame() {
        this.createBoard(this.grid, this.board.getBoardCards());

        this.grid.addEventListener("click", (e) => { this.flipCard(e) });
    }

    /**
     * Creates board, gives each card an image and an ID in front-end.
     */
    createBoard() {
        let dimCounter = 0;

        this.popup.style.display = "none";
        this.board.getBoardCards().forEach((arr, index) => {
            let card = document.createElement("img");
            card.setAttribute("src", "assets/img/background.jpg");
            card.setAttribute("draggable", "false");
            card.setAttribute("data-id", index.toString());
            this.grid.appendChild(card);

            // Checks the dimension on the x-axis and causes a break in line when conditions are met
            if (this.board.getBoardDimensionX() === ++dimCounter) {
                dimCounter = 0;
                this.grid.appendChild(document.createElement("br"));
            }
        })
    }

    /**
     * onclick functionality of each card.
     *
     * @param e is the event variable, in this case it's a single card from the card array
     */
    flipCard(e) {
        if (e.composedPath()[0].classList.contains("flip")) {
            return;
        }
        let selected = e.composedPath()[0].dataset.id;
        this.cardsSelected.push(this.board.getBoardCards()[selected].getID());
        this.cardsID.push(selected);
        e.composedPath()[0].classList.add("flip");
        e.composedPath()[0].setAttribute("src", this.board.getBoardCards()[selected].getImg());

        if (this.cardsID.length === this.board.getCopyCount()) {
            setTimeout(this.checkForMatch.bind(this), 500);
        }
    }

    /**
     * Checks if selected cards (cardsSelected[]) are matching by comparing their IDs.
     */
    checkForMatch() {
        let cards = document.querySelectorAll("img");
        let matchCount = 0;
        for (let i = 1; i < this.cardsID.length; i++) {
            if (this.cardsSelected[i-1] === this.cardsSelected[i] && this.cardsID[i-1] !== this.cardsID[i]) {
                matchCount++;
            }
        }
        if (matchCount === this.cardsID.length - 1) {
            this.cardsWon += 1;
            setTimeout(this.checkWon.bind(this), 500)
        } else {
            for (let i = 0; i < this.cardsID.length; i++) {
                cards[this.cardsID[i]].setAttribute("src", "assets/img/background.jpg");
                cards[this.cardsID[i]].classList.remove("flip");
            }
        }
        this.cardsSelected = [];
        this.cardsID = [];
    }

    /**
     * Checks if game is won by comparing the cards won to the amount of total cards divided by copy count.
     */
    checkWon() {
        if (this.cardsWon === this.board.getBoardCards().length / this.board.getCopyCount()) {
            setTimeout(() => this.popup.style.display = "flex", 300);
        }
    }
}

export default Game;
import Board from './Board.js'

class Game {
    classList;
    board;

    constructor(cardCount, copyCount) {
        this.board = new Board(cardCount, copyCount);

        this.grid = document.querySelector(".grid")
        this.popup = document.querySelector(".popup");
        this.cardsID = [];
        this.cardsSelected = [];
        this.cardsWon = 0;

        this.popup.style.display = "none";

        let card = document.createElement("img");
        card.setAttribute("src", "assets/img/background.jpg");
        this.grid.appendChild(card);

        this.startGame();
    }

    startGame() {
        this.createBoard(this.grid, this.board.getBoardCards());

        this.cards = document.querySelectorAll("img");
        Array.from(this.cards).forEach(function callback(card, index) {
            card.addEventListener("click", this.flipCard.bind(this))
            card.index = index;
        }.bind(this));
    }

    createBoard(grid, array) {
        this.popup.style.display = "none";
        array.forEach((arr, index) => {
            let card = document.createElement("img");
            card.setAttribute("src", "assets/img/background.jpg");
            card.setAttribute("data-id", index.toString());
            grid.appendChild(card);
        })
    }

    flipCard(evt) {
        let selected = evt.currentTarget.index;
        this.cardsSelected.push(this.board.getBoardCards()[selected].getID());
        this.cardsID.push(selected);
        evt.currentTarget.classList.add("flip");
        evt.currentTarget.setAttribute("src", this.board.getBoardCards()[selected].getImg());

        if (this.cardsID.length === this.board.getCopyCount()) {
            setTimeout(this.checkForMatch.bind(this), 500);
        }
    }

    checkForMatch() {
        let cards = document.querySelectorAll("img");
        let firstCard = this.cardsID[0];
        let secondCard = this.cardsID[1];
        if (this.cardsSelected[0] === this.cardsSelected[1] && firstCard !== secondCard) {
            this.cardsWon += 1;
            setTimeout(this.checkWon.bind(this), 500)
        } else {
            cards[firstCard].setAttribute("src", "assets/img/background.jpg");
            cards[secondCard].setAttribute("src", "assets/img/background.jpg");
            cards[firstCard].classList.remove("flip");
            cards[secondCard].classList.remove("flip");
        }
        this.cardsSelected = [];
        this.cardsID = [];
        this.clicks += 1;
    }

    checkWon() {
        if (this.cardsWon === this.board.getBoardCards().length / this.board.getCopyCount()) {
            alert("You won")
            setTimeout(() => this.popup.style.display = "flex", 300);
        }
    }
}

export default Game;
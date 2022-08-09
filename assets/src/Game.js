class Game {
    cards;

    constructor(cardCount, copyCount) {
        this.board = new Board(cardCount, copyCount);

        this.grid = document.querySelector(".grid");
        this.scoreBoard = document.querySelector(".scoreBoard");
        this.popup = document.querySelector(".popup");
        this.play = document.querySelector(".play");
        this.clickBoard = document.querySelector(".clickBoard");
        this.cardsID = [];
        this.cardsSelected = [];
        this.cardsWon = 0;
        this.clicks = 0;

        alert("test!");
        this.startGame();
    }

    startGame() {
        document.addEventListener("DOMContentLoaded", () => {
            this.createBoard();

            this.cards = document.querySelectorAll("card");
            Array.from(this.cards).forEach(card =>
                card.addEventListener("click", flipCard)
            )
        });
    }

    createBoard() {
        this.popup.style.display = "none";
        this.board.getBoardCards().forEach((arr, index) => {
            let card = document.createElement("card");
            card.setAttribute("src", "assets/img/back.webp");
            card.setAttribute("data-id", index.toString());
            this.grid.appendChild(card);
        })
    }

}

function flipCard() {
    let selected = this.dataset.id;
    this.cardsSelected.push(this.board.getBoardCards()[selected].getID());
    this.cardsID.push(selected);
    this.classList.add("flip");
    this.setAttribute("src", this.board.getBoardCards()[selected].getImg());

    if (this.cardsID.length === this.board.getCopyCount()) {
        setTimeout(checkForMatch, 500);
    }
}

function checkForMatch() {
    let cards = document.querySelectorAll("card");
    let firstCard = this.cardsID[0];
    let secondCard = this.cardsID[1];
    if (this.cardsSelected[0] === this.cardsSelected[1] && firstCard !== secondCard) {
        alert("you have found a match");
        this.cardsWon += 1;
        this.scoreBoard.innerHTML = this.cardsWon;
        setTimeout(checkWon,500)
    } else {
        cards[firstCard].setAttribute("src", "assets/img/back.webp");
        cards[secondCard].setAttribute("src", "assets/img/back.webp");
        alert("wrong, please try again");
        cards[firstCard].classList.remove("flip");
        cards[secondCard].classList.remove("flip");
    }
    this.cardsSelected = [];
    this.cardsID = [];
    this.clicks += 1;
    this.clickBoard.innerHTML = this.clicks;
}

function checkWon() {
    if (this.cardsWon === this.board.getBoardCards().length / this.board.getCopyCount()) {
        alert("You won")
        setTimeout(()=> this.popup.style.display = "flex" ,300);
    }
}
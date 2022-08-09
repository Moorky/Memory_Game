class Board {
    uniqueCards;
    boardCards;
    finalBoard;

    /**
     * Creates a board instance.
     *
     * @param {int} cardCount how many unique cards there should be (min 2)
     * @param {int} copyCount how many copies of each unique card (min 2)
     */
    constructor(cardCount, copyCount) {
        this.cardCount = cardCount;
        this.copyCount = copyCount;

        this.createCards();
        this.createCopies();
        this.boardCards = this.shuffleCards(this.boardCards);

        return this.createBoard();
    }

    /**
     * Creates and stores n unique cards in an array (uniqueCards), while n is set via constructor as "cards".
     */
    createCards() {
        for (let i = 0; i < this.cardCount; i++) {
            this.uniqueCards[i] = new Card(i, null);
        }
    }

    /**
     * Creates n copies of each unique cards in uniqueCards (array), while n is set via constructor as "copies".
     */
    createCopies() {
        for (let i = 0; i < this.cardCount; i++) {
            for (let l = 0; l < this.copyCount; l++) {
                this.boardCards.push(this.uniqueCards[i]);
            }
        }
    }

    /**
     * Uses the modern version of the Fisher-Yates shuffle algorithm to randomly shuffle all entries in the array boardCards.
     *
     * @param {Array} a an array of Card objects.
     * @returns {Array}
     */
    shuffleCards(a) {
        let j, x, i;
        for (i = a.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            x = a[i];
            a[i] = a[j];
            a[j] = x;
        }
        return a;
    }

    /**
     * Uses an algorithm to create a 2D board from all boardCards.
     *
     * @returns {Array} 2D array with all cards
     */
    createBoard() {
        let x = Math.sqrt(this.boardCards.length);
        let d;
        if (x % 1 !== 0) {
            for (let i = Math.round(x); this.boardCards.length % i !== 0; i++) {
                if (this.boardCards.length % i === 0) {
                    d = i;
                }
            }
        } else {
            d = x;
        }
        for (let i = 0; i < d; i++) {
            for (let l = 0; l < this.boardCards.length / d; l++) {
                this.finalBoard[l][i] = this.boardCards[0];
                this.boardCards.shift();
            }
        }
        return this.finalBoard;
    }
}
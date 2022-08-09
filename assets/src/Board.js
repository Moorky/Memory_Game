class Board {
    uniqueCards;
    boardCards;

    /**
     * Creates a board instance.
     *
     * @param {int} cardCount how many unique cards there should be (min 2)
     * @param {int} copyCount how many copies of each unique card (min 2)
     */
    constructor(cardCount, copyCount) {
        this.cardCount = cardCount;
        this.copyCount = copyCount;

        this.createBoard();
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
     * Creates a board of cards step by step.
     * View this method to see the sub-steps.
     * - Create Cards
     * - Create Copies
     * - Shuffle Cards
     */
    createBoard() {
        this.createCards();
        this.createCopies();
        this.boardCards = this.shuffleCards(this.boardCards);
    }
}
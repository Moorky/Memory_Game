class Board {
    uniqueCards;
    boardCards;

    /**
     * Creates a board instance.
     *
     * @param cards how many unique cards there should be (min 2)
     * @param copies how many copies of each unique card (min 2)
     */
    constructor(cards, copies) {
        this.cards = cards;
        this.copies = copies;

        this.createBoard();
    }

    /**
     * Creates and stores n unique cards in an array (uniqueCards), while n is set via constructor as "cards"
     */
    createCards() {
        for (let i = 0; i < this.cards; i++) {
            this.uniqueCards[i] = new Card(i, null);
        }
    }

    /**
     * Creates n copies of each unique cards in uniqueCards (array), while n is set via constructor as "copies"
     */
    createCopies() {
        this.uniqueCards.forEach(this.createCopy);
    }

    createCopy(card) {
        for (let i = 0; i < this.copies; i++) {
            // TODO
        }
    }

    shuffleCards() {

    }

    /**
     * Creates a board of cards step by step.
     * View this method to see the sub-steps.
     */
    createBoard() {
        this.createCards();
        this.createCopies();
        this.shuffleCards();
    }
}
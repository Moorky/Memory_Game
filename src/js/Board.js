import Card from './Card.js'

/**
 * Board made up of multiple cards (at least 4) with a bit of functionality
 */
class Board {

    /**
     * Creates a board instance.
     *
     * @param {int} cardCount how many unique cards there should be (min 2)
     * @param {int} copyCount how many copies of each unique card (min 2)
     */
    constructor(cardCount, copyCount) {
        this.cardCount = cardCount;
        this.copyCount = copyCount;
        this.uniqueCards = [];
        this.boardCards = [];

        this.createCards();
        this.createCopies();
        this.boardCards = this.shuffleCards(this.boardCards);
    }

    /**
     * Creates and stores n unique cards in an array (uniqueCards), while n is set via constructor as "cards".
     */
    createCards() {
        for (let i = 0; i < this.cardCount; i++) {
            this.uniqueCards.push(new Card(i, new Image().src = (this.createCardImage())));
        }
    }

    /**
     * Creates a random scaled image by using https://picsum.photos/
     *
     * @returns {string} the url to the random image
     */
    createCardImage() {
        let r = (Math.random() + 1).toString(36).substring(7);
        return "https://picsum.photos/seed/" + r + "/100/150";
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
     * Uses an algorithm to define the x-axis of the 2D board.
     *
     * @returns {int} x dimension
     */
    getBoardDimensionX() {
        let x = Math.sqrt(this.boardCards.length);
        if (x % 1 !== 0) {
            let i = Math.ceil(x);

            do {
                if (this.boardCards.length % i === 0) {
                    return i;
                }
            } while (this.boardCards.length % i-- !== 0);

        } else {
            return x;
        }
    }

    /**
     * @returns {Number} copyCount. How often the same card exists.
     */
    getCopyCount() {
        return this.copyCount;
    }

    /**
     * @returns {Number} cardCount. How many unique cards exist.
     */
    getCardCount() {
        return this.cardCount;
    }

    /**
     * @returns {Array} Array of Cards.
     */
    getBoardCards() {
        return this.boardCards;
    }
}

export default Board;
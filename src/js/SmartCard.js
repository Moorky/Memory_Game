/**
 * The SmartCard Class is a much better version of the original Card Class.
 * Though, it's only use is for the AI to work properly and to mimic the memory of a human being.
 * This is done by assigning each SmartCard a value between 0 and 1.
 * 0 meaning the AI cannot remember where a specific card is (0%).
 * 1 meaning the AI knows where a specific card is (100%).
 */
class SmartCard {
    /**
     * Creates a SmartCard!
     *
     * @param boardCard is an object from the Card class.
     * @param htmlCard is a html element that contains the frontend Card information.
     */
    constructor(boardCard, htmlCard) {
        this.boardCard = boardCard;
        this.htmlCard = htmlCard;
        this.cardValue = 0;
        this.matched = false;
    }

    /**
     * @returns {boolean} true if this card has already been matched, else false.
     */
    getMatched() {
        return this.matched;
    }

    /**
     * Sets the matched variable for this card to true.
     */
    setMatched() {
        this.matched = true;
    }

    /**
     * @returns {number} the value of the card (between 0 and 1).
     */
    getCardValue() {
        return this.cardValue;
    }

    /**
     * Increments the value of the card with a specific formula.
     */
    incrementCardValue() {
        this.cardValue = this.cardValue > 0 ? 1 : 0.9;
    }

    /**
     * Decrements the value of the card with a specific formula.
     */
    decrementCardValue() {
        this.cardValue *= 0.9;
    }

    /**
     * @returns {Number} the ID the card has which is usually saved in the Card class.
     */
    getBoardCardID() {
        return this.boardCard.getID();
    }

    /**
     * @returns {string} the ID the card has which is usually saved in the html element of the card.
     */
    getHtmlCardID() {
        return this.htmlCard.dataset.id;
    }

    /**
     * @returns {*} the Card instance.
     */
    getBoardCard() {
        return this.boardCard;
    }

    /**
     * @returns {*} the html element of the card.
     */
    getHtmlCard() {
        return this.htmlCard;
    }
}

export default SmartCard;
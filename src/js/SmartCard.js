class SmartCard {
    constructor(boardCard, htmlCard) {
        this.boardCard = boardCard;
        this.htmlCard = htmlCard;
        this.cardValue = 0;
        this.matched = false;
    }

    getMatched() {
        return this.matched;
    }

    setMatched() {
        this.matched = true;
    }

    getCardValue() {
        return this.cardValue;
    }

    setCardValue() {
        this.cardValue = this.cardValue > 0 ? 1 : 0.9;
    }

    decrementCardValue() {
        this.cardValue *= 0.9;
    }

    getBoardCardID() {
        return this.boardCard.getID();
    }

    getHtmlCardID() {
        return this.htmlCard.dataset.id;
    }

    getBoardCard() {
        return this.boardCard;
    }

    getHtmlCard() {
        return this.htmlCard;
    }
}

export default SmartCard;
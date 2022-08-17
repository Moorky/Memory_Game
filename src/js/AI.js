import SmartCard from "./SmartCard.js";

/**
 * This AI is used for the player vs computer mode.
 * It manipulates the game logic and overrides player 2.
 * It is completely dynamic and will make decisions based on the opponents skill and the overall card count & card copies.
 */
class AI {

    /**
     * Gets the content of the game
     *
     * @param game object
     */
    constructor(game) {
        this.game = game;

        this.smartCards = [];
        this.selectedCards = [];
        this.flipCounter = 0;

        this.createSmartCards();
    }

    createSmartCards() {
        document.querySelectorAll(".flip-card").forEach((e, i) => {
            this.smartCards.push(new SmartCard(this.game.board.getBoardCards()[i], e));
        });
    }

    getSmartCardByID(index) {
        return this.smartCards[index];
    }

    getDataFromPlayersTurn(cardsID) {
        cardsID.forEach((e) => {
            this.getSmartCardByID(e).setCardValue();
        });
        this.checkMatchFound(cardsID);
    }

    checkMatchFound(cardsID) {
        let matchCounter;
        cardsID.forEach((e) => {
            if (this.getSmartCardByID(e).getBoardCardID() === this.getSmartCardByID(cardsID[0]).getBoardCardID()) {
                if (++matchCounter === this.game.board.getCopyCount()) {
                    cardsID.forEach((e) => {
                        this.getSmartCardByID(e).setMatched()
                    });
                }
            }
        });
    }

    decrementSmartCardValues() {
        this.smartCards.forEach((e) => {
            e.decrementCardValue()
        });
    }

    getSmartCardMatchValuesSum() {
        let valArray = [];
        for (let i = 0; i < this.game.board.getCardCount(); i++) {
            let valSum = 0;
            let match = this.getSmartCardMatchByIndex(i);
            for (let l = 0; l < match.length; l++) {
                valSum += match[l].getCardValue();
                if (match[l].getCardValue() === 0) {
                    valSum = 0;
                    break;
                }
            }
            valArray.push(valSum);
        }
        return valArray;
    }

    getSmartCardMatchByIndex(index) {
        let match = [];
        this.smartCards.forEach((e) => {
            if (e.getBoardCardID() === index) {
                match.push(e);
            }
        });
        return match;
    }

    findMostKnownMatchIndex(valArray) {
        let highestVal = 0;
        let matchIndex;
        valArray.forEach((e, i) => {
            if (!this.getSmartCardMatchByIndex(i)[0].getMatched() && e > highestVal) {
                highestVal = e;
                matchIndex = i;
            }
        });
        return highestVal === 0 ? false : matchIndex;
    }

    findMostUnknownCard() {
        let card;
        this.smartCards.forEach((e) => {
            if (!e.getMatched() && (card == null || card.getCardValue() > e.getCardValue())) {
                card = e;
            }
        });
        return card;
    }

    calculateCardChoice() {
        this.checkMatchChoice();
        this.checkUnknownCardChoice();
    }

    checkMatchChoice() {
        let mostKnownMatchIndex = this.findMostKnownMatchIndex(this.getSmartCardMatchValuesSum());
        if (mostKnownMatchIndex !== false) {
            this.processMatchProbabilities(this.getSmartCardMatchByIndex(mostKnownMatchIndex));
        }
    }

    checkUnknownCardChoice() {
        if (this.flipCounter !== this.game.board.getCopyCount()) {
            for (let i = 0; i < this.game.board.getCopyCount() - this.flipCounter; i++) {
                let mostUnknownCard = this.findMostUnknownCard();
                this.selectedCards.push(mostUnknownCard);
                mostUnknownCard.setCardValue();
            }
        }
    }

    processMatchProbabilities(smartCardMatch) {
        for (let i = 0; i < smartCardMatch.length; i++) {
            if (this.processProbability(smartCardMatch[i].getCardValue())) {
                smartCardMatch[i].setCardValue();
                this.selectedCards.push(smartCardMatch[i]);
                this.flipCounter++;
            }
        }
        if (this.flipCounter === this.game.board.getCopyCount()) {
            smartCardMatch.forEach((e) => { e.setMatched() });
        }
    }

    processProbability(val) {
        return !!val && Math.random() < val;
    }

    makeTurn() {
        this.calculateCardChoice();
        console.log(this.getSmartCardMatchValuesSum());
        // TODO actually flip them (frontend)
        this.decrementSmartCardValues();
        this.clearSelection();
        this.preparePlayerTurn();
    }

    clearSelection() {
        this.flipCounter = 0;
        this.selectedCards = [];
    }

    preparePlayerTurn() {
        this.game.unselectSelectedCards();
        this.game.enableCard();
        this.game.switchTurn();
    }
}

export default AI;
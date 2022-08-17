import SmartCard from "./SmartCard.js";

/**
 * This AI is used for the player vs computer mode.
 * It manipulates the game logic and overrides player 2.
 * It is completely dynamic and will make decisions based on the opponents skill and the overall card count & card copies.
 */
class AI {

    /**
     * Gets the content of the game and creates own environment based on the game environment to calculate its next move
     *
     * @param game object
     */
    constructor(game) {
        // INITS
        this.game = game;
        this.smartCards = [];
        this.selectedCards = [];
        this.flipCounter = 0;

        // Creates own array of cards similar to the board cards, just with more functionality
        this.createSmartCards();
    }

    /**
     * Finds all cards on the webpage, creates a SmartCard for each of them.
     */
    createSmartCards() {
        document.querySelectorAll(".flip-card").forEach((e, i) => {
            this.smartCards.push(new SmartCard(this.game.board.getBoardCards()[i], e));
        });
    }

    /**
     * @param {int} index is the index at which the smartCards array should return its card
     * @returns {*} smartCard instance
     */
    getSmartCardByID(index) {
        return this.smartCards[index];
    }

    /**
     * This method is used for the AI to "save/remember" the selection the opponent has made.
     *
     * @param cardsID is an array of the IDs of the selected cards.
     */
    getDataFromPlayersTurn(cardsID) {
        cardsID.forEach((e) => {
            this.getSmartCardByID(e).incrementCardValue();
        });
        this.checkMatchFound(cardsID);
    }

    /**
     * Checks if the opponent has found a match with their selection and saves that information.
     *
     * @param cardsID is an array of the IDs of the selected cards.
     */
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

    /**
     * Decrements each SmartCard value after each turn to mimic forgetting where each card is.
     */
    decrementSmartCardValues() {
        this.smartCards.forEach((e) => {
            e.decrementCardValue()
        });
    }

    /**
     * Finds all matches on the board and calculates the sum of the card values of each match.
     *
     * @returns {*[]} array of the sum of Card values of each match
     */
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

    /**
     * Finds all cards with the same Card ID (= match) at a specific Card ID.
     *
     * @param index is the specific Card ID.
     * @returns {*[]} an array of the Cards with the same ID which build a match.
     */
    getSmartCardMatchByIndex(index) {
        let match = [];
        this.smartCards.forEach((e) => {
            if (e.getBoardCardID() === index) {
                match.push(e);
            }
        });
        return match;
    }

    /**
     * Finds a match with the highest sum of Card values (this mimics "confidently" remembering where a card match is)
     *
     * @param valArray array of the sum of Card values of each match
     * @returns {boolean|*} false if it has not seen/does not remember a full set of cards that are matching, else returns the shared ID of the cards that build a match
     */
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

    /**
     * Finds the first card with the lowest Card value.
     *
     * @returns {*} the first card with the lowest Card value
     */
    findMostUnknownCard() {
        let card;
        this.smartCards.forEach((e) => {
            if (!e.getMatched() && (card == null || card.getCardValue() > e.getCardValue())) {
                card = e;
            }
        });
        return card;
    }

    /**
     * This method first calculates if it knows a full set of cards that build a match,
     * tries to select it by mimicking "remembering" and if it fails,
     * selects a card that it remembers the least, to mimic increasing its total knowledge.
     */
    calculateCardChoice() {
        this.checkMatchChoice();
        this.checkUnknownCardChoice();
    }

    /**
     * Checks if it knows a full set of cards that build a match, if it does, starts the process of selecting those cards.
     */
    checkMatchChoice() {
        let mostKnownMatchIndex = this.findMostKnownMatchIndex(this.getSmartCardMatchValuesSum());
        if (mostKnownMatchIndex !== false) {
            this.processMatchProbabilities(this.getSmartCardMatchByIndex(mostKnownMatchIndex));
        }
    }

    /**
     * Selects a card that it remembers the least, to mimic increasing its total knowledge.
     */
    checkUnknownCardChoice() {
        if (this.flipCounter !== this.game.board.getCopyCount()) {
            for (let i = 0; i < this.game.board.getCopyCount() - this.flipCounter; i++) {
                let mostUnknownCard = this.findMostUnknownCard();
                this.selectedCards.push(mostUnknownCard);
                mostUnknownCard.incrementCardValue();
            }
        }
    }

    /**
     * Calculating and processing the probability of remembering and selecting the right cards of the match.
     * Will search for the most unknown card in another function, if this process does not meet the required card amount by failing the probability process.
     *
     * @param smartCardMatch is an array of a set of cards that build a match. In this case, the match with the highest value is used
     */
    processMatchProbabilities(smartCardMatch) {
        for (let i = 0; i < smartCardMatch.length; i++) {
            if (this.processProbability(smartCardMatch[i].getCardValue())) {
                smartCardMatch[i].incrementCardValue();
                this.selectedCards.push(smartCardMatch[i]);
                this.flipCounter++;
            }
        }
        if (this.flipCounter === this.game.board.getCopyCount()) {
            smartCardMatch.forEach((e) => { e.setMatched() });
        }
    }

    /**
     * Simple formula that will return:
     * - true, if the given value is higher than a random number between (incl.) 0 and (excl.) 1
     * - false, if the given value is lower than the random number
     *
     * @param val is a probability value that should range between 0 and 1. (0.75 = 75% chance)
     * @returns {boolean} true, if val is higher, false if lower
     */
    processProbability(val) {
        return !!val && Math.random() < val;
    }

    /**
     * This method consists of all steps the AI has to make to process its turn.
     */
    makeTurn() {
        this.calculateCardChoice();
        console.log(this.getSmartCardMatchValuesSum());
        // TODO actually flip them (frontend)
        this.decrementSmartCardValues();
        this.clearSelection();
        this.preparePlayerTurn();
    }

    /**
     * Clears some class variables for the next turn.
     */
    clearSelection() {
        this.flipCounter = 0;
        this.selectedCards = [];
    }

    /**
     * Calls some method from the game instance to prepare the turn for the opponent.
     */
    preparePlayerTurn() {
        this.game.unselectSelectedCards();
        this.game.enableCard();
        this.game.switchTurn();
    }
}

export default AI;
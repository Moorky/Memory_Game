/**
 * Handles player data that would be useful for a database
 */
class Player {
    constructor(userName, playerTwoName) {
        this.playerNames = [userName, playerTwoName];
        this.score = [0, 0];
    }

    /**
     * Compares a given score with the score of the player/the players.
     *
     * @param score that should be compared to player score
     * @param mode can be either "pvp" or "pvc"
     * @returns {number|boolean} the highscore as an int, returns false if the player score is not a new highscore
     */
    compareScore(score, mode) {
        let returnVal;
        if (mode === "pvp" && (this.score[0] > score || this.score[1] > score)) {
            returnVal = this.score[0] > this.score[1] ? this.score[0] : this.score[1];
        } else {
            returnVal = this.score[0] > score ? this.score[0] : false;
        }

        return returnVal;
    }

    /**
     * Increases score after finding a match.
     *
     * @param htmlElement array, that will change the innerHTML of one element depending on the index/turn
     * @param turn can either be 0 or 1, depending on which players turn it is
     * @param copiesCount the amount of copies of each unique card on the board
     */
    increaseScore(htmlElement, turn, copiesCount) {
        this.score[turn] += 0.5 * copiesCount;
        htmlElement[turn].innerHTML = this.playerNames[turn] + " " + (this.score[turn]).toString();
    }

    /**
     * Getter for player name
     *
     * @param index can be either 0 or 1, depending on which player
     * @returns {string} player name
     */
    getPlayerName(index) {
        return index === 0 ? this.playerNames[0] : this.playerNames[1];
    }

    /**
     * Getter for player score
     *
     * @param index can be either 0 or 1, depending on which player
     * @returns {int} player score
     */
    getPlayerScore(index) {
        return index === 0 ? this.score[0]: this.score[1];
    }
}

export default Player;
import Game from './Game.js'

let cardCount, copyCount;
let mode;
let player1, player2;

/**
 * Creates an instance of the Memory game.
 * <br>
 * Call this function in your HTML code by using the element ID "play"!
 */
window.onload = function () {
    const playButton = document.getElementById("play");
    playButton.addEventListener("click", function () {
        getData();

        if (checkInput()) {
            new Game(Number(cardCount), Number(copyCount), String(mode), String(player2));
            return;
        }
        return alert("Invalid input!");
    });
}

/**
 * Checks the pre-game input on invalid input
 */
function checkInput() {
    return !((!/^-?[0-9]+$/.test(cardCount) || cardCount.length === 0) ||
            (!/^-?[0-9]+$/.test(copyCount) || copyCount.length === 0) ||
            (Number(copyCount) < 2 || Number(cardCount) < 2) ||
            !/^[a-zA-Z0-9]+$/.test(player2));
}

/**
 * Gets input data
 */
function getData() {
    cardCount = document.getElementById("cardCount").value;
    copyCount = document.getElementById("copyCount").value;
    mode = document.getElementById("mode").value;
    player2 = document.getElementById("player2").value;

    checkPlayerTwoEmpty();
    checkIfPvC();
}

/**
 * Sets Player2 name to "Player2" if name field is empty
 */
function checkPlayerTwoEmpty() {
    if (player2 === "") {
        player2 = "Player2";
    }
}

/**
 * Sets Player2 name to "Clara" if game mode is player vs computer
 */
function checkIfPvC() {
    if (mode === "pvc") {
        player2 = "Clara";
    }
}
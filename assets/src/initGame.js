import Game from './Game.js'

let cardCount, copyCount, mode;

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
            return new Game(Number(cardCount), Number(copyCount), String(mode));
        }
        return alert("Invalid input!");
    });
}

/**
 * Checks the pre-game input on invalid input
 */
function checkInput() {
    return !((isNaN(Number(cardCount)) || cardCount.length === 0) ||
            (isNaN(Number(copyCount)) || copyCount.length === 0));
}

/**
 * Gets input data
 */
function getData() {
    cardCount = document.getElementById("cardCount").value;
    copyCount = document.getElementById("copyCount").value;
    mode = document.getElementById("mode").value;
}
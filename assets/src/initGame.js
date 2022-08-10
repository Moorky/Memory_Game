import Game from './Game.js'

/**
 * Creates an instance of the Memory game.
 * <br>
 * Call this function in your HTML code by using the element ID "play"!
 */
window.onload = function () {
    const playButton = document.getElementById("play");
    playButton.addEventListener("click", function () {
        return new Game(2, 2);
    });
}
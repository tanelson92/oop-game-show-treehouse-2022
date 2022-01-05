/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */

const newGame = new Game();

/*
*   add StartBtn 'click' event listener
*   Start "newGame" when user clicks "Start Game"
*/

const startBtn = document.querySelector('#btn__reset');
startBtn.addEventListener('click', e => {
    newGame.startGame();
});

/*
*   add "qwerty" keys event listener
*   Passes the clicked letter to the instance of "newGame" when clicked. 
*/

const keys = document.querySelector('#qwerty');
keys.addEventListener('click', e => {
    let target = e.target;
    //Make sure the element selected is a valid "key".
    let isLetterBtn = target.className.includes('key') && !target.className.includes('keyrow');
    if (isLetterBtn) {
        newGame.handleInteraction(target);
    }
});

/*
*   add document 'keyup' event listener
*   Passes a key to the instance of "newGame" when user presses said key.
*/

document.addEventListener('keyup', e => { 
    //ensures key is between a-z. Excludes all other characters. 
    if (e.keyCode >= 65 && e.keyCode <= 90) {
        newGame.handleInteraction(e.key);
    }
});


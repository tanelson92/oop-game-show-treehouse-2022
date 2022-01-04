/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */


const newGame = new Game();

const startBtn = document.querySelector('#btn__reset');
startBtn.addEventListener('click', e => {
    newGame.startGame();
});

const keys = document.querySelector('#qwerty');
keys.addEventListener('click', e => {
    let target = e.target;
    let isLetterBtn = target.className.includes('key');
    if (isLetterBtn) {
        newGame.handleInteraction(target);
    }
});

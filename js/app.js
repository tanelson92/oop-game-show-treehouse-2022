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
    let isLetterBtn = target.className.includes('key') && !target.className.includes('keyrow');
    if (isLetterBtn) {
        newGame.handleInteraction(target);
    }
});
document.addEventListener('keyup', e => { 
    let target = e.key;
    console.log(target);
    if (target.length === 1) {
        newGame.handleInteraction(target);
    }
});


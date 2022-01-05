/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */

class Game {
    constructor() {
        this.missed = 0;
        this.phrase = [
            'Heavy is the head that wears the crown',
            'The night is darkest before the dawn',
            'A blessing in disguise',
            'Bite the bullet',
            'Easy does it'
        ];
        this.activePhrase = null;
        this.newPhrase = null;
        this.win = false;
    }

    startGame() {
        const overlay = document.getElementById('overlay');
        overlay.style.display = 'none';
        this.newPhrase = new Phrase(this.getRandomPhrase());
        this.newPhrase.addPhraseToDisplay();
    }

    getRandomPhrase() {
        let random = Math.ceil(Math.random() * this.phrase.length - 1);
        let selected = this.phrase[random];
        this.activePhrase = selected;
        return selected;
    }

    handleInteraction(target) {
        const letter = target.textContent || target;
        const phrase = this.newPhrase;
        const keys = document.querySelectorAll('.key');
        keys.forEach(key => {
            if (key.textContent === letter) {
                key.disabled = true;
            }
        });
        let isLetter = phrase.checkLetter(letter);
        if (isLetter) {
            keys.forEach(key => {
                if (key.textContent === letter) {
                    key.classList.add('chosen');
                }
            });
            phrase.showMatchedLetter(letter);
            let playerWon = this.checkForWin();
            if (playerWon) { this.gameOver(true) }
        } else {
            keys.forEach(key => {
                if (key.textContent === letter) {
                    key.classList.add('wrong');
                }
            });
            this.missed++;
            this.removeLife();
        }
    }

    removeLife() {
        let lives = document.querySelectorAll('.tries img');
        let missed = this.missed;
        let playerLost = missed === 5;
        if (playerLost) { 
            this.gameOver(false);
            return;
        }
        lives[missed - 1].src = 'images/lostHeart.png';
    }

    checkForWin() {
        let letters = document.querySelectorAll('.letter');
        let win = true;
        for (const letter of letters) {
            if (!letter.classList.contains('show')) {
                win = false;
            }
        }
        return win;
    }

    gameOver(win) {
        const overlay = document.getElementById('overlay');
        const title = overlay.querySelector('h2');
        if (win) {
            overlay.className = 'win';
            title.textContent = "You Win!"
        } else {
            overlay.className = 'lose';
            title.textContent = "Sorry, Try Again!"
        }
        this.resetGame();
    }

    resetGame() {
        const overlay = document.getElementById('overlay');
        overlay.style.display = 'flex';
        const container = document.querySelector('#phrase ul');
        container.innerHTML = "";
        const lives = document.querySelectorAll('.tries img');
        for (const life of lives) {
            life.src = 'images/liveHeart.png';
        }
        const buttons = document.querySelectorAll('.key');
        buttons.forEach(button => {
            button.disabled = false;
            button.classList.remove('chosen','wrong');
        });
    }

}
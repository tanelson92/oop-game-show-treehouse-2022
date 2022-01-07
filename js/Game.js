/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */

class Game {
    constructor() {
        this.missed = 0;
        this.phrases = this.createPhrases();
        this.activePhrase = null;
        this.win = false;
    }

    /*
    *   createPhrases Method
    *   Retrieves all phrases for the "phrases" property of our Game instance. 
    */

    createPhrases() {
        let phrases = [
            'Heavy is the head that wears the crown',
            'The night is darkest before the dawn',
            'A blessing in disguise',
            'Bite the bullet',
            'Easy does it'
        ]
        let obj = phrases.map(phrase => {
            return new Phrase(phrase);
        });
        return obj;
    }

    /*
    *   startGame method
    *   initiates a new instance of "Phrase" as a property of Game. 
    */

    startGame() {
        const overlay = document.getElementById('overlay');
        overlay.style.display = 'none';
        //Get new "Phrase" and save it, then populate the page with missing letter tiles for the "phrase".
        this.getRandomPhrase();
    }

    /*
    *   getRandomPhrase method
    *   Returns a random phrase from the instance of "Game" phrase array.
    */

    getRandomPhrase() {
        let numberOfPhrases = Object.keys(this.phrases).length;
        let random = Math.ceil(Math.random() * numberOfPhrases - 1);
        let selected = this.phrases[random];
        this.activePhrase = selected;
        this.activePhrase.addPhraseToDisplay();
        return selected;
    }

    /*
    *   handleInteraction method
    *   Determines whether the key provided is a valid letter and whether or 
    *   not the user wins or loses the game as a result of their selection
    */

    handleInteraction(target) {
        const letter = target.textContent || target;
        const phrase = this.activePhrase;
        const keys = document.querySelectorAll('.key');
        //disable selected key
        keys.forEach(key => {
            if (key.textContent === letter) {
                key.disabled = true;
            }
        });
        //If the letter is a letter of the phrase...
        let isLetter = phrase.checkLetter(letter); 
        if (isLetter) {
            //add the class "chosen" to denote it as such, then show the letter.
            keys.forEach(key => {
                if (key.textContent === letter) {
                    key.classList.add('chosen');
                }
            });
            phrase.showMatchedLetter(letter);
            //Check to see if all letters have been selected, if so, the user wins.
            let playerWon = this.checkForWin();
            if (playerWon) { this.gameOver(true) }
        } else {
            //If the letter is NOT a valid letter of the phrase, add the class "wrong" to denote it as such
            keys.forEach(key => {
                if (key.textContent === letter) {
                    key.classList.add('wrong');
                }
            });
            //Increment missed total by 1 and remove a life. 
            this.missed++;
            this.removeLife();
        }
    }

    /*
    *   removeLife method
    *   Remove a users life and determine if the player loses.
    */

    removeLife() {
        let lives = document.querySelectorAll('.tries img');
        let missed = this.missed;
        let playerLost = missed === 5;
        //If player has missed 5 attempts, the they lose.
        if (playerLost) { 
            this.gameOver(false);
            return;
        }
        lives[missed - 1].src = 'images/lostHeart.png';
    }

    /*
    *   checkForWin method
    *   Determine if user wins based on whether all hidden letters have been selected.
    */

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

    /*
    *   gameOver method
    *   Reveal the hidden overlay with the appropriate text based 
    *   on whether the user won or lost. 
    */

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
        //reset the game.
        this.resetGame();
    }

    /*
    *   resetGame method
    *   reset the game once the user has won or lost. 
    */

    resetGame() {
        const overlay = document.getElementById('overlay');
        const container = document.querySelector('#phrase ul');
        const lives = document.querySelectorAll('.tries img');
        const buttons = document.querySelectorAll('.key');
        overlay.style.display = 'flex';
        container.innerHTML = "";
        for (const life of lives) {
            life.src = 'images/liveHeart.png';
        }        
        buttons.forEach(button => {
            button.disabled = false;
            button.classList.remove('chosen','wrong');
        });
        this.missed = 0;
        this.activePhrase = null;
    }

}
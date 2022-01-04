/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */

class Phrase { 
    constructor(phrase) {
        this.phrase = phrase.toLowerCase();
    }
    
    addPhraseToDisplay() {
        const container = document.querySelector('#phrase ul');
        for (const letter of this.phrase) {
            const newLetter = document.createElement('li');
            newLetter.textContent = letter; //add letter to html
            if (!letter.includes(' ')) {
                newLetter.classList.add('hide', 'letter', letter);
            } else {
                newLetter.classList.add('space');
            }
            container.append(newLetter); //append letter to container.
        }
    }

    checkLetter(letter) {
        //check to see if letter matches letter selected by a player.
        if (this.phrase.includes(letter)) return true;
    }

    showMatchedLetter(letter) {
        const letters = document.querySelectorAll('.'+letter);
        for (const letter of letters) {
            letter.classList.add('show');
            letter.classList.remove('hide');
        }
    }
}
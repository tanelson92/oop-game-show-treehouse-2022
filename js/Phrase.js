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
            //newLetter.textContent = letter; //add letter to html
            const letterContainer = document.createElement('span');
            //letterContainer.className = 'letter-fade';
            letterContainer.textContent = letter;
            newLetter.append(letterContainer);
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
        const letters = document.querySelectorAll('.' + letter);
        let delay = 500;
            for (const letter of letters) {
                const letterContainer = letter.getElementsByTagName('span')[0];
                let waitALittle = setTimeout(() => {
                    letter.classList.add('show');
                    letterContainer.classList.add('letter-fade');
                }, delay);
                letter.classList.remove('hide');
                delay += 500;
            }
    }
}
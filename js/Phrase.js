/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */

class Phrase { 
    constructor(phrase) {
        this.phrase = phrase.toLowerCase();
    }

    /*
    * AddPhraseToDisplay method
    * Builds letters into html elements and appends them to a container.
    */
    addPhraseToDisplay() {
        const container = document.querySelector('#phrase ul');
        //build letter element and add it to the container.
        for (const letter of this.phrase) {
            const newLetter = document.createElement('li');
            const letterContainer = document.createElement('span');
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

    /*
    *   checkLetter method
    *   Checks to ensure that letter is part of the selected phrase.
    */
    checkLetter(letter) {
        //check to see if letter matches letter selected by a player.
        if (this.phrase.includes(letter)) return true;
    }

    /*
    *   showMatchedLetter method
    *   Reveals correct letters when user selects them.
    */
    showMatchedLetter(letter) {
        const letters = document.querySelectorAll('.' + letter);
        let delay = 500;
        //show each matched letter.
        for (const letter of letters) {
            const letterContainer = letter.getElementsByTagName('span')[0];
            letter.classList.add('show');
            //Add stepped delay to the letter reveal.
            let waitALittle = setTimeout(() => {
                letterContainer.classList.add('letter-fade');
            }, delay);
            letter.classList.remove('hide');
            delay += 500;
        }
    }
}
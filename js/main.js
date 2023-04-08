const grid = document.querySelector('.grid');
const record = document.querySelector('.record');
const timer = document.querySelector('.timer');
const textEnd = document.querySelector('.end');
const qtdCards = 20;

const characteres = [
    'toad',
    'mario',
    'luigi',
    'bowser',
    'peach',
    'yoshi',
    'goomba',
    'koopa',
    'daisy',
    'hammer'
];

const createElement = (tag, className) => {
    const element = document.createElement(tag);
    element.className = className;
    return element;
}

let firstCard = '';
let secondCard = '';

const checkEndGame = () => {
    const disableCards = document.querySelectorAll('.disable-card');

    if (disableCards.length === qtdCards) {
        textEnd.classList.add('show-end')
        
        clearInterval(this.loop);

        playTime = +timer.innerHTML;
        playRecord = +record.innerHTML;
        
        if (playTime < playRecord || playRecord === 0) {
            localStorage.setItem('record', playTime);
        }

    }
}

const checkCards = () => {
    const firstCharacter = firstCard.getAttribute('data-character');
    const secondCharacter = secondCard.getAttribute('data-character');

    if ( firstCharacter === secondCharacter) {
        firstCard.firstChild.classList.add('disable-card');
        secondCard.firstChild.classList.add('disable-card');

        firstCard = '';
        secondCard = '';

        checkEndGame();
    } else {

        setTimeout(() => {    
            firstCard.classList.remove('reveal-card');
            secondCard.classList.remove('reveal-card');

            firstCard = '';
            secondCard = '';
        }, 500);

    }
}

const reviewCard = ({ target }) => {

    if (target.parentNode.className.includes('reveal-card')) {
        return;
    }

    if (firstCard === '') {
        target.parentNode.classList.add('reveal-card');
        firstCard = target.parentNode;
    } else if (secondCard === '') {
        target.parentNode.classList.add('reveal-card');
        secondCard = target.parentNode;

        checkCards();
    }

}

const createCard = (character) => {

    const card = createElement('div', 'card');
    const front = createElement('div', 'face front');
    const back = createElement('div', 'face back');

    front.style.backgroundImage = `url(./img/${character}.png)`;

    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener('click', reviewCard);
    card.setAttribute('data-character', character);

    return card;
}

const loadGame = () => {

    const duplicateCharacteres = [ ...characteres, ...characteres ];

    const shuffledArray = duplicateCharacteres.sort( () => Math.random() - 0.5 );

    shuffledArray.forEach((character) => {
        
        const card = createCard(character);
        grid.appendChild(card);

    });

}

const startTimer = () => {
    this.loop = setInterval(() => {
        
        const currentTime = +timer.innerHTML;
        timer.innerHTML = currentTime + 1;

    }, 1000);
} 

const restartGame = () => {
    document.location.reload(true);
}

window.onload = () => {
    
    const recordTime = localStorage.getItem('record');

    if (recordTime) {
        record.innerHTML = recordTime;
    } else {
        record.innerHTML = '00'
    }

    startTimer();
    loadGame();
}

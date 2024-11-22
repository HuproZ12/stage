const board = document.getElementById('board');
const counter = document.getElementById('counter');
const backButton = document.getElementById('back-button');
const icons = ['🍎', '🍌', '🍒', '🍉', '🍇', '🍓', '🍑', '🍍'];
const cards = [...icons, ...icons].sort(() => Math.random() - 0.5);
let flippedCards = [];
let matchedCards = [];
let moveCount = 0;

cards.forEach((icon, index) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.index = index;
    card.addEventListener('click', () => handleClick(index));
    board.appendChild(card);
});

backButton.addEventListener('click', () => {
    window.location.href = '../index.html';
});

function handleClick(index) {
    const card = board.children[index];
    if (flippedCards.length < 2 && !card.classList.contains('flipped') && !matchedCards.includes(index)) {
        card.classList.add('flipped');
        card.textContent = cards[index];
        flippedCards.push(index);
        if (flippedCards.length === 2) {
            moveCount++;
            counter.textContent = `Coups : ${moveCount}`;
            setTimeout(checkMatch, 500);
        }
    }
}

function getResultMessage(moveCount) {
    let message;
    if (moveCount <= 8) {
        message = moveCount + " coups.\n\nVous êtes un véritable maître du jeu !";
    } else if (moveCount <= 12) {
        message = moveCount + " coups.\n\nC'est pas mal, mais vous pouvez encore impressionner davantage !";
    } else if (moveCount <= 16) {
        message = moveCount + " coups.\n\nVous avez encore du chemin à parcourir pour devenir un pro !";
    } else if (moveCount <= 20) {
        message = moveCount + " coups.\n\nVous avez vraiment besoin de plus de pratique !";
    } else {
        message = moveCount + " coups.\n\nVous avez vraiment besoin de plus de pratique !";
    }
    return message;
}

function checkMatch() {
    const [index1, index2] = flippedCards;
    if (cards[index1] === cards[index2]) {
        matchedCards.push(index1, index2);
        if (matchedCards.length === cards.length) {
            setTimeout(() => alert(getResultMessage(moveCount)), 100);
        }
    } else {
        board.children[index1].classList.remove('flipped');
        board.children[index2].classList.remove('flipped');
        board.children[index1].textContent = '';
        board.children[index2].textContent = '';
    }
    flippedCards = [];
}
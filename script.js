// script.js
const deck = [
    '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'
];

const values = {
    '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10,
    'J': 10, 'Q': 10, 'K': 10, 'A': 11
};

let playerCards = [];
let dealerCards = [];
let playerScore = 0;
let dealerScore = 0;

function startGame() {
    playerCards = [getRandomCard(), getRandomCard()];
    dealerCards = [getRandomCard(), getRandomCard()];
    playerScore = calculateScore(playerCards);
    dealerScore = calculateScore(dealerCards);
    document.getElementById('playerCards').innerText = playerCards.join(', ');
    document.getElementById('dealerCards').innerText = dealerCards.join(', ');
    document.getElementById('playerScore').innerText = 'Pontuação: ' + playerScore;
    document.getElementById('dealerScore').innerText = 'Pontuação: ' + dealerScore;
    document.getElementById('startGame').disabled = true;
    document.getElementById('hit').disabled = false;
    document.getElementById('stand').disabled = false;
}

function getRandomCard() {
    return deck[Math.floor(Math.random() * deck.length)];
}

function calculateScore(cards) {
    let score = 0;
    let aceCount = 0;

    for (let card of cards) {
        score += values[card];
        if (card === 'A') aceCount++;
    }

    while (score > 21 && aceCount > 0) {
        score -= 10;
        aceCount--;
    }

    return score;
}

function hit() {
    playerCards.push(getRandomCard());
    playerScore = calculateScore(playerCards);
    document.getElementById('playerCards').innerText = playerCards.join(', ');
    document.getElementById('playerScore').innerText = 'Pontuação: ' + playerScore;

    if (playerScore > 21) {
        endGame('Você perdeu!');
    }
}

function stand() {
    while (dealerScore < 17) {
        dealerCards.push(getRandomCard());
        dealerScore = calculateScore(dealerCards);
    }

    document.getElementById('dealerCards').innerText = dealerCards.join(', ');
    document.getElementById('dealerScore').innerText = 'Pontuação: ' + dealerScore;

    if (dealerScore > 21) {
        endGame('Você ganhou! O dealer ultrapassou 21.');
    } else if (playerScore > dealerScore) {
        endGame('Você ganhou!');
    } else if (playerScore < dealerScore) {
        endGame('Você perdeu!');
    } else {
        endGame('Empate!');
    }
}

function endGame(result) {
    document.getElementById('result').innerText = result;
    document.getElementById('startGame').disabled = false;
    document.getElementById('hit').disabled = true;
    document.getElementById('stand').disabled = true;
}

document.getElementById('startGame').addEventListener('click', startGame);
document.getElementById('hit').addEventListener('click', hit);
document.getElementById('stand').addEventListener('click', stand);

const choices = document.querySelectorAll('.choice-btn');
const resultText = document.getElementById('result-text');
const playerScoreDisplay = document.getElementById('player-score');
const computerScoreDisplay = document.getElementById('computer-score');
const gameContainer = document.querySelector('.game-container');
const resetScoreBtn = document.getElementById('reset-score');

let playerScore = 0;
let computerScore = 0;

choices.forEach(choice => {
    choice.addEventListener('click', () => {
        const playerChoice = choice.id;
        const computerChoice = getComputerChoice();
        const result = getResult(playerChoice, computerChoice);
        displayResult(result);
        updateScore(result);
        updateBoxColor(result);
    });
});

resetScoreBtn.addEventListener('click', resetScore);

function getComputerChoice() {
    const choices = ['rock', 'paper', 'scissors'];
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}

function getResult(playerChoice, computerChoice) {
    if (playerChoice === computerChoice) {
        return "It's a tie!";
    } else if (
        (playerChoice === 'rock' && computerChoice === 'scissors') ||
        (playerChoice === 'paper' && computerChoice === 'rock') ||
        (playerChoice === 'scissors' && computerChoice === 'paper')
    ) {
        return 'You win!';
    } else {
        return 'Computer wins!';
    }
}

function displayResult(result) {
    resultText.textContent = result;
    if (result === 'You win!') {
        resultText.classList.add('win');
        resultText.classList.remove('lose', 'tie');
    } else if (result === 'Computer wins!') {
        resultText.classList.add('lose');
        resultText.classList.remove('win', 'tie');
    } else {
        resultText.classList.add('tie');
        resultText.classList.remove('win', 'lose');
    }
}

function updateScore(result) {
    if (result === 'You win!') {
        playerScore++;
    } else if (result === 'Computer wins!') {
        computerScore++;
    }
    playerScoreDisplay.textContent = playerScore;
    computerScoreDisplay.textContent = computerScore;
}

function updateBoxColor(result) {
    gameContainer.style.boxShadow = 'none';
    if (result === 'You win!') {
        gameContainer.style.boxShadow = '0 0 20px #00ff00, 0 0 40px #00ff00, 0 0 60px #00ff00';
    } else if (result === 'Computer wins!') {
        gameContainer.style.boxShadow = '0 0 20px #ff0000, 0 0 40px #ff0000, 0 0 60px #ff0000';
    } else if (result === "It's a tie!") {
        gameContainer.style.boxShadow = '0 0 20px #ffff00, 0 0 40px #ffff00, 0 0 60px #ffff00';
    }
}

function resetScore() {
    playerScore = 0;
    computerScore = 0;
    playerScoreDisplay.textContent = playerScore;
    computerScoreDisplay.textContent = computerScore;
    resultText.textContent = '';
    resultText.classList.remove('win', 'lose', 'tie');
    gameContainer.style.boxShadow = 'none';
    gameContainer.style.opacity = 0;
    setTimeout(() => {
        gameContainer.style.opacity = 1;
    }, 500);
}
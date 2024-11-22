const canvas = document.getElementById('gameCanvas');
const backButton = document.getElementById('back-button');
const resetButton = document.getElementById('reset-button');
const ctx = canvas.getContext('2d');
const box = 20;
let snake = [];
snake[0] = { x: 9 * box, y: 10 * box };
let direction;
let food = {
    x: Math.floor(Math.random() * 19 + 1) * box,
    y: Math.floor(Math.random() * 19 + 1) * box
};
let score = 0;
const scoreDisplay = document.getElementById('score');
let gameOver = false;

document.addEventListener('keydown', setDirection);

backButton.addEventListener('click', () => {
    window.location.href = '../index.html';
});

resetButton.addEventListener('click', resetGame);

function setDirection(event) {
    let key = event.keyCode;
    if (key === 37 && direction !== 'RIGHT') {
        direction = 'LEFT';
    } else if (key === 38 && direction !== 'DOWN') {
        direction = 'UP';
    } else if (key === 39 && direction !== 'LEFT') {
        direction = 'RIGHT';
    } else if (key === 40 && direction !== 'UP') {
        direction = 'DOWN';
    }
}

function collision(newHead, snake) {
    for (let i = 0; i < snake.length; i++) {
        if (newHead.x === snake[i].x && newHead.y === snake[i].y) {
            return true;
        }
    }
    return false;
}

function drawGame() {
    if (gameOver) return;

    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = i === 0 ? 'green' : 'white';
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
        ctx.strokeStyle = 'red';
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }

    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, box, box);

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (direction === 'LEFT') snakeX -= box;
    if (direction === 'UP') snakeY -= box;
    if (direction === 'RIGHT') snakeX += box;
    if (direction === 'DOWN') snakeY += box;

    if (snakeX === food.x && snakeY === food.y) {
        score++;
        scoreDisplay.textContent = 'Score : ' + score;
        food = {
            x: Math.floor(Math.random() * 19 + 1) * box,
            y: Math.floor(Math.random() * 19 + 1) * box
        };
    } else {
        snake.pop();
    }

    let newHead = { x: snakeX, y: snakeY };

    if (snakeX < 0 || snakeY < 0 || snakeX >= canvas.width || snakeY >= canvas.height || collision(newHead, snake)) {
        gameOver = true;
        clearInterval(game);
        showGameOverMessage();
        return;
    }

    snake.unshift(newHead);
}

function resetGame() {
    clearInterval(game);
    snake = [];
    snake[0] = { x: 9 * box, y: 10 * box };
    direction = null;
    food = {
        x: Math.floor(Math.random() * 19 + 1) * box,
        y: Math.floor(Math.random() * 19 + 1) * box
    };
    score = 0;
    scoreDisplay.textContent = 'Score : ' + score;
    gameOver = false;

    // Cache le message de fin
    const gameOverMessage = document.getElementById('game-over-message');
    gameOverMessage.style.display = 'none';

    game = setInterval(drawGame, 100);
}

function showGameOverMessage() {
    // Assurez-vous que le message n'est affiché qu'une fois
    if (gameOver) {
        const gameOverMessage = document.getElementById('game-over-message');
        const finalScoreDisplay = document.getElementById('final-score');

        let message = `Score de ${score} : `;
        if (score < 5) {
            message += "Vous pouvez faire mieux !";
        } else if (score < 10) {
            message += "Pas mal, mais vous pouvez encore vous améliorer !";
        } else {
            message += "Vous êtes un pro du Snake !";
        }

        finalScoreDisplay.textContent = message;

        // Affiche le conteneur de message
        gameOverMessage.style.display = 'block';
    }
}

let game = setInterval(drawGame, 100);

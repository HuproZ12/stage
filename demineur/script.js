const board = document.getElementById('board');
const backButton = document.getElementById('back-button');
const resetButton = document.getElementById('reset-button');
const mineCounter = document.getElementById('mine-counter');
const timeCounter = document.getElementById('time-counter');

backButton.addEventListener('click', () => {
    window.location.href = '../index.html';
});

const ROWS = 10;
const COLS = 10;
const MINES = 20;

let boardArray = [];
let gameOver = false;
let timer = 0;
let interval = null;
let firstClick = false;
let flagsLeft = MINES;

// Initialize the board
function createBoard() {
    boardArray = Array.from({ length: ROWS }, () =>
        Array.from({ length: COLS }, () => ({ mine: false, revealed: false, adjacentMines: 0, flagged: false }))
    );

    // Place mines
    let minesPlaced = 0;
    while (minesPlaced < MINES) {
        const row = Math.floor(Math.random() * ROWS);
        const col = Math.floor(Math.random() * COLS);
        if (!boardArray[row][col].mine) {
            boardArray[row][col].mine = true;
            minesPlaced++;
        }
    }

    // Calculate adjacent mines
    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
            if (!boardArray[row][col].mine) {
                boardArray[row][col].adjacentMines = countAdjacentMines(row, col);
            }
        }
    }

    // Reset game state
    gameOver = false;
    firstClick = false;
    timer = 0;
    flagsLeft = MINES;
    mineCounter.textContent = flagsLeft.toString().padStart(3, '0');
    timeCounter.textContent = timer.toString().padStart(3, '0');
    clearInterval(interval);

    // Render board
    renderBoard();
}

// Count adjacent mines
function countAdjacentMines(row, col) {
    const directions = [
        [-1, -1], [-1, 0], [-1, 1],
        [0, -1], /*self*/ [0, 1],
        [1, -1], [1, 0], [1, 1],
    ];
    return directions.reduce((count, [dx, dy]) => {
        const newRow = row + dx;
        const newCol = col + dy;
        if (newRow >= 0 && newRow < ROWS && newCol >= 0 && newCol < COLS && boardArray[newRow][newCol].mine) {
            count++;
        }
        return count;
    }, 0);
}

// Render board
function renderBoard() {
    board.innerHTML = '';
    boardArray.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
            const cellElement = document.createElement('div');
            cellElement.classList.add('cell');
            if (cell.revealed) {
                cellElement.classList.add('revealed');
                if (cell.mine) {
                    cellElement.classList.add('mine');
                    cellElement.textContent = '💣';
                } else if (cell.adjacentMines > 0) {
                    cellElement.textContent = cell.adjacentMines;
                    cellElement.style.color = getColor(cell.adjacentMines);
                }
            } else if (cell.flagged) {
                cellElement.textContent = '🚩';
                cellElement.style.color = 'red';
            }

            // Add event listeners
            cellElement.addEventListener('click', () => handleLeftClick(rowIndex, colIndex));
            cellElement.addEventListener('contextmenu', (e) => handleRightClick(e, rowIndex, colIndex));

            board.appendChild(cellElement);
        });
    });
}

// Handle left-click
function handleLeftClick(row, col) {
    if (gameOver || boardArray[row][col].revealed || boardArray[row][col].flagged) return;

    if (!firstClick) {
        startTimer();
        firstClick = true;
    }

    const cell = boardArray[row][col];
    cell.revealed = true;

    if (cell.mine) {
        gameOver = true;
        revealAllMines();
        alert('KABOOM !');
        clearInterval(interval);
    } else if (cell.adjacentMines === 0) {
        revealAdjacentCells(row, col);
    }

    renderBoard();
    checkWin();
}

// Handle right-click (flagging)
function handleRightClick(event, row, col) {
    event.preventDefault();
    if (gameOver || boardArray[row][col].revealed) return;

    const cell = boardArray[row][col];

    if (!cell.flagged && flagsLeft === 0) return; // Prevent flagging if no flags left

    cell.flagged = !cell.flagged;

    if (cell.flagged) {
        flagsLeft--;
    } else {
        flagsLeft++;
    }

    mineCounter.textContent = flagsLeft.toString().padStart(3, '0');
    renderBoard();
}

// Reveal adjacent cells
function revealAdjacentCells(row, col) {
    const directions = [
        [-1, -1], [-1, 0], [-1, 1],
        [0, -1], /*self*/ [0, 1],
        [1, -1], [1, 0], [1, 1],
    ];
    directions.forEach(([dx, dy]) => {
        const newRow = row + dx;
        const newCol = col + dy;
        if (newRow >= 0 && newRow < ROWS && newCol >= 0 && newCol < COLS) {
            if (!boardArray[newRow][newCol].revealed && !boardArray[newRow][newCol].flagged) {
                handleLeftClick(newRow, newCol);
            }
        }
    });
}

// Reveal all mines when game is over
function revealAllMines() {
    boardArray.forEach((row) => {
        row.forEach((cell) => {
            if (cell.mine) cell.revealed = true;
        });
    });
    renderBoard();
}

// Start the timer
function startTimer() {
    interval = setInterval(() => {
        timer++;
        timeCounter.textContent = timer.toString().padStart(3, '0');
    }, 1000);
}

// Check if the player has won
function checkWin() {
    const allCellsRevealed = boardArray.every((row) =>
        row.every((cell) => cell.revealed || (cell.mine && cell.flagged))
    );

    if (allCellsRevealed && flagsLeft === 0) {
        gameOver = true;
        clearInterval(interval);
        alert('Bien joué !');
    }
}

// Get color based on number of adjacent mines
function getColor(number) {
    const colors = ['blue', 'green', 'red', 'purple', 'maroon', 'turquoise', 'black', 'gray'];
    return colors[number - 1] || 'black';
}

// Reset game
resetButton.addEventListener('click', () => {
    resetButton.blur(); // Prevent the button from staying "focused/enfoncé"
    createBoard();
});

// Initialize game
createBoard();

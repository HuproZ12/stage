const backButton = document.getElementById('back-button');
const resetButton = document.getElementById('reset-button');

backButton.addEventListener('click', () => {
    window.location.href = '../index.html';
});

resetButton.addEventListener('click', () => {
    resetGame();
});

let score = 0;
let grid = Array(4).fill().map(() => Array(4).fill(0));

function startGame() {
    score = 0;
    grid = Array(4).fill().map(() => Array(4).fill(0));
    addRandomTile();
    addRandomTile();
    updateGrid();
}

function addRandomTile() {
    let emptyCells = [];
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (grid[i][j] === 0) {
                emptyCells.push({ x: i, y: j });
            }
        }
    }
    if (emptyCells.length > 0) {
        let randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        grid[randomCell.x][randomCell.y] = Math.random() < 0.9 ? 2 : 4;
    }
}

function updateGrid() {
    const gridContainer = document.getElementById('grid-container');
    const scoreElement = document.getElementById('score');
    gridContainer.innerHTML = '';
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            let cell = document.createElement('div');
            cell.classList.add('grid-cell');
            if (grid[i][j] === 0) {
                cell.classList.add('empty');
            } else {
                cell.classList.add('value-' + grid[i][j]);
                cell.textContent = grid[i][j];
            }
            gridContainer.appendChild(cell);
        }
    }
    scoreElement.textContent = score;
}

function move(direction) {
    let moved = false;
    switch (direction) {
        case 'up':
            for (let j = 0; j < 4; j++) {
                let column = [grid[0][j], grid[1][j], grid[2][j], grid[3][j]];
                let newColumn = slide(column);
                for (let i = 0; i < 4; i++) {
                    if (grid[i][j] !== newColumn[i]) {
                        moved = true;
                    }
                    grid[i][j] = newColumn[i];
                }
            }
            break;
        case 'down':
            for (let j = 0; j < 4; j++) {
                let column = [grid[3][j], grid[2][j], grid[1][j], grid[0][j]];
                let newColumn = slide(column);
                for (let i = 0; i < 4; i++) {
                    if (grid[3 - i][j] !== newColumn[i]) {
                        moved = true;
                    }
                    grid[3 - i][j] = newColumn[i];
                }
            }
            break;
        case 'left':
            for (let i = 0; i < 4; i++) {
                let row = grid[i];
                let newRow = slide(row);
                for (let j = 0; j < 4; j++) {
                    if (grid[i][j] !== newRow[j]) {
                        moved = true;
                    }
                    grid[i][j] = newRow[j];
                }
            }
            break;
        case 'right':
            for (let i = 0; i < 4; i++) {
                let row = [grid[i][3], grid[i][2], grid[i][1], grid[i][0]];
                let newRow = slide(row);
                for (let j = 0; j < 4; j++) {
                    if (grid[i][3 - j] !== newRow[j]) {
                        moved = true;
                    }
                    grid[i][3 - j] = newRow[j];
                }
            }
            break;
    }
    if (moved) {
        addRandomTile();
        updateGrid();
        if (isGameOver()) {
            alert('Perdu ! Ton score : ' + score);
        }
    }
}

function slide(row) {
    row = row.filter(val => val);
    for (let i = 0; i < row.length - 1; i++) {
        if (row[i] === row[i + 1]) {
            row[i] *= 2;
            score += row[i];
            row[i + 1] = 0;
        }
    }
    row = row.filter(val => val);
    while (row.length < 4) {
        row.push(0);
    }
    return row;
}

function isGameOver() {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (grid[i][j] === 0) {
                return false;
            }
            if (i < 3 && grid[i][j] === grid[i + 1][j]) {
                return false;
            }
            if (j < 3 && grid[i][j] === grid[i][j + 1]) {
                return false;
            }
        }
    }
    return true;
}

function resetGame() {
    score = 0;
    grid = Array(4).fill().map(() => Array(4).fill(0));
    startGame();
}

document.addEventListener('keydown', event => {
    switch (event.key) {
        case 'ArrowUp':
            move('up');
            break;
        case 'ArrowDown':
            move('down');
            break;
        case 'ArrowLeft':
            move('left');
            break;
        case 'ArrowRight':
            move('right');
            break;
    }
});

document.addEventListener('DOMContentLoaded', () => {
    startGame();
});

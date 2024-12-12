// Initialize variables
const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('reset');

let currentPlayer = 'X';
let gameState = Array(9).fill(null); // Keeps track of board state
const winPatterns = [
    [0, 1, 2], // Rows
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6], // Columns
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8], // Diagonals
    [2, 4, 6]
];

// Handle cell clicks
cells.forEach(cell => {
    cell.addEventListener('click', () => {
        const index = cell.getAttribute('data-index');

        if (!gameState[index] && !checkWinner()) {
            gameState[index] = currentPlayer;
            cell.textContent = currentPlayer;

            if (checkWinner()) {
                alert(`${currentPlayer} wins!`);
            } else if (gameState.every(cell => cell)) {
                alert('It\'s a draw!');
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            }
        }
    });
});

// Check for winner
function checkWinner() {
    return winPatterns.some(pattern => {
        const [a, b, c] = pattern;
        return gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c];
    });
}

// Reset the game
resetButton.addEventListener('click', () => {
    gameState.fill(null);
    currentPlayer = 'X';
    cells.forEach(cell => (cell.textContent = ''));
});

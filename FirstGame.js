let gridSize = 5;
let currentNumber = 1;
let startTime;
let timerInterval;
const timerElement = document.getElementById('timer');
const gridElement = document.getElementById('grid');
const disappearToggle = document.getElementById('disappearToggle');
const restartButton = document.getElementById('restartButton');
const gridSizeSelector = document.getElementById('gridSize');

// Generate the grid
function generateGrid(size) {
	gridElement.innerHTML = ''; // Очистка предыдущей сетки

	const numbers = Array.from({ length: size * size }, (_, i) => i + 1);
	numbers.sort(() => Math.random() - 0.5);

	// Настройка сетки под новый размер
	gridElement.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
	gridElement.style.gridTemplateRows = `repeat(${size}, fr)`;

	numbers.forEach(number => {
		const cell = document.createElement('div');
		cell.classList.add('cell');
		cell.textContent = number;
		cell.addEventListener('click', () => handleCellClick(number, cell));
		gridElement.appendChild(cell);
	});
}



// Handle cell click
function handleCellClick(number, cell) {
	if (number === currentNumber) {
		if (currentNumber === 1) {
			startTimer();
		}
		if (disappearToggle.checked) {
			cell.textContent = '';
		} else {
			cell.classList.add('correct');
			setTimeout(() => cell.classList.remove('correct'), 200);
		}
		if (number === gridSize * gridSize) {
			stopTimer();
			setTimeout(() => {
				alert(`Well done! Your time: ${(Date.now() - startTime) / 1000}s`);
				restartGame();
			}, 100);
		}
		currentNumber++;
	} else {
		cell.classList.add('incorrect');
		setTimeout(() => cell.classList.remove('incorrect'), 200);
	}
}

// Start the timer
function startTimer() {
	startTime = Date.now();
	timerInterval = setInterval(() => {
		const elapsedTime = ((Date.now() - startTime) / 1000).toFixed(2);
		timerElement.textContent = `Time: ${elapsedTime}s`;
	}, 10);
}

// Stop the timer
function stopTimer() {
	clearInterval(timerInterval);
}

// Restart the game
function restartGame() {
	stopTimer();
	currentNumber = 1;
	timerElement.textContent = 'Time: 0.00s';
	gridSize = parseInt(gridSizeSelector.value, 10);
	generateGrid(gridSize);
}

// Add event listeners
restartButton.addEventListener('click', restartGame);
gridSizeSelector.addEventListener('change', restartGame);

// Initialize the game
generateGrid(gridSize);

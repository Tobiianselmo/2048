// SCORE AND RESTART

const btn = document.getElementById("restart-btn");
const overlayBtn = document.getElementById("restart-btn-overlay");
const overlay = document.getElementById("game-over");

btn.addEventListener("click", restartGame);
overlayBtn.addEventListener("click", restartGame);

function restartScore() {
	document.getElementById("score").innerHTML = 0;
}

function restartGame() {
	restartScore();
	overlay.style.display = "none";
	startGame();
}

function incrementScore(value) {
	let score = parseInt(document.getElementById("score").innerHTML);
	document.getElementById("score").innerHTML = score + parseInt(value);
}

// GAME

let matrix = [];

document.addEventListener("DOMContentLoaded", () => {
	startGame();
	keyboardHandler();
});

function startGame() {
	matrix = [
	[0, 0, 0, 0],
	[0, 0, 0, 0],
	[0, 0, 0, 0],
	[0, 0, 0, 0]
	];
	generateGrid();
	updateGrid();
}

function generateGrid() {
	const [a, b] = getRandomPosition();
	
	matrix[a.y][a.x] = generateNumber();
	matrix[b.y][b.x] = generateNumber();
}

function keyboardHandler() {
	document.addEventListener("keyup", (event) => {
		if (event.key == "ArrowUp") {
			moveUp();
		}
		else if (event.key == "ArrowDown") {
			moveDown();
		}
		else if (event.key == "ArrowLeft") {
			moveLeft();
		}
		else if (event.key == "ArrowRight") {
			moveRight();
		}
	});
}

function updateGrid() {
	for (let y = 0; y < 4; y++) {
		for (let x = 0; x < 4; x++) {
			const cell = document.getElementById(`${y}-${x}`);
			const value = matrix[y][x];
			cell.innerHTML = value != 0 ? value : "";
			cell.className = "cell";
			if (value != 0) {
				cell.classList.add(`value-${value}`);
			}
		}
	}
}

// Movimientos
function moveUp() {
	const matrixCopy = matrix.map(row => [...row]);
	for (let x = 0; x < 4; x++) {
		let col = [ matrix[0][x], matrix[1][x], matrix[2][x], matrix[3][x]];

		let newCol = processLine(col, "up");

		for (let y = 0; y < 4; y++) {
			matrix[y][x] = newCol[y];			
		}
	}
	updateGrid();
	if (matrixCompare(matrixCopy, matrix) == true) addRandomTile();
	if (canMove() == false) {
		gameOver();
	}
}


function moveDown() {
	const matrixCopy = matrix.map(row => [...row]);
	for (let x = 0; x < 4; x++) {
		let col = [ matrix[0][x], matrix[1][x], matrix[2][x], matrix[3][x]];

		let newCol = processLine(col, "down");

		for (let y = 0; y < 4; y++) {
			matrix[y][x] = newCol[y];			
		}
	}
	updateGrid();
	if (matrixCompare(matrixCopy, matrix) == true) addRandomTile();
	if (canMove() == false) {
		gameOver();
	}
}

function moveLeft() {
	const matrixCopy = matrix.map(row => [...row]);
	for (let y = 0; y < 4; y++) {
		let col = [ matrix[y][0], matrix[y][1], matrix[y][2], matrix[y][3]];

		let newCol = processLine(col, "left");

		for (let x = 0; x < 4; x++) {
			matrix[y][x] = newCol[x];			
		}
	}
	updateGrid();
	if (matrixCompare(matrixCopy, matrix) == true) addRandomTile();
	if (canMove() == false) {
		gameOver();
	}
}

function moveRight() {
	const matrixCopy = matrix.map(row => [...row]);
	for (let y = 0; y < 4; y++) {
		let col = [ matrix[y][0], matrix[y][1], matrix[y][2], matrix[y][3]];

		let newCol = processLine(col, "right");

		for (let x = 0; x < 4; x++) {
			matrix[y][x] = newCol[x];			
		}
	}
	updateGrid();
	if (matrixCompare(matrixCopy, matrix) == true) addRandomTile();
	if (canMove() == false) {
		gameOver();
	}
}

function compactLine(line) {
	let newLine = line.filter(n => n != 0);
	while (newLine.length < 4) {
		newLine.push(0);
	}
	return newLine;
}

function mergeLine(line) {
	for (let i = 0; i < 3; i++) {
		if (line[i] != 0 && line[i] == line[i + 1]) {
			line[i] *= 2;
			incrementScore(line[i]);
			line[i + 1] = 0;
		}
	}
	return line;
}

function processLine(line, direction) {
	let newLine = [...line];

	if (direction == "right" || direction == "down") {
		newLine.reverse();
	}

	newLine = compactLine(newLine);
	newLine = mergeLine(newLine);
	newLine = compactLine(newLine);

	if (direction == "right" || direction == "down") {
		newLine.reverse();
	}
	return newLine;
}

function addRandomTile() {
	let pos;

	do {
		pos = {
			y: Math.floor(Math.random() * 4),
			x: Math.floor(Math.random() * 4)
		}
	} while (matrix[pos.y][pos.x] != 0);

	matrix[pos.y][pos.x] = generateNumber();
}

function canMove() {
	for (let y = 0; y < 4; y++) {
		for (let x = 0; x < 4; x++) {
			if (matrix[y][x] == 0) return true;

			if (x < 3 && matrix[y][x + 1] == matrix[y][x]) return true;

			if (y < 3 && matrix[y + 1][x] == matrix[y][x]) return true;
		}
	}
	return false;
}

function gameOver() {
	overlay.style.display = "flex";
}

function generateNumber() {
	return Math.random() < 0.9 ? 2 : 4;
}

function getRandomPosition() {
	let pos1 = {
		y: Math.floor(Math.random() * 4),
		x: Math.floor(Math.random() * 4),
	};

	let pos2;
	do {
		pos2 = {
		y: Math.floor(Math.random() * 4),
		x: Math.floor(Math.random() * 4),
	};
	} while (pos1.x == pos2.x && pos1.y == pos2.y)

	return [pos1, pos2];
}

function matrixCompare(first, second) {
	for (let y = 0; y < 4; y++) {
		for (let x = 0; x < 4; x++) {
			if (first[y][x] != second[y][x]) {
				return true;
			}
		}
	}
	return false;
}

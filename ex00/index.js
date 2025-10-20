// SCORE AND RESTART

let btn = document.getElementById("restart-btn");
btn.addEventListener("click", restartScore);

function restartScore() {
	let score = parseInt(document.getElementById("score").innerHTML);
	document.getElementById("score").innerHTML = 0;
}

function incrementScore(value) {
	let score = parseInt(document.getElementById("score").innerHTML);
	document.getElementById("score").innerHTML = score + parseInt(value);
}

// GAME

document.addEventListener("DOMContentLoaded", () => {
	generateGrid();
});

function generateGrid() {
	
	const [a, b] = getRandomPosition();
	
	let pos1 = document.getElementById(`${a.y}-${a.x}`);
	let pos2 = document.getElementById(`${b.y}-${b.x}`);

	pos1.innerHTML = generateNumber();
	pos1.classList.add(`value-${pos1.innerHTML}`);
	pos2.innerHTML = generateNumber();
	pos2.classList.add(`value-${pos2.innerHTML}`);
	
	// Controla los inputs del teclado
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

function updateMove(lastMove) {
	if (lastMove == "up") {
		for (let x = 0; x < 4; x++) {
			for (let y = 0; y < 4; y++) {

			}
		}
	}
}

function moveUp() {
	for (let x = 0; x < 4; x++)
	{
		for (let y = 0; y < 4; y++)
		{
			let cell = document.getElementById(`${y}-${x}`);
			if (cell.innerHTML != null && cell.innerHTML != undefined && cell.innerHTML != "") {

				for (let col = y + 1; col < 4; col++) {
					let pairCell = document.getElementById(`${y + 1}-${x}`);
					if (pairCell.innerHTML == null || undefined || "") {
						updateMove(up);
						col--;
					}
					
					if (cell.innerHTML == pairCell.innerHTML) {
						console.log("coinciden los dos");
					}
				}
			}
		}
	}
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



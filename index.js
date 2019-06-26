// Jussi Moilanen
// Date: 31.5.2019

let gameWon = false;
let board;
let move = 0;
const player1 = 'X';
const player2 = 'O';
const winCombos = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
const allSame = (arr) => arr.every(cell => cell.innerText === arr[0].innerText && cell.innerText !== '');
const cells = document.querySelectorAll('.cell');
startGame();

function startGame() {
  gameWon = false;
	board = Array.from(Array(9).keys()); // creates array key, element 1:1 to 1-9
	for (let i = 0; i < cells.length; i++) {
		cells[i].innerText = '';
    cells[i].classList.remove('winner');
		cells[i].addEventListener('click', turnClick, false);
	}
}

function turnClick(square) {
  let squareId = square.target.id;

  if (gameWon === false && event.target.innerHTML === "") {
    if (move === 0) {
      console.log("Pelaajan 1 siirto");
      document.getElementById(squareId).innerText = player1;
      move++;

    } else {
      console.log("Pelaajan 2 siirto");
      document.getElementById(squareId).innerText = player2;
      move--;
    }
    gameWon = checkWin(player1);
    gameWon = checkWin(player2);
  }
}

function checkWin(player) {
  let victory = false;
  winCombos.forEach(c => {
    const sequence = [cells[c[0]], cells[c[1]], cells[c[2]]];

    if (allSame(sequence)){
      victory = true;
      gameOver(sequence, player);
    }
  });
  return victory;
}

// change winningLine text to red & announce winner
function gameOver(winningLine, wonPlayer) {
  //console.log(winningLine, wonPlayer);
  winningLine.forEach(cell => cell.classList.add('winner'));

}

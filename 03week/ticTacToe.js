'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
let board = [
  [' ', ' ', ' '],
  [' ', ' ', ' '],
  [' ', ' ', ' ']
];

let playerTurn = 'X';
let movesCounter = 0;

function printBoard() {
  console.log('   0  1  2');
  console.log('0 ' + board[0].join(' | '));
  console.log('  ---------');
  console.log('1 ' + board[1].join(' | '));
  console.log('  ---------');
  console.log('2 ' + board[2].join(' | '));
}

function horizontalWin() {
  for (var i = 0; i <= 2; i++) {
    let count = 0;
    for (var j = 0; j <= 2; j++) {
      if (board[i][j] === playerTurn) {
        count++;
        if (count === 3) {
          return true;
        }
      } else {
        break;
      }
    }
  }
  return false;
}

function verticalWin() {
  for (var i = 0; i <= 2; i++) {
    let count = 0;
    for (var j = 0; j <= 2; j++) {
      if (board[j][i] === playerTurn) {
        count++;
        if (count === 3) {
          return true;
        }
      } else {
        break;
      }
    }
  }
  return false;
}

function diagonalWin() {
  if ((board[0][0] === playerTurn &&
      board[1][1] === playerTurn &&
      board[2][2] === playerTurn)
      ||
      (board[0][2] === playerTurn &&
      board[1][1] === playerTurn &&
      board[2][0] === playerTurn)) {
        return true;
      } else {
        return false;
      }
}

function checkForWin() {
  if (horizontalWin() || verticalWin() || diagonalWin()) {
    console.log(`Player ${playerTurn} won!`);
    return true;
  } else {
    return false;
  }
}

function ticTacToe(row, column) {
  board[row][column] = playerTurn;
  movesCounter++;

  if (checkForWin()) {
    return false;
  }

  if (movesCounter === 9) {
    console.log("It's a tie!");
    return false;
  }

  if (playerTurn === "X") {
    playerTurn = "O";
  } else {
    playerTurn = "X";
  }
  return true;
}

function validate(row, column) {
  if (isNaN(row) || isNaN(column) || row === '' || column === '') {
    return false;
  }

  if (board[row][column] === ' ') {
    return true;
  } else {
    return false;
  }
}

function getPrompt() {
  printBoard();
  console.log("It's Player " + playerTurn + "'s turn.");
  rl.question('row: ', (row) => {
    rl.question('column: ', (column) => {
      if (validate(row, column)) {
        if (!ticTacToe(row, column)) {
          printBoard();
          return;
        }
      } else {
        console.log("Invalid move!")
      }
      getPrompt();
    });
  });
}



// Tests

if (typeof describe === 'function') {

  describe('#ticTacToe()', () => {
    it('should place mark on the board', () => {
      ticTacToe(1, 1);
      assert.deepEqual(board, [ [' ', ' ', ' '], [' ', 'X', ' '], [' ', ' ', ' '] ]);
    });
    it('should alternate between players', () => {
      ticTacToe(0, 0);
      assert.deepEqual(board, [ ['O', ' ', ' '], [' ', 'X', ' '], [' ', ' ', ' '] ]);
    });
    it('should check for vertical wins', () => {
      board = [ [' ', 'X', ' '], [' ', 'X', ' '], [' ', 'X', ' '] ];
      assert.equal(verticalWin(), true);
    });
    it('should check for horizontal wins', () => {
      board = [ ['X', 'X', 'X'], [' ', ' ', ' '], [' ', ' ', ' '] ];
      assert.equal(horizontalWin(), true);
    });
    it('should check for diagonal wins', () => {
      board = [ ['X', ' ', ' '], [' ', 'X', ' '], [' ', ' ', 'X'] ];
      assert.equal(diagonalWin(), true);
    });
    it('should detect a win', () => {
      assert.equal(checkForWin(), true);
    });
  });
} else {

  getPrompt();

}

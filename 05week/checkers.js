'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


function Checker(symbol) {
  this.symbol = symbol;
}

function Board() {
  this.grid = [];
  // creates an 8x8 array, filled with null values
  this.createGrid = function() {
    // loop to create the 8 rows
    for (let row = 0; row < 8; row++) {
      this.grid[row] = [];
      // push in 8 columns of nulls
      for (let column = 0; column < 8; column++) {
        this.grid[row].push(null);

        if(row < 2 && (column + row) % 2 === 0) {
          this.grid[row][column] = new Checker('O');
        }

        if(row >= 6 && (column + row) % 2 === 0) {
          this.grid[row][column] = new Checker('X');
        }
      }
    }
  };

  // prints out the board
  this.viewGrid = function() {
    // add our column numbers
    let string = "  0 1 2 3 4 5 6 7\n";
    for (let row = 0; row < 8; row++) {
      // we start with our row number in our array
      const rowOfCheckers = [row];
      // a loop within a loop
      for (let column = 0; column < 8; column++) {
        // if the location is "truthy" (contains a checker piece, in this case)
        if (this.grid[row][column]) {
          // push the symbol of the check in that location into the array
          rowOfCheckers.push(this.grid[row][column].symbol);
        } else {
          // just push in a blank space
          rowOfCheckers.push(' ');
        }
      }
      // join the rowOfCheckers array to a string, separated by a space
      string += rowOfCheckers.join(' ');
      // add a 'new line'
      string += "\n";
    }
    console.log(string);
  };

}

function Game() {
  this.player = 'O';
  this.board = new Board();

  this.start = function() {
    this.board.createGrid();
    this.validateInput = function(whichPiece, toWhere) {
      this.whichPiece = whichPiece.trim();
      this.toWhere = toWhere.trim();
      let whichPieceNum = Number(whichPiece);
      let toWhereNum = Number(toWhere);
      if(this.validateSingleInput(whichPieceNum) && this.validateSingleInput(toWhereNum)) {
        return true;
      } else {
        console.log("Invalid input!");
        return false;
      }
    }

    this.validateSingleInput = function(input) {
      return input != NaN && input >= 0 && input <= 77;
    }


    this.legalMove = function(whichPiece, toWhere) {
      const fromRow = Number(whichPiece[0]);
      const fromCol = Number(whichPiece[1]);
      const toRow = Number(toWhere[0]);
      const toCol = Number(toWhere[1]);

      if(this.legalDirection(fromRow, fromCol, toRow, toCol) &&
         this.fromIsLegal(fromRow, fromCol) &&
         this.toIsLegal(fromRow, fromCol, toRow, toCol)) {
        return true;
      } else {
        console.log("Illegal move!");
        return false;
      }
    }

    // Checks if the player is moving according to the rules. A player can move in diagonal 1 or 2 in every direction.
    this.legalDirection = function(fromRow, fromCol, toRow, toCol) {
      if(this.player === 'O') {
        return (toRow - fromRow === 1 && Math.abs(toCol - fromCol) === 1) ||
                (toRow - fromRow === 2 && Math.abs(toCol - fromCol) === 2);
      } else {
        return (fromRow - toRow === 1 && Math.abs(fromCol - toCol) === 1) ||
                (fromRow - toRow === 2 && Math.abs(fromCol - toCol) === 2);
      }
    }

    this.fromIsLegal = function(fromRow, fromCol) {
      const fromSpot = this.board.grid[fromRow][fromCol];
      return fromSpot != null && fromSpot.symbol === this.player;
    }

    this.toIsLegal = function(fromRow, fromCol, toRow, toCol) {
      let jumpSize = 0;
      if(this.player === 'O') {
        jumpSize = toRow - fromRow;
      } else {
        jumpSize = fromRow - toRow;
      }
      const toSpot = this.board.grid[toRow][toCol];

      // If jumpSize == 1 it means we do normal move, no killing. Only requirnment is for the toSpot to be empty
      if(jumpSize == 1) {
        if(toSpot == null) {
          return true;
        } else {
          return false;
        }
      } else {
      // If jumpSize == 2 it means we are jumping 2 fields. This is legal only if:
      //  - toSpot is empty
      //  - Spot between fromSpot and toSpot is not empty
      //  - Spot between fromSpot and toSpot is a enemy checker (symbol !== player) -> killing
        const betweenRow = (toRow + fromRow) / 2;
        const betweenCol = (toCol + fromCol) / 2;
        const betweenSpots = this.board.grid[betweenRow][betweenCol];
        if(toSpot === null && betweenSpots !== null && betweenSpots.symbol !== this.player) {
          return true;
        } else {
          return false;
        }
      }
    }
  };

  this.moveChecker = function(whichPiece, toWhere) {
    if (this.validateInput(whichPiece, toWhere) && this.legalMove(whichPiece, toWhere)) {
      const fromRow = Number(whichPiece[0]);
      const fromCol = Number(whichPiece[1]);
      const toRow = Number(toWhere[0]);
      const toCol = Number(toWhere[1]);

      let jumpSize = 0;
      if(this.player === 'O') {
        jumpSize = toRow - fromRow;
      } else {
        jumpSize = fromRow - toRow;
      }

      this.board.grid[fromRow][fromCol] = null;
      this.board.grid[toRow][toCol] = new Checker(this.player);

      if(jumpSize == 2) {
        const betweenRow = (toRow + fromRow) / 2;
        const betweenCol = (toCol + fromCol) / 2;
        this.board.grid[betweenRow][betweenCol] = null;
      }

      if(this.player === 'O') {
        this.player = 'X';
      } else {
        this.player = 'O';
      }
    }
  }
}

function getPrompt() {
  game.board.viewGrid();
  rl.question('which piece?: ', (whichPiece) => {
    rl.question('to where?: ', (toWhere) => {
      game.moveChecker(whichPiece, toWhere);
      getPrompt();
    });
  });
}

const game = new Game();
game.start();

// Tests

if (typeof describe === 'function') {
  describe('Game', () => {
    it('should have a board', () => {
      assert.equal(game.board.constructor.name, 'Board');
    });
    it('board should have 24 checkers', () => {
      assert.equal(game.board.checkers.length, 24);
    });
  });

  describe('Game.moveChecker()', function () {
    it('should move a checker', function () {
      assert(game.board.grid[4][1]);
      game.moveChecker('50', '41');
      assert(game.board.grid[4][1]);
      game.moveChecker('21', '30');
      assert(game.board.grid[3][0]);
      game.moveChecker('52', '43');
      assert(game.board.grid[4][3]);
    });
    it('should be able to jump over and kill another checker', () => {
      game.moveChecker('30', '52');
      assert(game.board.grid[5][2]);
      assert(!game.board.grid[4][1]);
      assert.equal(game.board.checkers.length, 23);
    });
  });
} else {
  getPrompt();
}

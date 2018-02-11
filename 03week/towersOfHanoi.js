// Globals:
// rl - const that will read input from user (already existed).
// stacks - object that will hold stacks. Each stack will be an array (already existed).
// availableChoices - array holding list of legal choices.
//
// Functions:
// getPrompt(): main function in my application. It will first call printStacks
// function to communicate state of game to the user. Then I will ask user for
// input using question method of rl variable and store it in startStack and endStack
// local variables. After that I will call function towersOfHanoi with the
// startStack and endStack as arguments, which will perform all operations. Then I
// will call checkForWin in if statement to check if winning conditions were met.
// If no, I will call itself again. If yes I will return, which
// will terminate the application.
//
// printStacks(): using console.log method it will print the current state of the
// game (already existed).
//
// towersOfHanoi(startStack, endStack): function that will perform all operations. I
// will normalize the inputs (using trim and toLowerCase methods). After that I
// will call the validInput function to see if the user inputs are valid. If yes I
// will proceed, if no I will use console.log method to print "Invalid input"
// message to user. Then I will define the topBlock and bottomBlock variables.
// topBlock will hold the top most block from the startStack. bottomBlock will hold
// the top most block from the endStack. I will then call isLegal function to see
// if the move is legal according to the rules of the game. If no, I will print the
// message "Illegal move" to the user. If yes, I will call the movePiece function
// to perform the move.
//
// validInput(startStack, endStack): I will check if startStack and endStack are
// present in the availableChoices array using availableChoices.indexOf(stack) !== -1
// construct. If yes I will return true, if no I will return false.
//
// isLegal(endStack, topBlock, bottomBlock): the move is legal when the endStack is
// empty or if the topBlock is smaller than bottomBlock.
//
// movePiece(startStack, endStack): I will use pop method to get the block from
// startStack and then I will use push method to put it on the end stack.



'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let stacks = {
  a: [4, 3, 2, 1],
  b: [],
  c: []
};

const availableChoices = ['a', 'b', 'c'];


const printStacks = () => {
  console.log("a: " + stacks.a);
  console.log("b: " + stacks.b);
  console.log("c: " + stacks.c);
}

const movePiece = (startStack, endStack) => {
  let blockToMove = stacks[startStack].pop();
  stacks[endStack].push(blockToMove);
}

const isLegal = (endStack, topBlock, bottomBlock) => {
  if (stacks[endStack].length === 0 || topBlock < bottomBlock) {
    return true;
  } else {
    return false;
  }
}

const checkForWin = () => {
  if (stacks.c.length === 4) {
    console.log('You won!');
    return true;
  } else {
    return false;
  }
}

const towersOfHanoi = (startStack, endStack) => {
  startStack = startStack.trim().toLowerCase();
  endStack = endStack.trim().toLowerCase();

  if (validInput(startStack, endStack)) {
    let topBlock = stacks[startStack][stacks[startStack].length - 1];
    let bottomBlock = stacks[endStack][stacks[endStack].length - 1];
    if(isLegal(endStack, topBlock, bottomBlock)) {
      movePiece(startStack, endStack);
    } else {
      console.log('Illegal move!');
    }
  } else {
    console.log('Invalid input!');
  }
}

const validInput = (startStack, endStack) => {
  if(availableChoices.indexOf(startStack) !== -1 && availableChoices.indexOf(endStack) !== -1) {
    return true;
  } else {
    return false;
  }
}

const getPrompt = () => {
  printStacks();
  rl.question('start stack: ', (startStack) => {
    rl.question('end stack: ', (endStack) => {
      towersOfHanoi(startStack, endStack);
      if (checkForWin()) {
        return;
      }
      getPrompt();
    });
  });
}

getPrompt();

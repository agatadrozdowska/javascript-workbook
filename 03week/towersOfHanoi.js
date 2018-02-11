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


function printStacks() {
  console.log("a: " + stacks.a);
  console.log("b: " + stacks.b);
  console.log("c: " + stacks.c);
}

function movePiece() {
  // Your code here

}

function isLegal() {
  // Your code here

}

function checkForWin() {
  // Your code here

}

const towersOfHanoi = (startStack, endStack) => {
  startStack = startStack.trim();
  endStack = endStack.trim();

  if (validInput(startStack, endStack)) {
    let topBlock = stacks[startStack][stacks[startStack].length - 1];
    let bottomBlock = stacks[endStack][stacks[endStack].length - 1];
    if(isLegal(endStack, topBlock, bottomBlock)) {
      console.log('I will do move here');
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

function getPrompt() {
  printStacks();
  rl.question('start stack: ', (startStack) => {
    rl.question('end stack: ', (endStack) => {
      towersOfHanoi(startStack, endStack);
      getPrompt();
    });
  });
}

getPrompt();

'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});



if (typeof describe === 'function') {

  describe('#rockPaperScissors()', () => {
    it('should detect a tie', () => {
      assert.equal(rockPaperScissors('rock', 'rock'), "It's a tie!");
      assert.equal(rockPaperScissors('paper', 'paper'), "It's a tie!");
      assert.equal(rockPaperScissors('scissors', 'scissors'), "It's a tie!");
    });
    it('should detect which hand won', () => {
      assert.equal(rockPaperScissors('rock', 'paper'), "Hand two wins!");
      assert.equal(rockPaperScissors('paper', 'scissors'), "Hand two wins!");
      assert.equal(rockPaperScissors('rock', 'scissors'), "Hand one wins!");
      assert.equal(rockPaperScissors('paper', 'rock'), "Hand one wins!");
      assert.equal(rockPaperScissors('scissors', 'paper'), "Hand one wins!");
      assert.equal(rockPaperScissors('scissors', 'rock'), "Hand two wins!");
    });
    it('should scrub input to ensure lowercase with "trim"ed whitepace', () => {
      assert.equal(rockPaperScissors('rOcK', ' paper '), "Hand two wins!");
      assert.equal(rockPaperScissors('Paper', 'SCISSORS'), "Hand two wins!");
      assert.equal(rockPaperScissors('rock ', 'sCiSsOrs'), "Hand one wins!");
    });
    it('should detect if there is a valid input', () => {
      assert.equal(rockPaperScissors('0', 'scissors'), "Invalid input");
      assert.equal(rockPaperScissors('rock', 'paperr'), "Invalid input");
      assert.equal(rockPaperScissors('5', '3'), "Invalid input");
      assert.equal(rockPaperScissors(null, null), "Invalid input");
      assert.equal(rockPaperScissors('', ''), "Invalid input");
      assert.equal(rockPaperScissors(5, 3), "Invalid input");
    });
  });
} else {

  getPrompt();

}

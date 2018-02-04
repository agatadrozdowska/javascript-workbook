/*Storage:
Global storage: `vowels` - constant array holding the list of vowels.
Local storage: `trimmedWord` - holds the trimmed word

Functions:
`pigLatin` - main function that will first trim the input using String.trim() method, then it will iterate through all the letters and it will check if that letter is a vowel using `isAVowel` function. If yes it will call `transformWord` function and return the result of that function which will terminate the main function. If the for loop finishes it means no vowels were found (edge case) and the transformWord function will be called with index eguals 0 (word remains unchanged, 'ay' gets appended).
`isAVowel` - helper function added for easier code readibility that determines whether letter is a vowel. It does so by changing the letter to lower case String.toLowerCase() method and checking if that letter is present in vowels array using String.indexOf() method and assuring that result is a positive number or 0. If yes - true will be returned and false otherwise.
`transformWord` - creates a new word formatted according to pig latin game rules. It takes two arguments, `index` and `trimmedWord`. It creates two substrings using String.substring(...) method, one starting from index to the end of the word and the other from beginning of the word to index. Then it appends together the first and second substrings and in the end it appends "ay" string. */

'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const vowels = ['a', 'e', 'i', 'o', 'u', 'y'];

const pigLatin = (word) => {
  const trimmedWord = word.trim();
  for (let i = 0; i < trimmedWord.length; i++) {
    if(isAVowel(trimmedWord[i])) {
      return transformWord(i, trimmedWord);
    }
  }
  return transformWord(0, trimmedWord);
}

const isAVowel = (letter) => {
  if (vowels.indexOf(letter.toLowerCase()) >= 0) {
    return true;
  } else {
    return false;
  }
}

const transformWord = (index, trimmedWord) => {
  return trimmedWord.substring(index) + trimmedWord.substring(0, index) + 'ay';
}

pigLatin(' hEllo ');


function getPrompt() {
  rl.question('word ', (answer) => {
    console.log( pigLatin(answer) );
    getPrompt();
  });
}

// Tests

if (typeof describe === 'function') {

  describe('#pigLatin()', () => {
    it('should translate a simple word', () => {
      assert.equal(pigLatin('car'), 'arcay');
      assert.equal(pigLatin('dog'), 'ogday');
    });
    it('should translate a complex word', () => {
      assert.equal(pigLatin('create'), 'eatecray');
      assert.equal(pigLatin('valley'), 'alleyvay');
    });
    it('should attach "yay" if word begins with vowel', () => {
      assert.equal(pigLatin('egg'), 'eggyay');
      assert.equal(pigLatin('emission'), 'emissionyay');
    });
    it('should lowercase and trim word before translation', () => {
      assert.equal(pigLatin('HeLlO '), 'ellohay');
      assert.equal(pigLatin(' RoCkEt'), 'ocketray');
    });
  });
} else {

  getPrompt();

}

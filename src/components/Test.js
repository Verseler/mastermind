const secretCodes = [1,2,1,3];
const guessCodes = [1,1,1,2];
const MATCH_CODE_INDEX = [];
let correctScore = 0;
let misplacedScore = 0;


//get the correct Score
secretCodes.forEach((secretCode, secretCodeIndex) => {
  guessCodes.forEach((guessCode, guessCodeIndex) => {
    //if index exist in MATCH CODE INDEX will be skip
    if (!MATCH_CODE_INDEX.includes(secretCodeIndex)) {
      //if same value and index matched
      if (secretCode === guessCode) {
        if (secretCodeIndex === guessCodeIndex) {
          correctScore++;

          //the index of all all matched code will be added to MATCH CODE INDEX
          //so that the next interation does index will be skip
          MATCH_CODE_INDEX.push(secretCodeIndex);
        }
      }
    }
  });
});

secretCodes.forEach((secretCode, secretCodeIndex) => {
  guessCodes.forEach((guessCode, guessCodeIndex) => {
    //if index exist in MATCH CODE INDEX will be skip
    if (!MATCH_CODE_INDEX.includes(secretCodeIndex)) {
      //all matched value and index are already recorded
      //count all matched in value but not the index
      if (secretCode === guessCode) {
          misplacedScore++;
      }
    }
  });
});

console.log(correctScore)
console.log(misplacedScore)


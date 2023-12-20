const EMPTY = "empty";

const decodingBoard = [
  //each of these arrays are called guessRow
  [EMPTY, EMPTY, EMPTY, EMPTY],
  [EMPTY, EMPTY, EMPTY, EMPTY],
  [EMPTY, EMPTY, EMPTY, EMPTY],
  [EMPTY, EMPTY, EMPTY, EMPTY],
  [EMPTY, EMPTY, EMPTY, EMPTY],
  [EMPTY, EMPTY, EMPTY, EMPTY],
  [EMPTY, EMPTY, EMPTY, EMPTY],
  [EMPTY, EMPTY, EMPTY, EMPTY],
  [EMPTY, EMPTY, EMPTY, EMPTY],
  [EMPTY, EMPTY, EMPTY, EMPTY],
];

const [scoreBoard, setScoreBoard] = [
  //each one of this is connected to each guessRow in decondingBoard
  [EMPTY, EMPTY, EMPTY, EMPTY],
  [EMPTY, EMPTY, EMPTY, EMPTY],
  [EMPTY, EMPTY, EMPTY, EMPTY],
  [EMPTY, EMPTY, EMPTY, EMPTY],
  [EMPTY, EMPTY, EMPTY, EMPTY],
  [EMPTY, EMPTY, EMPTY, EMPTY],
  [EMPTY, EMPTY, EMPTY, EMPTY],
  [EMPTY, EMPTY, EMPTY, EMPTY],
  [EMPTY, EMPTY, EMPTY, EMPTY],
  [EMPTY, EMPTY, EMPTY, EMPTY],
];

const secretCodes = ["GN", "GN", "PK", "YW"];

function giveScore(guessRowIndex) {
  const guessRowScores = [];
  const MATCH_CODE_SECRET_INDEX = [];
  const MATCH_CODE_GUESS_INDEX = [];
  const guessCodes = decodingBoard[guessRowIndex];

  //get the all correct Score
  secretCodes.forEach((secretCode, secretCodeIndex) => {
    guessCodes.forEach((guessCode, guessCodeIndex) => {
      //if index exist in MATCH CODE INDEX will be skip
      if (
        !MATCH_CODE_GUESS_INDEX.includes(guessCodeIndex) &&
        !MATCH_CODE_SECRET_INDEX.includes(secretCodeIndex)
      ) {
        //if same value and index matched
        if (secretCode === guessCode && secretCodeIndex === guessCodeIndex) {
          //add score for correct
          guessRowScores.push("BL");

          //the index of all all matched code will be added to MATCH CODE INDEX
          //so that the next interation does index will be skip
          MATCH_CODE_SECRET_INDEX.push(secretCodeIndex);
          MATCH_CODE_GUESS_INDEX.push(guessCodeIndex);
        }
      }
    });
  });

  //get the all misplaced Score
  secretCodes.forEach((secretCode, secretCodeIndex) => {
    guessCodes.forEach((guessCode, guessCodeIndex) => {
      //if index exist in MATCH CODE INDEX will be skip
      if (
        !MATCH_CODE_GUESS_INDEX.includes(guessCodeIndex) &&
        !MATCH_CODE_SECRET_INDEX.includes(secretCodeIndex)
      ) {
        //all matched value and index are already recorded
        //count all matched in value but not the index
        if (secretCode === guessCode) {
          //add score for misplaced
          guessRowScores.push("AM");

          //the index of all all matched code will be added to MATCH CODE INDEX
          //so that the next interation does index will be skip
          MATCH_CODE_SECRET_INDEX.push(secretCodeIndex);
          MATCH_CODE_GUESS_INDEX.push(guessCodeIndex);
        }
      }
    });
  });

  //add empty to guessRowScores for the incorrect guesses
  while (guessRowScores.length < 4) {
    guessRowScores.push(EMPTY);
  }


}

let guessRow = 2;

// decodingBoard[guessRow] = ["PK", "GN", "BU", "OR"];
// console.log(" ");
// console.log("EXPECTED SCORE [1, 1]");
// giveScore(guessRow);

// decodingBoard[guessRow + 1] = ["BU", "PK", "GN", "VL"];
// console.log(" ");
// console.log("EXPECTED SCORE [0, 2]");
// giveScore(guessRow + 1);

// decodingBoard[guessRow + 2] = ["GN", "YL", "BU", "PK"];
// console.log(" ");
// console.log("EXPECTED SCORE [1, 2]");
// giveScore(guessRow + 2);

// decodingBoard[guessRow + 3] = ["YL", "BU", "BU", "GN"];
// console.log(' ');
// console.log('EXPECTED SCORE [0, 2]');
// giveScore(guessRow + 3);

// decodingBoard[guessRow + 4] = ["GN", "YL", "YL", "PK"];
// console.log(' ');
// console.log('EXPECTED SCORE [1, 2]');
// giveScore(guessRow + 4);

// decodingBoard[guessRow + 5] = ["PK", "YL", "BU", "YL"];
// console.log(' ');
// console.log('EXPECTED SCORE [0, 2]');
// giveScore(guessRow + 5);

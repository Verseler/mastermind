import { useState } from "react";
import Colors from "./components/Colors";

function App() {
  const EMPTY = "empty";
  const [decodingBoard, setDecodingBoard] = useState([
    [EMPTY, EMPTY, EMPTY, EMPTY], //each of these arrays are called guessRow
    [EMPTY, EMPTY, EMPTY, EMPTY],
    [EMPTY, EMPTY, EMPTY, EMPTY],
    [EMPTY, EMPTY, EMPTY, EMPTY],
    [EMPTY, EMPTY, EMPTY, EMPTY],
    [EMPTY, EMPTY, EMPTY, EMPTY],
    [EMPTY, EMPTY, EMPTY, EMPTY],
    [EMPTY, EMPTY, EMPTY, EMPTY],
    [EMPTY, EMPTY, EMPTY, EMPTY],
    [EMPTY, EMPTY, EMPTY, EMPTY],
  ]);
  const [scoreBoard, setScoreBoard] = useState([
    { correct: 0, misPlaced: 0 }, //each one of this is connected to each guessRow in decondingBoard
    { correct: 0, misPlaced: 0 },
    { correct: 0, misPlaced: 0 },
    { correct: 0, misPlaced: 0 },
    { correct: 0, misPlaced: 0 },
    { correct: 0, misPlaced: 0 },
    { correct: 0, misPlaced: 0 },
    { correct: 0, misPlaced: 0 },
    { correct: 0, misPlaced: 0 },
    { correct: 0, misPlaced: 0 },
  ]);

  const codePegs = [
    //code pegs - it is equal to color that is use to guess and play the game
    "BU",
    "PK",
    "OR",
    "GN",
    "VL",
    "YW",
    "RD",
    //key pegs - it is equal to clor that is use to score each incorrect guessRow
    "WH",
    "BK",
  ];
  const [selectedCodePeg, setSelectedCodePeg] = useState(codePegs[0]);
  const [secretCodes, setSecretCodes] = useState([]);
  const [currentGuessRow, setCurrentGuessRow] = useState(0);

  function generateSecretCodes() {
    let newSecretCodes = [];

    for (let i = 0; i < 4; i++) {
      const min = 0;
      const max = 5;
      const randomNum = Math.floor(Math.random() * (max - min + 1) + min);
      newSecretCodes.push(codePegs[randomNum]);
    }
    setSecretCodes(newSecretCodes);
  }

  function makeGuess(rowIndex, colIndex) {
    //make a move if selected cell is within the currentGuessRow
    if (rowIndex === currentGuessRow) {
      const newDecodingBoard = [...decodingBoard];
      const selectedCell = newDecodingBoard[rowIndex][colIndex];

      if (
        selectedCell === EMPTY ||
        (selectedCell !== selectedCodePeg && selectedCell !== EMPTY)
      ) {
        newDecodingBoard[rowIndex][colIndex] = selectedCodePeg;
      } else {
        newDecodingBoard[rowIndex][colIndex] = EMPTY;
      }

      setDecodingBoard(newDecodingBoard);
    }

    //verify if currentGuessRow array is full
    if (decodingBoard[currentGuessRow].every((colCode) => colCode !== EMPTY)) {
      //verify guess if correct
      if (isWin()) {
        console.log("WIN: You break the code");
      }
      //if not then proceed to next attempt
      else {
        setCurrentGuessRow((prevCurrentGuessRow) => prevCurrentGuessRow + 1);
        giveScore(currentGuessRow);
      }
    }
  }

  function giveScore(guessRowIndex) {
    let correctScore = 0;
    let misplacedScore = 0;
    const MATCH_CODE_INDEX = [];
    const guessCodes = decodingBoard[guessRowIndex];

    //get the all correct Score
    secretCodes.forEach((secretCode, secretCodeIndex) => {
      guessCodes.forEach((guessCode, guessCodeIndex) => {
        //if index exist in MATCH CODE INDEX will be skip
        if (!MATCH_CODE_INDEX.includes(secretCodeIndex)) {
          //if same value and index matched
          if (secretCode === guessCode && secretCodeIndex === guessCodeIndex) {
              correctScore++;

              //the index of all all matched code will be added to MATCH CODE INDEX
              //so that the next interation does index will be skip
              MATCH_CODE_INDEX.push(secretCodeIndex);
          }
        }
      });
    });

    //get the all misplaced Score
    secretCodes.forEach((secretCode, secretCodeIndex) => {
      guessCodes.forEach((guessCode, guessCodeIndex) => {
        //if index exist in MATCH CODE INDEX will be skip
        if (!MATCH_CODE_INDEX.includes(secretCodeIndex)) {
          //all matched value and index are already recorded
          //count all matched in value but not the index
          if (secretCode === guessCode) {
              misplacedScore++;

              //the index of all all matched code will be added to MATCH CODE INDEX
              //so that the next interation does index will be skip
              MATCH_CODE_INDEX.push(secretCodeIndex);
          }
        }
      });
    });

    console.log(
      "SCORE correct: " + correctScore + "  misPlaced: " + misplacedScore
    );

    const newScoreBoard = [...scoreBoard];
    newScoreBoard[guessRowIndex].correct = correctScore;
    newScoreBoard[guessRowIndex].misPlaced = misplacedScore;
    setScoreBoard(newScoreBoard);
  }

  //if currentGuessRow array is equal to secretCodes if not procced to next attemp
  function isWin() {
    const guess = decodingBoard[currentGuessRow];
    for (let i = 0; i < guess.length; i++) {
      if (guess[i] !== secretCodes[i]) {
        return false;
      }
    }

    return true;
  }

  return (
    <div>
      {/* start game button */}
      <button onClick={generateSecretCodes}>Play Game</button>

      {/* display remaining attempts */}
      <div>{10 - currentGuessRow}</div>

      {/* secret code display */}
      <div>
        {secretCodes.map((colCode, index) => (
          <button
            className={`${Colors[colCode]} h-10 w-10`}
            key={index}
          ></button>
        ))}
      </div>
      {/* decoding board display */}
      <div className="flex">
        <div>
          {decodingBoard.map((guessRow, rowIndex) => (
            <div key={rowIndex}>
              {guessRow.map((colCode, colIndex) => (
                <button
                  className={`${Colors[colCode]} h-10 w-10`}
                  key={colIndex}
                  onClick={() => makeGuess(rowIndex, colIndex)}
                ></button>
              ))}
            </div>
          ))}
        </div>
        <div>
          {scoreBoard.map((scoreRow, rowIndex) => (
            <div key={rowIndex} className="flex mb-1.5 text-center bg-gray-100">
              <div className="w-10 h-10">
                {scoreRow.correct != 0 && scoreRow.correct}
              </div>
              <div className="w-10 h-10">
                {scoreRow.misPlaced != 0 && scoreRow.misPlaced}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* codePegs display */}
      <div>
        {codePegs.slice(0, 6).map((code, index) => (
          <button
            className={`${Colors[code]} h-10 w-10`}
            key={index}
            onClick={() => setSelectedCodePeg(code)}
          ></button>
        ))}
      </div>
    </div>
  );
}

export default App;

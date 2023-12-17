import { useEffect, useState } from "react";
import BottomCodePegs from "../components/BottomCodePegs";
import Header from "../components/Header";
import ScoreBoard from "../components/ScoreBoard";
import DecodingBoard from "../components/DecodingBoard";
import SecretCodes from "../components/SecretCodes";
import NewGameDialog from "../components/NewGameDialog";
import { useLocation } from "react-router-dom";

export default function Game() {
  useEffect(() => {
    startGame();
    
    //handle keyboard press
    const handleKeyPress = (event) => {
      switch (event.key) {
        case '1':
          setSelectedCodePeg(codePegs[0]);
          break;
        case '2':
          setSelectedCodePeg(codePegs[1]);
          break;
        case '3':
          setSelectedCodePeg(codePegs[2]);
          break;
        case '4':
          setSelectedCodePeg(codePegs[3]);
          break;
        case '5':
          setSelectedCodePeg(codePegs[4]);
          break;
        case '6':
          setSelectedCodePeg(codePegs[5]);
          break;
        default:
          // Handle other keys if needed
          break;
      }
    };
    document.body.addEventListener('keydown', handleKeyPress);



    //handle refresh web
    const handleBeforeUnload = (event) => {
      event.preventDefault();
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    //clean up
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      document.body.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  const EMPTY = "empty";
  const [decodingBoard, setDecodingBoard] = useState([
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
  ]);
  const [scoreBoard, setScoreBoard] = useState([
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
  ]);

  //code pegs - it is equal to color that is use to guess and play the game
  const codePegs = ["BU", "PK", "GN", "RD", "VL", "YW", "OR"];

  const [selectedCodePeg, setSelectedCodePeg] = useState(codePegs[0]);
  const [secretCodes, setSecretCodes] = useState([]);
  const [currentGuessRow, setCurrentGuessRow] = useState(0);
  const [winCurrentGame, setWinCurrentGame] = useState(false);

  function startGame() {
    //clear boards
    setDecodingBoard((prevDecodingBoard) =>
      prevDecodingBoard.map((guessRow) =>
        guessRow.map((colCode) => (colCode = EMPTY))
      )
    );
    setScoreBoard((prevScoreBoard) =>
      prevScoreBoard.map((scoreRow) => scoreRow.map((score) => (score = EMPTY)))
    );
    //generate secret code for this game
    generateSecretCodes();
    setWinCurrentGame(false);
  }

  function generateSecretCodes() {
    let newSecretCodes = [];

    for (let i = 0; i < 4; i++) {
      const min = 0;
      const max = 5;
      const randomNum = Math.floor(Math.random() * (max - min + 1) + min);
      newSecretCodes.push(codePegs[randomNum]);
    }
    console.log(newSecretCodes);
    setSecretCodes(newSecretCodes);
  }

  function makeGuess(rowIndex, colIndex) {
    //prevent making move when current game is already over
    if (winCurrentGame) return;

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
        setWinCurrentGame(true);
      }
      //if not then proceed to next attempt
      else {
        setCurrentGuessRow((prevCurrentGuessRow) => prevCurrentGuessRow + 1);
        giveScore(currentGuessRow);
      }
    }
  }

  function giveScore(guessRowIndex) {
    const guessRowScores = [];
    const MATCH_CODE_INDEX = [];
    const guessCodes = decodingBoard[guessRowIndex];

    //get the all correct Score
    secretCodes.forEach((secretCode, secretCodeIndex) => {
      guessCodes.forEach((guessCode, guessCodeIndex) => {
        //if index exist in MATCH CODE INDEX will be skip
        if (!MATCH_CODE_INDEX.includes(secretCodeIndex)) {
          //if same value and index matched
          if (secretCode === guessCode && secretCodeIndex === guessCodeIndex) {
            //add score for correct
            guessRowScores.push("BL");

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
            //add score for misplaced
            guessRowScores.push("AM");

            //the index of all all matched code will be added to MATCH CODE INDEX
            //so that the next interation does index will be skip
            MATCH_CODE_INDEX.push(secretCodeIndex);
          }
        }
      });
    });

    //add empty to guessRowScores for the incorrect guesses
    while (guessRowScores.length < 4) {
      guessRowScores.push(EMPTY);
    }

    const newScoreBoard = [...scoreBoard];
    newScoreBoard[guessRowIndex] = guessRowScores;
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
    <div className="flex flex-col h-screen">
      <Header />
      <main className="relative flex-1">
        <div className="absolute h-[5.5vh] inset-x-0 flex justify-center w-full gap-2 top-4">
          <SecretCodes
            secretCodes={secretCodes}
            winCurrentGame={winCurrentGame}
            remainingAttempt={10 - currentGuessRow}
          />
          <div className="w-[5vh] text-2xl font-bold text-center">
            <p>{10 - currentGuessRow}</p>
          </div>
        </div>

        <div className="flex items-center justify-center h-full gap-2 pt-6">
          <DecodingBoard
            decodingBoard={decodingBoard}
            makeGuess={makeGuess}
            currentGuessRow={currentGuessRow}
          />

          <ScoreBoard scoreBoard={scoreBoard} />
        </div>

        {/*display when game is over*/}
        {winCurrentGame || 10 - currentGuessRow === 10 ? (
          <NewGameDialog
            winCurrentGame={winCurrentGame}
            startGame={startGame}
            remainingAttempt={10 - currentGuessRow}
          />
        ) : (
          ""
        )}
      </main>

      <BottomCodePegs
        setSelectedCodePeg={setSelectedCodePeg}
        codePegs={codePegs}
      />
    </div>
  );
}

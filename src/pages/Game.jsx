import { useEffect, useState } from "react";
import BottomCodePegs from "../components/BottomCodePegs";
import Header from "../components/Header";
import ScoreBoard from "../components/ScoreBoard";
import DecodingBoard from "../components/DecodingBoard";
import SecretCodes from "../components/SecretCodes";
import NewGameDialog from "../components/NewGameDialog";
import Difficulty from "../utilities/Difficulty";
import Confetti from "react-confetti";
import GameGuideDialog from "../components/GameGuideDialog";

export default function Game() {
  const EMPTY = "empty";
  const [decodingBoard, setDecodingBoard] = useState([]);
  const [scoreBoard, setScoreBoard] = useState([]);

  const [showGuideDialog, setShowGuideDialog] = useState(false);

  //code pegs - it is equal to box color that is use to guess and play the game
  const codePegs = ["BU", "PK", "GN", "RD", "VL", "OR", "YW"];

  const [selectedCodePeg, setSelectedCodePeg] = useState(codePegs[0]);
  const [secretCodes, setSecretCodes] = useState([]);
  const [currentGuessRow, setCurrentGuessRow] = useState(0);
  const [winCurrentGame, setWinCurrentGame] = useState(false);
  const [currentDifficulty, setCurrentDifficulty] = useState(Difficulty[0]);


  /*
   * 
   * Show guide if users havent see it for the first time in its device  
   * 
   */
  useEffect(() => {
    //if user haven see the guide for the first time
    //show guide
    if(!localStorage.getItem('watchedGuide')) {
     localStorage.setItem('watchedGuide', true);
     
     showGuide();
    }
  },[]);


  /*
   * 
   * Every first web load start the game
   * IF current difficulty level is change then restart the game
   *  
   */
  useEffect(() => {
    startGame();
    //handle refresh web
    const handleBeforeUnload = (event) => {
      event.preventDefault();
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    //clean up
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [currentDifficulty]);

  /*
   *
   * This start game. It is use for playing new game after a round
   *
   */
  function startGame() {
    //initialized board
    setDecodingBoard(createBoard(currentDifficulty.boardColSize));
    setScoreBoard(createBoard(currentDifficulty.boardColSize));

    //clear boards
    setDecodingBoard((prevDecodingBoard) => clearBoard(prevDecodingBoard));
    setScoreBoard((prevScoreBoard) => clearBoard(prevScoreBoard));

    //generate secret code for this game
    generateSecretCodes(
      currentDifficulty.boardColSize,
      currentDifficulty.codePegsSize
    );

    setWinCurrentGame(false);
    //restart attemptRemaining
    setCurrentGuessRow(0);
  }

  const createBoard = (colSize) =>
    new Array(10).fill(Array(colSize).fill(EMPTY));

  const clearBoard = (board) =>
    board.map((guessRow) => guessRow.map((colCode) => (colCode = EMPTY)));

  function setNewLevel(index) {
    const newLevel = Difficulty[index];
    setCurrentDifficulty(newLevel);
  }

  /*
   *
   * This generate new secret code for the round
   *
   */
  function generateSecretCodes(colSize, maxColorPegSize) {
    let newSecretCodes = [];

    for (let i = 0; i < colSize; i++) {
      const max = maxColorPegSize;
      const randomNum = Math.floor(Math.random() * max);

      newSecretCodes.push(codePegs[randomNum]);
    }
    setSecretCodes(newSecretCodes);
  }

  /*
   *
   * This is the action that make the user make a guess when they click in the decoding board
   *
   */
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
        setWinCurrentGame(true);
      }
      //if not then proceed to next attempt
      else {
        setCurrentGuessRow((prevCurrentGuessRow) => prevCurrentGuessRow + 1);
        giveScore(currentGuessRow);
      }
    }
  }

  /*
   *
   * After current row attempt boxes are filled with color pegs
   * If it is not correct this function will gives a score
   *
   */
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
            guessRowScores.push("GY");

            //the index of all all matched code will be added to MATCH CODE INDEX
            //so that the next interation does index will be skip
            MATCH_CODE_SECRET_INDEX.push(secretCodeIndex);
            MATCH_CODE_GUESS_INDEX.push(guessCodeIndex);
          }
        }
      });
    });

    //add empty to guessRowScores for the incorrect guesses
    while (guessRowScores.length < currentDifficulty.boardColSize) {
      guessRowScores.push(EMPTY);
    }

    const newScoreBoard = [...scoreBoard];
    newScoreBoard[guessRowIndex] = guessRowScores;
    setScoreBoard(newScoreBoard);
  }

  /*
   *
   * This check if current guess row of color pegs match with secret code
   *
   */
  //if currentGuetruessRow array is equal to secretCodes array return
  function isWin() {
    const guess = decodingBoard[currentGuessRow];
    for (let i = 0; i < guess.length; i++) {
      if (guess[i] !== secretCodes[i]) {
        return false;
      }
    }

    return true;
  }

  /*
   *
   * show guide menu
   *
   */
  function showGuide() {
    setShowGuideDialog(prevShowGuide => !prevShowGuide);
  }

  /*
   *
   * UI
   *
   */
  function NewGameDialogUI() {
    if (winCurrentGame) {
      return (
        <NewGameDialog
          message="You break the code. Play again?"
          startGame={startGame}
        />
      );
    } else if (currentGuessRow === 10) {
      return (
        <NewGameDialog message="You lose. STUPID!" startGame={startGame} />
      );
    }
    return; //return nothing
  }

  return (
    <div className="flex flex-col min-h-screen ">
      <Header
        currentLevel={currentDifficulty.level}
        setNewLevel={setNewLevel}
        showGuideDialog={showGuide}
      />
      {winCurrentGame && <Confetti />}
      <main className="relative flex flex-col items-center justify-between flex-1 sm:justify-around">
        {showGuideDialog && <GameGuideDialog onClickAction={showGuide} />}
        <div className="flex justify-center w-full gap-4 mt-3 sm:mt-0">
          <SecretCodes
            secretCodes={secretCodes}
            winCurrentGame={winCurrentGame}
            remainingAttempt={10 - currentGuessRow}
            colSize={currentDifficulty.boardColSize}
          />
          <div className="text-2xl font-bold text-center md:text-3xl w-[6vh]">
            <p>{10 - currentGuessRow}</p>
          </div>
        </div>
        <div className="flex items-center justify-center gap-4">
          <DecodingBoard
            decodingBoard={decodingBoard}
            makeGuess={makeGuess}
            currentGuessRow={currentGuessRow}
            colSize={currentDifficulty.boardColSize}
          />
          <ScoreBoard
            scoreBoard={scoreBoard}
            level={currentDifficulty.level}
            colSize={currentDifficulty.boardColSize}
          />
        </div>
        {/*display when game is over*/}
        {NewGameDialogUI()}
        <BottomCodePegs
          selectedColorPeg={selectedCodePeg}
          setSelectedCodePeg={setSelectedCodePeg}
          codePegs={codePegs}
          difficultyCodePegsSize={currentDifficulty.codePegsSize}
        />
      </main>
    </div>
  );
}

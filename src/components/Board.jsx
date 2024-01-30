import CircularCell from "./CircularCell";
import Timestamp from "../utilities/Timestamp";
import { getCodePegColor, getCodePegNumber } from "../utilities/codePegs";
import { getScorePinColor } from "../utilities/scorePin";

export default function Board({
  board,
  setBoard,
  secretCodes,
  selectedCodePeg,
  selectedDifficulty,
  currentAttempt,
  setCurrentAttempt,
  winGame,
  setWinGame,
}) {
  const EMPTY = "";

  function makeGuess(rowIndex, cellIndex, rowAttempt) {
    //prevent making move when current game is already over
    //its purpose is to solve a certain bug
    if (winGame) return;

    /*
     * check if selected cell is within the valid row for currentAttempt
     * if not then prevent move if valid then make the move
     */
    if (rowAttempt !== currentAttempt) return;
    else {
      const newBoard = [...board];
      const selectedCell = newBoard[rowIndex].codeCells[cellIndex];

      //if the clicked cell is empty set its value to current slectedCodePeg
      //if there is already existed codePeg value then just remove it to make it empty
      if (
        selectedCell === EMPTY ||
        (selectedCell !== selectedCodePeg && selectedCell !== EMPTY)
      ) {
        newBoard[rowIndex].codeCells[cellIndex] = selectedCodePeg;
      } else {
        newBoard[rowIndex].codeCells[cellIndex] = EMPTY;
      }
      setBoard(newBoard);
    }

    /*
     * check if guesses are matched with secret code to announce win
     */
    //check if current attempt row cells are already filled
    if (board[rowIndex].codeCells.every((cell) => cell !== EMPTY)) {
      //gives feedback or scores with player current guesses 
      giveScore(rowIndex);

      //verify if guesses matched with secret code
      //end the game if matched
      if (isWin(board, rowIndex)) {
        setWinGame(true);
      }
      //if guesses are wrong then and proceed to next attempt
      else {
        setCurrentAttempt((prevAttempt) => prevAttempt + 1);
      }
    }
  }

  /*
   * check if guesses are correct or matched with secret code
   */
  function isWin(board, rowIndex) {
    const guesses = board[rowIndex].codeCells;
    for (let i = 0; i < guesses.length; i++) {
      if (guesses[i] !== secretCodes[i]) {
        return false;
      }
    }
    return true;
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
    const guessCodes = board[guessRowIndex].codeCells;

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
            guessRowScores.push("CORRECT");

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
            guessRowScores.push("MISPLACED");

            //the index of all all matched code will be added to MATCH CODE INDEX
            //so that the next interation does index will be skip
            MATCH_CODE_SECRET_INDEX.push(secretCodeIndex);
            MATCH_CODE_GUESS_INDEX.push(guessCodeIndex);
          }
        }
      });
    });

    //add empty to guessRowScores for the incorrect guesses
    while (guessRowScores.length < selectedDifficulty.maxCellSize) {
      guessRowScores.push("WRONG");
    } 
    const newBoard = [...board];
    newBoard[guessRowIndex].scoreCells = guessRowScores;
    setBoard(newBoard);
  }


  /*
   *
   * UI
   *
   */
  const BoardUI = () => {
    return board
      .map((row, index) => (
        //each row in the board
        <div
          key={row + index + Timestamp}
          className="flex items-center justify-center gap-1"
        >
          <div className="flex gap-1">{CodeCells(row, index)}</div>

          <div
            className={`${selectedDifficulty.level == "Hard" ? "max-w-[7vh]" : "max-w-[5vh]"} flex gap-0.5 justify-center  flex-wrap ms-3`}
          >
            {ScoreCells(row)}
          </div>
        </div>
      ))
      .reverse();
  };

  //column of cells for code
  const CodeCells = (row, rowIndex) => {
    return row.codeCells.map((cell, cellIndex) => (
      <CircularCell
        className={`${cell === '' && row.attempt === currentAttempt ? "animate-blinking" : ""}
        grid font-bold place-items-center`}
        key={cell + cellIndex + Timestamp}
        size="lg"
        borderWidth="2"
        type="button"
        backgroundColor={getCodePegColor(cell)}
        onClickAction={() => makeGuess(rowIndex, cellIndex, row.attempt)}
      >
        <span className="select-none">{getCodePegNumber(cell)}</span>
      </CircularCell>
    ));
  };

  //column of cells for score
  const ScoreCells = (row) => {
    return row.scoreCells
      .map((cell, index) => (
        <CircularCell 
          key={cell + index + Timestamp} 
          size="sm" 
          backgroundColor={getScorePinColor(cell)}
        />
      ));
  };

  return <div className="space-y-2 h-max w-max">{BoardUI()}</div>;
}

import Board from "./components/Board";
import { getNewBoard } from "./utilities/board";
import SecretCodes from "./components/SecretCodes";
import CodePegOptions from "./components/CodePegOptions";
import Difficulty from "./utilities/Difficulty";
import { useEffect, useState } from "react";
import { getCodePegs } from "./utilities/codePegs";
import Header from "./components/Header";
import AnnouncementModal from "./components/AnnouncementModal";
import Confetti from "react-confetti";

function App() {
  const codePegOptions = getCodePegs();
  const [selectedCodePeg, setSelectedCodePeg] = useState(getCodePegs()[0]);
  const [winGame, setWinGame] = useState(false);
  const [board, setBoard] = useState([]);
  const [secretCodes, setSecretCodes] = useState([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState(Difficulty[0]);
  const [currentAttempt, setCurrentAttempt] = useState(1);
  const remainingAttempt = 11 - currentAttempt;
  const [showGuide, setShowGuide] = useState(false);



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
       
       handleShowGuideModal();
      }
    },[]);

  
  /*
   * 
   * Every first web load start the game
   * IF current difficulty level is change then restart the game
   *  
   */
  useEffect(() => {
    //start game in first reload
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
  }, [selectedDifficulty]);



  function handleShowGuideModal() {
    setShowGuide((prevShowGuide) => !prevShowGuide);
  }


  function startGame() {
    setCurrentAttempt(1);
    setWinGame(false);
    generateSecretCodes(selectedDifficulty.maxCellSize, selectedDifficulty.maxCodePegs);
    setBoard(getNewBoard(selectedDifficulty.maxCellSize));
  }


  /*
   * generated new secret code
   */
    function generateSecretCodes(maxCellSize, maxCodePegs) {
      let newSecretCodes = [];
  
      for (let i = 0; i < maxCellSize; i++) {
        const maxNumberOfColors = maxCodePegs;
        const randomNum = Math.floor(Math.random() * maxNumberOfColors);
  
        newSecretCodes.push(codePegOptions[randomNum]);
      }
      // secretCodes = newSecretCodes;
      setSecretCodes(newSecretCodes);
    }

    
  function setNewLevel(index) {
    const newLevel = Difficulty[index];
    setSelectedDifficulty(newLevel);
  }


  /* 
  * 
  * UI
  *
  */
 const RemainingAttemptCount = () => {
  return(
    <div className={`${selectedDifficulty.level == "Hard" ? "w-[7vh]" : "w-[5vh]"} grid place-items-center text-2xl font-bold text-center ms-3 md:text-3xl`}>
    <p>{remainingAttempt}</p>
  </div>
  );
 }

 const NewGameDialogUI = () => {
  if (winGame) {
    return (
      <>
      <Confetti recycle={false} tweenDuration={60000} numberOfPieces="2500" />
      <AnnouncementModal
        message="You break the code. Play again?"
        startGame={startGame}
      />
      </>
    );
  } else if (remainingAttempt === 0) {
    return (
      <AnnouncementModal message="You lose. STUPID!" startGame={startGame} />
    );
  }
  return; //return nothing
}

  return (
    <div className="flex flex-col min-h-screen">
      {/*display when game is over*/}
      {NewGameDialogUI()}

      <Header 
        setNewLevel={setNewLevel} 
        selectedDifficulty={selectedDifficulty}
        showGuide={showGuide}
        handleShowGuideModal={handleShowGuideModal}
      />  

      <main className="flex flex-col items-center justify-between flex-1 sm:justify-around">
        <div className="flex justify-center w-full gap-1 mt-3 sm:mt-0">
          <SecretCodes
            secretCodes={secretCodes}
            remainingAttempt={remainingAttempt}
            winGame={winGame}
          />
          {RemainingAttemptCount()}
        </div>
 
        <Board 
          board={board}
          setBoard={setBoard}
          secretCodes={secretCodes}
          selectedCodePeg={selectedCodePeg}
          selectedDifficulty={selectedDifficulty} 
          currentAttempt={currentAttempt} 
          setCurrentAttempt={setCurrentAttempt}
          winGame={winGame}
          setWinGame={setWinGame}
        />

        <CodePegOptions
          selectedCodePeg={selectedCodePeg}
          setSelectedCodePeg={setSelectedCodePeg}
          selectedDifficulty={selectedDifficulty}
        />
      </main>
    </div>
  );
}

export default App;

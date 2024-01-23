import { useState } from "react";
import Difficulty from "../utilities/Difficulty";

export default function Header({ currentLevel, setNewLevel, showGuideDialog }) {
  const [showLevelOptions, setShowLevelOptions] = useState(false);
  const COLORS = {
    Easy: "text-green-500",
    moderate: "text-yellow-500",
    Hard: "text-red-500",
  };

  function handleShowLevelOptions() {
    setShowLevelOptions((prevShowLevelOptions) => !prevShowLevelOptions);
  }

  const levelOptionsUI = () => {
    return (
      <div className="fixed inset-0 z-30 grid h-full place-content-center bg-black/40">
        <div className="flex flex-col items-center justify-center w-screen h-screen gap-1 text-xl text-center border-4 border-black sm:w-max sm:h-max sm:rounded-xl sm:p-28 bg-amber-200">
          <h1 className="mb-4 font-bold border-b-2 border-black">
            DIFFICULTY LEVEL
          </h1>
          {Difficulty.map((difficulty, index) => (
            <span
              onClick={() => {
                setNewLevel(index);
                handleShowLevelOptions();
              }}
              key={index}
              className={`${COLORS[difficulty.level]} ${
                currentLevel === difficulty.level && "font-extrabold"
              } cursor-pointer transition-transform active:scale-90`}
            >
              {difficulty.level}
            </span>
          ))}
        </div>
      </div>
    );
  };

  return (
    <header className="relative flex items-center px-5 bg-yellow-200 h-14">
      <div className="flex items-center justify-between w-full sm:m-auto sm:w-4/5 max-w-7xl">
        <p className="text-lg font-bold">MASTERMIND</p>
        <div className="ml-auto">
          <ul className="flex items-center justify-end w-full gap-2 sm:gap-4">
            <li
              onClick={handleShowLevelOptions}
              className={`transition-transform text-sm sm:text-base active:scale-90 cursor-pointer `}
            >
              <span className="hidden sm:inline">Difficulty </span>
              <span className={COLORS[currentLevel]}>{currentLevel}</span>
            </li>
            {showLevelOptions && levelOptionsUI()}
            <div onClick={showGuideDialog}>
              <span className="text-2xl cursor-pointer material-symbols-outlined text-nb-orange">help</span>
            </div>
          </ul>
        </div>
      </div>
    </header>
  );
}

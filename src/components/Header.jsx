import { useState } from "react";
import Difficulty from "./Difficulty";

export default function Header({ currentLevel, setNewLevel }) {
  const [showLevelOptions, setShowLevelOptions] = useState(false);
  const COLORS = {
    Easy: "green-500",
    Intermediate: "yellow-500",
    Hard: "red-500",
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
              className={`text-${COLORS[difficulty.level]} ${
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
      <div className="flex justify-between w-full sm:m-auto sm:w-4/5 max-w-7xl">
        <p className="text-lg font-bold">MASTERMIND</p>
        <div className="ml-auto">
          <ul className="flex justify-end w-full gap-7">
            <li onClick={handleShowLevelOptions} className={`transition-transform border-${COLORS[currentLevel]} cursor-pointer hover:border-b-2 active:scale-90`}>
              <span className="hidden sm:inline">Difficulty{" "}</span>
              <span className={`text-${COLORS[currentLevel]}`}>{currentLevel}</span>
            </li>
            {showLevelOptions && levelOptionsUI()}
          </ul>
        </div>
      </div>
    </header>
  );
}

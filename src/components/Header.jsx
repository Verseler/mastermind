import { useState } from "react";
import Difficulty from "./Difficulty";

export default function Header({ currentLevel, setNewLevel }) {
  const [showLevelOptions, setShowLevelOptions] = useState(false);
  const COLORS = {
    easy: "text-green-500",
    intermediate: "text-yellow-500",
    hard: "text-red-500",
  };

  function handleShowLevelOptions() {
    setShowLevelOptions((prevShowLevelOptions) => !prevShowLevelOptions);
  }

  const levelOptionsUI = () => {
    return (
      <div className="fixed inset-0 z-30 grid h-full place-content-center bg-black/40">
        <div className="flex flex-col gap-1 text-xl text-center border-4 border-black rounded-xl p-28 w-max bg-amber-200">
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
              } cursor-pointer`}
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
        <p className="text-lg font-bold cursor-pointer">MASTERMIND</p>
        <div className="ml-auto">
          <ul className="justify-end hidden w-full gap-7 sm:flex">
            <li className="cursor-pointer">Theme</li>
            <li onClick={handleShowLevelOptions} className="cursor-pointer">
              Difficulty{" "}
              <span className={COLORS[currentLevel]}>{currentLevel}</span>
            </li>
            {showLevelOptions && levelOptionsUI()}
          </ul>
        </div>
        <div>
          <span className="material-symbols-outlined sm:hidden">menu</span>
        </div>
      </div>
    </header>
  );
}

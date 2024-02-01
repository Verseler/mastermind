import { useState } from "react";
import ShowLevelOptionsModal from "./ShowLevelOptionsModal";
import ShowGuideModal from "./ShowGuideModal";
import Button from "./Button";

export default function Header({ selectedDifficulty, showGuide, handleShowGuideModal }) {
  const [showLevelOptions, setShowLevelOptions] = useState(false);
  
  const currentLevel = selectedDifficulty.level;

  function handleShowLevelOptionsModal() {
    setShowLevelOptions((prevShowLevelOptions) => !prevShowLevelOptions);
  }

 

  return (
    <header className="relative flex items-center px-5 bg-yellow-200 h-14">
      <div className="flex items-center justify-between w-full sm:m-auto sm:w-4/5 max-w-7xl">
        <p className="text-lg font-bold">MASTERMIND</p>
        <div className="ml-auto">
          <ul className="flex items-center justify-end w-full gap-2 sm:gap-4">
            <Button
                  className={`transition-transform text-sm sm:text-base`}
              type="ghost"
              onClickAction={handleShowLevelOptionsModal}
            >
              <span className="hidden sm:inline">Difficulty </span>
              <span className={selectedDifficulty.color}>{currentLevel}</span>
            </Button>
            {showLevelOptions && (
              <ShowLevelOptionsModal
                setNewLevel={setNewLevel}
                currentLevel={currentLevel}
                handleShowLevelOptionsModal={handleShowLevelOptionsModal}
              />
            )}
            {showGuide && (
              <ShowGuideModal handleShowGuideModal={handleShowGuideModal} />
            )}
             <Button
              type="ghost"
              onClickAction={handleShowGuideModal}
            >
               <span className="text-2xl cursor-pointer material-symbols-outlined text-nb-orange">
                help
              </span>
            </Button>
          </ul>
        </div>
      </div>
    </header>
  );
}

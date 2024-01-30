import Modal from "./Modal";
import Difficulty from "../utilities/Difficulty";
import Button from "./Button";

export default function showLevelOptionsModal({currentLevel, setNewLevel, handleShowLevelOptionsModal}) {
  return(
    <Modal className="relative flex flex-col items-center justify-center w-screen h-screen gap-1 text-xl text-center border-4 border-black sm:w-max sm:h-max sm:rounded-xl sm:p-28 bg-amber-200">
        <Button 
        className="absolute cursor-pointer top-4 right-10"
        type="ghost" 
        onClickAction={handleShowLevelOptionsModal}
        >
          <span className="fixed material-symbols-outlined">close</span>
        </Button>

          <h1 className="mb-4 font-bold border-b-2 border-black">
            DIFFICULTY LEVEL
          </h1>
          {Difficulty.map((difficulty, index) => (
            <Button 
            className={`${difficulty.color} ${
              currentLevel === difficulty.level && "font-extrabold"
            } cursor-pointer transition-transform active:scale-90`}
            key={index}
            type="ghost" 
            onClickAction={() => {
              setNewLevel(index);
              handleShowLevelOptionsModal();
            }}
            >
              {difficulty.level}
            </Button> 
          ))}
      </Modal>
  );
}
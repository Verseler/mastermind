import Modal from "./Modal";
import Button from "./Button";

export default function AnnouncementModal({
  message,
  startGame,
}) {
  return(
      <Modal className="absolute inset-x-0 flex items-center w-full h-24 gap-3 border-black justify-evenly sm:justify-center border-y-2 bg-amber-300 top-2/3">
        <p className="text-xs font-medium text-center max-w-[50%]">
          {message}
        </p>
        <Button 
        className="text-sm font-bold border-2" 
        type="outline" 
        backgroundColor="bg-nb-green"
        onClickAction={startGame}
        >
          NEW GAME
        </Button>
    </Modal>
  );
}
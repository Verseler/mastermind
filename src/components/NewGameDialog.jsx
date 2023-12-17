import NewGameButton from "./CTAButton";

export default function NewGameDialog({
  winCurrentGame,
  remainingAttempt,
  startGame,
}) {
  return winCurrentGame || remainingAttempt === 0 ? (
    <div className="fixed inset-0 bg-black/40">
      <div className="absolute inset-x-0 flex items-center justify-center w-full h-24 gap-3 border-black border-y-2 bg-amber-300 top-2/3">
        <p className="text-xs font-medium text-center max-w-[50%]">
          {winCurrentGame
            ? "You break the code. Play again?"
            : "You lose. STUPID!"}
        </p>
        <NewGameButton onClickAction={startGame} text={'NEW GAME'} bgColor={'bg-nb-green'} />
      </div>
    </div>
  ) : (
    ""
  );
}

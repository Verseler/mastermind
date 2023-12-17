import Colors from "./Colors";
import ClickableTile from "./ClickableTile";

export default function DecodingBoard({
  decodingBoard,
  makeGuess,
  currentGuessRow,
}) {
  const EMPTY = "empty";

  return (
    <div className="grid grid-cols-4 gap-y-3 gap-x-1 h-[65vh] w-[24vh]">
      {decodingBoard
        .map((guessRow, rowIndex) =>
          guessRow.map((colCode, colIndex) => (
            <ClickableTile
              key={colIndex}
              onClickAction={() => makeGuess(rowIndex, colIndex)}
              conditionStyles={
                decodingBoard[rowIndex][colIndex] === EMPTY &&
                currentGuessRow === rowIndex &&
                "animate-blinking"
              }
              bgColor={Colors[colCode]}
            />
          ))
        )
        .reverse()}
    </div>
  );
}

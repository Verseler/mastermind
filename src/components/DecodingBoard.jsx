import Colors from "../utilities/Colors";
import ClickableTile from "./ClickableTile";

export default function DecodingBoard({
  decodingBoard,
  makeGuess,
  currentGuessRow,
  colSize
}) {
  const EMPTY = "empty";

  return (
    <div className={`grid ${colSize === 4 ? "grid-cols-4" : "grid-cols-5"}   gap-y-3 gap-x-1 h-max w-max`}>
      {decodingBoard
        .map((guessRow, rowIndex) =>
          guessRow.map((colCode, colIndex) => (
            <ClickableTile
              key={colIndex}
              code={colCode}
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

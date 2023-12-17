import Colors from "./Colors";

export default function ScoreBoard({scoreBoard}) {
  return (
    <div className="h-[65vh] w-[5vh] flex flex-col items-center gap-3 justify-evenly">
      {scoreBoard
        .map((scoreRow, rowIndex) => (
          <div
            key={rowIndex}
            className="grid grid-cols-2 gap-1 h-[10vh] w-full p-[20%]"
          >
            {scoreRow.map((score, colIndex) => (
              <div
                key={colIndex}
                className={`${Colors[score]} h-full w-full border-black border rounded-sm`}
              ></div>
            ))}
          </div>
        ))
        .reverse()}
    </div>
  );
}

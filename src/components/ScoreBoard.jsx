import Colors from "./Colors";

export default function ScoreBoard({ scoreBoard, colSize, level }) {
  return (
    <div className="flex flex-col items-center gap-3 justify-evenly">
      {scoreBoard
        .map((scoreRow, rowIndex) => (
          <div
            key={rowIndex}
            className={`grid gap-0.5 sm:gap-1  h-[5.5vh]
            ${colSize === 4 ? "grid-cols-2" : "grid-cols-3"}  
            ${level == "hard" ? `w-[6vh] py-[24%] pe-[14%]` : `w-[6vh] py-[25%] pe-[50%]`}`}
          >
            {scoreRow.map((score, colIndex) => (
              <div
                key={colIndex}
                className={`${Colors[score]} w-full border-black border rounded-sm`}
              ></div>
            ))}
          </div>
        ))
        .reverse()}
    </div>
  );
}

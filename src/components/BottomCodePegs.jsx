import Colors from "./Colors";
import ClickableTile from "./ClickableTile";

export default function BottomCodePegs({
  setSelectedCodePeg,
  codePegs,
  difficultyCodePegsSize,
}) {
  return (
    <div className="grid place-content-center w-full h-[9vh] bg-yellow-200 sm:bg-transparent sm:h-28 sm:items-start">
      <div
        className={`${
          difficultyCodePegsSize === 6 ? "grid-cols-6" : "grid-cols-7"
        } grid justify-center gap-1 min-h-[9vh] min-w-[44vh] rounded-lg sm:border-black sm:border-2 bg-yellow-200 py-3 px-5`}
      >
        {codePegs.slice(0, difficultyCodePegsSize).map((code, index) => (
          <ClickableTile
            key={index}
            onClickAction={() => setSelectedCodePeg(code)}
            conditionStyles={""}
            bgColor={Colors[code]}
          />
        ))}
      </div>
    </div>
  );
}

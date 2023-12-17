import Colors from "./Colors";
import ClickableTile from "./ClickableTile";

export default function BottomCodePegs({setSelectedCodePeg, codePegs}) {

  return (
    <div className="grid items-center justify-center w-full h-[9vh] bg-yellow-200 sm:bg-transparent sm:h-28 sm:items-start">
      <div className="grid justify-center grid-cols-6 gap-1 h-[9vh] w-[44vh] rounded-lg sm:border-black sm:border-2 bg-yellow-200 py-3 px-5">
        {codePegs.slice(0, 6).map((code, index) => (
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

import Colors from "./Colors";
import ClickableTile from "./ClickableTile";

export default function BottomCodePegs({setSelectedCodePeg, codePegs}) {

  return (
    <div className="space-x-1">
      {codePegs.slice(0, 6).map((code, index) => (
        <ClickableTile
          key={index}
          onClickAction={() => setSelectedCodePeg(code)}
          conditionStyles={""}
          bgColor={Colors[code]}
        />
      ))}
    </div>
  );
}

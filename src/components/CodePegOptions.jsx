import CircularCell from "./CircularCell";
import Timestamp from "../utilities/Timestamp";
import { getCodePegs, getCodePegColor, getCodePegNumber } from "../utilities/codePegs";

export default function CodePegOptions({
  selectedCodePeg,
  setSelectedCodePeg,
  selectedDifficulty
}) {

  const codePegOptions = getCodePegs();
  const maxCodePegOption = selectedDifficulty?.maxCodePegs == null ? 6 : selectedDifficulty.maxCodePegs;

  return (
    <div className="grid w-full bg-yellow-200 place-content-center min-h-max sm:bg-transparent sm:items-start">
      <div
        className={`flex justify-center gap-1 min-h-[9vh] rounded-lg bg-yellow-200 py-3 px-5 sm:border-black sm:border-2 `}
      >
        {codePegOptions.slice(0, maxCodePegOption).map((code, index) => (
          <CircularCell
            className="grid font-bold place-items-center"
            key={code + index + Timestamp}
            type="button"
            onClickAction={() => setSelectedCodePeg(code)}
            size="lg"
            borderWidth="2"
            backgroundColor={getCodePegColor(code)}
          >
            <span
              className={`${selectedCodePeg == code ? "text-white" : ""}
              select-none `}
            >
              {getCodePegNumber(code)}
            </span>
          </CircularCell>
        ))}
      </div>
    </div>
  );
}

import CircularCell from "./CircularCell";
import Timestamp from "../utilities/Timestamp";
import { getCodePegColor, getCodePegNumber } from "../utilities/codePegs";
import questionMarkIcon from "../assets/question_mark_icon.svg";

export default function SecretCodes({remainingAttempt, winGame, secretCodes }) {
  /*
   *
   * UI
   *
   */
  const SecretCodesRow = () => {
    return secretCodes.map((code, index) =>
      remainingAttempt === 0 || winGame ? (
        <CircularCell
          className="grid font-bold place-items-center"
          key={code + index + Timestamp}
          size="lg"
          borderWidth="2"
          backgroundColor={getCodePegColor(code)}
        >
          <span className="select-none">{getCodePegNumber(code)}</span>
        </CircularCell>
      ) : (
        <CircularCell
          className="grid place-items-center"
          key={code + index + Timestamp}
          size="lg"
          borderWidth="4"
          borderColor="border-amber-300"
          backgroundColor="bg-amber-50"
        >
          <img src={questionMarkIcon} className="object-contain w-5/6 h-5/6" />
        </CircularCell>
      )
    );
  };

  return (
    <div className={`flex items-center justify-center gap-1`}>
      {SecretCodesRow()}
    </div>
  );
}
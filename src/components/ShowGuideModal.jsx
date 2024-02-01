import Modal from "./Modal";
import Button from "./Button";
import Timestamp from "../utilities/Timestamp";
import CircularCell from "./CircularCell";
import questionMarkIcon from "../assets/question_mark_icon.svg";
import {
  getCodePegs,
  getCodePegColor,
  getCodePegNumber,
} from "../utilities/codePegs";
import { getScorePinColor } from "../utilities/scorePin";

export default function showGuideModal({ handleShowGuideModal }) {
  const secretCodeSample = () => {
    return (
      <div className="flex gap-1 py-2 w-max">
        {[0, 1, 2, 3].map((_, index) => (
          <CircularCell
            className="grid place-items-center"
            key={_ + index + Timestamp}
            size="lg"
            borderWidth="4"
            borderColor="border-amber-300"
            backgroundColor="bg-amber-50"
          >
            <img
              src={questionMarkIcon}
              className="object-contain w-5/6 h-5/6"
            />
          </CircularCell>
        ))}
      </div>
    );
  };

  const codePegOptionsSample = () => {
    const codePegOptions = getCodePegs();

    return (
      <div
        className={`flex justify-center gap-1 min-h-[9vh] w-max my-4 rounded-lg bg-yellow-200 py-3 px-5 sm:border-black sm:border-2 `}
      >
        {codePegOptions.slice(0, 6).map((code, index) => (
          <CircularCell
            className="grid font-bold place-items-center"
            key={code + index + Timestamp}
            type="button"
            size="lg"
            borderWidth="2"
            backgroundColor={getCodePegColor(code)}
          >
            <span className="select-none">{getCodePegNumber(code)}</span>
          </CircularCell>
        ))}
      </div>
    );
  };

  const currentAtemptRowSample = () => {
    return (
      <div className="flex gap-1 m-4 rounded-full w-max outline-4 outline-amber-300 outline">
        {[0, 1, 2, 3].map((cell, cellIndex) => (
          <CircularCell
            className="grid font-bold place-items-center"
            key={cell + cellIndex + Timestamp}
            size="lg"
            borderWidth="2"
            type="button"
            backgroundColor="bg-amber-50"
          >
            <span className="select-none"></span>
          </CircularCell>
        ))}
      </div>
    );
  };

  const currentAtemptRowScoresSample = () => {
    return (
      <div className="grid grid-cols-2 gap-1 m-4 rounded-full w-max">
        {["CORRECT", "MISPLACED", "WRONG", "WRONG"].map((cell, index) => (
          <CircularCell
            key={cell + index + Timestamp}
            size="sm"
            backgroundColor={getScorePinColor(cell)}
          />
        ))}
      </div>
    );
  };

  const remainingAttemptCountSample = () => {
    return (
      <div className="p-2 m-3 text-2xl font-bold bg-white w-max">
        <p>10</p>
      </div>
    );
  };

  return (
    <Modal className="relative w-screen h-screen  overflow-x-scroll text-xl border-4 border-black sm:max-h-[550px] sm:max-w-4xl sm:rounded-xl pl-8 pr-5 py-8 sm:p-10 bg-amber-100">
      <Button
        className="absolute cursor-pointer top-4 right-10"
        type="ghost"
        onClickAction={handleShowGuideModal}
      >
        <span className="fixed material-symbols-outlined">close</span>
      </Button>

      <h1 className="text-base font-bold text-center sm:text-xl">
        Welcome to <span className="block text-xl sm:text-3xl">MASTERMIND</span>
      </h1>
      <h2 className="mt-8 text-base font-bold sm:text-xl">OVERVIEW:</h2>
      <p className="text-base sm:text-xl">
      Your goal is to decipher a secret code made up of colored pegs by
          figuring out the correct combination within a limited number of
          attempts.
      </p>
       
      <h2 className="mt-12 text-base font-bold sm:text-xl">GAMEPLAY:</h2>
      <ol className="space-y-6 text-base list-decimal sm:text-xl">
        <div>
          <li>
            At the top, you can see the{" "}
            <span className="text-nb-red">secret codes</span> or a row of
            circles with a question mark. Each box contains a hidden color that
            you need to guess.
            {secretCodeSample()}
          </li>
        </div>
        <div>
          <li>
            Select a color in the row of{" "}
            <span className="text-nb-blue">color peg options</span> that are
            located at the bottom.
          </li>
          {codePegOptionsSample()}
        </div>
        <div>
          <li>
            After that, on the <span className="text-nb-blue">board</span>, you
            can click on the empty circle to make your guess based on your
            selected code peg option.
            {currentAtemptRowSample()}
          </li>
        </div>
        <div>
          <li>
            After the current row of circles is filled with colors, it will be
            evaluated to check if your set of guesses is correct. If it is not,
            then it will give a feedback or scores that will be displayed on the
            right side which composed of small circles
            <p className="block">
              <span className="font-bold text-black bg-nb-orange">black</span> -
              correct color and position.
            </p>
            <p className="block">
              <span className="font-bold text-gray-500 bg-nb-orange">gray</span>{" "}
              - correct color but not the position.
            </p>
            <p className="block">
              <span className="font-bold text-white bg-nb-orange">white</span> -
              color and position are wrong.
            </p>
            {currentAtemptRowScoresSample()}
          </li>
        </div>
        <div>
          <li>
            You will be given 10 <span className="text-nb-red">attempts</span>{" "}
            to guess the secret codes.
            {remainingAttemptCountSample()}
          </li>
        </div>
        <div>
          <li>
            If you guess the secret code before the remaining attempts run out,
            you win the game.
          </li>
        </div>
      </ol>

      <div className="grid w-full mt-8 place-items-center">
        <Button
          className="text-sm font-bold border-2"
          type="outline"
          backgroundColor="bg-gray-100"
          onClickAction={handleShowGuideModal}
        >
          CLOSE
        </Button>
      </div>
    </Modal>
  );
}

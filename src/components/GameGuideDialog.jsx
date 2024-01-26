import attemptsImg from "../assets/attempts.png";
import codingpegsImg from "../assets/codingpegs.png";
import decodingboardImg from "../assets/decodingboard.png";
import scoreImg from "../assets/score.png";
import secretImg from "../assets/secret.png";
import winImg from "../assets/win.png";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Button from "./CTAButton";

export default function GameGuideDialog({ onClickAction }) {
  return (
    <div className="fixed inset-0 z-30 grid h-full place-content-center bg-black/40">
      <div className=" relative w-screen h-screen overflow-x-scroll text-xl border-4 border-black sm:max-h-[500px] sm:max-w-2xl sm:rounded-xl p-10 bg-amber-200">
        <div onClick={onClickAction} className="absolute cursor-pointer top-6 right-10">
          <span className="fixed material-symbols-outlined">close</span>
        </div>
        <h1 className="mb-8 text-base font-bold text-center sm:text-xl">
          Welcome to{" "}
          <span className="block text-xl sm:text-3xl">MASTERMIND</span>
        </h1>
        <ul className="text-base list-disc text-start sm:text-xl">
          <li>
            Your goal is to decipher a secret code made up of colored pegs by
            figuring out the correct combination within a limited number of
            attempts.
          </li>
        </ul>
        <h2 className="mt-6 text-base font-bold sm:text-xl">GUIDE:</h2>
        <ol className="space-y-4 text-base list-decimal sm:text-xl">
          <div>
            <li>
              At the top, you can see the{" "}
              <span className="text-nb-red">secret codes</span> or a row of
              boxes with a question mark. Each box contains a hidden color that
              you need to guess.
              <LazyLoadImage className="mt-1 border-2 border-black h-30" src={secretImg} alt="boxes with question marks" />
            </li>
          </div>
          <div>
            <li>
              Choose a color in the row of{" "}
              <span className="text-nb-blue">color pegs</span> that are located
              at the bottom.
            </li>
            <LazyLoadImage className="mt-1 border-2 border-black h-30" src={codingpegsImg} alt="a row of boxes with different colors" />
          </div>
          <div>
            <li>
              After that, on the{" "}
              <span className="text-nb-blue">decoding board</span>, you can
              click on the empty box to make your guess.
              <LazyLoadImage className="mt-1 border-2 border-black h-30" src={decodingboardImg} alt="a board of boxes" />
            </li>
          </div>
          <div>
            <li>
              After the row of boxes is filled with colors, it will be evaluated
              to check if your set of guesses is correct. If it is not, then it
              will give a feedback or scores that will be displayed on the
              <span className="text-nb-blue"> scoreboard</span>.
              <LazyLoadImage className="mt-1 border-2 border-black h-30" src={scoreImg} alt="a board of boxes for scores" />
              <p className="block">
                <span className="font-bold text-black">black</span> - correct
                color and position.
              </p>
              <p className="block">
                <span className="font-bold text-gray-400">gray</span> - correct
                color but not the position.
              </p>
              <p className="block">
                <span className="font-bold text-slate-50">white</span> - color
                and position are wrong.
              </p>
            </li>
          </div>
          <div>
            <li>
              You will be given 10 <span className="text-nb-red">attempts</span>{" "}
              to guess the secret codes.
              <LazyLoadImage className="mt-1 border-2 border-black h-30" src={attemptsImg} alt="number nine" />
            </li>
          </div>
          <div>
            <li>
              If you guess the secret code before the remaining attempts run
              out, you win the game.
              <LazyLoadImage className="mt-1 border-2 border-black h-30" src={winImg} alt="winning indicator" />
            </li>
          </div>
        </ol>

        <div className="grid w-full mt-8 place-items-center">
          <Button
            onClickAction={onClickAction}
            text="CLOSE"
            bgColor="bg-gray-200"
          />
        </div>
      </div>
    </div>
  );
}

import { Link } from "react-router-dom";
import NewGameButton from "../components/CTAButton";

export default function TitleScreen() {
  const tempDisabledOptionBtn = () => {
    return (
      <button
      disabled={true}
        className={`px-4 py-3 text-sm font-bold text-gray-700 border-2 border-gray-700 opacity-80 rounded-md bg-slate-200  transition-shadow`}
      >
        OPTION
      </button>
    );
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-6 bg-amber-200">
      <p className="text-3xl font-bold">MASTERMIND</p>
      <div className="flex flex-col gap-2">
        {/* solve State management architecture error... */}
        <Link to="Game">
          <NewGameButton text={"NEW GAME"} bgColor={"bg-nb-green"} />
        </Link>
        {tempDisabledOptionBtn()}
        {/* <NewGameButton text={"OPTION"} bgColor={''} /> */}
      </div>
    </div>
  );
}

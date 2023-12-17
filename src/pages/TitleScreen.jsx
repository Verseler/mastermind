import { Link } from "react-router-dom";
import NewGameButton from "../components/CTAButton";

export default function TitleScreen() {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-6 bg-amber-200">
      <p className="text-3xl font-bold">MASTERMIND</p>
      <div className="flex flex-col gap-2">
        {/* State management architecture error... */}
        <Link to="Game"><NewGameButton text={"NEW GAME"} bgColor={'bg-nb-green'} /></Link>
        <NewGameButton text={"OPTION"} bgColor={'bg-slate-200'} />
      </div>
    </div>
  );
}

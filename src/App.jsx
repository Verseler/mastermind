import Game from "./pages/Game";
import TitleScreen from "./pages/TitleScreen";
import { Routes, Route } from "react-router-dom";

function App() {

  return (
    <>
    <Routes>
      <Route path="/" element={<TitleScreen />} />
      <Route path="Game" element={<Game />} />
    </Routes>
    </>
  );
}

export default App;

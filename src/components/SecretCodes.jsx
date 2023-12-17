import Colors from "./Colors";
import Tile from "./Tile";

export default function SecretCodes({secretCodes, winCurrentGame, remainingAttempt}) {
  const EMPTY = "empty";

  return(
    <div className="grid grid-cols-4 gap-x-1 w-[24vh]">
    {secretCodes.map((colCode, index) =>
      remainingAttempt === 0 || winCurrentGame ? (
        <Tile key={index} bgColor={Colors[colCode]} hasChild={false} />
      ) : (
        <Tile key={index} bgColor={Colors[EMPTY]} hasChild={true} />
      )
    )}
  </div>
  );
}
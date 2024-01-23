import Colors from "../utilities/Colors";
import Tile from "./Tile";

export default function SecretCodes({secretCodes, winCurrentGame, remainingAttempt, colSize}) {
  const EMPTY = "empty";

  return(
    <div className={`grid ${colSize === 4 ? 'grid-cols-4' : 'grid-cols-5'} gap-x-1`}>
    {secretCodes.map((colCode, index) =>
      remainingAttempt === 0 || winCurrentGame ? (
        <Tile key={index} bgColor={Colors[colCode]} code={colCode} hasChild={false} />
      ) : (
        <Tile key={index} bgColor={Colors[EMPTY]} hasChild={true} />
      )
    )}
  </div>
  );
}
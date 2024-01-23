import questionIcon from "../assets/question_mark_icon.svg";
import CodeNumber from "../utilities/CodeNumber";

export default function Tile(props) {
  return (
    <div
      className={`${props.bgColor} ${
        props.hasChild ? "border-amber-300 border-4" : "border-black border-2"
      } grid place-items-center min-w-[2.3rem] min-h-[2.3rem] h-[5.5vh] w-[6vh] rounded-md`}
    >
      {props.hasChild && (
        <img className="object-contain w-full h-full" src={questionIcon} />
      )}
      {props.code && <span className={`${props.selected && 'text-slate-100'} font-medium`}>{CodeNumber[props.code]}</span>}
    </div>
  );
}

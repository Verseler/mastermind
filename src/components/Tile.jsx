import questionIcon from "../assets/question_mark_icon.svg";

export default function Tile(props) {
  return (
    <div
      className={`${props.bgColor} ${
        props.hasChild ? "border-amber-300 border-4" : "border-black border-2"
      }  min-w-[2.3rem] min-h-[2.3rem] rounded-md`}
    >
      {props.hasChild && (
        <img className="object-contain w-full h-full" src={questionIcon} />
      )}
    </div>
  );
}

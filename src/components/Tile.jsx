import questionIcon from "../assets/question_mark_icon.svg";

export default function Tile(props) {
  return (
    <div
      className={`${props.bgColor} ${
        props.hasChild && "bg-secret-code"
      } h-10 w-10 border-sky-500 border-4 rounded-full`}
    >
      {props.hasChild && (
        <img className="object-contain w-full h-full" src={questionIcon} />
      )}
    </div>
  );
}

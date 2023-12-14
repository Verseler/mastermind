export default function ClickableTile(props) {

  return (
    <button
      className={`${props.conditionStyles} ${props.bgColor} w-10 h-10 border-2 border-black rounded-full`}
      onClick={props.onClickAction}
    ></button>
  );
}

export default function ClickableTile(props) {

  return (
    <button
      className={`${props.conditionStyles} ${props.bgColor} h-[5.5vh] w-[6vh] min-w-[2rem] min-h-[2rem] border-2 border-black rounded-md`}
      onClick={props.onClickAction}
    ></button>
  );
}

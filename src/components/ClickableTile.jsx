export default function ClickableTile(props) {

  return (
    <button
      className={`${props.conditionStyles} ${props.bgColor} ${props.selected && 'scale-90'}
      h-[5.5vh] w-[6vh] min-w-[2rem] min-h-[2rem] border-2 border-black rounded-md transition-transform active:scale-90`}
      onClick={props.onClickAction}
    ></button>
  );
}

import CodeNumber from "../utilities/CodeNumber";

export default function ClickableTile(props) {

  return (
    <button
      className={`${props.conditionStyles} ${props.bgColor}
      
      h-[5.5vh] w-[6vh] min-w-[2rem] min-h-[2rem] border-2 border-black rounded-md transition-transform active:scale-90`}
      onClick={props.onClickAction}
    >
     <span className={`${props.selected && 'text-slate-100'} font-medium`}>{CodeNumber[props.code]}</span>
    </button>
  );
}

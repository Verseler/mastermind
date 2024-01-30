export default function CircularCell({children, size, borderWidth, borderColor, type, onClickAction, backgroundColor, className}) {
  const sizeStyle = (size == null || size == "lg") ? "h-[6vh] w-[6vh] min-w-[2rem] min-h-[2rem]" : "h-[2vh] w-[2vh]"; //if sm
  const borderWidthStyle = (borderWidth == null || borderWidth == "1") ? "border" : `border-${borderWidth}`;
  const borderColorStyle = (borderColor == null) ? "border-black" : borderColor;
  const backgroundColorStyle = (backgroundColor == null) ? "bg-white" : backgroundColor;

  return (
    <div
      role={type == "button" ? "button" : ""}
      onClick={type == "button" ? onClickAction : null}
      className={`${sizeStyle} ${borderWidthStyle} ${borderColorStyle} ${backgroundColorStyle} ${className} rounded-full transition-transform active:scale-90`}
    >
      {children}
    </div>
  );
}

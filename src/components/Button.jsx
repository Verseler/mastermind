export default function Button({children, type, paddingY, paddingX, borderRadius, activeAnimation, borderColor, backgroundColor, hoverShadowEffect, onClickAction, className}) {
  const py = (paddingY == null) ? "py-3" : paddingY;
  const px = (paddingX == null) ? "px-4" : paddingX;
  const borderRadiusStyle = (borderRadius == null) ? "rounded-md" : borderRadius;
  const borderColorStyle = (borderColor == null) ? "border-black" : borderColor;
  const bgColorStyle = (backgroundColor == null) ? "bg-white": backgroundColor;
  const activeAnimationStyle = (activeAnimation != null || activeAnimation) ? "transition-transform active:scale-90" : "";
  const hoverShadowEffectStyle = (hoverShadowEffect == null || hoverShadowEffect == true) ? `transition-shadow hover:shadow-[4px_4px_1px_-1px_rgba(0,0,0,1)]` : "";
  let typeStyle = `border-black rounded-md`;

  switch(type) {
    case "ghost":
      typeStyle = `border-none`;
    break;

    case "filled":
      typeStyle = `${borderRadiusStyle} border-none ${bgColorStyle} ${hoverShadowEffectStyle} ${py} ${px}`;
    break;

    case "outline":
    case null:
    default:
      typeStyle = `${borderColorStyle} ${borderRadiusStyle} ${bgColorStyle} ${hoverShadowEffectStyle} ${py} ${px}`;
    break;
  }

  return(
    <button
    className={`cursor-pointer ${activeAnimationStyle} ${typeStyle} ${className}`}
    onClick={onClickAction}
    >
      {children}
    </button>
  );
}
export default function CTAButton({onClickAction, text, bgColor}) {

  return (
    <button
      onClick={onClickAction}
      className={`px-4 py-3 text-sm font-bold border-2 border-black rounded-md ${bgColor} hover:${bgColor}/70 transition-shadow hover:shadow-[4px_4px_1px_-1px_rgba(0,0,0,1)]`}
    >
      {text}
    </button>
  );
}

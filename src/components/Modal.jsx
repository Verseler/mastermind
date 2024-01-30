export default function Modal({children, className}) {

  return(
    <div className="fixed inset-0 z-30 grid h-full place-items-center bg-black/40">
      <div className={className}>
        {children}
      </div>
    </div>
  );
}
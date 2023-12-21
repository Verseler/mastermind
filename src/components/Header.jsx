export default function Header() {
  return (
    <header className="flex items-center px-5 bg-yellow-200 h-14">
      <div className="flex justify-between w-full sm:m-auto sm:w-4/5 max-w-7xl">
        <p className="text-lg font-bold cursor-pointer">MASTERMIND</p>
        <ul className="justify-end hidden w-full gap-7 sm:flex">
          <li className="cursor-pointer">Theme</li>
          <li className="cursor-pointer">
            Difficulty <span className="text-green-500">easy</span>
          </li>
        </ul>
        <div>
          <span class="material-symbols-outlined sm:hidden">menu</span>
        </div>
      </div>
    </header>
  );
}

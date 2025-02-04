import ThemeToggle from './ThemeToggle';

function TopBar() {
  return (
    <div className="navbar bg-base-300 flex">
      <img className="w-7 mr-4 ml-2" src="/favicon-192x192.png" alt="logo" />
      <h1 className="text-xl font-semibold grow">Planner</h1>
      <ThemeToggle lightTheme="light" darkTheme="dark" className="float-right" />
    </div>
  );
}

export default TopBar;

type DashboardHeaderProps = {
  username: string;
  onLogout: () => void;
};

function DashboardHeader({ username, onLogout }: DashboardHeaderProps) {
  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-cyan-400/20">
      <div>
        <p className="text-sm text-cyan-400">Dashboard</p>

        <h1 className="text-2xl font-semibold text-white">
          Welcome back, {username} 👋
        </h1>
      </div>

      <button
        onClick={onLogout}
        className="px-4 py-2 rounded-lg border border-purple-400/40 text-purple-300 hover:bg-purple-400/10 transition duration-300 cursor-pointer"
      >
        Logout
      </button>
    </header>
  );
}

export default DashboardHeader;

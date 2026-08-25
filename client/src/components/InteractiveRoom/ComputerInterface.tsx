import { useEffect, useState } from "react";
import TodoApp from "./TodoApp";
import CodingTraining from "./CodingTraining";
import ShopApp from "./ShopApp";

type ComputerInterfaceProps = {
  username: string;
  isFirstVisit: boolean;
  onExit: () => void;
};

function ComputerInterface({
  username,
  isFirstVisit,
  onExit,
}: ComputerInterfaceProps) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const welcomeMessage = isFirstVisit
    ? `Benvenuto ${username}`
    : `Bentornato ${username}`;

  const time = currentTime.toLocaleTimeString("it-IT", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const date = currentTime.toLocaleDateString("it-IT", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  const [todoOpen, setTodoOpen] = useState(false);
  const [codingOpen, setCodingOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-[#050816] text-white">
      {/* Desktop background */}
      <div
        className="
          absolute
          inset-0
          bg-[radial-gradient(circle_at_50%_40%,rgba(34,211,238,0.08),transparent_45%)]
        "
      />

      {/* Top bar */}
      <header
        className="
          absolute
          top-0
          left-0
          right-0
          z-20
          flex
          items-center
          justify-between
          border-b
          border-white/10
          bg-[#050816]/60
          px-6
          py-5
          backdrop-blur-md
        "
      >
        <div className="flex items-center gap-3">
          <div
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-lg
              border
              border-cyan-400/20
              bg-cyan-400/10
            "
          >
            💻
          </div>

          <div>
            <p className="text-sm font-medium text-gray-200">
              Personal Computer
            </p>

            <p className="text-[11px] text-green-500">Workspace • Online</p>
          </div>
        </div>

        <div className="text-right">
          <p className="text-lg font-medium text-cyan-200">{time}</p>

          <p className="text-[12px] capitalize text-gray-200">{date}</p>
        </div>
      </header>

      {/* Exit computer */}
      <button
        onClick={onExit}
        type="button"
        aria-label="Exit computer"
        className="
    group
    absolute
    right-20
    top-30
    z-30
    flex
    h-10.5
    w-10.5
    items-center
    justify-center
    rounded-lg
    border
    border-red-500/20
    bg-red-500/5
    text-xl
    text-red-400
    transition-colors
    duration-300
    hover:border-red-400/50
    hover:bg-red-500/10
    hover:text-red-300
    hover:shadow-[0_0_18px_rgba(239,68,68,0.25)]
    cursor-pointer
  "
      >
        ⏻
      </button>

      {/* Welcome notification */}
      <div
        className={`
    absolute
    left-1/2
    top-[25%]
    z-30
    -translate-x-1/2
    text-center
    transition-all
    duration-700
    ${
      showWelcome
        ? "scale-100 opacity-100"
        : "pointer-events-none scale-95 opacity-0"
    }
  `}
      >
        <p
          className="
      text-2xl
      font-semibold
      tracking-wide
      text-cyan-200
      drop-shadow-[0_0_15px_rgba(34,211,238,0.35)]
    "
        >
          {welcomeMessage} 👋
        </p>

        <p className="mt-2 text-sm text-gray-450">Il tuo workspace è pronto.</p>
      </div>

      {todoOpen && <TodoApp onClose={() => setTodoOpen(false)} />}
      {codingOpen && <CodingTraining onClose={() => setCodingOpen(false)} />}
      {shopOpen && <ShopApp onClose={() => setShopOpen(false)} />}

      {/* Desktop applications */}
      <main
        className="
          relative
          z-10
          flex
          h-full
          items-center
          justify-center
        "
      >
        <div className="grid grid-cols-3 gap-12">
          {/* To-Do */}
          <button
            type="button"
            onClick={() => setTodoOpen(true)}
            className="
              group
              flex
              w-28
              flex-col
              items-center
              gap-3
              rounded-xl
              p-4
              transition-all
              duration-300
              hover:bg-white/4
              cursor-pointer
            "
          >
            <div
              className="
                flex
                h-16
                w-16
                items-center
                justify-center
                rounded-2xl
                border
                border-cyan-400/20
                bg-cyan-400/10
                text-3xl
                shadow-[0_0_20px_rgba(34,211,238,0.05)]
                transition-all
                duration-300
                group-hover:scale-105
                group-hover:border-cyan-400/50
                group-hover:bg-cyan-400/15
                group-hover:shadow-[0_0_30px_rgba(34,211,238,0.15)]
              "
            >
              📝
            </div>

            <span className="text-xs text-gray-300 transition group-hover:text-cyan-200">
              To-Do List
            </span>
          </button>

          {/* Coding Training */}
          <button
            type="button"
            onClick={() => setCodingOpen(true)}
            className="
              group
              flex
              w-28
              flex-col
              items-center
              gap-3
              rounded-xl
              p-4
              transition-all
              duration-300
              hover:bg-white/4
              cursor-pointer
            "
          >
            <div
              className="
                flex
                h-16
                w-16
                items-center
                justify-center
                rounded-2xl
                border
                border-cyan-400/20
                bg-cyan-400/10
                text-3xl
                shadow-[0_0_20px_rgba(34,211,238,0.05)]
                transition-all
                duration-300
                group-hover:scale-105
                group-hover:border-cyan-400/50
                group-hover:bg-cyan-400/15
                group-hover:shadow-[0_0_30px_rgba(34,211,238,0.15)]
              "
            >
              👨‍💻
            </div>

            <span className="text-xs text-gray-300 transition group-hover:text-cyan-200">
              Coding Training
            </span>
          </button>

          {/* Shop */}
          <button
            type="button"
            onClick={() => setShopOpen(true)}
            className="
    group
    flex
    w-28
    flex-col
    items-center
    gap-3
    rounded-xl
    p-4
    transition-all
    duration-300
    hover:bg-white/4
    cursor-pointer
  "
          >
            <div
              className="
      flex
      h-16
      w-16
      items-center
      justify-center
      rounded-2xl
      border
      border-cyan-400/20
      bg-cyan-400/10
      text-3xl
      shadow-[0_0_20px_rgba(34,211,238,0.05)]
      transition-all
      duration-300
      group-hover:scale-105
      group-hover:border-cyan-400/50
      group-hover:bg-cyan-400/15
      group-hover:shadow-[0_0_30px_rgba(34,211,238,0.15)]
    "
            >
              🛒
            </div>

            <span className="text-xs text-gray-300 transition group-hover:text-cyan-200">
              Shop
            </span>
          </button>

          {/* Progress */}
          <button
            type="button"
            className="
              group
              flex
              w-28
              flex-col
              items-center
              gap-3
              rounded-xl
              p-4
              transition-all
              duration-300
              hover:bg-white/4
              cursor-pointer
            "
          >
            <div
              className="
                flex
                h-16
                w-16
                items-center
                justify-center
                rounded-2xl
                border
                border-cyan-400/20
                bg-cyan-400/10
                text-3xl
                shadow-[0_0_20px_rgba(34,211,238,0.05)]
                transition-all
                duration-300
                group-hover:scale-105
                group-hover:border-cyan-400/50
                group-hover:bg-cyan-400/15
                group-hover:shadow-[0_0_30px_rgba(34,211,238,0.15)]
              "
            >
              📊
            </div>

            <span className="text-xs text-gray-300 transition group-hover:text-cyan-200">
              Your Progress
            </span>
          </button>
        </div>
      </main>

      {/* Bottom taskbar */}
      <footer
        className="
          absolute
          bottom-0
          left-0
          right-0
          z-20
          flex
          items-center
          justify-between
          border-t
          border-white/10
          bg-[#050816]/70
          px-6
          py-3
          backdrop-blur-md
        "
      >
        <div className="flex items-center gap-5">
          <span className="text-lg text-cyan-300">◉</span>

          <span className="text-xs text-gray-200">Ciao {username}!</span>
        </div>

        <div className="flex items-center gap-4 text-xs text-green-500">
          <span>● Online</span>
          <span>🔊</span>
          <span className="text-gray-300">🔋 100%</span>
        </div>
      </footer>
    </div>
  );
}

export default ComputerInterface;

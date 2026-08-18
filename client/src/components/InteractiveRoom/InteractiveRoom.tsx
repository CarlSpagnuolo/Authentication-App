import { useState } from "react";
import ComputerInterface from "./ComputerInterface";

type InteractiveRoomProps = {
  username: string;
};

function InteractiveRoom({ username }: InteractiveRoomProps) {
  const [enteringComputer, setEnteringComputer] = useState(false);

  const [computerOpen, setComputerOpen] = useState(false);

  const [isFirstComputerVisit] = useState(
    localStorage.getItem("computerVisited") !== "true",
  );

  const handleEnterComputer = () => {
    setEnteringComputer(true);

    localStorage.setItem("computerVisited", "true");

    setTimeout(() => {
      setComputerOpen(true);
    }, 1600);
  };

  const handleExitComputer = () => {
    setComputerOpen(false);
    setEnteringComputer(false);
  };

  return (
    <div className="fixed inset-0 w-full h-dvh overflow-hidden bg-[#050816]">
      {/* Room */}
      <div
        className={`
          absolute
          inset-0
          transition-transform
          duration-1600
          ease-in-out
          ${
            enteringComputer
              ? "scale-[2.8] translate-x-[1%] translate-y-[8%]"
              : "scale-100"
          }
        `}
        style={{
          transformOrigin: "56.5% 35%",
        }}
      >
        <img
          src="/room-background.png"
          alt="Personal room"
          className="w-full h-full object-cover object-bottom"
        />
        {/* Hotspot PC */}
        <div
          className="
    absolute
    z-20
    left-[49.6%]
    top-[26.8%]
    w-[14.2%]
    h-[17.1%]
    group
  "
        >
          {/* Glow caldo dell'hotspot */}
          <div
            className={`
    absolute
    inset-[-18%]
    pointer-events-none
    rounded-xl
    opacity-0
    transition-all
    duration-500
    group-hover:opacity-100
    ${enteringComputer ? "opacity-0" : ""}
  `}
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(255,214,102,0.42) 30%, rgba(255,193,7,0.24) 50%, rgba(255,160,50,0.12) 60%, transparent 70%)",
              filter: "blur(35px)",
            }}
          />

          {/* Luce calda sul monitor */}
          <div
            className={`
    absolute
    inset-[5%]
    pointer-events-none
    rounded-lg
    opacity-0
    transition-opacity
    duration-300
    group-hover:opacity-100
    ${enteringComputer ? "opacity-0" : ""}
  `}
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(255,220,120,0.16), transparent 70%)",
              filter: "blur(8px)",
            }}
          />

          {/* Area cliccabile del monitor */}
          <button
            type="button"
            aria-label="Computer"
            onClick={handleEnterComputer}
            className={`
      absolute
      inset-0
      w-full
      h-full
      rounded-sm
      cursor-pointer
      ${enteringComputer ? "pointer-events-none opacity-0" : ""}
    `}
            style={{
              clipPath: "polygon(0.5% 2%, 99.5% 0%, 100% 98%, 0% 92%)",
            }}
          />

          {/* Card Computer */}
          <div
            className={`
              pointer-events-auto
              absolute
              left-[65%]
              bottom-[85%]
              w-56
              rounded-xl
              border
              border-cyan-400/30
              bg-[#07111dcc]
              p-4
              text-white
              backdrop-blur-md
              shadow-[0_0_25px_rgba(34,211,238,0.18)]
              transition-all
              duration-300
              translate-y-2
              ${
                enteringComputer
                  ? "opacity-0 pointer-events-none"
                  : "opacity-0 group-hover:translate-y-0 group-hover:opacity-100"
              }
            `}
          >
            <p className="mb-3 text-sm font-semibold text-cyan-300">
              🖥️ Computer
            </p>

            <div className="space-y-2 text-xs text-gray-200">
              <p>📝 To-Do List</p>
              <p>👨‍💻 Coding Training</p>
              <p>📊 Your Progress</p>
            </div>

            <button
              type="button"
              onClick={handleEnterComputer}
              className="
                mt-4
                cursor-pointer
                text-[11px]
                text-gray-400
                transition-colors
                hover:text-cyan-300
              "
            >
              Click to enter →
            </button>
          </div>
        </div>
      </div>

      {/* Transition overlay */}
      <div
        className={`
          pointer-events-none
          absolute
          inset-0
          z-30
          bg-[#050816]
          transition-opacity
          duration-1800
          ${enteringComputer ? "opacity-100" : "opacity-0"}
        `}
      />

      {/* Computer Interface */}
      {computerOpen && (
        <ComputerInterface
          username={username}
          isFirstVisit={isFirstComputerVisit}
          onExit={handleExitComputer}
        />
      )}
    </div>
  );
}

export default InteractiveRoom;

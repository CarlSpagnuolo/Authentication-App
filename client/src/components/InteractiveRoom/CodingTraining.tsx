import { useState } from "react";

type CodingTrainingProps = {
  onClose: () => void;
};

type ChallengeStatus = "idle" | "success" | "error";

function getUserFunction(code: string) {
  const match = code.match(/function\s+([a-zA-Z_$][\w$]*)\s*\(([^)]*)\)/);

  if (!match) {
    throw new Error("No valid function found.");
  }

  const functionName = match[1];

  const execute = new Function(`
    ${code}

    return ${functionName};
  `);

  return execute();
}

function runTestChallenge1(userFunction: (input: number[]) => number) {
  const tests = [
    {
      input: [3, 8, 2, 10, 5],
      expected: 10,
    },
    {
      input: [1, 2, 3, 4, 5],
      expected: 5,
    },
    {
      input: [-5, -2, -10, -1],
      expected: -1,
    },
    {
      input: [7],
      expected: 7,
    },
  ];

  return tests.every((test) => {
    const result = userFunction(test.input);

    return result === test.expected;
  });
}

function runTestChallenge2(userFunction: (input: number[]) => number[]) {
  const tests = [
    {
      input: [8, 2, 10, 4, 7, 1],
      expected: [7, 8, 10],
    },
    {
      input: [5, 1, 9, 3, 6],
      expected: [5, 6, 9],
    },
    {
      input: [2, 4, 1, 3],
      expected: [],
    },
  ];

  return tests.every((test) => {
    const result = userFunction(test.input);

    return JSON.stringify(result) === JSON.stringify(test.expected);
  });
}

function runTestChallenge3(userFunction: (input: number[]) => number[]) {
  const tests = [
    {
      input: [4, 12, 7, 20, 12, 3, 15],
      expected: [20, 15, 12],
    },
    {
      input: [10, 5, 10, 8, 3, 8],
      expected: [10, 8, 5],
    },
    {
      input: [9, 9, 9, 4],
      expected: [9, 4],
    },
    {
      input: [7, 7],
      expected: [7],
    },
    {
      input: [],
      expected: [],
    },
    {
      input: [1, 50, 3, 50, 25, 7, 100, 25],
      expected: [100, 50, 25],
    },
    {
      input: [-5, -1, -10, -3, -1],
      expected: [-1, -3, -5],
    },
  ];

  return tests.every((test) => {
    const result = userFunction(test.input);

    return JSON.stringify(result) === JSON.stringify(test.expected);
  });
}

function CodingTraining({ onClose }: CodingTrainingProps) {
  const [selectedChallenge, setSelectedChallenge] = useState<number | null>(
    null,
  );

  const [challenge1Completed, setChallenge1Completed] = useState(false);

  const [challenge2Completed, setChallenge2Completed] = useState(false);

  const [code, setCode] = useState("");

  const [challengeStatus, setChallengeStatus] =
    useState<ChallengeStatus>("idle");

  const handleRunChallenge = () => {
    if (code.trim() === "") {
      setChallengeStatus("error");
      return;
    }

    try {
      const userFunction = getUserFunction(code);

      let passed = false;

      if (selectedChallenge === 1) {
        passed = runTestChallenge1(userFunction);
      } else if (selectedChallenge === 2) {
        passed = runTestChallenge2(userFunction);
      } else if (selectedChallenge === 3) {
        passed = runTestChallenge3(userFunction);
      }

      if (!passed) {
        setChallengeStatus("error");
        return;
      }

      setChallengeStatus("success");

      if (selectedChallenge === 1) {
        setChallenge1Completed(true);
      }

      if (selectedChallenge === 2) {
        setChallenge2Completed(true);
      }
    } catch {
      setChallengeStatus("error");
    }
  };

  const resetChallenge = () => {
    setCode("");
    setChallengeStatus("idle");
  };

  const goBackToChallenges = () => {
    setSelectedChallenge(null);
    setCode("");
    setChallengeStatus("idle");
  };

  const renderChallengeResult = (nextChallenge: number | null) => {
    if (challengeStatus === "success") {
      return (
        <div className="flex flex-1 items-center justify-center">
          <div className="text-center">
            <div className="text-4xl text-green-400">✓</div>

            <h2 className="mt-4 text-2xl font-semibold text-white">
              Great job!
            </h2>

            <p className="mt-2 text-sm text-gray-400">
              You've completed this challenge and unlocked the next one.
            </p>

            {nextChallenge !== null ? (
              <button
                type="button"
                onClick={() => {
                  setSelectedChallenge(nextChallenge);
                  setCode("");
                  setChallengeStatus("idle");
                }}
                className="
                  mt-6
                  rounded-lg
                  border
                  border-green-400/20
                  bg-green-400/10
                  px-5
                  py-2
                  text-xs
                  font-medium
                  text-green-300
                  transition-all
                  duration-300
                  hover:border-green-400/50
                  hover:bg-green-400/15
                  hover:shadow-[0_0_20px_rgba(74,222,128,0.12)]
                  cursor-pointer
                "
              >
                Next Challenge →
              </button>
            ) : (
              <button
                type="button"
                onClick={goBackToChallenges}
                className="
                  mt-6
                  rounded-lg
                  border
                  border-green-400/20
                  bg-green-400/10
                  px-5
                  py-2
                  text-xs
                  font-medium
                  text-green-300
                  transition-all
                  duration-300
                  hover:border-green-400/50
                  hover:bg-green-400/15
                  hover:shadow-[0_0_20px_rgba(74,222,128,0.12)]
                  cursor-pointer
                "
              >
                Back to Challenges
              </button>
            )}
          </div>
        </div>
      );
    }

    return (
      <div className="flex flex-1 items-center justify-center">
        <div className="text-center">
          <div className="text-4xl text-red-400">×</div>

          <h2 className="mt-4 text-2xl font-semibold text-white">Not quite!</h2>

          <p className="mt-2 text-sm text-gray-400">
            Your solution doesn't pass all the tests. Keep practicing and try
            again.
          </p>

          <button
            type="button"
            onClick={resetChallenge}
            className="
              mt-6
              rounded-lg
              border
              border-red-400/20
              bg-red-400/10
              px-5
              py-2
              text-xs
              font-medium
              text-red-300
              transition-all
              duration-300
              hover:border-red-400/50
              hover:bg-red-400/15
              hover:shadow-[0_0_20px_rgba(248,113,113,0.12)]
              cursor-pointer
            "
          >
            ↻ Try Again
          </button>
        </div>
      </div>
    );
  };

  const renderChallengeEditor = (
    level: "Beginner" | "Intermediate" | "Hard",
    challengeNumber: string,
    title: string,
    description: string,
    task: string,
    example: string,
    color: "green" | "yellow" | "red",
  ) => {
    const colors = {
      green: {
        text: "text-green-400",
        border: "border-green-400/10",
        bg: "bg-green-400/5",
        focus: "focus:border-green-400/40",
        shadow: "focus:shadow-[0_0_20px_rgba(74,222,128,0.08)]",
        buttonBorder: "border-green-400/20",
        buttonBg: "bg-green-400/10",
        buttonText: "text-green-300",
        hoverBorder: "hover:border-green-400/50",
        hoverBg: "hover:bg-green-400/15",
        hoverShadow: "hover:shadow-[0_0_20px_rgba(74,222,128,0.12)]",
      },

      yellow: {
        text: "text-yellow-400",
        border: "border-yellow-400/10",
        bg: "bg-yellow-400/5",
        focus: "focus:border-yellow-400/40",
        shadow: "focus:shadow-[0_0_20px_rgba(250,204,21,0.08)]",
        buttonBorder: "border-yellow-400/20",
        buttonBg: "bg-yellow-400/10",
        buttonText: "text-yellow-300",
        hoverBorder: "hover:border-yellow-400/50",
        hoverBg: "hover:bg-yellow-400/15",
        hoverShadow: "hover:shadow-[0_0_20px_rgba(250,204,21,0.12)]",
      },

      red: {
        text: "text-red-400",
        border: "border-red-400/10",
        bg: "bg-red-400/5",
        focus: "focus:border-red-400/40",
        shadow: "focus:shadow-[0_0_20px_rgba(248,113,113,0.08)]",
        buttonBorder: "border-red-400/20",
        buttonBg: "bg-red-400/10",
        buttonText: "text-red-300",
        hoverBorder: "hover:border-red-400/50",
        hoverBg: "hover:bg-red-400/15",
        hoverShadow: "hover:shadow-[0_0_20px_rgba(248,113,113,0.12)]",
      },
    };

    const theme = colors[color];

    return (
      <div className="flex flex-1 items-center justify-center">
        <button
          type="button"
          onClick={goBackToChallenges}
          className="
            absolute
            right-6
            top-11.5
            text-xs
            text-gray-400
            transition-colors
            hover:text-cyan-200
            cursor-pointer
          "
        >
          ← Back to challenges
        </button>

        <div className="w-full max-w-3xl">
          {/* Challenge header */}
          <div className="mb-6">
            <div className="flex items-center gap-3">
              <span
                className={`text-xs font-semibold uppercase tracking-wider ${theme.text}`}
              >
                {level}
              </span>

              <span className="text-xs text-gray-600">•</span>

              <span className="text-xs text-gray-500">
                Challenge {challengeNumber}
              </span>
            </div>

            <h2 className="mt-2 text-2xl font-semibold text-white">{title}</h2>

            <p className="mt-2 text-sm text-gray-400">{description}</p>
          </div>

          {/* Task */}
          <div
            className="
              rounded-xl
              border
              border-white/10
              bg-white/2
              p-5
            "
          >
            <p className="text-sm font-medium text-gray-200">Task</p>

            <p className="mt-2 text-sm leading-relaxed text-gray-400">{task}</p>

            <div
              className={`
                mt-4
                rounded-lg
                border
                ${theme.border}
                ${theme.bg}
                p-3
                font-mono
                text-xs
                text-gray-300
              `}
            >
              {example}
            </div>
          </div>

          {/* Code */}
          <div className="mt-5">
            <p className="mb-2 text-xs font-medium text-gray-400">
              Your solution
            </p>

            <textarea
              value={code}
              onChange={(event) => setCode(event.target.value)}
              spellCheck={false}
              placeholder="Write your code here..."
              className={`
                h-32
                w-full
                resize-none
                rounded-xl
                border
                border-white/10
                bg-[#050816]
                p-4
                font-mono
                text-sm
                text-gray-200
                outline-none
                transition
                placeholder:text-gray-600
                ${theme.focus}
                ${theme.shadow}
              `}
            />
          </div>

          {/* Run */}
          <div className="mt-4 flex justify-center">
            <button
              type="button"
              onClick={handleRunChallenge}
              className={`
                rounded-lg
                border
                ${theme.buttonBorder}
                ${theme.buttonBg}
                px-5
                py-2
                text-xs
                font-medium
                ${theme.buttonText}
                transition-all
                duration-300
                ${theme.hoverBorder}
                ${theme.hoverBg}
                ${theme.hoverShadow}
                cursor-pointer
              `}
            >
              Run Challenge →
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      className="
        absolute
        inset-0
        z-40
        flex
        items-center
        justify-center
        bg-[#050816]/45
        backdrop-blur-sm
      "
    >
      <div
        className="
          relative
          flex
          flex-col
          w-180
          h-150
          max-w-[90%]
          rounded-2xl
          border
          border-cyan-400/20
          bg-[#07111d]/95
          p-6
          text-white
          shadow-[0_0_50px_rgba(34,211,238,0.12)]
        "
      >
        {/* Header */}
        {selectedChallenge === null && (
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-cyan-200">
                Coding Training
              </h2>

              <p className="text-xs text-gray-500">
                Complete the challenges in order
              </p>
            </div>

            {/* Close */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close Coding Training"
              className="
                flex
                h-8
                w-8
                items-center
                justify-center
                rounded-lg
                border
                border-red-500/20
                bg-red-500/5
                text-sm
                text-red-400
                transition-colors
                duration-300
                hover:border-red-400/50
                hover:bg-red-500/10
                hover:text-red-300
                hover:shadow-[0_0_15px_rgba(239,68,68,0.2)]
                cursor-pointer
              "
            >
              ✕
            </button>
          </div>
        )}

        {/* Challenges */}
        {selectedChallenge === null ? (
          <div className="flex flex-1 items-center justify-center">
            <div className="grid grid-cols-3 gap-5">
              {/* Beginner */}
              <button
                type="button"
                onClick={() => {
                  setSelectedChallenge(1);
                  resetChallenge();
                }}
                className="
                  group
                  rounded-xl
                  border
                  border-green-400/20
                  bg-green-400/5
                  p-5
                  text-left
                  transition-all
                  duration-300
                  hover:border-green-400/50
                  hover:bg-green-400/10
                  hover:shadow-[0_0_25px_rgba(74,222,128,0.12)]
                  cursor-pointer
                "
              >
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-green-400">
                    Beginner
                  </span>

                  <span className="text-lg">🔓</span>
                </div>

                <h3 className="text-base font-semibold text-white">
                  Find the Maximum
                </h3>

                <p className="mt-2 text-xs leading-relaxed text-gray-400">
                  Find the largest number inside an array.
                </p>
              </button>

              {/* Intermediate */}
              <button
                type="button"
                disabled={!challenge1Completed}
                onClick={() => {
                  setSelectedChallenge(2);
                  resetChallenge();
                }}
                className={`
                  rounded-xl
                  border
                  p-5
                  text-left
                  transition-all
                  duration-300
                  ${
                    challenge1Completed
                      ? "border-yellow-400/20 bg-yellow-400/5 hover:border-yellow-400/50 hover:bg-yellow-400/10 hover:shadow-[0_0_25px_rgba(250,204,21,0.12)] cursor-pointer"
                      : "border-yellow-400/10 bg-yellow-400/5 opacity-50 cursor-not-allowed"
                  }
                `}
              >
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-yellow-400">
                    Intermediate
                  </span>

                  <span className="text-lg">
                    {challenge1Completed ? "🔓" : "🔒"}
                  </span>
                </div>

                <h3 className="text-base font-semibold text-white">
                  Filter and Sort
                </h3>

                <p className="mt-2 text-xs leading-relaxed text-gray-400">
                  Filter and sort values from an array.
                </p>
              </button>

              {/* Hard */}
              <button
                type="button"
                disabled={!challenge2Completed}
                onClick={() => {
                  setSelectedChallenge(3);
                  resetChallenge();
                }}
                className={`
                  rounded-xl
                  border
                  p-5
                  text-left
                  transition-all
                  duration-300
                  ${
                    challenge2Completed
                      ? "border-red-400/20 bg-red-400/5 hover:border-red-400/50 hover:bg-red-400/10 hover:shadow-[0_0_25px_rgba(248,113,113,0.12)] cursor-pointer"
                      : "border-red-400/10 bg-red-400/5 opacity-50 cursor-not-allowed"
                  }
                `}
              >
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-red-400">
                    Hard
                  </span>

                  <span className="text-lg">
                    {challenge2Completed ? "🔓" : "🔒"}
                  </span>
                </div>

                <h3 className="text-base font-semibold text-white">
                  Find the Top Values
                </h3>

                <p className="mt-2 text-xs leading-relaxed text-gray-400">
                  Combine filtering, sorting and selection.
                </p>
              </button>
            </div>
          </div>
        ) : selectedChallenge === 1 ? (
          challengeStatus !== "idle" ? (
            renderChallengeResult(2)
          ) : (
            renderChallengeEditor(
              "Beginner",
              "01",
              "Find the Maximum",
              "Find the largest number inside an array.",
              "Write a function that receives an array of numbers and returns the largest number contained in the array.",
              "Example: [3, 8, 2, 10, 5] → 10",
              "green",
            )
          )
        ) : selectedChallenge === 2 ? (
          challengeStatus !== "idle" ? (
            renderChallengeResult(3)
          ) : (
            renderChallengeEditor(
              "Intermediate",
              "02",
              "Filter and Sort",
              "Filter and sort values from an array.",
              "Write a function that receives an array of numbers, removes the values smaller than 5, and returns the remaining values sorted in ascending order.",
              "Example: [8, 2, 10, 4, 7, 1] → [7, 8, 10]",
              "yellow",
            )
          )
        ) : challengeStatus !== "idle" ? (
          renderChallengeResult(null)
        ) : (
          renderChallengeEditor(
            "Hard",
            "03",
            "Find the Top Values",
            "Find the three largest unique values in an array.",
            "Write a function that receives an array of numbers and returns the three largest unique values, sorted in descending order. If the array contains fewer than three unique values, return all available unique values.",
            "Example: [4, 12, 7, 20, 12, 3, 15] → [20, 15, 12]",
            "red",
          )
        )}
      </div>
    </div>
  );
}

export default CodingTraining;

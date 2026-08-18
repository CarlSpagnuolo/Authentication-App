import { useState } from "react";

type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

type TodoAppProps = {
  onClose: () => void;
};

function TodoApp({ onClose }: TodoAppProps) {
  const [todos, setTodos] = useState<Todo[]>([
    {
      id: 1,
      text: "Complete portfolio project",
      completed: false,
    },
    {
      id: 2,
      text: "Practice React",
      completed: false,
    },
    {
      id: 3,
      text: "Study TypeScript",
      completed: true,
    },
  ]);

  const [newTodo, setNewTodo] = useState("");

  const [editingTodoId, setEditingTodoId] = useState<number | null>(null);
  const [editingText, setEditingText] = useState("");

  function toggleTodo(id: number) {
    setTodos((currentTodos) =>
      currentTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  }

  function addTodo() {
    const text = newTodo.trim();

    if (!text) return;

    setTodos((currentTodos) => [
      ...currentTodos,
      {
        id: Date.now(),
        text,
        completed: false,
      },
    ]);

    setNewTodo("");
  }

  function deleteTodo(id: number) {
    setTodos((currentTodos) => currentTodos.filter((todo) => todo.id !== id));
  }

  function startEditing(todo: Todo) {
    setEditingTodoId(todo.id);
    setEditingText(todo.text);
  }

  function editTodo(id: number) {
    const text = editingText.trim();

    if (!text) return;

    setTodos((currentTodos) =>
      currentTodos.map((todo) => (todo.id === id ? { ...todo, text } : todo)),
    );

    setEditingTodoId(null);
    setEditingText("");
  }

  function cancelEditing() {
    setEditingTodoId(null);
    setEditingText("");
  }

  const completedTodos = todos.filter((todo) => todo.completed).length;

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
          w-180
          h-150
          relative
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
        <button
          type="button"
          onClick={onClose}
          aria-label="Close To-Do List"
          className="
            absolute
            right-4
            top-4
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
        {/* Header */}
        <div className="mb-5">
          <p className="text-xs uppercase tracking-[0.2em] text-cyan-400/70">
            Workspace
          </p>

          <h2 className="mt-1 text-xl font-semibold text-cyan-200">
            📝 To-Do List
          </h2>
        </div>

        {/* Add task */}
        <div className="mb-5 flex gap-2">
          <input
            type="text"
            value={newTodo}
            onChange={(event) => setNewTodo(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                addTodo();
              }
            }}
            placeholder="Add a new task..."
            className="
              min-w-0
              flex-1
              rounded-lg
              border
              border-cyan-400/20
              bg-black/20
              px-3
              py-2
              text-sm
              text-gray-200
              outline-none
              placeholder:text-gray-500
              focus:border-cyan-400/50
            "
          />

          <button
            type="button"
            onClick={addTodo}
            className="
              rounded-lg
              bg-cyan-500/10
              px-4
              text-sm
              text-cyan-300
              transition-colors
              hover:bg-cyan-500/20
              hover:text-cyan-200
              cursor-pointer
            "
          >
            Add
          </button>
        </div>

        {/* Todo list */}
        <div className="space-y-2">
          {todos.map((todo) => (
            <div
              key={todo.id}
              className="
                flex
                items-center
                gap-3
                rounded-lg
                border
                border-white/5
                bg-white/2
                px-3
                py-3
              "
            >
              {/* Checkbox */}
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
                className="accent-cyan-400"
              />

              {/* Todo text / Edit input */}
              {editingTodoId === todo.id ? (
                <input
                  type="text"
                  value={editingText}
                  onChange={(event) => setEditingText(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      editTodo(todo.id);
                    }

                    if (event.key === "Escape") {
                      cancelEditing();
                    }
                  }}
                  autoFocus
                  className="
                    min-w-0
                    flex-1
                    rounded-md
                    border
                    border-cyan-400/30
                    bg-black/20
                    px-2
                    py-1
                    text-sm
                    text-gray-200
                    outline-none
                    focus:border-cyan-400/60
                  "
                />
              ) : (
                <span
                  className={`
                    flex-1
                    text-sm
                    ${
                      todo.completed
                        ? "text-gray-500 line-through"
                        : "text-gray-200"
                    }
                  `}
                >
                  {todo.text}
                </span>
              )}

              {/* Actions */}
              {editingTodoId === todo.id ? (
                <>
                  <button
                    type="button"
                    onClick={() => editTodo(todo.id)}
                    className="
                      text-sm
                      text-emerald-400/70
                      transition-colors
                      hover:text-emerald-300
                      cursor-pointer
                    "
                    aria-label="Save task"
                  >
                    ✓
                  </button>

                  <button
                    type="button"
                    onClick={cancelEditing}
                    className="
                      text-sm
                      text-gray-500
                      transition-colors
                      hover:text-gray-300
                      cursor-pointer
                    "
                    aria-label="Cancel editing"
                  >
                    ✕
                  </button>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => startEditing(todo)}
                    className="
                      text-sm
                      text-cyan-400/50
                      transition-colors
                      hover:text-cyan-300
                      cursor-pointer
                    "
                    aria-label="Edit task"
                  >
                    ✏️
                  </button>

                  <button
                    type="button"
                    onClick={() => deleteTodo(todo.id)}
                    className="
                      text-sm
                      text-red-400/60
                      transition-colors
                      hover:text-red-300
                      cursor-pointer
                    "
                    aria-label="Delete task"
                  >
                    ✕
                  </button>
                </>
              )}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-5 text-xs text-gray-500">
          {completedTodos} of {todos.length} tasks completed
        </div>
      </div>
    </div>
  );
}

export default TodoApp;

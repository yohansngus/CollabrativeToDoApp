"use client";
import Image from "next/image";
import React from "react";

type Task = {
  id: number;
  title: string;
  createdAt: number;
  completed: boolean;
  completedAt: number | null;
  owner: { name: string; avatar: string };
  avatar: string;
};

export default function Home() {
  const [task, setTask] = React.useState("");
  const [tasksList, setTasksList] = React.useState<Task[]>([]);
  const [now, setNow] = React.useState(Date.now());
  const [filter, setFilter] = React.useState("all");
  const [editTaskId, setEditTaskId] = React.useState(null);
  const [editText, setEditText] = React.useState("");
  const users = [
    { name: "You", avatar: "🙂" },
    { name: "Guest", avatar: "👤" },
    { name: "Work", avatar: "💼" },
  ];

  const [currentUser, setCurrentUser] = React.useState(users[0]);
  // task item class based on completion status
  const tasks = (completed: boolean | undefined) =>
    `text-xl pl-2.5 border-l-4 ${
      completed
        ? "border-green-500 line-through opacity-60"
        : "border-orange-500"
    }`;
  const formatTime = (ms: number) => {
    const sec = Math.floor(ms / 1000);
    const min = Math.floor(sec / 60);
    const hrs = Math.floor(min / 60);

    if (hrs > 0) return `${hrs}h ${min % 60}m`;
    if (min > 0) return `${min}m ${sec % 60}s`;
    return `${sec}s`;
  };
  const showResult = () => {
    if (!task.trim()) return;

    const newTask = {
      id: Date.now(),
      title: task,
      createdAt: Date.now(),
      completed: false,
      completedAt: null,
      owner: currentUser,
      avatar: currentUser.avatar,
    };

    setTasksList((prev) => [...prev, newTask]);

    (document.getElementById("my_modal_3") as HTMLDialogElement)?.close();
    setTask("");
  };

  // Delete task by id

  const deleteTask = (id: number) => {
    setTasksList((prev) => prev.filter((t) => t.id !== id));
  };
  // Toggle task completion by id
  const toggleComplete = (id: number) => {
    setTasksList((prev) =>
      prev.map((t) => {
        if (t.id !== id) return t;

        const isCompleting = !t.completed;

        return {
          ...t,
          completed: isCompleting,
          completedAt: isCompleting ? Date.now() : null,
        };
      }),
    );
  };
  // Edit task title by id
  const openEditModal = (task: any) => {
    setEditTaskId(task.id);
    setEditText(task.title);
    const modal = document.getElementById(
      "edit_modal",
    ) as HTMLDialogElement | null;
    modal?.showModal();
  };

  const saveEditTask = () => {
    if (!editText.trim()) return;

    setTasksList((prev) =>
      prev.map((t) => (t.id === editTaskId ? { ...t, title: editText } : t)),
    );

    (
      document.getElementById("edit_modal") as HTMLDialogElement | null
    )?.close();
    setEditTaskId(null);
    setEditText("");
  };
  // Filter tasks based on current filter state
  const filteredTasks = tasksList.filter((t) => {
    if (filter === "active") return !t.completed;
    if (filter === "done") return t.completed;
    return true;
  });
  // time tracking with live update every second
  React.useEffect(() => {
    const interval = setInterval(() => {
      setNow(Date.now());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // 1. Load tasks from localStorage when app starts
  React.useEffect(() => {
    const saved = localStorage.getItem("tasks");
    if (saved) {
      setTasksList(JSON.parse(saved));
    }
  }, []);

  // 2. Save tasks whenever they change
  React.useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasksList));
  }, [tasksList]);

  return (
    <div className="bg-gray-300 text-black align-middle h-screen w-screen">
      <h1 className="bg-white p-2 w-1/3 rounded-lg text-4xl font-bold text-base-content mb-4 ml-20 mt-10 text-black shadow-lg [text-shadow:1px_1px_2px_rgba(0,0,0,0.2)]">
        My Todo App
      </h1>
      <div className="flex gap-2 mb-4 ml-20">
        {users.map((u) => (
          <button
            key={u.name}
            className={`btn btn-sm flex items-center gap-2 ${
              currentUser.name === u.name ? "btn-primary" : ""
            }`}
            onClick={() => setCurrentUser(u)}
          >
            <span>{u.avatar}</span>
            {u.name}
          </button>
        ))}
      </div>
      {/* You can open the modal using document.getElementById('ID').showModal() method */}
      <button
        className="btn btn-primary mx-auto w-1/4 mb-4 align-meddled flex rounded-lg shadow-lg"
        onClick={() => document.getElementById("my_modal_3").showModal()}
      >
        Add Task
      </button>
      <dialog id="edit_modal" className="modal">
        <div className="modal-box bg-gray-800 text-white rounded-2xl shadow-2xl p-6">
          <h3 className="text-xl font-bold mb-4">Edit Task</h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              saveEditTask();
            }}
          >
            <input
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              className="input input-bordered w-full mb-4"
              placeholder="Update your task..."
              autoFocus
            />

            <div className="flex justify-end gap-2">
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => document.getElementById("edit_modal").close()}
              >
                Cancel
              </button>

              <button type="submit" className="btn btn-primary">
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </dialog>
      <dialog id="my_modal_3" className="modal text-white">
        <div className="modal-box py-10 bg-gray-800 text-white rounded-2xl shadow-2xl">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              showResult();
            }}
          >
            <button
              type="button"
              className="btn btn-sm absolute right-2 top-2"
              onClick={() => document.getElementById("my_modal_3").close()}
            >
              ✕
            </button>

            <input
              value={task}
              onChange={(e) => setTask(e.target.value)}
              className="input input-bordered flex align-middle mx-auto text-lg"
              type="text"
              placeholder="Add your task..."
              autoFocus
            />

            <button
              type="submit"
              className="btn btn-sm btn-primary absolute right-3 bottom-3"
            >
              Save
            </button>
          </form>
        </div>
      </dialog>
      <div className="overflow-x-auto">
        <div className="flex gap-2 mb-4 ml-20">
          <button className="btn btn-sm" onClick={() => setFilter("all")}>
            All
          </button>
          <button className="btn btn-sm" onClick={() => setFilter("active")}>
            Active
          </button>
          <button className="btn btn-sm" onClick={() => setFilter("done")}>
            Completed
          </button>
        </div>
        <table className="table">
          {/* head */}
          <thead>
            <tr className="text-black">
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <th>Task</th>
              <th>Owner</th>
              <th>Time tracking</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredTasks.map((t) => (
              <tr key={t.id}>
                <th>
                  <label>
                    <input type="checkbox" className="checkbox" />
                  </label>
                </th>

                <td className={tasks(t.completed)}>{t.title}</td>

                <td>
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{t.avatar}</span>
                    <div>
                      <div className="font-bold">{t.owner.name}</div>
                      <div className="text-sm opacity-50">Local</div>
                    </div>
                  </div>
                </td>

                {/* ⏱️ LIVE TIME TRACKING */}
                <td>
                  {formatTime(
                    (t.completed ? t.completedAt : now) - t.createdAt,
                  )}
                </td>

                <th className="flex gap-2">
                  <button
                    onClick={() => toggleComplete(t.id)}
                    className={`btn btn-xs ${
                      t.completed ? "bg-green-500" : "bg-orange-500"
                    }`}
                  >
                    {t.completed ? "Done" : "Working"}
                  </button>

                  <button
                    onClick={() => openEditModal(t)}
                    className="btn btn-xs btn-info"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteTask(t.id)}
                    className="btn btn-xs btn-error"
                  >
                    Delete
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

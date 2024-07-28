import React, { useState } from "react";

type Task = {
  id: number;
  name: string;
  completed: boolean;
};

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<string>("");

  const logMessage = async (message: string) => {
    try {
      const response = await fetch("/api/log", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });
      if (!response.ok) {
        console.error("Failed to log message:", await response.text());
      }
    } catch (error) {
      console.error("Error logging message:", error);
    }
  };

  const addTask = () => {
    if (newTask.trim() !== "") {
      const task: Task = { id: Date.now(), name: newTask, completed: false };
      setTasks([...tasks, task]);
      setNewTask("");
      logMessage(`Task added: ${task.name}`);
    }
  };

  const toggleTask = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
    const toggledTask = tasks.find((task) => task.id === id);
    if (toggledTask) {
      logMessage(`Task toggled: ${toggledTask.name}`);
    }
  };

  const removeTask = (id: number) => {
    const removedTask = tasks.find((task) => task.id === id);
    setTasks(tasks.filter((task) => task.id !== id));
    if (removedTask) {
      logMessage(`Task removed: ${removedTask.name}`);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Task Manager</h1>
      <div className="flex mb-4">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add new task"
          className="flex-grow p-2 border rounded-l-lg"
        />
        <button
          onClick={addTask}
          className="bg-blue-500 text-white p-2 rounded-r-lg"
        >
          Add
        </button>
      </div>
      <ul>
        {tasks.map((task) => (
          <li
            key={task.id}
            className={`flex justify-between items-center p-2 ${
              task.completed ? "line-through text-gray-500" : ""
            }`}
          >
            <span
              onClick={() => toggleTask(task.id)}
              className="cursor-pointer"
            >
              {task.name}
            </span>
            <button
              onClick={() => removeTask(task.id)}
              className="text-red-500"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;

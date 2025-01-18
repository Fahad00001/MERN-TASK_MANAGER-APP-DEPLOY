import React, { useEffect, useState } from "react";
import {
  FaCheck,
  FaPencilAlt,
  FaPlus,
  FaSearch,
  FaTrash,
} from "react-icons/fa";
import { ToastContainer } from "react-toastify";
import { CreateTask, DeleteTaskByid, GetAllTask, updateTaskByid } from "./api";
import { notify } from "./utils";

function Taskmanager() {
  const [input, setInput] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [task, setTask] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [updatetask, setUpdateTask] = useState(null);

  const handleTask = async () => {
    if (updatetask && input) {
      const obj = {
        taskName: input,
        isDone: updatetask.isDone,
      };
      await handleUpdateItem(updatetask._id, obj); // Call update function
      setUpdateTask(null); // Reset update state
    } else if (!updatetask && input) {
      await handleAddTask(); // Call add function
    }
    setInput(""); // Clear input field
  };

  const fetchAllTasks = async () => {
    try {
      const { data } = await GetAllTask();
      setTask(data);
      setFilteredTasks(data); // Initialize filtered tasks with all tasks
    } catch (err) {
      console.error(err);
      notify("Failed to fetch tasks", "error");
    }
  };

  const handleAddTask = async () => {
    const obj = {
      taskName: input,
      isDone: false,
    };
    try {
      const { success, message } = await CreateTask(obj);
      if (success) {
        notify(message, "success");
        fetchAllTasks(); // Refresh task list
      } else {
        notify(message, "error");
      }
    } catch (err) {
      console.error(err);
      notify("Failed to create task", "error");
    }
  };

  const handleUpdateItem = async (id, obj) => {
    try {
      const { success, message } = await updateTaskByid(id, obj);
      if (success) {
        notify(message, "success");
        fetchAllTasks(); // Refresh task list
      } else {
        notify(message, "error");
      }
    } catch (err) {
      console.error(err);
      notify("Failed to update task", "error");
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      const { success, message } = await DeleteTaskByid(id);
      if (success) {
        notify(message, "success");
        fetchAllTasks(); // Refresh task list
      } else {
        notify(message, "error");
      }
    } catch (err) {
      console.error(err);
      notify("Failed to delete task", "error");
    }
  };

  const handleCheckAndUnchecked = async (item) => {
    const obj = {
      taskName: item.taskName,
      isDone: !item.isDone,
    };
    try {
      const { success, message } = await updateTaskByid(item._id, obj);
      if (success) {
        notify(message, "success");
        fetchAllTasks(); // Refresh task list
      } else {
        notify(message, "error");
      }
    } catch (err) {
      console.error(err);
      notify("Failed to update task status", "error");
    }
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchInput(query);
    const filtered = task.filter((item) =>
      item.taskName.toLowerCase().includes(query)
    );
    setFilteredTasks(filtered);
  };

  // Handle Enter key press
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleTask();
    }
  };

  useEffect(() => {
    if (updatetask) {
      setInput(updatetask.taskName); // Set input to the task name
    }
  }, [updatetask]);

  useEffect(() => {
    fetchAllTasks();
  }, []);

  return (
    <div className="d-flex flex-column align-items-center w-50 m-auto mt-5">
      <h1 className="mb-4">Task Manager App</h1>
      {/* Input and button */}
      <div className="d-flex justify-content-between align-items-center mb-4 w-100">
        <div className="input-group flex-grow-1 me-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown} // Bind the key press event
            type="text"
            className="form-control me-1"
            placeholder="Add or Update a task"
          />
          <button className="btn btn-success btn-sm me-2" onClick={handleTask}>
            <FaPlus className="m-2" />
          </button>
        </div>
        <div className="input-group flex-grow-1">
          <span className="input-group-text">
            <FaSearch />
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="Search tasks"
            value={searchInput}
            onChange={handleSearch}
          />
        </div>
      </div>

      {/* List of tasks */}
      <div className="d-flex flex-column w-100">
        {filteredTasks.map((item) => (
          <div
            key={item._id} // Use unique ID as key
            className="m-2 p-2 border bg-light w-100 rounded-3 d-flex justify-content-between align-items-center"
          >
            <span className={item.isDone ? "text-decoration-line-through" : ""}>
              {item.taskName}
            </span>
            <div>
              <button
                onClick={() => handleCheckAndUnchecked(item)}
                type="button"
                className="btn btn-success btn-sm me-2"
              >
                <FaCheck />
              </button>
              <button
                onClick={() => setUpdateTask(item)}
                type="button"
                className="btn btn-primary btn-sm me-2"
              >
                <FaPencilAlt />
              </button>
              <button
                onClick={() => handleDeleteTask(item._id)}
                type="button"
                className="btn btn-danger btn-sm me-2"
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Toastify */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
      />
    </div>
  );
}

export default Taskmanager;

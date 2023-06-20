import React, { useState, useEffect } from "react";
import { ReactComponent as Close } from "../../assets/icons/close.svg";
import "./AddEditTaskForm.css";
import Modal from "../Modal/Modal";
import { addTask } from "../../API/api";

function AddEditTaskForm({ setOpenModal }) {
  const [inputValue, setInputValue] = useState("");
  const [priority, setPriority] = useState("low");
  const [task, setTask] = useState({});
  const isDisabled = inputValue === "";

  const handleChange = (e) => {
    e.preventDefault();
    setInputValue(e.target.value);
    setTask({ ...task, title: e.target.value, priority });
  };

  const handleAdd = () => {
    const newTask = {
      title: inputValue,
      priority: priority,
      status: "To Do",
      progress: 0,
    };
    console.log(newTask);
    setTask(newTask);
    addTask(newTask);
    setOpenModal(false);
  };

  return (
    <Modal>
      <div className="task-form-container">
        <div className="task-form-header">
          <h4>Add Task</h4>
          <Close
            onClick={() => {
              setOpenModal(false);
            }}
          />
        </div>
        <div className="task-form-input">
          <label>Task</label>
          <input
            type="text"
            placeholder="Type your task here..."
            name="task"
            onChange={handleChange}
          />
        </div>
        <div className="task-form-priority">
          <span>Priority</span>
          <div className="priority-buttons">
            <button
              className={`${priority === "high" ? priority : ""}-selected high`}
              onClick={() => setPriority("high")}
            >
              High
            </button>
            <button
              className={`${
                priority === "medium" ? priority : ""
              }-selected medium`}
              onClick={() => setPriority("medium")}
            >
              Medium
            </button>
            <button
              className={`${priority === "low" ? priority : ""}-selected low`}
              onClick={() => setPriority("low")}
            >
              Low
            </button>
          </div>
        </div>
        <div className="addButton-container">
          <button
            className={`task-form-add ${isDisabled ? "disabled" : ""}`}
            disabled={isDisabled}
            onClick={handleAdd}
          >
            Add
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default AddEditTaskForm;

import React, { useState, useEffect } from "react";
import { ReactComponent as Close } from "../../assets/icons/close.svg";
import "./AddEditTaskForm.css";
import Modal from "../Modal/Modal";
import { addTask, updateTask } from "../../API/api";

function AddEditTaskForm({ setOpenModal, isEditing, setIsEditing, setTasks }) {
  const [inputValue, setInputValue] = useState(
    isEditing.editing ? isEditing.task.title : ""
  );
  const [priority, setPriority] = useState("low");
  const [task, setTask] = useState({});
  const isDisabled = inputValue === "";

  useEffect(() => {
    if (isEditing.editing) {
      setPriority(isEditing.task.priority);
    }
  }, [isEditing]);

  const handleChange = (e) => {
    e.preventDefault();
    setInputValue(e.target.value);
    setTask({ ...task, title: e.target.value, priority });
  };

  const handleAdd = async () => {
    if (isEditing.editing) {
      const updatedTask = {
        title: inputValue,
        priority: priority,
      };
      const response = await updateTask(isEditing.task._id, updatedTask);
      setTask(response.data.tasks);
      setIsEditing({ task: [], editing: false });
    } else {
      const newTask = {
        title: inputValue,
        priority: priority,
        status: "To Do",
        progress: 0,
      };
      setTask(newTask);
      const tasks = await addTask(newTask);
      console.log(tasks.data.tasks);
      //setTasks(tasks);
    }
    setOpenModal(false);
  };

  return (
    <Modal>
      <div className="task-form-container">
        <div className="task-form-header">
          <h4>{isEditing.editing ? "Edit Task" : "Add Task"}</h4>
          <Close
            onClick={() => {
              setOpenModal(false);
              setIsEditing({ ...isEditing, editing: false });
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
            value={inputValue}
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
            {isEditing.editing ? "Save" : "Add"}
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default AddEditTaskForm;

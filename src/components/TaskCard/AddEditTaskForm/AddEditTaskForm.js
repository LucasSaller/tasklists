import React from "react";
import { ReactComponent as Close } from "../../../assets/icons/close.svg";
import "./AddEditTaskForm.css";
import Modal from "../Modal/Modal";

function AddEditTaskForm() {
  return (
    <Modal>
      <div className="task-form-container">
        <div className="task-form-header">
          <h4>Add Task</h4>
          <Close />
        </div>
        <div className="task-form-input">
          <label for>Task</label>
          <input
            type="text"
            placeholder="Type your task here..."
            name="title"
            value=""
          />
        </div>
        <div className="task-form-priority">
          <span>Priority</span>
          <div className="priority-buttons">
            <button className="high">High</button>
            <button className="medium">Medium</button>
            <button className="low">Low</button>
          </div>
        </div>
        <div className="addButton-container">
          <button className="task-form-add">Add</button>
        </div>
      </div>
    </Modal>
  );
}

export default AddEditTaskForm;

import React, { useState } from "react";
import "./TaskCard.css";
import { ReactComponent as Edit } from "../../assets/icons/edit.svg";
import { ReactComponent as Delete } from "../../assets/icons/delete.svg";
import CircularProgress from "../CircularProgress/CircularProgress";
import { updateTask, deleteTask } from "../../API/api";
import Modal from "../Modal/Modal";

function TaskCard({ task, setOpenModal, setIsEditing, setTasks, tasks }) {
  const [taskChanges, setTaskChanges] = useState({
    status: task.status,
    progress: task.progress,
  });
  const [deleteModal, setDeleteModal] = useState(false);

  const statusCycle = {
    "To Do": "In Progress",
    "In Progress": "Done",
    Done: "To Do",
  };
  const progressCycle = {
    0: 50,
    50: 100,
    100: 0,
  };

  const handleChangeStatus = () => {
    updateTask(task._id, {
      ...task,
      status: statusCycle[taskChanges.status],
      progress: progressCycle[taskChanges.progress],
    });
    setTaskChanges({
      status: statusCycle[taskChanges.status],
      progress: progressCycle[taskChanges.progress],
    });
  };
  const editTask = () => {
    setIsEditing({ task: task, editing: true });
    setOpenModal(true);
  };
  const removeTask = () => {
    deleteTask(task._id);
    setTasks(tasks.filter((t) => t._id !== task._id));
  };
  const capitalizeFirstLetter = (string) => {
    return string[0].toUpperCase() + string.slice(1, string.length);
  };

  return (
    <div className="task-card">
      <div className="task-header">
        <div className="task-name">
          <span className="task-title">Task</span>
          <span className="task">{capitalizeFirstLetter(task.title)}</span>
        </div>
        <div className="task-priority">
          <span className="task-priority-title">Priority</span>
          <span className={`${task.priority}-priority priority`}>
            {task.priority}
          </span>
        </div>
      </div>
      <div className="status-progress">
        <div className="task-status">
          <button className="task-button" onClick={handleChangeStatus}>
            {taskChanges.status}
          </button>
        </div>
        <div className="task-progress">
          {
            <CircularProgress
              strokeWidth={2}
              sqSize={24}
              percentage={taskChanges.progress}
            />
          }
        </div>
      </div>
      <div className="task-actions">
        <Edit onClick={editTask} />
        <Delete
          onClick={() => {
            setDeleteModal(true);
          }}
        />
        {deleteModal && (
          <Modal>
            <div className="delete-modal">
              <div className="delete-header">
                <h5 className="delete-title">Are you sure u want to delete?</h5>
              </div>
              <div className="delete-buttons">
                <button
                  className="cancel-button"
                  onClick={() => {
                    setDeleteModal(false);
                  }}
                >
                  Cancel
                </button>
                <button onClick={removeTask} className="remove-button">
                  Sure, Delete
                </button>
              </div>
            </div>
          </Modal>
        )}
      </div>
    </div>
  );
}

export default TaskCard;

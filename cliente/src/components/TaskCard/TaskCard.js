import React, { useState } from "react";
import "./TaskCard.css";
import { ReactComponent as Edit } from "../../assets/icons/edit.svg";
import { ReactComponent as Delete } from "../../assets/icons/delete.svg";
import CircularProgress from "../CircularProgress/CircularProgress";
import { updateTask, deleteTask } from "../../API/api";

function TaskCard({
  task,
  setOpenModal,
  setIsEditing,
  isEditing,
  setTasks,
  tasks,
}) {
  const [status, setStatus] = useState({
    status: task.status,
    progress: task.progress,
  });
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
    setStatus({
      status: statusCycle[task.status],
      progress: progressCycle[task.progress],
    });
    updateTask(task._id, {
      ...task,
      status: statusCycle[task.status],
      progress: progressCycle[task.progress],
    });
  };
  const editTask = () => {
    setIsEditing({ task: task, editing: true });
    setOpenModal(true);
  };

  return (
    <div className="task-card">
      <div className="task-name">
        <span className="task-title">Task</span>
        <span className="task">{task.title}</span>
      </div>
      <div className="task-name">
        <span className="task-priority">Priority</span>
        <span className={`${task.priority}-priority priority`}>
          {task.priority}
        </span>
      </div>
      <div className="task-status">
        <button className="task-button" onClick={handleChangeStatus}>
          {status.status}
        </button>
      </div>
      <div className="task-progress">
        {
          <CircularProgress
            strokeWidth={2}
            sqSize={24}
            percentage={status.progress}
          />
        }
      </div>
      <div className="task-actions">
        <Edit onClick={editTask} />
        <Delete
          onClick={() => {
            deleteTask(task._id);
            setTasks(tasks.filter((t) => t._id !== task._id));
          }}
        />
      </div>
    </div>
  );
}

export default TaskCard;

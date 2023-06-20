import React, { useState } from "react";
import "./TaskCard.css";
import { ReactComponent as Edit } from "../../assets/icons/edit.svg";
import { ReactComponent as Delete } from "../../assets/icons/delete.svg";
import CircularProgress from "../CircularProgress/CircularProgress";
import { updateTask } from "../../API/api";

function TaskCard({ task }) {
  const [status, setStatus] = useState(task.status);
  const statusCycle = {
    "To Do": "In Progress",
    "In Progress": "Done",
    Done: "To Do",
  };
  // const progressCycle={
  //   0:
  // }

  const handleChangeStatus = () => {
    setStatus(statusCycle[task.status]);
    updateTask(task._id, { ...task, status: statusCycle[task.status] });
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
          {status}
        </button>
      </div>
      <div className="task-progress">
        {
          <CircularProgress
            strokeWidth={2}
            sqSize={24}
            percentage={task.progress}
          />
        }
      </div>
      <div className="task-actions">
        <Edit />
        <Delete />
      </div>
    </div>
  );
}

export default TaskCard;

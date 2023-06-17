import "./App.css";
import { ReactComponent as Add } from "./assets/icons/add.svg";
import { taskList } from "./data/data";
import TaskCard from "./components/TaskCard/TaskCard";
import AddEditTaskForm from "./components/AddEditTaskForm/AddEditTaskForm";
import { useState } from "react";
function App() {
  const [openModal, setOpenModal] = useState(false);

  return (
    <header className="App-header">
      <div className="container">
        <div className="page-wrapper">
          <div className="top-title">
            <h2>Task List</h2>
            <button className="button" onClick={() => setOpenModal(true)}>
              <span style={{ margin: "0 15px 0 0" }}>
                <Add />
              </span>
              Add Task
            </button>
          </div>
          {openModal && <AddEditTaskForm setOpenModal={setOpenModal} />}
          <div className="tasks-container">
            {taskList.map((task) => (
              <TaskCard task={task} key={task.id} />
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}

export default App;

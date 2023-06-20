import "./App.css";
import { ReactComponent as Add } from "./assets/icons/add.svg";
import { taskList } from "./data/data";
import TaskCard from "./components/TaskCard/TaskCard";
import AddEditTaskForm from "./components/AddEditTaskForm/AddEditTaskForm";
import { useState, useEffect } from "react";
import { getTasks } from "./API/api";

function App() {
  const [openModal, setOpenModal] = useState(false);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchNotes = () => {
      getTasks()
        .then(({ data }) => setTasks(data.tasks))
        .catch((err) => console.log(err));
    };
    fetchNotes();
  }, []);

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
            {tasks.map((task) => (
              <TaskCard task={task} key={task.id} />
            ))}
          </div>
          {tasks.length === 0 && <h3> No hay tareas</h3>}
        </div>
      </div>
    </header>
  );
}

export default App;

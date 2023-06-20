import "./App.css";
import { ReactComponent as Add } from "./assets/icons/add.svg";
import TaskCard from "./components/TaskCard/TaskCard";
import AddEditTaskForm from "./components/AddEditTaskForm/AddEditTaskForm";
import { useState, useEffect } from "react";
import { getTasks } from "./API/api";

function App() {
  const [openModal, setOpenModal] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [isEditing, setIsEditing] = useState({ editing: false, task: [] });

  useEffect(() => {
    const fetchNotes = () => {
      getTasks()
        .then(({ data }) => setTasks(data.tasks))
        .catch((err) => console.log(err));
    };
    fetchNotes();
  }, [isEditing]);

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
          {openModal && (
            <AddEditTaskForm
              setOpenModal={setOpenModal}
              isEditing={isEditing}
              setIsEditing={setIsEditing}
            />
          )}
          <div className="tasks-container">
            {tasks.map((task) => (
              <TaskCard
                task={task}
                key={task.id}
                setOpenModal={setOpenModal}
                isEditing={isEditing}
                setIsEditing={setIsEditing}
              />
            ))}
          </div>
          {tasks.length === 0 && <h3> No hay tareas</h3>}
        </div>
      </div>
    </header>
  );
}

export default App;

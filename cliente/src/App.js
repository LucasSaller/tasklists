import "./App.css";
import { ReactComponent as Add } from "./assets/icons/add.svg";
import TaskCard from "./components/TaskCard/TaskCard";
import AddEditTaskForm from "./components/AddEditTaskForm/AddEditTaskForm";
import { useState, useEffect } from "react";
import { getTasks } from "./API/api";
import Loader from "./components/Loader/Loader";

function App() {
  const [tasks, setTasks] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [isEditing, setIsEditing] = useState({ editing: false, task: [] });
  const priorities = ["high", "medium", "low"];
  const orderedTasks = tasks.sort(
    (x, y) => priorities.indexOf(x.priority) - priorities.indexOf(y.priority)
  );

  useEffect(() => {
    const fetchNotes = async () => {
      await getTasks()
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
            {orderedTasks.map((task) => (
              <TaskCard
                task={task}
                key={task._id}
                setOpenModal={setOpenModal}
                isEditing={isEditing}
                setIsEditing={setIsEditing}
                setTasks={setTasks}
                tasks={tasks}
              />
            ))}
          </div>
          {tasks.length === 0 && <Loader />}
        </div>
      </div>
    </header>
  );
}

export default App;

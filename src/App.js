import "./App.css";
import { ReactComponent as Add } from "./assets/icons/add.svg";
import { taskList } from "./data/data";
import TaskCard from "./components/TaskCard/TaskCard";
function App() {
  return (
    <header className="App-header">
      <div className="container">
        <div className="page-wrapper">
          <div className="top-title">
            <h2>Task List</h2>
            <button className="button">
              <span style={{ margin: "0 15px 0 0" }}>
                <Add />
              </span>
              Add Task
            </button>
          </div>
          <div className="tasks-container">
            {taskList.map((task) => (
              <TaskCard task={task} />
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}

export default App;

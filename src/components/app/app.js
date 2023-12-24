import { createContext, useContext, useEffect, useState } from "react";
import EditPanel from "../edit-panel/edit-panel";
import TaskList from "../task-list/task-list";

import "./app.scss";
import Service from "../../services/http.hook";

// Контекст для проброса пропсов ниже
const TaskContext = createContext();
export const useTask = () => {
  return useContext(TaskContext);
};

const App = () => {
  const [currentTask, setCurrentTask] = useState("");
  const [data, setData] = useState([]);

  const { getTasks } = Service();

  useEffect(() => {
    onRequest();
  }, []);

  const onRequest = () => {
    getTasks()
      .then((tasks) => tasks.sort((x, y) => x.Id - y.Id))
      .then((tasks) => setData(tasks));
  };

  return (
    <div className="app-container">
      <TaskContext.Provider
        value={{ data, onRequest, currentTask, setCurrentTask }}
      >
        <TaskList />
        <EditPanel />
      </TaskContext.Provider>
    </div>
  );
};

export default App;

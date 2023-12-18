import { createContext, useContext, useState } from "react";
import EditPanel from "../edit-panel/edit-panel";
import TaskList from "../task-list/task-list";

import "./app.scss";

// Контекст для проброса пропсов ниже
const TaskContext = createContext();
export const useTask = () => {
  return useContext(TaskContext);
};

const App = () => {
  const [currentTask, setCurrentTask] = useState("");

  return (
    <div className="app-container">
      <TaskContext.Provider value={{ currentTask, setCurrentTask }}>
        <TaskList />
        <EditPanel />
      </TaskContext.Provider>
    </div>
  );
};

export default App;

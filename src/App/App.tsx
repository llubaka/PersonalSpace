import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Home } from "../pages/home";
import { NotFound } from "../pages/notFound";
import { SinglePriority, SingleTask } from "../utils/interfaces";
import "../styles/app.css";
import { TaskContext } from "../contexts/taskContext";
import { PriorityContext } from "../contexts/priorityContext";
import { getLocalStorageArrayItem, setLocalStorageArrayItem } from "../helpers";
import { LocalStorageNames } from "../utils/enums";

function App() {
  const [tasks, setTasks] = useState<Array<SingleTask>>(getLocalStorageArrayItem(LocalStorageNames.TASKS));
  const [priorities, setPriorities] = useState<Array<SinglePriority>>(
    getLocalStorageArrayItem(LocalStorageNames.PRIORITIES)
  );

  useEffect(() => {
    setLocalStorageArrayItem(tasks, LocalStorageNames.TASKS);
  }, [tasks]);

  useEffect(() => {
    setLocalStorageArrayItem(priorities, LocalStorageNames.PRIORITIES);
  }, [priorities]);

  return (
    <TaskContext.Provider value={{ tasks, setTasks }}>
      <PriorityContext.Provider value={{ priorities, setPriorities }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </PriorityContext.Provider>
    </TaskContext.Provider>
  );
}

export default App;

import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Home } from "../pages/home";
import { NotFound } from "../pages/notFound";
import { SinglePriority, SingleTask } from "../utils/interfaces";
import "../styles/app.css";
import { TaskContext } from "../contexts/taskContext";
import { PriorityContext } from "../contexts/priorityContext";

function App() {
  const [tasks, setTasks] = useState<Array<SingleTask>>([]);
  const [priorities, setPriorities] = useState<Array<SinglePriority>>([]);

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

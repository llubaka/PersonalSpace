import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/home";
import NotFound from "../pages/notFound";
import { SingleTask } from "../utils/interfaces";
import "../styles/app.css";
import { TaskContext } from "../contexts/taskContext";

function App() {
  const [tasks, setTasks] = useState<Array<SingleTask>>([]);

  return (
    <TaskContext.Provider value={{ tasks, setTasks }}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </TaskContext.Provider>
  );
}

export default App;

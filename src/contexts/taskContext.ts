import { TasksHook } from "./../utils/interfaces";
import React from "react";
export const TaskContext = React.createContext<TasksHook | null>(null);

export const useTaskContext = () => {
  const { tasks, setTasks } = React.useContext<any>(TaskContext);
  return { tasks, setTasks };
};

import { PriorityHook } from "./../utils/interfaces";
import React from "react";
export const PriorityContext = React.createContext<PriorityHook | null>(null);

export const usePriorityContext = () => {
  const { priorities, setPriorities } = React.useContext<any>(PriorityContext);
  return { priorities, setPriorities };
};

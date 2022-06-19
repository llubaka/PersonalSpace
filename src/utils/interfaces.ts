import { EmptyPriority, PriorityPros } from "./../components/Priority/priority";
import { EmptyTask, TaskProps } from "../components/Task/task";

export interface SingleTask {
  category?: string;
  task: TaskProps;
}

export interface EmptySingleTask {
  category?: string;
  task: EmptyTask;
}

export interface EmptySinglePriority {
  category?: string;
  priority: EmptyPriority;
}

export interface TasksHook {
  tasks: Array<SingleTask>;
  setTasks: React.Dispatch<React.SetStateAction<Array<SingleTask>>>;
}

export interface SinglePriority {
  category?: string;
  priority: PriorityPros;
}
export interface PriorityHook {
  priorities: Array<SinglePriority>;
  setPriorities: React.Dispatch<React.SetStateAction<Array<SinglePriority>>>;
}

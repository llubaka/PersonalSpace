import { EmptyTask, TaskProps } from "../components/Task/task";

export interface SingleTask {
  category?: string;
  task: TaskProps;
}

export interface EmptySingleTask {
  category?: string;
  task: EmptyTask;
}

export interface TasksHook {
  tasks: Array<SingleTask>;
  setTasks: React.Dispatch<React.SetStateAction<Array<SingleTask>>>;
}

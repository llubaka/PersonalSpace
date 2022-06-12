import React, { useCallback, useState } from "react";
import { useTaskContext } from "../../../contexts/taskContext";
import { createEmptyTask } from "../../../helpers";
import { EmptySingleTask, SingleTask } from "../../../utils/interfaces";
import "./taskCreator.scss";

export interface TaskCreatorProps {
  handleOnClose: () => void;
}

const TaskCreator: React.FC<TaskCreatorProps> = ({ handleOnClose }) => {
  const [task, setTask] = useState<EmptySingleTask>(createEmptyTask());

  const { setTasks } = useTaskContext();

  const handleOnClick = useCallback(() => {
    handleOnClose();
    setTasks((curr: Array<SingleTask>) => [...curr, task]);
  }, [handleOnClose, setTasks, task]);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    console.log(e.target.id);

    if (e.target.id === "category") {
      setTask((curr) => {
        return {
          ...curr,
          category: e.target.value,
        };
      });
    } else {
      setTask((curr) => {
        return {
          ...curr,
          task: { ...curr.task, [e.target.id]: e.target.value },
        };
      });
    }
  };

  return (
    <div className="task_creator_container">
      <div className="task_creator_container--inner-container">
        <h1>Material Design Text Input With No Extra Markup</h1>
        <div className="input_container">
          <input
            key="category"
            placeholder="Category"
            id="category"
            value={task.category}
            onChange={handleOnChange}
            required
          />
          <input
            key="title"
            placeholder="Title*"
            id="title"
            value={task.task.title}
            onChange={handleOnChange}
            required
          />
          <input
            key="content"
            placeholder="Content"
            id="content"
            value={task.task.content}
            onChange={handleOnChange}
            required
          />
          <input
            key="dateStart"
            placeholder="Start date*"
            id="dateStart"
            value={task.task.dateStart ? task.task.dateStart.toString() : ""}
            onChange={handleOnChange}
            required
          />
          <input
            key="dateEnd"
            placeholder="End date*"
            id="dateEnd"
            value={task.task.dateEnd ? task.task.dateEnd.toString() : ""}
            onChange={handleOnChange}
            required
          />
          <input
            key="customShadowColor"
            placeholder="Custom shadow color"
            id="customShadowColor"
            value={task.task.customShadowColor}
            onChange={handleOnChange}
            required
          />
        </div>
        <button onClick={handleOnClick}>Submit</button>
      </div>
    </div>
  );
};

export default TaskCreator;

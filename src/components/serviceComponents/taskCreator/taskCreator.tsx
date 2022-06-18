import React, { useCallback, useState } from "react";
import styled from "styled-components";
import { useTaskContext } from "../../../contexts/taskContext";
import { createEmptyTask } from "../../../helpers";
import { EmptySingleTask, SingleTask } from "../../../utils/interfaces";
import { Button } from "../../Button";
import { Input } from "../../Input";

export interface TaskCreatorProps {
  handleOnClose: () => void;
}

export const TaskCreator: React.FC<TaskCreatorProps> = ({ handleOnClose }) => {
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
    <TaskCreatorStyled>
      <div className="task_creator_container">
        <div className="task_creator_container--inner-container">
          <h1 className="task_creator_title">Material Design Text Input With No Extra Markup</h1>
          <div className="input_container">
            <Input
              key="category"
              placeholder="Category"
              id="category"
              name="category"
              value={task.category}
              onChange={handleOnChange}
              required
            />
            <Input
              key="title"
              placeholder="Title*"
              id="title"
              name="title"
              value={task.task.title}
              onChange={handleOnChange}
              required
            />
            <Input
              key="content"
              placeholder="Content"
              id="content"
              name="content"
              value={task.task.content}
              onChange={handleOnChange}
              required
            />
            <Input
              key="dateStart"
              placeholder="Start date*"
              id="dateStart"
              name="dateStart"
              value={task.task.dateStart ? task.task.dateStart.toString() : ""}
              onChange={handleOnChange}
              required
            />
            <Input
              key="dateEnd"
              placeholder="End date*"
              id="dateEnd"
              name="dateEnd"
              value={task.task.dateEnd ? task.task.dateEnd.toString() : ""}
              onChange={handleOnChange}
              required
            />
            <Input
              key="customShadowColor"
              placeholder="Custom shadow color"
              id="customShadowColor"
              name="customShadowColor"
              value={task.task.customShadowColor}
              onChange={handleOnChange}
              required
            />
          </div>
          <Button onClick={handleOnClick}>Submit</Button>
        </div>
      </div>
    </TaskCreatorStyled>
  );
};

const TaskCreatorStyled = styled.div<{}>(() => {
  return {
    ".task_creator_title": {
      height: "100px",
      width: "100%",
      fontSize: "18px",
      background: "linear-gradient(45deg, #1abc9c, #138871)",
      color: "white",
      lineHeight: "150%",
      borderRadius: "3px 3px 0 0",
      boxShadow: "0 2px 5px 1px rgba(0,0,0,0.2)",
      fontFamily: "roboto, sans-serif",
      transition: "all 0.3s ease-in-out",
      boxSizing: "border-box",
      padding: "20px",
    },
    ".task_creator_container": {
      position: "absolute",
      width: "100%",
      height: "100%",
      top: "0",
      left: "0",
      boxSizing: "border-box",
      boxShadow: "2px 2px 5px 1px rgba(0,0,0,0.2)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "rgb(0 0 0 / 42%)",
      backdropFilter: "blur(10px)",
      "&--inner-container": {
        width: "95%",
        backgroundColor: "white",
        borderRadius: "7px",
      },
    },
    ".input_container": {
      maxHeight: "473px",
      overflow: "auto",
    },
  };
});

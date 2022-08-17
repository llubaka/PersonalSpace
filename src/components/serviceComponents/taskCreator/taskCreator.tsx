import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { useTaskContext } from "../../../contexts/taskContext";
import { createEmptyTask, generateUUID, validateTaskEntity, validateTaskObject } from "../../../helpers";
import { TaskProps, ValidationState } from "../../../utils/enums";
import { EmptySingleTask, SingleTask } from "../../../utils/interfaces";
import { Button } from "../../Button";
import { Input } from "../../Input";

export interface TaskCreatorProps extends React.HTMLAttributes<HTMLDivElement> {
  handleOnClose: () => void;
}

export const TaskCreator: React.FC<TaskCreatorProps> = ({ handleOnClose }) => {
  const [task, setTask] = useState<EmptySingleTask>(createEmptyTask());
  const [isValid, setIsValid] = useState({
    category: ValidationState.NEUTRAL,
    title: ValidationState.NEUTRAL,
    content: ValidationState.NEUTRAL,
    dateStart: ValidationState.NEUTRAL,
    dateEnd: ValidationState.NEUTRAL,
    dateCreated: ValidationState.NEUTRAL,
    customShadowColor: ValidationState.NEUTRAL,
  });

  const { setTasks } = useTaskContext();

  const handleOnSubmit = useCallback(() => {
    const { isValid, notValidEntries } = validateTaskObject(task);

    if (isValid) {
      handleOnClose();
      const taskWithId = { ...task, task: { ...task.task, id: generateUUID() } };

      setTasks((curr: Array<SingleTask>) => [...curr, taskWithId]);
    }

    notValidEntries.forEach((nve) => {
      setIsValid((curr) => {
        return { ...curr, [nve]: ValidationState.NOT_VALID };
      });
    });
  }, [handleOnClose, setTasks, task]);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsValid((curr) => {
      return { ...curr, [e.target.id]: validateTaskEntity(e.target.id, e.target.value) };
    });

    if (e.target.id === TaskProps.CATEGORY) {
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

  const handleOnBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsValid((curr) => {
      return { ...curr, [e.target.id]: validateTaskEntity(e.target.id, e.target.value) };
    });
  };

  const handleOnClickOutside = useCallback(
    (e: React.MouseEvent) => {
      if ((e.target as Element).id === "task_creator_container") handleOnClose();
    },
    [handleOnClose]
  );

  useEffect(() => {
    const onKeyDownCallback = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleOnClose();
      else if (e.key === "Enter") handleOnSubmit();
    };
    document.addEventListener("keydown", onKeyDownCallback);

    return () => document.removeEventListener("keydown", onKeyDownCallback);
  }, [handleOnClose, handleOnSubmit]);

  return (
    <TaskCreatorStyled>
      <div id="task_creator_container" className="task_creator_container" onClick={handleOnClickOutside}>
        <div className="task_creator_container--inner-container">
          <h1 className="task_creator_title">Material Design Text Input With No Extra Markup</h1>
          <div className="input_container">
            <Input
              key={TaskProps.CATEGORY}
              placeholder="Category"
              id={TaskProps.CATEGORY}
              name={TaskProps.CATEGORY}
              value={task.category}
              onChange={handleOnChange}
              onBlur={handleOnBlur}
              isValid={isValid[TaskProps.CATEGORY]}
              required
            />
            <Input
              key={TaskProps.TITLE}
              placeholder="Title*"
              id={TaskProps.TITLE}
              name={TaskProps.TITLE}
              value={task.task.title}
              onChange={handleOnChange}
              onBlur={handleOnBlur}
              isValid={isValid[TaskProps.TITLE]}
              required
            />
            <Input
              key={TaskProps.CONTENT}
              placeholder="Content"
              id={TaskProps.CONTENT}
              name={TaskProps.CONTENT}
              value={task.task.content}
              onChange={handleOnChange}
              onBlur={handleOnBlur}
              isValid={isValid[TaskProps.CONTENT]}
              required
            />
            <Input
              key={TaskProps.DATE_START}
              placeholder="Start date*"
              id={TaskProps.DATE_START}
              name={TaskProps.DATE_START}
              type="date"
              value={task.task.dateStart ? task.task.dateStart.toString() : ""}
              onChange={handleOnChange}
              onBlur={handleOnBlur}
              isValid={isValid[TaskProps.DATE_START]}
              required
            />
            <Input
              key={TaskProps.DATE_END}
              placeholder="End date*"
              id={TaskProps.DATE_END}
              name={TaskProps.DATE_END}
              type="date"
              value={task.task.dateEnd ? task.task.dateEnd.toString() : ""}
              onChange={handleOnChange}
              onBlur={handleOnBlur}
              isValid={isValid[TaskProps.DATE_END]}
              required
            />
            <Input
              key={TaskProps.CUSTOM_SHADOW_COLOR}
              placeholder="Custom shadow color"
              id={TaskProps.CUSTOM_SHADOW_COLOR}
              name={TaskProps.CUSTOM_SHADOW_COLOR}
              value={task.task.customShadowColor}
              onChange={handleOnChange}
              onBlur={handleOnBlur}
              isValid={isValid[TaskProps.CUSTOM_SHADOW_COLOR]}
              required
            />
          </div>
          <Button onClick={handleOnSubmit} disabled={!validateTaskObject(task).isValid}>
            Submit
          </Button>
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

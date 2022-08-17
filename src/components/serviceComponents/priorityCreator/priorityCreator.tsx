import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { usePriorityContext } from "../../../contexts/priorityContext";
import { createEmptyPriority, generateUUID, validatePriorityObject, validateTaskEntity } from "../../../helpers";
import { TaskProps, ValidationState } from "../../../utils/enums";
import { EmptySinglePriority, SinglePriority } from "../../../utils/interfaces";
import { Button } from "../../Button";
import { Input } from "../../Input";

export interface PriorityCreatorProps extends React.HTMLAttributes<HTMLDivElement> {
  handleOnClose: () => void;
}

export const PriorityCreator: React.FC<PriorityCreatorProps> = ({ handleOnClose }) => {
  const [priority, setPriority] = useState<EmptySinglePriority>(createEmptyPriority());
  const [isValid, setIsValid] = useState({
    category: ValidationState.NEUTRAL,
    title: ValidationState.NEUTRAL,
    content: ValidationState.NEUTRAL,
    dateCreated: ValidationState.NEUTRAL,
    customShadowColor: ValidationState.NEUTRAL,
  });

  const { setPriorities } = usePriorityContext();

  const handleOnSubmit = useCallback(() => {
    const { isValid, notValidEntries } = validatePriorityObject(priority);

    if (isValid) {
      handleOnClose();
      const priorityWithId = { ...priority, priority: { ...priority.priority, id: generateUUID() } };
      setPriorities((curr: Array<SinglePriority>) => [...curr, priorityWithId]);
    }

    notValidEntries.forEach((nve) => {
      setIsValid((curr) => {
        return { ...curr, [nve]: ValidationState.NOT_VALID };
      });
    });
  }, [priority, handleOnClose, setPriorities]);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsValid((curr) => {
      return { ...curr, [e.target.id]: validateTaskEntity(e.target.id, e.target.value) };
    });

    if (e.target.id === TaskProps.CATEGORY) {
      setPriority((curr) => {
        return {
          ...curr,
          category: e.target.value,
        };
      });
    } else {
      setPriority((curr) => {
        return {
          ...curr,
          priority: { ...curr.priority, [e.target.id]: e.target.value },
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
              value={priority.category}
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
              value={priority.priority.title}
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
              value={priority.priority.content}
              onChange={handleOnChange}
              onBlur={handleOnBlur}
              isValid={isValid[TaskProps.CONTENT]}
              required
            />
            <Input
              key={TaskProps.CUSTOM_SHADOW_COLOR}
              placeholder="Custom shadow color"
              id={TaskProps.CUSTOM_SHADOW_COLOR}
              name={TaskProps.CUSTOM_SHADOW_COLOR}
              value={priority.priority.customShadowColor}
              onChange={handleOnChange}
              onBlur={handleOnBlur}
              isValid={isValid[TaskProps.CUSTOM_SHADOW_COLOR]}
              required
            />
          </div>
          <Button onClick={handleOnSubmit} disabled={!validatePriorityObject(priority).isValid}>
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

import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { usePriorityContext } from "../../../contexts/priorityContext";
import {
  createEmptyPriority,
  generateUUID,
  isNumber,
  validatePriorityObject,
  validateTaskEntity,
} from "../../../helpers";
import { PriorityProps, PriorityStatus, ValidationState } from "../../../utils/enums";
import { EmptySinglePriority, SinglePriority } from "../../../utils/interfaces";
import { PRIORITY_STATUSES } from "../../../utils/phrases";
import { Button } from "../../Button";
import { Input } from "../../Input";

export interface PriorityCreatorProps extends React.HTMLAttributes<HTMLDivElement> {
  id?: string;
  handleOnClose: () => void;
}

export const PriorityCreator: React.FC<PriorityCreatorProps> = ({ id, handleOnClose }) => {
  const { priorities, setPriorities } = usePriorityContext();

  const initPriority = useCallback(() => {
    if (!id) return createEmptyPriority();

    return (priorities as SinglePriority[]).filter((pr) => pr.priority.id === id)[0];
  }, [id, priorities]);

  const [priority, setPriority] = useState<EmptySinglePriority>(initPriority());
  const [isValid, setIsValid] = useState({
    category: ValidationState.NEUTRAL,
    title: ValidationState.NEUTRAL,
    content: ValidationState.NEUTRAL,
    dateCreated: ValidationState.NEUTRAL,
    customShadowColor: ValidationState.NEUTRAL,
    status: ValidationState.NEUTRAL,
  });

  const onChangeCheckboxHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPriority((curr: any) => {
      return { ...curr, priority: { ...curr.priority, status: e.target.value } };
    });
  };

  const handleOnSubmit = useCallback(() => {
    const { isValid, notValidEntries } = validatePriorityObject(priority);

    if (isValid) {
      handleOnClose();

      if (!id) {
        const priorityWithId = { ...priority, priority: { ...priority.priority, id: generateUUID() } };
        setPriorities((curr: Array<SinglePriority>) => [...curr, priorityWithId]);
      } else {
        setPriorities((curr: Array<SinglePriority>) => {
          const index = curr.findIndex((curr) => curr.priority.id === id);
          const copy = [...curr];

          copy[index] = priority as any;

          return copy;
        });
      }
    }

    notValidEntries.forEach((nve) => {
      setIsValid((curr) => {
        return { ...curr, [nve]: ValidationState.NOT_VALID };
      });
    });
  }, [priority, handleOnClose, id, setPriorities]);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsValid((curr) => {
      return { ...curr, [e.target.id]: validateTaskEntity(e.target.id, e.target.value) };
    });

    if (e.target.id === PriorityProps.CATEGORY) {
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

  const getCheckboxText = (key: number) => {
    // @ts-ignore
    return PRIORITY_STATUSES[key];
  };

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
              key={PriorityProps.CATEGORY}
              placeholder="Category"
              id={PriorityProps.CATEGORY}
              name={PriorityProps.CATEGORY}
              value={priority.category}
              onChange={handleOnChange}
              onBlur={handleOnBlur}
              isValid={isValid[PriorityProps.CATEGORY]}
              required
            />
            <Input
              key={PriorityProps.TITLE}
              placeholder="Title*"
              id={PriorityProps.TITLE}
              name={PriorityProps.TITLE}
              value={priority.priority.title}
              onChange={handleOnChange}
              onBlur={handleOnBlur}
              isValid={isValid[PriorityProps.TITLE]}
              required
            />
            <Input
              key={PriorityProps.CONTENT}
              placeholder="Content"
              id={PriorityProps.CONTENT}
              name={PriorityProps.CONTENT}
              value={priority.priority.content}
              onChange={handleOnChange}
              onBlur={handleOnBlur}
              isValid={isValid[PriorityProps.CONTENT]}
              required
            />
            <div className="status_checkboxes_container">
              {(Object.keys(PriorityStatus) as Array<keyof typeof PriorityStatus>)
                .filter((key) => isNumber(key))
                .map((key) => {
                  return (
                    <>
                      <input
                        value={key}
                        onChange={onChangeCheckboxHandler}
                        checked={parseInt(priority.priority.status as any) === parseInt(key as any)}
                        key={key}
                        type="checkbox"
                      />
                      {getCheckboxText(key as any)}
                    </>
                  );
                })}
            </div>
            <Input
              key={PriorityProps.CUSTOM_SHADOW_COLOR}
              placeholder="Custom shadow color"
              id={PriorityProps.CUSTOM_SHADOW_COLOR}
              name={PriorityProps.CUSTOM_SHADOW_COLOR}
              value={priority.priority.customShadowColor}
              onChange={handleOnChange}
              onBlur={handleOnBlur}
              isValid={isValid[PriorityProps.CUSTOM_SHADOW_COLOR]}
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
      zIndex: 2,
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

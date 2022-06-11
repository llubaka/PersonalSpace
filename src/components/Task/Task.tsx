import React, { useCallback } from "react";
import styled from "styled-components";
import { convetDateTo_Day_Month_Year } from "../../helpers";

interface TaskProps {
  title: string;
  content: string;
  dateStart: Date;
  dateEnd: Date;
  dateCreated: Date;
  isFinished?: boolean;
  customShadowColor?: string;
}

enum TaskStatus {
  NOT_STARTED,
  IN_PROCESS,
  TIMED_OVER,
  FINISHED_SUCCESSFUL,
}

export const Task: React.FC<TaskProps> = ({
  title,
  content,
  dateStart,
  dateEnd,
  dateCreated,
  isFinished,
  customShadowColor,
}) => {
  const getTaskStatus = useCallback((): TaskStatus => {
    if (isFinished) return TaskStatus.FINISHED_SUCCESSFUL;

    const dateNow = new Date();
    if (dateNow > dateStart && dateNow < dateEnd) return TaskStatus.IN_PROCESS;
    else if (dateStart > dateNow) return TaskStatus.NOT_STARTED;
    else return TaskStatus.TIMED_OVER;
  }, [dateEnd, dateStart, isFinished]);

  return (
    <TaskStyled taskStatus={getTaskStatus()} customShadowColor={customShadowColor}>
      <div>
        <div>started: {convetDateTo_Day_Month_Year(dateStart)}</div>
        <div>ended: {convetDateTo_Day_Month_Year(dateEnd)}</div>
      </div>
      <div>{title}</div>
      <div>{content}</div>
    </TaskStyled>
  );
};

const TaskStyled = styled.div<{ taskStatus: TaskStatus; customShadowColor?: string }>(
  ({ taskStatus, customShadowColor }) => {
    const shadowColor = {
      [TaskStatus.NOT_STARTED]: "rgba(135,148,136,1)",
      [TaskStatus.IN_PROCESS]: "rgba(9,104,145,1)",
      [TaskStatus.TIMED_OVER]: "rgba(247,5,5,1)",
      [TaskStatus.FINISHED_SUCCESSFUL]: "rgba(6,181,23,1)",
    };

    return {
      boxShadow: `-1px 1px 6px 2px ${customShadowColor || shadowColor[taskStatus]}`,
      margin: "10px",
      padding: "15px 30px",
      borderRadius: "5px",
      background: "white",
      "&:hover": {
        boxShadow: `-2px 2px 7px 3px ${customShadowColor || shadowColor[taskStatus]}`,
        transform: "scale(99%)",
      },
    };
  }
);

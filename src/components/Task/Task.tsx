import React, { useCallback, useMemo, useState } from "react";
import styled from "styled-components";
import { useTaskContext } from "../../contexts/taskContext";
import { convetDateTo_Day_Month_Year } from "../../helpers";
import { SingleTask } from "../../utils/interfaces";
import { TaskCreator } from "../serviceComponents/taskCreator";

export interface EmptyTask {
  id?: string;
  title?: string | "";
  content?: string | "";
  dateStart?: Date | "";
  dateEnd?: Date | "";
  dateCreated?: Date | "";
  isFinished?: boolean | "";
  customShadowColor?: string | "";
}

export enum TaskStatus {
  NOT_STARTED,
  IN_PROCESS,
  TIMED_OUT,
  FINISHED_SUCCESSFUL,
}

export interface TaskProps extends React.HTMLAttributes<HTMLDivElement> {
  id: string;
  title: string;
  content?: string;
  dateStart: Date;
  dateEnd: Date;
  dateCreated?: Date;
  isFinished?: boolean;
  customShadowColor?: string;
}
export const Task: React.FC<TaskProps> = ({
  id,
  title,
  content,
  dateStart,
  dateEnd,
  dateCreated,
  isFinished,
  customShadowColor,
  ...props
}) => {
  const { setTasks } = useTaskContext();
  const [openTaskCreator, setOpenTaskCreator] = useState(false);

  const handleCloseTaskCreator = useCallback(() => {
    setOpenTaskCreator(false);
  }, [setOpenTaskCreator]);

  const deleteTask = useCallback(() => {
    setTasks((curr: SingleTask[]) => curr.filter((tsk) => tsk.task.id !== id));
  }, [id, setTasks]);

  const task_statuses = useMemo(() => {
    return {
      [TaskStatus.NOT_STARTED]: "Not started",
      [TaskStatus.IN_PROCESS]: "In process",
      [TaskStatus.TIMED_OUT]: "Timed out",
      [TaskStatus.FINISHED_SUCCESSFUL]: "Finished successful",
    };
  }, []);

  const editTask = useCallback(() => {
    setOpenTaskCreator(true);
  }, [setOpenTaskCreator]);

  const getTaskStatus = useCallback((): TaskStatus => {
    if (isFinished) return TaskStatus.FINISHED_SUCCESSFUL;

    const dateNow = new Date();
    const ds = new Date(dateStart);
    const de = new Date(dateEnd);

    if (dateNow > ds && dateNow < de) return TaskStatus.IN_PROCESS;
    else if (ds > dateNow) return TaskStatus.NOT_STARTED;
    else return TaskStatus.TIMED_OUT;
  }, [dateEnd, dateStart, isFinished]);

  return (
    <>
      {openTaskCreator && <TaskCreator id={id} handleOnClose={handleCloseTaskCreator} />}
      <TaskStyled taskStatus={getTaskStatus()} customShadowColor={customShadowColor} {...props}>
        <div className="task_header">
          <div className="task_dates">
            <div className="task_dates-inner_container">
              <img
                className="event_of_process_image event_of_process_image--start"
                src="/icons/start.png"
                alt="start icon"
              />
              <div>{convetDateTo_Day_Month_Year(dateStart)}</div>
              <img className="right_arrow_image" src="/icons/right-arrow.png" alt="arrow right icon" />
            </div>
            <div className="task_dates-inner_container end_process_container">
              <img
                className="event_of_process_image event_of_process_image--end"
                src="/icons/finish.png"
                alt="finish/end icon"
              />
              <div>{convetDateTo_Day_Month_Year(dateEnd)}</div>
            </div>
          </div>
          <div className="task_status">{task_statuses[getTaskStatus()]}</div>
          <div className="priority_actions">
            <img className="priority_edit" src="/icons/edit3.png" alt="edit icon" onClick={editTask} />
            <img className="priority_delete" src="/icons/delete.png" alt="delete icon" onClick={deleteTask} />
          </div>
        </div>
        <h3 className="task_title">{title}</h3>
        {content && <div className="task_content">{content}</div>}
      </TaskStyled>
    </>
  );
};

const TaskStyled = styled.div<{ taskStatus: TaskStatus; customShadowColor?: string }>(
  ({ taskStatus, customShadowColor }) => {
    const shadowColor = {
      [TaskStatus.NOT_STARTED]: "rgba(135,148,136,1)",
      [TaskStatus.IN_PROCESS]: "rgba(9,104,145,1)",
      [TaskStatus.TIMED_OUT]: "rgba(247,5,5,1)",
      [TaskStatus.FINISHED_SUCCESSFUL]: "rgba(6,181,23,1)",
    };

    const color: string = customShadowColor || shadowColor[taskStatus];

    return {
      boxShadow: `-1px 1px 6px 2px ${color}`,
      margin: "10px",
      padding: "15px 30px",
      borderRadius: "5px",
      background: "white",
      "&:hover": {
        boxShadow: `-2px 2px 7px 3px ${color}`,
        transform: "scale(99.7%)",
      },
      "& .task_title": {
        color: "#c77824",
        marginTop: "10px",
        fontSize: "24px",
      },
      "& .task_content": {
        color: "#202020",
      },
      "& .event_of_process_image": {
        width: "35px",
        "&--start": { marginRight: "7px" },
        "&--end": { marginLeft: "7px" },
      },
      "& .right_arrow_image": {
        width: "23px",
        margin: "0px 14px",
      },
      "& .task_header": {
        display: "flex",
        "& .task_status": {
          color: color,
          fontSize: "17px",
          fontWeight: 700,
          marginRight: "10px",
        },
        "& .task_dates": {
          flex: 1,
          "&-inner_container": {
            display: "inline-flex",
            alignItems: "center",
            fontWeight: 500,
            color: "#434343",
          },
          ".end_process_container": {
            flexDirection: "row-reverse",
          },
        },
      },
      "& .priority_edit, .priority_delete": {
        width: "24px",
        height: "28px",
        marginLeft: "15px",
        "&:hover": {
          cursor: "pointer",
          borderRadius: "15%",
          boxShadow: "0px 0px 27px -5px rgba(0,0,0,1)",
          background: "rgb(143 136 136 / 25%)",
        },
      },
      "& .priority_actions": {
        display: "flex",
      },
    };
  }
);

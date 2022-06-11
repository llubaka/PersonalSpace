import moment from "moment";
import React from "react";
import styled from "styled-components";
import { convetDateTo_Day_Month_Year } from "../../helpers";

interface TaskProps {
  title: string;
  content: string;
  dateStart: Date;
  dateEnd: Date;
  dateCreated: Date;
}

export const Task: React.FC<TaskProps> = ({ title, content, dateStart, dateEnd, dateCreated }) => {
  return (
    <TaskStyled>
      <div>
        <div>{convetDateTo_Day_Month_Year(dateStart)}</div>
        <div>{convetDateTo_Day_Month_Year(dateEnd)}</div>
      </div>
      <div>{title}</div>
      <div>{content}</div>
    </TaskStyled>
  );
};

const TaskStyled = styled.div<{}>((props) => {
  return {
    boxShadow: "-2px 2px 5px 0px rgba(9,104,145,1)",
    margin: "10px",
    padding: "15px 30px",
    borderRadius: "5px",
    background: "white",
    "&:hover": {},
  };
});

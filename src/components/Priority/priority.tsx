import React, { useMemo } from "react";
import styled from "styled-components";

export enum PriorityStatus {
  NOT_STARTED,
  IN_PROCESS,
  FINISHED_SUCCESSFUL,
}

export interface EmptyPriority {
  id?: string;
  title: string;
  content?: string;
  dateCreated?: Date | "";
  status: PriorityStatus;
  customShadowColor?: string;
}

export interface PriorityPros extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  content?: string;
  dateCreated?: Date;
  status: PriorityStatus;
  customShadowColor?: string;
}
export const Priority: React.FC<PriorityPros> = ({
  title,
  content,
  dateCreated,
  customShadowColor,
  status,
  ...props
}) => {
  const priority_statuses = useMemo(() => {
    return {
      [PriorityStatus.NOT_STARTED]: "Not started",
      [PriorityStatus.IN_PROCESS]: "In process",
      [PriorityStatus.FINISHED_SUCCESSFUL]: "Finished successfully",
    };
  }, []);

  return (
    <PriorityStyled status={status} customShadowColor={customShadowColor} {...props}>
      <div className="priority_header">
        <div className="priority_status">{priority_statuses[status]}</div>
      </div>
      <h3 className="priority_title">{title}</h3>
      {content && <div className="priority_content">{content}</div>}
    </PriorityStyled>
  );
};

const PriorityStyled = styled.div<{ status: PriorityStatus; customShadowColor?: string }>(
  ({ status, customShadowColor }) => {
    const shadowColor = {
      [PriorityStatus.NOT_STARTED]: "rgba(135,148,136,1)",
      [PriorityStatus.IN_PROCESS]: "rgba(9,104,145,1)",
      [PriorityStatus.FINISHED_SUCCESSFUL]: "rgba(6,181,23,1)",
    };

    const color: string = customShadowColor || shadowColor[status];

    return {
      boxShadow: `-1px 1px 6px 2px ${color}`,
      margin: "10px",
      padding: "15px 30px",
      borderRadius: "5px",
      background: "white",
      "&:hover": {
        boxShadow: `-2px 2px 7px 3px ${color}`,
        transform: "scale(99%)",
      },
      "& .priority_title": {
        color: "#c77824",
        marginTop: "10px",
        fontSize: "24px",
      },
      "& .priority_content": {
        color: "#202020",
      },
      "& .priority_header": {
        display: "flex",
        "& .priority_status": {
          color: color,
          fontSize: "17px",
          fontWeight: 700,
        },
      },
    };
  }
);

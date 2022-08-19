import React, { useCallback, useMemo, useState } from "react";
import styled from "styled-components";
import { usePriorityContext } from "../../contexts/priorityContext";
import { PriorityStatus } from "../../utils/enums";
import { SinglePriority } from "../../utils/interfaces";
import { PriorityCreator } from "../serviceComponents/priorityCreator";

export interface EmptyPriority {
  id?: string;
  title: string;
  content?: string;
  dateCreated?: Date | "";
  status: PriorityStatus;
  customShadowColor?: string;
}

export interface PriorityPros extends React.HTMLAttributes<HTMLDivElement> {
  id: string;
  title: string;
  content?: string;
  dateCreated?: Date;
  status: PriorityStatus;
  customShadowColor?: string;
}
export const Priority: React.FC<PriorityPros> = ({
  id,
  title,
  content,
  dateCreated,
  customShadowColor,
  status,
  ...props
}) => {
  const [editPriority, setEditPriority] = useState(false);

  const { setPriorities } = usePriorityContext();

  const priority_statuses = useMemo(() => {
    return {
      [PriorityStatus.NOT_STARTED]: "Not started",
      [PriorityStatus.IN_PROCESS]: "In process",
      [PriorityStatus.FINISHED_SUCCESSFUL]: "Finished successfully",
    };
  }, []);

  const deletePriority = useCallback(() => {
    setPriorities((curr: SinglePriority[]) => curr.filter((pr) => pr.priority.id !== id));
  }, [id, setPriorities]);

  const handleClosePriorityCreator = useCallback(() => {
    setEditPriority(false);
  }, []);

  const handleOpenPriorityCreator = useCallback(() => {
    setEditPriority(true);
  }, []);

  return (
    <>
      {editPriority && <PriorityCreator id={id} handleOnClose={handleClosePriorityCreator} />}
      <PriorityStyled status={status} customShadowColor={customShadowColor} {...props}>
        <div className="priority_header">
          <div className="priority_status">{priority_statuses[status]}</div>
          <div className="priority_actions">
            <img className="priority_edit" src="/icons/edit3.png" alt="edit icon" onClick={handleOpenPriorityCreator} />
            <img className="priority_delete" src="/icons/delete.png" alt="delete icon" onClick={deletePriority} />
          </div>
        </div>
        <h3 className="priority_title">{title}</h3>
        {content && <div className="priority_content">{content}</div>}
      </PriorityStyled>
    </>
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
        transform: "scale(99.7%)",
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
          flex: 1,
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

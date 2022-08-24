import React from "react";
import styled from "styled-components";
import { usePriorityContext } from "../../contexts/priorityContext";
import { SinglePriority } from "../../utils/interfaces";
import { Priority } from "../Priority/priority";

const PriorityView = () => {
  const { priorities } = usePriorityContext();
  return (
    <PriortyViewStyled>
      <h2 className="priority-heading"> Priorities </h2>
      {priorities.map(({ priority, category }: SinglePriority) => {
        return (
          <Priority
            id={priority.id}
            key={priority.id}
            title={priority.title}
            content={priority.content}
            dateCreated={priority.dateCreated}
            status={priority.status}
          />
        );
      })}
    </PriortyViewStyled>
  );
};

const PriortyViewStyled = styled.div<{}>(() => {
  return {
    ".priority-heading": {
      margin: "15px",
    },
  };
});

export default PriorityView;

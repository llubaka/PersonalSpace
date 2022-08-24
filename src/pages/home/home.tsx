import { useCallback, useState } from "react";
import styled from "styled-components";
import { Button } from "../../components/Button";
import { Priority } from "../../components/Priority";
import PriorityView from "../../components/PriorityView/priorityView";
import { PriorityCreator } from "../../components/serviceComponents/priorityCreator";
import { TaskCreator } from "../../components/serviceComponents/taskCreator";
import TaskView from "../../components/TaskView/taskView";
import { usePriorityContext } from "../../contexts/priorityContext";
import { SinglePriority } from "../../utils/interfaces";

export const Home = () => {
  const [openTaskCreator, setOpenTaskCreator] = useState(false);
  const [openPriorityCreator, setOpenPriorityCreator] = useState(false);

  const handleCloseTaskCreator = useCallback(() => {
    setOpenTaskCreator(false);
  }, [setOpenTaskCreator]);

  const handleClosePriorityCreator = useCallback(() => {
    setOpenPriorityCreator(false);
  }, [setOpenPriorityCreator]);

  return (
    <HomeStyled>
      <div className="logo">Personal space</div>
      <Button onClick={() => setOpenTaskCreator(true)}> Open Task Creator </Button>
      <Button onClick={() => setOpenPriorityCreator(true)}> Open Priority Creator </Button>
      {openTaskCreator && <TaskCreator handleOnClose={handleCloseTaskCreator} />}
      {openPriorityCreator && <PriorityCreator handleOnClose={handleClosePriorityCreator} />}
      <TaskView />
      <PriorityView />
    </HomeStyled>
  );
};

const HomeStyled = styled.div<{}>(() => {
  return {
    ".logo": {
      display: "inline-block",
      fontSize: "24px",
      fontWeight: "700",
    },
  };
});

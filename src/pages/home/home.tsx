import { useCallback, useState } from "react";
import { Button } from "../../components/Button";
import { Priority } from "../../components/Priority";
import { PriorityCreator } from "../../components/serviceComponents/priorityCreator";
import { TaskCreator } from "../../components/serviceComponents/taskCreator";
import TaskView from "../../components/TaskView/taskView";
import { usePriorityContext } from "../../contexts/priorityContext";
import { SinglePriority } from "../../utils/interfaces";

export const Home = () => {
  const { priorities } = usePriorityContext();

  const [openTaskCreator, setOpenTaskCreator] = useState(false);
  const [openPriorityCreator, setOpenPriorityCreator] = useState(false);

  const handleCloseTaskCreator = useCallback(() => {
    setOpenTaskCreator(false);
  }, [setOpenTaskCreator]);

  const handleClosePriorityCreator = useCallback(() => {
    setOpenPriorityCreator(false);
  }, [setOpenPriorityCreator]);

  return (
    <div>
      Personal space
      <Button onClick={() => setOpenTaskCreator(true)}> Open Task Creator </Button>
      <Button onClick={() => setOpenPriorityCreator(true)}> Open Priority Creator </Button>
      {openTaskCreator && <TaskCreator handleOnClose={handleCloseTaskCreator} />}
      {openPriorityCreator && <PriorityCreator handleOnClose={handleClosePriorityCreator} />}
      <h2> Tasks </h2>
      <TaskView />
      <h2> Priorities </h2>
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
    </div>
  );
};

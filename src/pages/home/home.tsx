import { useCallback, useState } from "react";
import { Priority } from "../../components/Priority";
import { PriorityCreator } from "../../components/serviceComponents/priorityCreator";
import { TaskCreator } from "../../components/serviceComponents/taskCreator";
import { Task } from "../../components/Task";
import { usePriorityContext } from "../../contexts/priorityContext";
import { useTaskContext } from "../../contexts/taskContext";
import { SinglePriority, SingleTask } from "../../utils/interfaces";

export const Home = () => {
  const { tasks } = useTaskContext();
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
      <button onClick={() => setOpenTaskCreator(true)}> Open Task Creator </button>
      <button onClick={() => setOpenPriorityCreator(true)}> Open Priority Creator </button>
      {openTaskCreator && <TaskCreator handleOnClose={handleCloseTaskCreator} />}
      {openPriorityCreator && <PriorityCreator handleOnClose={handleClosePriorityCreator} />}
      {tasks.map(({ task, category }: SingleTask) => {
        return (
          <Task
            key={task.title}
            title={task.title}
            content={task.content}
            dateCreated={task.dateCreated}
            dateEnd={task.dateEnd}
            dateStart={task.dateStart}
          />
        );
      })}
      {priorities.map(({ priority, category }: SinglePriority) => {
        return (
          <Priority
            key={priority.title}
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

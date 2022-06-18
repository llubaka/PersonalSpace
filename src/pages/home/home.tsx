import { useCallback, useState } from "react";
import { TaskCreator } from "../../components/serviceComponents/taskCreator";
import { Task } from "../../components/Task";
import { useTaskContext } from "../../contexts/taskContext";
import { SingleTask } from "../../utils/interfaces";

export const Home = () => {
  const { tasks } = useTaskContext();
  const [openTaskCreator, setOpenTaskCreator] = useState(false);

  const handleCloseTaskCreator = useCallback(() => {
    setOpenTaskCreator(false);
  }, []);

  return (
    <div>
      Main Page
      <button onClick={() => setOpenTaskCreator(true)}> Open Task Creator </button>
      {openTaskCreator && <TaskCreator handleOnClose={handleCloseTaskCreator} />}
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
    </div>
  );
};

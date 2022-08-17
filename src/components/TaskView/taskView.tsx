import { useState } from "react";
import { useTaskContext } from "../../contexts/taskContext";
import { SingleTask } from "../../utils/interfaces";
import { Task } from "../Task/task";

enum OrderType {
  ASCENDING,
  DESCENDING,
}

enum OrderDate {
  start = "dateStart",
  end = "dateEnd",
}

const TaskView = () => {
  const { tasks, setTasks } = useTaskContext();
  const [currOrder, setCurrOrder] = useState(OrderType.ASCENDING);

  const compareDates = (a: SingleTask, b: SingleTask, orderDate = OrderDate.start) => {
    const orderObj = {
      [OrderType.ASCENDING]: { x: 1, y: -1 },
      [OrderType.DESCENDING]: { x: -1, y: 1 },
    };
    if (a.task[orderDate] < b.task[orderDate]) {
      return orderObj[currOrder].x;
    }
    if (a.task[orderDate] > b.task[orderDate]) {
      return orderObj[currOrder].y;
    }
    return 0;
  };

  const handleOrder = () => {
    setCurrOrder((curr) => {
      if (curr === OrderType.ASCENDING) return OrderType.DESCENDING;
      return OrderType.ASCENDING;
    });
    setTasks((curr: Array<SingleTask>) => {
      return [...curr].sort(compareDates);
    });
  };

  const handleOrderByEndDate = () => {
    setCurrOrder((curr) => {
      if (curr === OrderType.ASCENDING) return OrderType.DESCENDING;
      return OrderType.ASCENDING;
    });
    setTasks((curr: Array<SingleTask>) => {
      return [...curr].sort((a, b) => compareDates(a, b, OrderDate.end));
    });
  };

  return (
    <div>
      <button onClick={handleOrder}> Date order by start</button>
      <button onClick={handleOrderByEndDate}> Date order by end</button>
      <button> Category order</button>
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

export default TaskView;

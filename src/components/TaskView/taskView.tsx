import { useState } from "react";
import styled from "styled-components";
import { useTaskContext } from "../../contexts/taskContext";
import { SingleTask } from "../../utils/interfaces";
import { OrderButton } from "../OrderButton";
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
    <TaskViewStyled>
      <h2 className="task-heading"> Tasks </h2>
      <div className="buttons-container">
        <OrderButton onClick={handleOrder}> Date order by start</OrderButton>
        <OrderButton onClick={handleOrderByEndDate}> Date order by end</OrderButton>
        <OrderButton> Category order</OrderButton>
      </div>
      {tasks.map(({ task, category }: SingleTask) => {
        return (
          <Task
            id={task.id}
            key={task.id}
            title={task.title}
            content={task.content}
            dateCreated={task.dateCreated}
            dateEnd={task.dateEnd}
            dateStart={task.dateStart}
          />
        );
      })}
    </TaskViewStyled>
  );
};

const TaskViewStyled = styled.div<{}>(() => {
  return {
    ".buttons-container": {
      margin: "6px",
      "& > button": {
        marginLeft: "10px",
      },
    },
    ".task-heading": {
      margin: "15px",
    },
  };
});

export default TaskView;

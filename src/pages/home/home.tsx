import React from "react";
import Task from "../../components/Task";

const Home = () => {
  return (
    <div>
      Main Page
      <Task
        title="The title"
        content="This is content of the task."
        dateCreated={new Date()}
        dateEnd={new Date(2024, 5, 21)}
        dateStart={new Date(2020, 5, 21)}
      />
      <Task
        title="The title"
        content="This is content of the task."
        dateCreated={new Date()}
        dateEnd={new Date(2020, 5, 21)}
        dateStart={new Date(2019, 5, 21)}
      />
      <Task
        title="The title"
        content="This is content of the task."
        dateCreated={new Date()}
        dateEnd={new Date(2026, 5, 21)}
        dateStart={new Date(2024, 5, 21)}
      />
      <Task
        title="The title"
        content="This is content of the task."
        dateCreated={new Date()}
        dateEnd={new Date(2026, 5, 21)}
        dateStart={new Date(2024, 5, 21)}
        isFinished
      />
      <Task
        title="The title"
        content="This is content of the task."
        dateCreated={new Date()}
        dateEnd={new Date(2026, 5, 21)}
        dateStart={new Date(2024, 5, 21)}
        isFinished
        customShadowColor="rgba(12,55,233)"
      />
    </div>
  );
};

export default Home;

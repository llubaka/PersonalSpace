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
        dateEnd={new Date()}
        dateStart={new Date()}
      />
    </div>
  );
};

export default Home;

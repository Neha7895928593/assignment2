import React, { useEffect, useState } from 'react';
import TaskInput from './TaskInput';

function TaskList() {
  const [tasks, setTasks] = useState([]);
  function getdata(){
    fetch('http://localhost:4000/tasks')
    .then((response) => response.json())
    .then((data) => setTasks(data.tasks))
    .catch((error) => console.error(error));

  }

  useEffect(() => {
    getdata()
   
  }, []);

  return (
    <div>
      <TaskInput getdata={getdata}  />
      <h1>Tasks List</h1>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>{task}</li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;

import React, { useState } from 'react';


function TaskInput(props) {
  const [task, setTask] = useState('');

  const handleAddTask = () => {
    // Send a POST request to add the task to the backend API
    fetch('http://localhost:4000/addTask', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ task }),
    })
      .then((response) => {
        if (response.status === 201) {
          setTask('');
          alert('Task added successfully.');
          props.getdata()
        } else {
          alert('Failed to add task. Please try again.');
        }
      })
      .catch((error) => console.error(error));
  };

  return (
    <div>
      <h2>To Do List App</h2>
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Enter task"
      />
      <button onClick={handleAddTask}>Add Task</button>
    </div>
  );
}

export default TaskInput
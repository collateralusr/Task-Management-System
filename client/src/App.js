// src/App.js
import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
  });

  useEffect(() => {
    fetch('/api/tasks')
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((error) => console.error('Error fetching tasks:', error));
  }, []);

  const handleInputChange = (e) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };

  const handleAddTask = () => {
    fetch('/api/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTask),
    })
      .then((res) => res.json())
      .then((data) => {
        setTasks([...tasks, data]);
        setNewTask({
          title: '',
          description: '',
        });
      })
      .catch((error) => console.error('Error adding task:', error));
  };

  const handleDeleteTask = (id) => {
    fetch(`/api/tasks/${id}`, {
      method: 'DELETE',
    })
      .then(() => setTasks(tasks.filter((task) => task._id !== id)))
      .catch((error) => console.error('Error deleting task:', error));
  };

  return (
    <div className="App">
      <h1>Task Manager</h1>
      <div>
        <h2>Tasks</h2>
        <ul>
          {tasks.map((task) => (
            <li key={task._id}>
              {task.title} - {task.description}{' '}
              <button onClick={() => handleDeleteTask(task._id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
      <form>
        <label>
          Title:
          <input type="text" name="title" value={newTask.title} onChange={handleInputChange} />
        </label>
        <label>
          Description:
          <input type="text" name="description" value={newTask.description} onChange={handleInputChange} />
        </label>
        <button type="button" onClick={handleAddTask}>
          Add Task
        </button>
      </form>
    </div>
  );
}

export default App;

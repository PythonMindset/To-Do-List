import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  const fetchTasks = async () => {
    try {
      const res = await axios.get("http://localhost:5000/tasks");
      setTasks(res.data);
    } catch (err) {
      console.error("Error fetching tasks", err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async () => {
    if (!newTask) return;
    try {
      const res = await axios.post("http://localhost:5000/tasks", { task: newTask });
      setTasks([...tasks, res.data]);
      setNewTask("");
    } catch (err) {
      console.error("Error adding task", err);
    }
  };

  const toggleTask = async (id, completed) => {
    try {
      await axios.put(`http://localhost:5000/tasks/${id}`, { completed: !completed });
      fetchTasks();
    } catch (err) {
      console.error("Error updating task", err);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/tasks/${id}`);
      fetchTasks();
    } catch (err) {
      console.error("Error deleting task", err);
    }
  };

  return (
    <div className="app">
      <h1>📝 My To-Do List</h1>
      <div className="input-container">
        <input
          type="text"
          placeholder="Add a new task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button onClick={addTask}>Add</button>
      </div>
      <ul className="task-list">
        {tasks.map((t) => (
          <li key={t.id} className={t.completed ? "completed" : ""}>
            <span onClick={() => toggleTask(t.id, t.completed)}>{t.task}</span>
            <button className="delete-btn" onClick={() => deleteTask(t.id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

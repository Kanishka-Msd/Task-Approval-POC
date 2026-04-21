import React, { useEffect, useState } from 'react';
import './App.css';
import { fetchTasks } from './api';
import CreateRequestForm from './components/CreateRequestForm';
import TaskList from './components/TaskList';
import ApprovalScreen from './components/ApprovalScreen';

function App() {
  const [tasks, setTasks] = useState([]);
  const [userFilter, setUserFilter] = useState('');

  const loadTasks = async () => {
    try {
      const result = await fetchTasks(userFilter);
      const taskList = Array.isArray(result?.data?.tasks) ? result.data.tasks : [];
      setTasks(taskList);
    } catch (error) {
      console.error('Failed to load tasks:', error);
      setTasks([]);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleClear = async () => {
    setUserFilter('');
    try {
      const result = await fetchTasks('');
      const taskList = Array.isArray(result?.data?.tasks) ? result.data.tasks : [];
      setTasks(taskList);
    } catch (error) {
      console.error('Failed to clear filter:', error);
      setTasks([]);
    }
  };

  return (
    <div className="app-container">
      <h1>Task + Approval Workflow App</h1>

      <div className="filter-bar">
        <input
          type="text"
          placeholder="Filter by user (creator or approver)"
          value={userFilter}
          onChange={(e) => setUserFilter(e.target.value)}
        />
        <button onClick={loadTasks}>Search</button>
        <button onClick={handleClear}>Clear</button>
      </div>

      <div className="grid">
        <div className="card">
          <h2>Create Request</h2>
          <CreateRequestForm onCreated={loadTasks} />
        </div>

        <div className="card">
          <h2>Approval Screen</h2>
          <ApprovalScreen tasks={tasks} onStatusChange={loadTasks} />
        </div>
      </div>

      <div className="card full-width">
        <h2>Task List</h2>
        <TaskList tasks={tasks} />
      </div>
    </div>
  );
}

export default App;
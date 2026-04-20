import React, { useEffect, useState, useCallback } from 'react';
import './App.css';
import { fetchTasks } from './api';
import CreateRequestForm from './components/CreateRequestForm';
import TaskList from './components/TaskList';
import ApprovalScreen from './components/ApprovalScreen';

function App() {
  const [tasks, setTasks] = useState([]);
  const [userFilter, setUserFilter] = useState('');
  const [loading, setLoading] = useState(false);

  const loadTasks = useCallback(async (filter = userFilter) => {
    setLoading(true);
    try {
      const result = await fetchTasks(filter);
      if (result.success && result.data) {
        setTasks(result.data.tasks || []);
      } else {
        setTasks([]);
      }
    } catch (error) {
      console.error('Failed to load tasks:', error);
      setTasks([]);
    } finally {
      setLoading(false);
    }
  }, [userFilter]);

  const handleUserFilter = useCallback((user) => {
    setUserFilter(user);
    loadTasks(user);
  }, [loadTasks]);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  // Polling for real-time updates every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      loadTasks();
    }, 30000);

    return () => clearInterval(interval);
  }, [loadTasks]);

  return (
    <div className="app-container">
      <h1>Task Approval Workflow App</h1>

      {loading && <div className="loading">Loading tasks...</div>}

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
        <TaskList tasks={tasks} onUserFilter={handleUserFilter} />
      </div>
    </div>
  );
}

export default App;
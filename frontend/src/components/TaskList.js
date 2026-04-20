import React, { useState } from 'react';

function TaskList({ tasks, onUserFilter }) {
  const [selectedUser, setSelectedUser] = useState('');

  const getBadgeClass = (status) => {
    if (status === 'Approved') return 'badge approved';
    if (status === 'Rejected') return 'badge rejected';
    return 'badge pending';
  };

  const handleUserFilter = (user) => {
    setSelectedUser(user);
    onUserFilter(user);
  };

  // Get unique users for filter dropdown
  const users = [...new Set([
    ...tasks.map(task => task.created_by),
    ...tasks.map(task => task.assigned_to)
  ])].filter(Boolean);

  return (
    <div className="task-list">
      <div className="task-list-header">
        <h3>Task List</h3>
        <div className="filter-controls">
          <label htmlFor="user-filter">Filter by user: </label>
          <select
            id="user-filter"
            value={selectedUser}
            onChange={(e) => handleUserFilter(e.target.value)}
          >
            <option value="">All tasks</option>
            {users.map(user => (
              <option key={user} value={user}>{user}</option>
            ))}
          </select>
        </div>
      </div>

      <table className="task-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Created By</th>
            <th>Assigned To</th>
            <th>Status</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {tasks.length === 0 ? (
            <tr>
              <td colSpan="7" style={{ textAlign: 'center' }}>
                No tasks found
              </td>
            </tr>
          ) : (
            tasks.map((task) => (
              <tr key={task.id}>
                <td>{task.id}</td>
                <td>{task.title}</td>
                <td>{task.description || '-'}</td>
                <td>{task.created_by}</td>
                <td>{task.assigned_to}</td>
                <td>
                  <span className={getBadgeClass(task.status)}>
                    {task.status}
                  </span>
                </td>
                <td>{new Date(task.created_at).toLocaleString()}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default TaskList;
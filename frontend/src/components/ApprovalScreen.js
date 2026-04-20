import React, { useState } from 'react';
import { updateTaskStatus } from '../api';

function ApprovalScreen({ tasks, onStatusChange }) {
  const [updating, setUpdating] = useState(null);
  const [error, setError] = useState(null);

  const pendingTasks = tasks.filter((task) => task.status === 'Pending');

  const handleAction = async (id, status) => {
    setUpdating(id);
    setError(null);

    try {
      await updateTaskStatus(id, status);
      onStatusChange();
    } catch (err) {
      setError(err.message);
    } finally {
      setUpdating(null);
    }
  };

  return (
    <div className="approval-screen">
      <h3>Pending Approvals</h3>

      {error && <div className="error-message">{error}</div>}

      {pendingTasks.length === 0 ? (
        <p>No pending approvals.</p>
      ) : (
        pendingTasks.map((task) => (
          <div key={task.id} className="approval-item" role="region" aria-label={`Approval item: ${task.title}`}>
            <h4 id={`title-${task.id}`}>{task.title}</h4>
            <p>{task.description}</p>
            <p><strong>Created By:</strong> {task.created_by}</p>
            <p><strong>Assigned To:</strong> {task.assigned_to}</p>
            <p><strong>Created:</strong> {new Date(task.created_at).toLocaleDateString()}</p>

            <div className="actions">
              <button
                className="approve-btn"
                onClick={() => handleAction(task.id, 'Approved')}
                disabled={updating === task.id}
                aria-label={`Approve ${task.title}`}
              >
                {updating === task.id ? 'Approving...' : 'Approve'}
              </button>

              <button
                className="reject-btn"
                onClick={() => handleAction(task.id, 'Rejected')}
                disabled={updating === task.id}
                aria-label={`Reject ${task.title}`}
              >
                {updating === task.id ? 'Rejecting...' : 'Reject'}
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default ApprovalScreen;
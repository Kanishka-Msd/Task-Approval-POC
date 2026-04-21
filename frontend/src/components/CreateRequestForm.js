import React, { useState } from 'react';
import { createTask } from '../api';

function CreateRequestForm({ onCreated }) {
  const [form, setForm] = useState({
    title: '',
    description: '',
    created_by: '',
    assigned_to: '',
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await createTask(form);

      if (result?.success && result?.data?.id) {
        alert('Task created successfully');

        setForm({
          title: '',
          description: '',
          created_by: '',
          assigned_to: '',
        });

        onCreated();
      } else {
        alert(result?.error || 'Failed to create task');
      }
    } catch (error) {
      console.error('Create task failed:', error);
      alert(error.message || 'Failed to create task');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <input
        name="title"
        placeholder="Title"
        value={form.title}
        onChange={handleChange}
        required
      />

      <textarea
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
      />

      <input
        name="created_by"
        placeholder="Created by"
        value={form.created_by}
        onChange={handleChange}
        required
      />

      <input
        name="assigned_to"
        placeholder="Assigned approver"
        value={form.assigned_to}
        onChange={handleChange}
        required
      />

      <button type="submit">Create Task</button>
    </form>
  );
}

export default CreateRequestForm;
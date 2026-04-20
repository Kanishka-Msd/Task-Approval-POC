import React, { useState } from 'react';
import { createTask } from '../api';

function CreateRequestForm({ onCreated }) {
  const [form, setForm] = useState({
    title: '',
    description: '',
    created_by: '',
    assigned_to: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!form.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (form.title.length > 255) {
      newErrors.title = 'Title must be less than 255 characters';
    }
    if (!form.created_by.trim()) {
      newErrors.created_by = 'Creator is required';
    }
    if (!form.assigned_to.trim()) {
      newErrors.assigned_to = 'Approver is required';
    }
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      await createTask(form);
      setForm({
        title: '',
        description: '',
        created_by: '',
        assigned_to: '',
      });
      onCreated();
    } catch (error) {
      setErrors({ submit: error.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <div className="form-group">
        <input
          name="title"
          placeholder="Task Title"
          value={form.title}
          onChange={handleChange}
          className={errors.title ? 'error' : ''}
          required
        />
        {errors.title && <span className="error-message">{errors.title}</span>}
      </div>

      <div className="form-group">
        <textarea
          name="description"
          placeholder="Task Description"
          value={form.description}
          onChange={handleChange}
          rows="3"
        />
      </div>

      <div className="form-group">
        <input
          name="created_by"
          placeholder="Your Username"
          value={form.created_by}
          onChange={handleChange}
          className={errors.created_by ? 'error' : ''}
          required
        />
        {errors.created_by && <span className="error-message">{errors.created_by}</span>}
      </div>

      <div className="form-group">
        <input
          name="assigned_to"
          placeholder="Approver Username"
          value={form.assigned_to}
          onChange={handleChange}
          className={errors.assigned_to ? 'error' : ''}
          required
        />
        {errors.assigned_to && <span className="error-message">{errors.assigned_to}</span>}
      </div>

      {errors.submit && <div className="error-message">{errors.submit}</div>}

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Creating...' : 'Create Task'}
      </button>
    </form>
  );
}

export default CreateRequestForm;
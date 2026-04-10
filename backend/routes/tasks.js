const express = require('express');
const router = express.Router();
const db = require('../db');

// Create task
router.post('/', async (req, res) => {
  try {
    const { title, description, created_by, assigned_to } = req.body;

    if (!title || !created_by || !assigned_to) {
      return res.status(400).json({
        error: 'title, created_by, and assigned_to are required',
      });
    }

    const [result] = await db.execute(
      `INSERT INTO tasks (title, description, created_by, assigned_to, status)
       VALUES (?, ?, ?, ?, 'Pending')`,
      [title, description || '', created_by, assigned_to]
    );

    res.status(201).json({
      message: 'Task created successfully',
      id: result.insertId,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create task' });
  }
});

// Fetch tasks by user
router.get('/', async (req, res) => {
  try {
    const { user } = req.query;

    let query = `
      SELECT id, title, description, created_by, assigned_to, status, created_at
      FROM tasks
    `;
    let params = [];

    if (user) {
      query += ' WHERE created_by = ? OR assigned_to = ?';
      params = [user, user];
    }

    query += ' ORDER BY created_at DESC';

    const [rows] = await db.execute(query, params);
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
});

// Update task status
router.put('/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['Pending', 'Approved', 'Rejected'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status value' });
    }

    const [result] = await db.execute(
      'UPDATE tasks SET status = ? WHERE id = ?',
      [status, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.json({ message: 'Task status updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update task status' });
  }
});

module.exports = router;
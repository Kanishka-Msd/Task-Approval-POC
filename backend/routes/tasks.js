const express = require('express');
const router = express.Router();
const Task = require('../models/task');
const { authenticateToken } = require('../middleware/auth');

// Create task
router.post('/', async (req, res, next) => {
  try {
    const { title, description, created_by, assigned_to } = req.body;

    const id = await Task.create({ title, description, created_by, assigned_to });

    res.status(201).json({
      success: true,
      data: { id },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    next(error);
  }
});

// Fetch tasks
router.get('/', async (req, res, next) => {
  try {
    const { user, page = 1, limit = 20 } = req.query;

    const offset = (page - 1) * limit;
    const tasks = await Task.findAll({
      user,
      limit: parseInt(limit),
      offset: parseInt(offset)
    });

    res.json({
      success: true,
      data: { tasks },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    next(error);
  }
});

// Update task status - requires authentication
router.put('/:id/status', authenticateToken, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const userId = req.user.userId; // From JWT

    const updatedTask = await Task.updateStatus(id, status, userId);

    res.json({
      success: true,
      data: updatedTask,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
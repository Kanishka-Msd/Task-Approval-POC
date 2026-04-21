const express = require('express');
const router = express.Router();
console.log('Loading task routes...');
const Task = require('../models/task');
// const { authenticateToken } = require('../middleware/auth'); // not needed for POC

// Create task
router.post('/', async (req, res, next) => {
  try {
    const { title, description, created_by, assigned_to } = req.body;

    const id = await Task.create({
      title,
      description,
      created_by,
      assigned_to
    });

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
  console.log(' GET /api/tasks hit');
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

// Update task status - no authentication for POC
router.put('/:id/status', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['Pending', 'Approved', 'Rejected'].includes(status)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid status value'
      });
    }

    // Pass null as userId for POC if your model expects a third argument
    const updatedTask = await Task.updateStatus(id, status, null);

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
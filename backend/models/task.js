const pool = require('../db');

class Task {
  static async create({ title, description, created_by, assigned_to }) {
    // Validation
    if (!title || typeof title !== 'string' || title.trim().length === 0) {
      throw new Error('Title is required and must be a non-empty string');
    }
    if (title.length > 255) {
      throw new Error('Title must be less than 255 characters');
    }
    if (!created_by || typeof created_by !== 'string') {
      throw new Error('Created by is required');
    }
    if (!assigned_to || typeof assigned_to !== 'string') {
      throw new Error('Assigned to is required');
    }

    const [result] = await pool.execute(
      'INSERT INTO tasks (title, description, created_by, assigned_to, status) VALUES (?, ?, ?, ?, ?)',
      [title.trim(), description || null, created_by, assigned_to, 'Pending']
    );

    return result.insertId;
  }

  static async findAll(filters = {}) {
    let query = 'SELECT * FROM tasks';
    const params = [];
    const conditions = [];

    if (filters.user) {
      conditions.push('(created_by = ? OR assigned_to = ?)');
      params.push(filters.user, filters.user);
    }

    if (filters.status) {
      conditions.push('status = ?');
      params.push(filters.status);
    }

    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ');
    }

    query += ' ORDER BY created_at DESC';

    if (filters.limit) {
      query += ` LIMIT ${parseInt(filters.limit)}`;
    }

    if (filters.offset) {
      query += ` OFFSET ${parseInt(filters.offset)}`;
    }

    const [rows] =
      params.length > 0 ? await pool.execute(query, params) : await pool.query(query);

    return rows;
  }

  static async findById(id) {
    const [rows] = await pool.execute('SELECT * FROM tasks WHERE id = ?', [id]);
    return rows[0];
  }

  static async updateStatus(id, status, userId = null) {
    // Validation
    if (!['Approved', 'Rejected'].includes(status)) {
      throw new Error('Invalid status');
    }

    const task = await this.findById(id);
    if (!task) {
      throw new Error('Task not found');
    }

    if (task.status !== 'Pending') {
      throw new Error('Task is not in pending status');
    }

    // For POC/MVP, skip assigned-user enforcement
    // In production, compare task.assigned_to with the authenticated user

    await pool.execute(
      'UPDATE tasks SET status = ? WHERE id = ?',
      [status, id]
    );

    return { ...task, status };
  }
}

module.exports = Task;
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const taskRoutes = require('./routes/tasks');
console.log(' Loaded task routes:');

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ message: 'Server is running' });
});

app.use('/api/tasks', taskRoutes);

app.use((err, req, res, next) => {
  console.error('Backend error:', err);
  res.status(err.status || 500).json({
    success: false,
    error: err.message || 'Internal Server Error',
    timestamp: new Date().toISOString(),
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
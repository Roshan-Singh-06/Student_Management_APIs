import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import pool from './config/db.js';

import schoolRoutes from './routes/schoolRoutes.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// API Routes
app.use('/api', schoolRoutes);

// Error handler (for ApiError)
app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});

const PORT = process.env.PORT || 5000;

// Start server first, then test database connection and log schools
app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  try {
    const [rows] = await pool.query('SELECT * FROM schools');
    console.log('✅ Successfully connected to MySQL database');
    console.log('Schools:', rows);
  } catch (error) {
    console.error('Database connection failed:', error);
    process.exit(1); // exit app if DB connection fails
  }
});

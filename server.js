import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import mysql from 'mysql2';
import schoolRoutes from './routes/schoolRoutes.js';

dotenv.config();

const app = express();
app.use(bodyParser.json());

// MySQL Database connection setup
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Test database connection route
app.get('/test-db', async (req, res) => {
  try {
      const connection = await pool.promise().getConnection();
      await connection.ping(); // Test DB connection
      res.status(200).send("Database connection is successful!");
      console.log("connect");
      connection.release();
  } catch (err) {
      res.status(500).send("Database connection failed: " + err.message);
  }
});

// Routes
app.use('/api/schools', schoolRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

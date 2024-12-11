import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import schoolRoutes from './routes/schoolRoutes.js';

dotenv.config();

const app = express();
app.use(bodyParser.json());

// Routes
app.use('/api/schools', schoolRoutes);

// Test endpoint
app.get('/', (req, res) => {
    res.send('API is running...');
});

export default app;

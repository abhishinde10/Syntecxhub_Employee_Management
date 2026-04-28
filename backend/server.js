import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import employeeRoutes from './routes/employeeRoutes.js';

// Load env variables
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
// Ensure CORS handles incoming requests from frontend origins
app.use(cors());
app.use(express.json()); // Parses incoming JSON requests

// API Routes
app.use('/api/employees', employeeRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('Employee Management API is running...');
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});

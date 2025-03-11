import express from 'express';
import dotenv from 'dotenv';
import apiRoutes from './routes/index.js'; 

dotenv.config();

const app = express();
const PORT = process.env.APP_PORT || 3001; 

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Use API Routes
app.use('/api', apiRoutes); 

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});

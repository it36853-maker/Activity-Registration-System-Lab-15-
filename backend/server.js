import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import activityRoutes from './routes/activityRoutes.js';
import registrationRoutes from './routes/registrationRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/activities', activityRoutes);
app.use('/api/registrations', registrationRoutes);

// Root Route & 404
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Activity Registration API (Lab 15 Project)' });
});

app.use((req, res) => {
  res.status(404).json({ success: false, message: '404 Endpoint Not Found' });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port: http://localhost:${PORT}`);
});

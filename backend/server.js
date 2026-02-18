import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import db from './db.js';

// Import routes
import authRoutes from './routes/auth.js';
import eventsRoutes from './routes/events.js';
import carsRoutes from './routes/cars.js';
import tourismRoutes from './routes/tourism.js';
import partnersRoutes from './routes/partners.js';
import staffRoutes from './routes/staff.js';
import bookingsRoutes from './routes/bookings.js';
import dashboardRoutes from './routes/dashboard.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Request logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/events', eventsRoutes);
app.use('/api/cars', carsRoutes);
app.use('/api/tourism', tourismRoutes);
app.use('/api/partners', partnersRoutes);
app.use('/api/staff', staffRoutes);
app.use('/api/bookings', bookingsRoutes);
app.use('/api/dashboard', dashboardRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ 
    error: 'Internal server error',
    message: err.message 
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`✅ API available at http://localhost:${PORT}/api`);
  console.log(`✅ Environment: ${process.env.NODE_ENV || 'development'}`);
});
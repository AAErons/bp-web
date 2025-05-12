import express from 'express';
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// CORS middleware
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Test endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Hello from Express',
    method: req.method,
    time: new Date().toISOString(),
    environment: process.env.NODE_ENV
  });
});

// Handle OPTIONS requests
app.options('*', (req, res) => {
  res.status(200).end();
});

// Export the Express app
export default app; 
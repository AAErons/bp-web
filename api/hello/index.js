// Simple Vercel serverless function
export default function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Handle GET request
  if (req.method === 'GET') {
    return res.status(200).json({
      message: 'Hello from Vercel Serverless Function',
      method: req.method,
      time: new Date().toISOString(),
      environment: process.env.NODE_ENV,
      path: req.url
    });
  }

  // Handle other methods
  return res.status(405).json({
    error: 'Method not allowed',
    allowedMethods: ['GET', 'OPTIONS']
  });
} 
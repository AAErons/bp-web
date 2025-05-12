// Minimal test endpoint in JavaScript
module.exports = (req, res) => {
  // Basic CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Simple response
  res.status(200).json({
    message: 'Hello World',
    method: req.method,
    time: new Date().toISOString()
  });
}; 
// Vercel serverless function with file upload support
export default async function handler(req, res) {
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

  // Handle POST request for file upload
  if (req.method === 'POST') {
    try {
      // Log the request for debugging
      console.log('Received POST request:', {
        headers: req.headers,
        body: req.body,
        files: req.files
      });

      // For now, just return a success response
      // Later we'll add actual file upload handling
      return res.status(200).json({
        message: 'File upload endpoint working',
        method: req.method,
        time: new Date().toISOString(),
        received: {
          contentType: req.headers['content-type'],
          contentLength: req.headers['content-length']
        }
      });
    } catch (error) {
      console.error('Upload error:', error);
      return res.status(500).json({
        error: 'File upload failed',
        details: error.message
      });
    }
  }

  // Handle other methods
  return res.status(405).json({
    error: 'Method not allowed',
    allowedMethods: ['GET', 'POST', 'OPTIONS']
  });
} 
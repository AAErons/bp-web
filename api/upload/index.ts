import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Add request logging
  console.log('Request received:', {
    method: req.method,
    url: req.url,
    headers: req.headers,
    query: req.query,
  });

  try {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    // Handle preflight request
    if (req.method === 'OPTIONS') {
      console.log('Handling OPTIONS request');
      return res.status(200).end();
    }

    if (req.method !== 'POST') {
      console.log('Invalid method:', req.method);
      return res.status(405).json({ 
        error: 'Method not allowed',
        method: req.method,
        allowedMethods: ['POST', 'OPTIONS']
      });
    }

    // Log the request body
    console.log('Request body:', req.body);

    // For testing, just return a success response
    const response = {
      success: true,
      message: 'Test endpoint working',
      receivedMethod: req.method,
      receivedHeaders: req.headers,
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV,
    };

    console.log('Sending response:', response);
    return res.status(200).json(response);

  } catch (error) {
    // Log the full error
    console.error('Server error:', {
      error: error instanceof Error ? {
        message: error.message,
        stack: error.stack,
        name: error.name
      } : error,
      request: {
        method: req.method,
        url: req.url,
        headers: req.headers
      }
    });

    // Send a detailed error response
    return res.status(500).json({
      error: 'Internal server error',
      details: error instanceof Error ? {
        message: error.message,
        type: error.name
      } : 'Unknown error',
      timestamp: new Date().toISOString()
    });
  }
}

// Configure the API route
export const config = {
  api: {
    bodyParser: true,
  },
}; 
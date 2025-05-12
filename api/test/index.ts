import type { VercelRequest, VercelResponse } from '@vercel/node';

// Using a named export instead of default export
export const config = {
  runtime: 'edge', // Try using the Edge runtime
};

export default async function handler(
  request: VercelRequest,
  response: VercelResponse
) {
  // Set CORS headers
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle OPTIONS request
  if (request.method === 'OPTIONS') {
    return response.status(200).end();
  }

  // Handle POST request
  if (request.method === 'POST') {
    try {
      // Log the request for debugging
      console.log('Received POST request:', {
        headers: request.headers,
        body: request.body,
        query: request.query
      });

      return response.status(200).json({
        success: true,
        message: 'Test endpoint working',
        method: request.method,
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV
      });
    } catch (error) {
      console.error('Error in test endpoint:', error);
      return response.status(500).json({
        success: false,
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  // Handle other methods
  return response.status(405).json({
    success: false,
    error: 'Method not allowed',
    allowedMethods: ['POST', 'OPTIONS']
  });
} 
// Edge Runtime serverless function
export const config = {
  runtime: '@vercel/edge@0.1.0',
  regions: ['iad1'], // Washington, D.C. region
};

export default async function handler(request) {
  // Get the request method
  const method = request.method;

  // Handle OPTIONS request
  if (method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  }

  // Handle GET request
  if (method === 'GET') {
    return new Response(
      JSON.stringify({
        message: 'Hello from Edge Runtime',
        method: method,
        time: new Date().toISOString(),
        region: 'iad1',
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  }

  // Handle other methods
  return new Response(
    JSON.stringify({
      error: 'Method not allowed',
      allowedMethods: ['GET', 'OPTIONS'],
    }),
    {
      status: 405,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    }
  );
} 
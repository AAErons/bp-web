import { VercelRequest, VercelResponse } from '@vercel/node';
import { connectToDatabase, Gallery } from '../../src/lib/db';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  console.log(`[${req.method}] /api/galleries - Starting request handling`);
  console.log('Environment:', {
    NODE_ENV: process.env.NODE_ENV,
    MONGODB_URI: process.env.MONGODB_URI ? 'Set' : 'Not set',
    VERCEL_ENV: process.env.VERCEL_ENV,
    VERCEL_REGION: process.env.VERCEL_REGION
  });
  
  try {
    // Connect to database
    console.log('Connecting to database...');
    if (!process.env.MONGODB_URI) {
      const error = new Error('MONGODB_URI is not defined');
      console.error('Database configuration error:', error);
      return res.status(500).json({ 
        error: 'Database configuration error',
        details: 'MONGODB_URI environment variable is not set',
        timestamp: new Date().toISOString()
      });
    }

    try {
      await connectToDatabase();
      console.log('Database connection established');
    } catch (dbError) {
      console.error('Database connection error:', dbError);
      return res.status(500).json({
        error: 'Database connection error',
        details: dbError instanceof Error ? dbError.message : 'Unknown database error',
        timestamp: new Date().toISOString()
      });
    }

    // Set CORS headers
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    // Handle preflight
    if (req.method === 'OPTIONS') {
      console.log('Handling OPTIONS request');
      res.status(200).end();
      return;
    }

    switch (req.method) {
      case 'GET':
        console.log('Fetching all galleries');
        try {
          const galleries = await Gallery.find().sort({ eventDate: -1 });
          console.log(`Found ${galleries.length} galleries`);
          return res.status(200).json(galleries);
        } catch (error) {
          console.error('Error fetching galleries:', error);
          return res.status(500).json({ 
            error: 'Database query error',
            details: error instanceof Error ? error.message : 'Unknown error while fetching galleries',
            timestamp: new Date().toISOString()
          });
        }

      case 'POST':
        console.log('Creating new gallery:', req.body);
        try {
          const newGallery = new Gallery({
            ...req.body,
            id: crypto.randomUUID(),
            createdAt: new Date(),
            updatedAt: new Date(),
          });
          await newGallery.save();
          console.log('Gallery created successfully:', newGallery.id);
          return res.status(201).json(newGallery);
        } catch (error) {
          console.error('Error creating gallery:', error);
          return res.status(500).json({ 
            error: 'Database operation error',
            details: error instanceof Error ? error.message : 'Unknown error while creating gallery',
            timestamp: new Date().toISOString()
          });
        }

      default:
        console.log(`Method ${req.method} not allowed`);
        res.setHeader('Allow', ['GET', 'POST']);
        return res.status(405).json({ 
          error: 'Method not allowed',
          details: `Method ${req.method} is not supported for this endpoint`,
          timestamp: new Date().toISOString()
        });
    }
  } catch (error) {
    console.error('Unhandled error in /api/galleries:', error);
    return res.status(500).json({ 
      error: 'Internal Server Error',
      details: error instanceof Error ? error.message : 'Unknown error',
      type: error instanceof Error ? error.constructor.name : typeof error,
      timestamp: new Date().toISOString()
    });
  }
} 
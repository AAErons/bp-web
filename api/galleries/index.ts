import { VercelRequest, VercelResponse } from '@vercel/node';
import { connectToDatabase, Gallery } from '../../src/lib/db.js';
import { randomUUID } from 'node:crypto';

// Cache the database connection
let cachedConnection: any = null;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Log the start of the request with more details
  console.log('=== Request Start ===');
  console.log(`[${req.method}] /api/galleries`);
  console.log('Headers:', JSON.stringify(req.headers, null, 2));
  console.log('Query:', JSON.stringify(req.query, null, 2));
  console.log('Body:', JSON.stringify(req.body, null, 2));
  console.log('Environment:', {
    NODE_ENV: process.env.NODE_ENV,
    MONGODB_URI: process.env.MONGODB_URI ? 'Set' : 'Not set',
    VERCEL_ENV: process.env.VERCEL_ENV,
    VERCEL_REGION: process.env.VERCEL_REGION,
    VERCEL_URL: process.env.VERCEL_URL,
    VERCEL_GIT_COMMIT_SHA: process.env.VERCEL_GIT_COMMIT_SHA,
    NODE_VERSION: process.version
  });
  
  try {
    // Set CORS headers first
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
      return res.status(200).end();
    }

    // Connect to database with connection caching
    console.log('Checking database connection...');
    if (!process.env.MONGODB_URI) {
      console.error('MONGODB_URI is not defined');
      return res.status(500).json({ 
        error: 'Database configuration error',
        details: 'MONGODB_URI environment variable is not set',
        timestamp: new Date().toISOString()
      });
    }

    try {
      if (!cachedConnection) {
        console.log('Establishing new database connection...');
        cachedConnection = await connectToDatabase();
        console.log('Database connection established successfully');
      } else {
        console.log('Using cached database connection');
      }
    } catch (dbError) {
      console.error('Database connection error:', {
        error: dbError,
        message: dbError instanceof Error ? dbError.message : 'Unknown error',
        stack: dbError instanceof Error ? dbError.stack : undefined,
        timestamp: new Date().toISOString()
      });
      // Reset cached connection on error
      cachedConnection = null;
      return res.status(500).json({
        error: 'Database connection error',
        details: dbError instanceof Error ? dbError.message : 'Unknown database error',
        timestamp: new Date().toISOString()
      });
    }

    switch (req.method) {
      case 'GET':
        console.log('Fetching all galleries');
        try {
          const galleries = await Gallery.find().sort({ eventDate: -1 }).lean().exec();
          console.log(`Found ${galleries.length} galleries`);
          return res.status(200).json(galleries);
        } catch (error) {
          console.error('Error fetching galleries:', {
            error,
            message: error instanceof Error ? error.message : 'Unknown error',
            stack: error instanceof Error ? error.stack : undefined,
            timestamp: new Date().toISOString()
          });
          return res.status(500).json({ 
            error: 'Database query error',
            details: error instanceof Error ? error.message : 'Unknown error while fetching galleries',
            timestamp: new Date().toISOString()
          });
        }

      case 'POST':
        console.log('Creating new gallery:', JSON.stringify(req.body, null, 2));
        try {
          // Validate required fields
          const { name, description, eventDate } = req.body;
          if (!name || !description || !eventDate) {
            console.error('Missing required fields:', { name, description, eventDate });
            return res.status(400).json({
              error: 'Validation error',
              details: 'Missing required fields: name, description, and eventDate are required',
              timestamp: new Date().toISOString()
            });
          }

          // Validate eventDate format
          const date = new Date(eventDate);
          if (isNaN(date.getTime())) {
            console.error('Invalid eventDate format:', eventDate);
            return res.status(400).json({
              error: 'Validation error',
              details: 'Invalid eventDate format. Please use ISO 8601 format (YYYY-MM-DD)',
              timestamp: new Date().toISOString()
            });
          }

          const newGallery = new Gallery({
            name,
            description,
            eventDate: date,
            id: randomUUID(),
            createdAt: new Date(),
            updatedAt: new Date(),
            images: []
          });

          console.log('Saving new gallery:', JSON.stringify(newGallery.toObject(), null, 2));
          const savedGallery = await newGallery.save();
          console.log('Gallery created successfully:', savedGallery.id);
          return res.status(201).json(savedGallery);
        } catch (error) {
          console.error('Error creating gallery:', {
            error,
            message: error instanceof Error ? error.message : 'Unknown error',
            stack: error instanceof Error ? error.stack : undefined,
            timestamp: new Date().toISOString()
          });
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
    console.error('Unhandled error in /api/galleries:', {
      error,
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      type: error instanceof Error ? error.constructor.name : typeof error,
      timestamp: new Date().toISOString()
    });
    return res.status(500).json({ 
      error: 'Internal Server Error',
      details: error instanceof Error ? error.message : 'Unknown error',
      type: error instanceof Error ? error.constructor.name : typeof error,
      timestamp: new Date().toISOString()
    });
  } finally {
    console.log('=== Request End ===');
  }
} 
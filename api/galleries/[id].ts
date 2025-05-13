import { VercelRequest, VercelResponse } from '@vercel/node';
import { connectToDatabase, Gallery } from '../../src/lib/db';
import type { Document } from 'mongoose';

// Cache the database connection
let cachedConnection: any = null;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { id } = req.query;

  // Log the start of the request with more details
  console.log('=== Request Start ===');
  console.log(`[${req.method}] /api/galleries/${id}`);
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

    if (!id || typeof id !== 'string') {
      console.error('Invalid gallery ID:', id);
      return res.status(400).json({
        error: 'Invalid request',
        details: 'Gallery ID is required and must be a string',
        timestamp: new Date().toISOString()
      });
    }

    switch (req.method) {
      case 'GET':
        console.log(`Fetching gallery with ID: ${id}`);
        try {
          const gallery = await Gallery.findOne({ id }).lean().exec();
          if (!gallery) {
            console.log(`Gallery not found with ID: ${id}`);
            return res.status(404).json({ 
              error: 'Gallery not found',
              details: `No gallery found with ID: ${id}`,
              timestamp: new Date().toISOString()
            });
          }
          console.log(`Found gallery: ${gallery.id}`);
          return res.status(200).json(gallery);
        } catch (error) {
          console.error('Error fetching gallery:', {
            error,
            message: error instanceof Error ? error.message : 'Unknown error',
            stack: error instanceof Error ? error.stack : undefined,
            timestamp: new Date().toISOString()
          });
          return res.status(500).json({ 
            error: 'Database query error',
            details: error instanceof Error ? error.message : 'Unknown error while fetching gallery',
            timestamp: new Date().toISOString()
          });
        }

      case 'PUT':
        console.log(`Updating gallery with ID: ${id}`);
        try {
          const updateData = { ...req.body };
          // Remove MongoDB operators from the update data
          const operators = Object.keys(updateData).filter(key => key.startsWith('$'));
          const updateDoc = operators.length > 0 
            ? updateData  // If we have operators, use the data as is
            : { $set: { ...updateData, updatedAt: new Date() } }; // Otherwise, wrap in $set

          console.log('Update document:', JSON.stringify(updateDoc, null, 2));
          const updatedGallery = await Gallery.findOneAndUpdate(
            { id },
            updateDoc,
            { new: true, runValidators: true }
          ).lean().exec();

          if (!updatedGallery) {
            console.log(`Gallery not found with ID: ${id}`);
            return res.status(404).json({ 
              error: 'Gallery not found',
              details: `No gallery found with ID: ${id}`,
              timestamp: new Date().toISOString()
            });
          }
          console.log(`Gallery updated successfully: ${updatedGallery.id}`);
          return res.status(200).json(updatedGallery);
        } catch (error) {
          console.error('Error updating gallery:', {
            error,
            message: error instanceof Error ? error.message : 'Unknown error',
            stack: error instanceof Error ? error.stack : undefined,
            timestamp: new Date().toISOString()
          });
          return res.status(500).json({ 
            error: 'Database operation error',
            details: error instanceof Error ? error.message : 'Unknown error while updating gallery',
            timestamp: new Date().toISOString()
          });
        }

      case 'DELETE':
        console.log(`Deleting gallery with ID: ${id}`);
        try {
          const deletedGallery = await Gallery.findOneAndDelete({ id }).lean().exec();
          if (!deletedGallery) {
            console.log(`Gallery not found with ID: ${id}`);
            return res.status(404).json({ 
              error: 'Gallery not found',
              details: `No gallery found with ID: ${id}`,
              timestamp: new Date().toISOString()
            });
          }
          console.log(`Gallery deleted successfully: ${deletedGallery.id}`);
          return res.status(200).json({ 
            message: 'Gallery deleted successfully',
            id: deletedGallery.id,
            timestamp: new Date().toISOString()
          });
        } catch (error) {
          console.error('Error deleting gallery:', {
            error,
            message: error instanceof Error ? error.message : 'Unknown error',
            stack: error instanceof Error ? error.stack : undefined,
            timestamp: new Date().toISOString()
          });
          return res.status(500).json({ 
            error: 'Database operation error',
            details: error instanceof Error ? error.message : 'Unknown error while deleting gallery',
            timestamp: new Date().toISOString()
          });
        }

      default:
        console.log(`Method ${req.method} not allowed`);
        res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
        return res.status(405).json({ 
          error: 'Method not allowed',
          details: `Method ${req.method} is not supported for this endpoint`,
          timestamp: new Date().toISOString()
        });
    }
  } catch (error) {
    console.error('Unhandled error in /api/galleries/[id]:', {
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
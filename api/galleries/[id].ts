import { VercelRequest, VercelResponse } from '@vercel/node';
import { connectToDatabase, Gallery } from '../../src/lib/db';
import type { Document } from 'mongoose';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { id } = req.query;

  // Connect to database
  await connectToDatabase();

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
    res.status(200).end();
    return;
  }

  try {
    switch (req.method) {
      case 'GET':
        // Get single gallery
        const gallery = await Gallery.findOne({ id: id as string }).exec();
        if (!gallery) {
          return res.status(404).json({ error: 'Gallery not found' });
        }
        res.status(200).json(gallery);
        break;

      case 'PUT':
        // Update gallery
        const updateData = { ...req.body };
        // Remove MongoDB operators from the update data
        const operators = Object.keys(updateData).filter(key => key.startsWith('$'));
        const updateDoc = operators.length > 0 
          ? updateData  // If we have operators, use the data as is
          : { $set: updateData }; // Otherwise, wrap in $set

        const updatedGallery = await Gallery.findOneAndUpdate(
          { id: id as string },
          updateDoc,
          { new: true }
        ).exec();

        if (!updatedGallery) {
          return res.status(404).json({ error: 'Gallery not found' });
        }
        res.status(200).json(updatedGallery);
        break;

      case 'DELETE':
        // Delete gallery
        const deletedGallery = await Gallery.findOneAndDelete({ id: id as string }).exec();
        if (!deletedGallery) {
          return res.status(404).json({ error: 'Gallery not found' });
        }
        res.status(200).json({ message: 'Gallery deleted successfully' });
        break;

      default:
        res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error('Database error:', {
      error,
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      timestamp: new Date().toISOString()
    });
    res.status(500).json({ 
      error: 'Internal Server Error',
      details: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    });
  }
} 
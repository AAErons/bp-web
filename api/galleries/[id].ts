import { VercelRequest, VercelResponse } from '@vercel/node';
import { connectToDatabase, Gallery } from '../../src/lib/db';

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
        const gallery = await Gallery.findOne({ id });
        if (!gallery) {
          return res.status(404).json({ error: 'Gallery not found' });
        }
        res.status(200).json(gallery);
        break;

      case 'PUT':
        // Update gallery
        const updatedGallery = await Gallery.findOneAndUpdate(
          { id },
          { ...req.body, updatedAt: new Date() },
          { new: true }
        );
        if (!updatedGallery) {
          return res.status(404).json({ error: 'Gallery not found' });
        }
        res.status(200).json(updatedGallery);
        break;

      case 'DELETE':
        // Delete gallery
        const deletedGallery = await Gallery.findOneAndDelete({ id });
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
    console.error('Database error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
} 
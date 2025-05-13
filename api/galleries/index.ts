import { VercelRequest, VercelResponse } from '@vercel/node';
import { connectToDatabase, Gallery } from '../../src/lib/db';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  console.log(`[${req.method}] /api/galleries - Starting request handling`);
  
  try {
    // Connect to database
    console.log('Connecting to database...');
    await connectToDatabase();
    console.log('Database connection established');

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
        const galleries = await Gallery.find().sort({ eventDate: -1 });
        console.log(`Found ${galleries.length} galleries`);
        res.status(200).json(galleries);
        break;

      case 'POST':
        console.log('Creating new gallery:', req.body);
        const newGallery = new Gallery({
          ...req.body,
          id: crypto.randomUUID(),
          createdAt: new Date(),
          updatedAt: new Date(),
        });
        await newGallery.save();
        console.log('Gallery created successfully:', newGallery.id);
        res.status(201).json(newGallery);
        break;

      default:
        console.log(`Method ${req.method} not allowed`);
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error('Error in /api/galleries:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error instanceof Error ? error.message : 'Unknown error' });
  }
} 
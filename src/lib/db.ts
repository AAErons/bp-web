import mongoose from 'mongoose';
import type { Document } from 'mongoose';

// Define the Gallery interface
export interface GalleryDocument extends Document {
  id: string;
  name: string;
  description: string;
  eventDate: Date;
  images: Array<{
    id: string;
    url: string;
    filename: string;
    uploadedAt: Date;
  }>;
  createdAt: Date;
  updatedAt: Date;
}

// Define the Gallery schema
const gallerySchema = new mongoose.Schema<GalleryDocument>({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  eventDate: { type: Date, required: true },
  images: [{
    id: { type: String, required: true },
    url: { type: String, required: true },
    filename: { type: String, required: true },
    uploadedAt: { type: Date, required: true }
  }],
  createdAt: { type: Date, required: true },
  updatedAt: { type: Date, required: true }
});

// Create and export the Gallery model
export const Gallery = mongoose.model<GalleryDocument>('Gallery', gallerySchema);

// Cache the database connection
let cachedConnection: typeof mongoose | null = null;

// Function to connect to the database
export async function connectToDatabase() {
  if (cachedConnection) {
    return cachedConnection;
  }

  if (!process.env.MONGODB_URI) {
    throw new Error('MONGODB_URI environment variable is not set');
  }

  try {
    const connection = await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
      socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
    });

    cachedConnection = connection;
    return connection;
  } catch (error) {
    console.error('MongoDB connection error:', {
      error,
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      timestamp: new Date().toISOString()
    });
    throw error;
  }
} 
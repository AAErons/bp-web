import mongoose from 'mongoose';

// Define types for mongoose cache
interface MongooseCache {
  conn: mongoose.Connection | null;
  promise: Promise<mongoose.Connection> | null;
}

declare global {
  var mongoose: MongooseCache | undefined;
}

// Define the Gallery Image Schema
const GalleryImageSchema = new mongoose.Schema({
  id: { type: String, required: true },
  url: { type: String, required: true },
  cloudinaryId: { type: String, required: true },
  title: { type: String },
  description: { type: String },
  uploadedAt: { type: Date, required: true },
});

// Define the Gallery Schema
const GallerySchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  eventDate: { type: Date, required: true },
  images: [GalleryImageSchema],
  createdAt: { type: Date, required: true },
  updatedAt: { type: Date, required: true },
});

// Create models
export const Gallery = mongoose.models.Gallery || mongoose.model('Gallery', GallerySchema);

// Database connection
let cached: MongooseCache = global.mongoose || { conn: null, promise: null };

if (!global.mongoose) {
  global.mongoose = cached;
}

export async function connectToDatabase(): Promise<mongoose.Connection> {
  // If we have a cached connection, return it
  if (cached.conn) {
    console.log('Using cached database connection');
    return cached.conn;
  }

  // If we don't have a connection promise, create one
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
      socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
    };

    console.log('Connecting to MongoDB...');
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI is not defined in environment variables');
    }

    try {
      cached.promise = mongoose.connect(process.env.MONGODB_URI, opts)
        .then((mongoose) => {
          console.log('Successfully connected to MongoDB');
          return mongoose.connection;
        });
    } catch (error) {
      console.error('MongoDB connection error:', error);
      cached.promise = null;
      throw error;
    }
  }

  try {
    // Wait for the connection promise to resolve
    cached.conn = await cached.promise;
  } catch (e) {
    // If the connection fails, clear the promise
    cached.promise = null;
    console.error('Failed to establish database connection:', e);
    throw e;
  }

  return cached.conn;
} 
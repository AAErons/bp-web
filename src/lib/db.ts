import mongoose from 'mongoose';

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

// Simple database connection function
export async function connectToDatabase(): Promise<mongoose.Connection> {
  try {
    console.log('Connecting to MongoDB...');
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI is not defined in environment variables');
    }

    // Check if we're already connected
    if (mongoose.connection.readyState === 1) {
      console.log('Already connected to MongoDB');
      return mongoose.connection;
    }

    // Connect with minimal options
    await mongoose.connect(process.env.MONGODB_URI, {
      bufferCommands: false,
      serverSelectionTimeoutMS: 5000,
    });

    console.log('Successfully connected to MongoDB');
    return mongoose.connection;
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
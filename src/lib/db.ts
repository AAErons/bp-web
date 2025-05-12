import mongoose from 'mongoose';

// Define types for mongoose cache
declare global {
  var mongoose: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  };
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
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(process.env.MONGODB_URI!, opts);
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
} 
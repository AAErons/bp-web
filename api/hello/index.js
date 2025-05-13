                                                                                              import { v2 as cloudinary } from 'cloudinary';
import { Readable } from 'stream';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Helper function to upload buffer to Cloudinary
const uploadToCloudinary = (buffer) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: 'gallery', // Store all gallery images in a 'gallery' folder
        resource_type: 'auto', // Automatically detect if it's an image or video
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );

    // Create a readable stream from the buffer
    const stream = Readable.from(buffer);
    stream.pipe(uploadStream);
  });
};

// Helper function to delete from Cloudinary
const deleteFromCloudinary = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (error) {
    console.error('Cloudinary delete error:', error);
    throw error;
  }
};

// Vercel serverless function with file upload support
export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Handle GET request
  if (req.method === 'GET') {
    return res.status(200).json({
      message: 'Hello from Vercel Serverless Function',
      method: req.method,
      time: new Date().toISOString(),
      environment: process.env.NODE_ENV,
      path: req.url
    });
  }

  // Handle POST request for file upload
  if (req.method === 'POST') {
    try {
      // Check if the request has a file
      if (!req.body || !req.body.file) {
        return res.status(400).json({
          error: 'No file provided',
          details: 'Please provide a file in the request body'
        });
      }

      // Convert base64 to buffer if needed
      let buffer;
      if (typeof req.body.file === 'string' && req.body.file.startsWith('data:')) {
        // Remove the data URL prefix (e.g., "data:image/jpeg;base64,")
        const base64Data = req.body.file.split(',')[1];
        buffer = Buffer.from(base64Data, 'base64');
      } else {
        buffer = req.body.file;
      }

      // Upload to Cloudinary
      console.log('Uploading to Cloudinary...');
      const uploadResult = await uploadToCloudinary(buffer);
      console.log('Upload successful:', uploadResult);

      // Return the Cloudinary URL and other details
      return res.status(200).json({
        message: 'File uploaded successfully',
        url: uploadResult.secure_url,
        public_id: uploadResult.public_id,
        format: uploadResult.format,
        width: uploadResult.width,
        height: uploadResult.height,
        bytes: uploadResult.bytes
      });

    } catch (error) {
      console.error('Upload error:', error);
      return res.status(500).json({
        error: 'File upload failed',
        details: error.message
      });
    }
  }

  // Handle DELETE request
  if (req.method === 'DELETE') {
    try {
      const { publicId } = req.query;
      
      if (!publicId) {
        return res.status(400).json({
          error: 'Missing public_id',
          details: 'Please provide a public_id to delete the image'
        });
      }

      console.log('Deleting from Cloudinary:', publicId);
      const result = await deleteFromCloudinary(publicId);
      console.log('Delete result:', result);

      return res.status(200).json({
        message: 'Image deleted successfully',
        result
      });

    } catch (error) {
      console.error('Delete error:', error);
      return res.status(500).json({
        error: 'Image deletion failed',
        details: error.message
      });
    }
  }

  // Handle other methods
  return res.status(405).json({
    error: 'Method not allowed',
    allowedMethods: ['GET', 'POST', 'DELETE', 'OPTIONS']
  });
} 
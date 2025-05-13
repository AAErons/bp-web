import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { parse } from 'url';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// ES Module __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Import handlers
const galleriesHandler = (await import('./api/galleries/index.js')).default;
const galleryByIdHandler = (await import('./api/galleries/[id].js')).default;

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
// Increase payload size limit to 50MB
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Logging middleware
app.use((req, res, next) => {
  console.log('\n=== Incoming Request ===');
  console.log(`${req.method} ${req.originalUrl}`);
  console.log('Headers:', req.headers);
  if (req.originalUrl !== '/api/upload') {  // Don't log body for upload requests
    console.log('Body:', req.body);
  }
  console.log('======================\n');
  next();
});

// Image upload endpoint
app.post('/api/upload', async (req: express.Request, res: express.Response) => {
  try {
    const { file } = req.body;
    if (!file) {
      return res.status(400).json({ error: 'No file provided' });
    }

    // TODO: Implement actual image upload to Cloudinary or other storage
    // For now, we'll just return a mock response
    const mockResponse = {
      url: file, // In production, this would be the URL from your storage service
      public_id: `mock_${Date.now()}`,
    };

    res.json(mockResponse);
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).json({ error: 'Failed to upload image' });
  }
});

// Test endpoint
app.get('/api/test', (req, res) => {
  console.log('Test endpoint hit!');
  res.json({ message: 'API server is working!' });
});

// Convert Express request to Vercel request format
const adaptRequest = (req: express.Request) => ({
  method: req.method,
  query: req.query,
  body: req.body,
  headers: req.headers,
  cookies: req.cookies,
  url: req.url,
});

// Convert Express response to Vercel response format
const adaptResponse = (res: express.Response) => ({
  status: (code: number) => {
    res.status(code);
    return {
      json: (data: any) => res.json(data),
      end: () => res.end(),
    };
  },
  setHeader: (name: string, value: string) => res.setHeader(name, value),
  json: (data: any) => res.json(data),
  end: () => res.end(),
});

// Explicit route handlers
app.post('/api/galleries', async (req: express.Request, res: express.Response) => {
  console.log('Handling POST /api/galleries');
  const vercelReq = adaptRequest(req);
  const vercelRes = adaptResponse(res);
  try {
    await galleriesHandler(vercelReq as any, vercelRes as any);
  } catch (error) {
    console.error('Error in POST /api/galleries:', error);
    res.status(500).json({ error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' });
  }
});

app.get('/api/galleries', async (req: express.Request, res: express.Response) => {
  console.log('Handling GET /api/galleries');
  const vercelReq = adaptRequest(req);
  const vercelRes = adaptResponse(res);
  try {
    await galleriesHandler(vercelReq as any, vercelRes as any);
  } catch (error) {
    console.error('Error in GET /api/galleries:', error);
    res.status(500).json({ error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' });
  }
});

app.get('/api/galleries/:id', async (req: express.Request, res: express.Response) => {
  console.log('Handling GET /api/galleries/:id', req.params.id);
  const vercelReq = adaptRequest(req);
  vercelReq.query = { id: req.params.id };
  const vercelRes = adaptResponse(res);
  try {
    await galleryByIdHandler(vercelReq as any, vercelRes as any);
  } catch (error) {
    console.error('Error in GET /api/galleries/:id:', error);
    res.status(500).json({ error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' });
  }
});

app.put('/api/galleries/:id', async (req: express.Request, res: express.Response) => {
  console.log('Handling PUT /api/galleries/:id', req.params.id);
  const vercelReq = adaptRequest(req);
  vercelReq.query = { id: req.params.id };
  const vercelRes = adaptResponse(res);
  try {
    await galleryByIdHandler(vercelReq as any, vercelRes as any);
  } catch (error) {
    console.error('Error in PUT /api/galleries/:id:', error);
    res.status(500).json({ error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' });
  }
});

app.delete('/api/galleries/:id', async (req: express.Request, res: express.Response) => {
  console.log('Handling DELETE /api/galleries/:id', req.params.id);
  const vercelReq = adaptRequest(req);
  vercelReq.query = { id: req.params.id };
  const vercelRes = adaptResponse(res);
  try {
    await galleryByIdHandler(vercelReq as any, vercelRes as any);
  } catch (error) {
    console.error('Error in DELETE /api/galleries/:id:', error);
    res.status(500).json({ error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' });
  }
});

// Catch-all route for unmatched requests
app.use('*', (req: express.Request, res: express.Response) => {
  console.log('\n=== Unmatched Request ===');
  console.log(`${req.method} ${req.originalUrl}`);
  console.log('Headers:', req.headers);
  console.log('Body:', req.body);
  console.log('========================\n');
  res.status(404).json({ error: 'Not found', path: req.originalUrl });
});

// Create HTTP server
const server = createServer(app);

// Start server
server.listen(port, () => {
  console.log(`API server running at http://localhost:${port}`);
  console.log('Environment:', process.env.NODE_ENV);
  console.log('MongoDB URI:', process.env.MONGODB_URI ? 'Set' : 'Not set');
}); 
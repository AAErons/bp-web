import { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGallery } from '../contexts/GalleryContext';
import type { GalleryImage } from '../types';

// API base URL configuration
const API_BASE_URL = import.meta.env.DEV 
  ? 'http://localhost:3000'  // Development: use the Express server
  : '';                      // Production: use relative URLs for Vercel serverless functions

export default function GalleryImages() {
  const { id } = useParams<{ id: string }>();
  const { galleries, addImageToGallery, updateImage, deleteImage } = useGallery();
  const navigate = useNavigate();
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [editingImage, setEditingImage] = useState<GalleryImage | null>(null);

  // Find the current gallery
  const gallery = galleries.find(g => g.id === id);

  // Redirect if gallery not found
  useEffect(() => {
    if (!gallery) {
      navigate('/admin/gallery');
    }
  }, [gallery, navigate]);

  if (!gallery) {
    return null;
  }

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    setUploadError(null);

    try {
      // Process files sequentially to avoid race conditions
      for (const file of Array.from(files)) {
        try {
          // Validate file type
          if (!file.type.startsWith('image/')) {
            console.warn(`Skipping ${file.name}: Not an image file`);
            continue;
          }

          // Validate file size (5MB)
          if (file.size > 5 * 1024 * 1024) {
            console.warn(`Skipping ${file.name}: File size must be less than 5MB`);
            continue;
          }

          console.log('Processing file:', file.name);

          // Convert file to base64
          const base64 = await new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = reject;
            reader.readAsDataURL(file);
          });

          // Upload the file
          console.log('Uploading file:', file.name);
          const response = await fetch(`${API_BASE_URL}/api/upload`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ file: base64 }),
          });

          if (!response.ok) {
            const errorData = await response.json().catch(() => null);
            console.error('Error response for', file.name, ':', errorData);
            throw new Error(errorData?.error || `HTTP error! status: ${response.status}`);
          }

          const data = await response.json();
          console.log('Upload response for', file.name, ':', data);

          // Add the image to the gallery
          console.log('Adding image to gallery:', file.name);
          await addImageToGallery(gallery.id, {
            url: data.url,
            cloudinaryId: data.public_id,
            title: file.name,
          });
          console.log('Successfully added image to gallery:', file.name);
        } catch (error) {
          console.error('Error processing file', file.name, ':', error);
          setUploadError(error instanceof Error ? error.message : `Failed to process ${file.name}`);
          // Continue with next file even if this one failed
        }
      }
    } catch (error) {
      console.error('Error in handleFileSelect:', error);
      setUploadError(error instanceof Error ? error.message : 'Upload failed');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleDeleteImage = async (image: GalleryImage) => {
    if (window.confirm('Are you sure you want to delete this image?')) {
      try {
        // Delete from Cloudinary
        const response = await fetch(`${API_BASE_URL}/api/hello?publicId=${encodeURIComponent(image.cloudinaryId)}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error(`Failed to delete image from storage: ${response.status}`);
        }

        // Delete from gallery
        deleteImage(gallery.id, image.id);
      } catch (error) {
        console.error('Error deleting image:', error);
        setUploadError(error instanceof Error ? error.message : 'Failed to delete image');
      }
    }
  };

  const handleSaveEdit = async () => {
    if (!editingImage) return; // Early return if no image is being edited

    try {
      await updateImage(gallery.id, editingImage.id, {
        title: editingImage.title,
        description: editingImage.description,
      });
      setEditingImage(null);
    } catch (error) {
      console.error('Error updating image:', error);
      setUploadError(error instanceof Error ? error.message : 'Failed to update image');
    }
  };

  const handleEditImage = (image: GalleryImage) => {
    setEditingImage({ ...image });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation Header */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/admin/gallery')}
                className="text-gray-600 hover:text-gray-900 flex items-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Galleries
              </button>
              <h1 className="text-xl font-semibold">{gallery.name} - Images</h1>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="space-y-6">
            {/* Upload Section */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-lg font-medium mb-4">Upload Images</h2>
              <div className="space-y-4">
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  multiple
                  onChange={handleFileSelect}
                  className="hidden"
                  id="image-upload"
                />
                <label
                  htmlFor="image-upload"
                  className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  {isUploading ? 'Uploading...' : 'Choose Images'}
                </label>
                {uploadError && (
                  <p className="text-sm text-red-600">{uploadError}</p>
                )}
              </div>
            </div>

            {/* Images Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {gallery.images.map((image: GalleryImage) => (
                <div key={image.id} className="bg-white rounded-lg shadow overflow-hidden">
                  <div className="aspect-w-16 aspect-h-9 bg-gray-200">
                    <img
                      src={image.url}
                      alt={image.title || 'Gallery image'}
                      className="object-cover w-full h-48"
                    />
                  </div>
                  <div className="p-4">
                    {editingImage?.id === image.id ? (
                      <div className="space-y-2">
                        <input
                          type="text"
                          value={editingImage?.title ?? ''}
                          onChange={(e) => setEditingImage((prev: GalleryImage | null) => 
                            prev ? { ...prev, title: e.target.value } : null
                          )}
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          placeholder="Image title"
                        />
                        <textarea
                          value={editingImage?.description ?? ''}
                          onChange={(e) => setEditingImage((prev: GalleryImage | null) => 
                            prev ? { ...prev, description: e.target.value } : null
                          )}
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          placeholder="Image description"
                          rows={2}
                        />
                        <div className="flex justify-end space-x-2">
                          <button
                            onClick={() => setEditingImage(null)}
                            className="text-gray-600 hover:text-gray-800"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={handleSaveEdit}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <h3 className="font-medium text-lg mb-1">{image.title || 'Untitled'}</h3>
                        {image.description && (
                          <p className="text-gray-600 text-sm mb-4">{image.description}</p>
                        )}
                        <div className="flex justify-end space-x-2">
                          <button
                            onClick={() => handleEditImage(image)}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteImage(image)}
                            className="text-red-600 hover:text-red-800"
                          >
                            Delete
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {gallery.images.length === 0 && (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <p className="text-gray-500">No images in this gallery yet. Upload some images!</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
} 
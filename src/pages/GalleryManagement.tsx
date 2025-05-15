import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGallery } from '../contexts/GalleryContext';
import type { Gallery, GalleryImage } from '../types';
import GalleryView from '../components/GalleryView';

export default function GalleryManagement() {
  const { galleries, addGallery, updateGallery, deleteGallery } = useGallery();
  const navigate = useNavigate();
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingGallery, setEditingGallery] = useState<Gallery | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<{ current: number; total: number }>({ current: 0, total: 0 });
  const [formData, setFormData] = useState<{
    name: string;
    eventDate: string;
    description?: string;
  }>({
    name: '',
    eventDate: '',
    description: '',
  });
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [selectedTitleImageIndex, setSelectedTitleImageIndex] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleSetTitleImage = (imageId: string | number) => {
    if (typeof imageId === 'string') {
      // For existing images in edit mode
      if (!editingGallery) return;
      setEditingGallery(prev => {
        if (!prev) return null;
        return {
          ...prev,
          images: prev.images.map(img => ({
            ...img,
            titleImage: img.id === imageId
          }))
        };
      });
    } else {
      // For new images in create mode
      setSelectedTitleImageIndex(imageId);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setUploadProgress({ current: 0, total: selectedImages.length });

    let uploadedImages: { id: string; titleImage: boolean }[] = [];
    
    if (selectedImages.length > 0) {
      for (let i = 0; i < selectedImages.length; i++) {
        const file = selectedImages[i];
        const formData = new FormData();
        formData.append('imageFile', file);
        try {
          const res = await fetch('https://bp-web-api.vercel.app/api/images', {
            method: 'POST',
            body: formData,
          });
          if (res.ok) {
            const data = await res.json();
            if (data._id) {
              uploadedImages.push({
                id: data._id,
                titleImage: i === selectedTitleImageIndex
              });
            }
          }
        } catch (error) {
          console.error('Error uploading image:', error);
        } finally {
          setUploadProgress(prev => ({ ...prev, current: prev.current + 1 }));
        }
      }
    }

    // Get existing images with their titleImage status
    const existingImages = editingGallery?.images.map(img => ({
      id: img.id,
      titleImage: img.titleImage
    })) || [];

    // Combine existing and new images
    const allImages = [...existingImages, ...uploadedImages];

    try {
      if (editingId) {
        await updateGallery(editingId, { 
          ...formData, 
          images: allImages.map(img => img.id)  // Send just the image IDs
        });
        setEditingId(null);
        setEditingGallery(null);
      } else {
        await addGallery({ 
          ...formData, 
          images: allImages.map(img => img.id)  // Send just the image IDs
        });
        setIsAdding(false);
      }

      setFormData({
        name: '',
        eventDate: '',
        description: '',
      });
      setSelectedImages([]);
      setSelectedTitleImageIndex(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
    } catch (error) {
      console.error('Error saving gallery:', error);
    } finally {
      setIsSubmitting(false);
      setUploadProgress({ current: 0, total: 0 });
    }
  };

  const handleGalleryClick = (gallery: Gallery) => {
    setEditingId(gallery._id);
    setEditingGallery(gallery);
    const formattedDate = new Date(gallery.eventDate).toISOString().split('T')[0];
    setFormData({
      name: gallery.name,
      eventDate: formattedDate,
      description: gallery.description || '',
    });
  };

  const handleDeleteImage = async (imageId: string) => {
    if (!editingGallery) return;
    
    try {
      const response = await fetch(`https://bp-web-api.vercel.app/api/images/${imageId}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        // Update the local state to remove the deleted image
        setEditingGallery(prev => {
          if (!prev) return null;
          return {
            ...prev,
            images: prev.images.filter(img => img.id !== imageId)
          };
        });
      }
    } catch (error) {
      console.error('Error deleting image:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation Header */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/admin/dashboard')}
                className="text-gray-600 hover:text-gray-900 flex items-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Dashboard
              </button>
              <h1 className="text-xl font-semibold">Gallery Management</h1>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="space-y-6">
            <div className="flex justify-end">
              {!isAdding && !editingId && (
                <button
                  onClick={() => setIsAdding(true)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                  Create New Gallery
                </button>
              )}
            </div>

            {(isAdding || editingId) && (
              <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow space-y-4 relative">
                {isSubmitting && (
                  <div className="absolute inset-0 bg-white bg-opacity-75 flex flex-col items-center justify-center rounded-lg z-10">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
                    {uploadProgress.total > 0 && (
                      <div className="text-center">
                        <p className="text-gray-600 mb-2">
                          Uploading images... {uploadProgress.current} of {uploadProgress.total}
                        </p>
                        <div className="w-64 bg-gray-200 rounded-full h-2.5">
                          <div 
                            className="bg-blue-600 h-2.5 rounded-full transition-all duration-300" 
                            style={{ width: `${(uploadProgress.current / uploadProgress.total) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    )}
                    <p className="text-gray-600 mt-4">Please wait while we process your gallery...</p>
                  </div>
                )}
                
                <h3 className="text-lg font-medium">
                  {editingId ? 'Edit Gallery' : 'Create New Gallery'}
                </h3>
                
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Gallery Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="eventDate" className="block text-sm font-medium text-gray-700">
                    Event Date
                  </label>
                  <input
                    type="date"
                    id="eventDate"
                    value={formData.eventDate}
                    onChange={(e) => setFormData(prev => ({ ...prev, eventDate: e.target.value }))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Description (Optional)
                  </label>
                  <textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    rows={3}
                  />
                </div>

                {editingGallery && editingGallery.images.length > 0 && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Existing Images
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {editingGallery.images.map((image) => (
                        <div key={image.id} className="relative group">
                          <img
                            src={image.url}
                            alt={image.title || 'Gallery image'}
                            className={`w-full h-32 object-cover rounded-lg ${image.titleImage ? 'ring-2 ring-blue-500' : ''}`}
                          />
                          <div className="absolute top-2 right-2 flex gap-2">
                            <button
                              type="button"
                              onClick={() => handleSetTitleImage(image.id)}
                              className={`p-1 rounded-full transition-opacity ${
                                image.titleImage 
                                  ? 'bg-blue-600 text-white opacity-100' 
                                  : 'bg-white text-gray-600 opacity-0 group-hover:opacity-100'
                              }`}
                              title={image.titleImage ? 'Title Image' : 'Set as Title Image'}
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteImage(image.id)}
                              className="bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </div>
                          {image.titleImage && (
                            <div className="absolute bottom-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                              Title Image
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <label htmlFor="images" className="block text-sm font-medium text-gray-700">
                    {editingId ? 'Add More Images' : 'Images'}
                  </label>
                  <input
                    ref={fileInputRef}
                    type="file"
                    id="images"
                    multiple
                    accept="image/*"
                    onChange={e => {
                      setSelectedImages(Array.from(e.target.files || []));
                      setSelectedTitleImageIndex(null); // Reset title image selection when new images are selected
                    }}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                  {selectedImages.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-2">
                      {selectedImages.map((file, idx) => (
                        <div key={idx} className="relative group">
                          <img
                            src={URL.createObjectURL(file)}
                            alt={`preview-${idx}`}
                            className={`w-full h-32 object-cover rounded-lg ${idx === selectedTitleImageIndex ? 'ring-2 ring-blue-500' : ''}`}
                          />
                          <div className="absolute top-2 right-2 flex gap-2">
                            <button
                              type="button"
                              onClick={() => handleSetTitleImage(idx)}
                              className={`p-1 rounded-full transition-opacity ${
                                idx === selectedTitleImageIndex 
                                  ? 'bg-blue-600 text-white opacity-100' 
                                  : 'bg-white text-gray-600 opacity-0 group-hover:opacity-100'
                              }`}
                              title={idx === selectedTitleImageIndex ? 'Title Image' : 'Set as Title Image'}
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setSelectedImages(prev => prev.filter((_, i) => i !== idx));
                                if (idx === selectedTitleImageIndex) {
                                  setSelectedTitleImageIndex(null);
                                }
                              }}
                              className="bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </div>
                          {idx === selectedTitleImageIndex && (
                            <div className="absolute bottom-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                              Title Image
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => {
                      setEditingId(null);
                      setEditingGallery(null);
                      setIsAdding(false);
                      setFormData({
                        name: '',
                        eventDate: '',
                        description: '',
                      });
                      setSelectedImages([]);
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isSubmitting}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isSubmitting}
                  >
                    {editingId ? 'Save Changes' : 'Create Gallery'}
                  </button>
                </div>
              </form>
            )}

            {/* Gallery Grid */}
            <GalleryView
              galleries={galleries}
              onGalleryClick={handleGalleryClick}
              onDeleteGallery={deleteGallery}
            />

            {galleries.length === 0 && !isAdding && (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <p className="text-gray-500">No galleries yet. Create your first gallery!</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
} 
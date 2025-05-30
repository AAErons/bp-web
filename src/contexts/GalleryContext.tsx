import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Gallery as GalleryType, GalleryImage } from '../types';

// API base URL configuration
const API_BASE_URL = 'https://bp-web-api.vercel.app';

// Define types for our gallery structure
export type Gallery = GalleryType;

interface GalleryCreatePayload {
  name: string;
  eventDate: string;
  images?: string[];
  description?: string;  // Make description optional
}

interface GalleryContextType {
  galleries: GalleryType[];
  isLoading: boolean;
  error: string | null;
  addGallery: (gallery: GalleryCreatePayload) => Promise<any>;
  updateGallery: (id: string, gallery: Partial<Omit<GalleryType, 'id' | 'createdAt' | 'updatedAt' | 'images'>> & { images?: string[] }) => Promise<void>;
  deleteGallery: (id: string) => Promise<void>;
  addImageToGallery: (galleryId: string, image: Omit<GalleryImage, 'id' | 'uploadedAt'>) => Promise<void>;
  updateImage: (galleryId: string, imageId: string, image: Partial<Omit<GalleryImage, 'id' | 'uploadedAt'>>) => Promise<void>;
  deleteImage: (galleryId: string, imageId: string) => Promise<void>;
}

const GalleryContext = createContext<GalleryContextType | undefined>(undefined);

export function GalleryProvider({ children }: { children: React.ReactNode }) {
  const [galleries, setGalleries] = useState<GalleryType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch galleries on mount
  useEffect(() => {
    fetchGalleries();
  }, []);

  const fetchGalleries = async () => {
    try {
      console.log('Fetching galleries...');
      const response = await fetch(`${API_BASE_URL}/api/galleries`);
      
      // Log the raw response details
      console.log('Response status:', response.status);
      console.log('Response headers:', Object.fromEntries(response.headers.entries()));
      console.log('API URL:', `${API_BASE_URL}/api/galleries`);
      
      // Get the raw text first
      const rawText = await response.text();
      console.log('Raw response:', rawText);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch galleries: ${response.status} ${response.statusText}\nResponse: ${rawText}`);
      }
      
      // Try to parse the text as JSON
      let data;
      try {
        data = JSON.parse(rawText);
      } catch (parseError) {
        console.error('Failed to parse response as JSON:', parseError);
        throw new Error(`Invalid JSON response: ${rawText.substring(0, 100)}...`);
      }
      
      console.log('Galleries fetched successfully:', data);
      setGalleries(data);
    } catch (err) {
      console.error('Error in fetchGalleries:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch galleries');
    } finally {
      setIsLoading(false);
    }
  };

  const addGallery = async (galleryData: GalleryCreatePayload) => {
    try {
      console.log('Attempting to create gallery with data:', galleryData);
      const response = await fetch(`${API_BASE_URL}/api/galleries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(galleryData),
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        console.error('Server response:', {
          status: response.status,
          statusText: response.statusText,
          errorData
        });
        throw new Error(errorData?.details || `Failed to create gallery: ${response.status} ${response.statusText}`);
      }
      
      const newGallery = await response.json();
      console.log('Gallery created successfully:', newGallery);
      setGalleries(prev => [...prev, newGallery]);
      return newGallery;
    } catch (err) {
      console.error('Error creating gallery:', err);
      setError(err instanceof Error ? err.message : 'Failed to create gallery');
      throw err;
    }
  };

  const updateGallery = async (id: string, galleryData: Partial<Omit<GalleryType, 'id' | 'createdAt' | 'updatedAt' | 'images'>> & { images?: string[] }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/galleries/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(galleryData),
      });
      if (!response.ok) throw new Error('Failed to update gallery');
      const updatedGallery = await response.json();
      setGalleries(prev => prev.map(gallery => 
        gallery.id === id ? updatedGallery : gallery
      ));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update gallery');
      throw err;
    }
  };

  const deleteGallery = async (id: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/galleries/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete gallery');
      await fetchGalleries(); // Reload galleries from backend
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete gallery');
      throw err;
    }
  };

  const addImageToGallery = async (galleryId: string, imageData: Omit<GalleryImage, 'id' | 'uploadedAt'>) => {
    try {
      const gallery = galleries.find(g => g.id === galleryId);
      if (!gallery) throw new Error('Gallery not found');

      const newImage = { ...imageData, id: crypto.randomUUID(), uploadedAt: new Date().toISOString() };
      
      const response = await fetch(`${API_BASE_URL}/api/galleries/${galleryId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          $push: { images: newImage },
          updatedAt: new Date().toISOString()
        }),
      });
      if (!response.ok) throw new Error('Failed to add image');
      const updated = await response.json();
      setGalleries(prev => prev.map(gallery => 
        gallery.id === galleryId ? updated : gallery
      ));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add image');
      throw err;
    }
  };

  const updateImage = async (galleryId: string, imageId: string, imageData: Partial<Omit<GalleryImage, 'id' | 'uploadedAt'>>) => {
    try {
      const gallery = galleries.find(g => g.id === galleryId);
      if (!gallery) throw new Error('Gallery not found');

      const updatedGallery = {
        ...gallery,
        images: gallery.images.map((image: GalleryImage) =>
          image.id === imageId ? { ...image, ...imageData } : image
        ),
      };

      const response = await fetch(`${API_BASE_URL}/api/galleries/${galleryId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedGallery),
      });
      if (!response.ok) throw new Error('Failed to update image');
      const updated = await response.json();
      setGalleries(prev => prev.map(gallery => 
        gallery.id === galleryId ? updated : gallery
      ));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update image');
      throw err;
    }
  };

  const deleteImage = async (galleryId: string, imageId: string) => {
    try {
      const gallery = galleries.find(g => g.id === galleryId);
      if (!gallery) throw new Error('Gallery not found');

      const updatedGallery = {
        ...gallery,
        images: gallery.images.filter((image: GalleryImage) => image.id !== imageId),
      };

      const response = await fetch(`${API_BASE_URL}/api/galleries/${galleryId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedGallery),
      });
      if (!response.ok) throw new Error('Failed to delete image');
      const updated = await response.json();
      setGalleries(prev => prev.map(gallery => 
        gallery.id === galleryId ? updated : gallery
      ));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete image');
      throw err;
    }
  };

  return (
    <GalleryContext.Provider value={{
      galleries,
      isLoading,
      error,
      addGallery,
      updateGallery,
      deleteGallery,
      addImageToGallery,
      updateImage,
      deleteImage,
    }}>
      {children}
    </GalleryContext.Provider>
  );
}

export { type GalleryImage };
export function useGallery() {
  const context = useContext(GalleryContext);
  if (context === undefined) {
    throw new Error('useGallery must be used within a GalleryProvider');
  }
  return context;
} 
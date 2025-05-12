import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Gallery as GalleryType, GalleryImage } from '../types';

// Define types for our gallery structure
export interface Gallery {
  id: string;
  name: string;
  description: string;
  eventDate: string;
  images: GalleryImage[];
  createdAt: string;
  updatedAt: string;
}

interface GalleryContextType {
  galleries: GalleryType[];
  isLoading: boolean;
  error: string | null;
  addGallery: (gallery: Omit<GalleryType, 'id' | 'createdAt' | 'updatedAt' | 'images'>) => Promise<void>;
  updateGallery: (id: string, gallery: Partial<Omit<GalleryType, 'id' | 'createdAt' | 'updatedAt'>>) => Promise<void>;
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
      const response = await fetch('/api/galleries');
      if (!response.ok) throw new Error('Failed to fetch galleries');
      const data = await response.json();
      setGalleries(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch galleries');
    } finally {
      setIsLoading(false);
    }
  };

  const addGallery = async (galleryData: Omit<GalleryType, 'id' | 'createdAt' | 'updatedAt' | 'images'>) => {
    try {
      const response = await fetch('/api/galleries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(galleryData),
      });
      if (!response.ok) throw new Error('Failed to create gallery');
      const newGallery = await response.json();
      setGalleries(prev => [...prev, newGallery]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create gallery');
      throw err;
    }
  };

  const updateGallery = async (id: string, galleryData: Partial<Omit<GalleryType, 'id' | 'createdAt' | 'updatedAt'>>) => {
    try {
      const response = await fetch(`/api/galleries/${id}`, {
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
      const response = await fetch(`/api/galleries/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete gallery');
      setGalleries(prev => prev.filter(gallery => gallery.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete gallery');
      throw err;
    }
  };

  const addImageToGallery = async (galleryId: string, imageData: Omit<GalleryImage, 'id' | 'uploadedAt'>) => {
    try {
      const gallery = galleries.find(g => g.id === galleryId);
      if (!gallery) throw new Error('Gallery not found');

      const updatedGallery = {
        ...gallery,
        images: [...gallery.images, { ...imageData, id: crypto.randomUUID(), uploadedAt: new Date().toISOString() }],
      };

      const response = await fetch(`/api/galleries/${galleryId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedGallery),
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

      const response = await fetch(`/api/galleries/${galleryId}`, {
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

      const response = await fetch(`/api/galleries/${galleryId}`, {
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
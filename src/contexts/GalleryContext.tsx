import React, { createContext, useContext, useState } from 'react';

// Define types for our gallery structure
export interface GalleryImage {
  id: string;
  url: string;
  cloudinaryId: string;
  title?: string;
  description?: string;
  uploadedAt: string;
}

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
  galleries: Gallery[];
  addGallery: (gallery: Omit<Gallery, 'id' | 'createdAt' | 'updatedAt' | 'images'>) => void;
  updateGallery: (id: string, gallery: Partial<Omit<Gallery, 'id' | 'createdAt' | 'updatedAt'>>) => void;
  deleteGallery: (id: string) => void;
  addImageToGallery: (galleryId: string, image: Omit<GalleryImage, 'id' | 'uploadedAt'>) => void;
  updateImage: (galleryId: string, imageId: string, image: Partial<Omit<GalleryImage, 'id' | 'uploadedAt'>>) => void;
  deleteImage: (galleryId: string, imageId: string) => void;
}

const GalleryContext = createContext<GalleryContextType | undefined>(undefined);

export function GalleryProvider({ children }: { children: React.ReactNode }) {
  const [galleries, setGalleries] = useState<Gallery[]>([]);

  const addGallery = (galleryData: Omit<Gallery, 'id' | 'createdAt' | 'updatedAt' | 'images'>) => {
    const newGallery: Gallery = {
      ...galleryData,
      id: crypto.randomUUID(),
      images: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setGalleries(prev => [...prev, newGallery]);
  };

  const updateGallery = (id: string, galleryData: Partial<Omit<Gallery, 'id' | 'createdAt' | 'updatedAt'>>) => {
    setGalleries(prev => prev.map(gallery => 
      gallery.id === id 
        ? { 
            ...gallery, 
            ...galleryData, 
            updatedAt: new Date().toISOString() 
          }
        : gallery
    ));
  };

  const deleteGallery = (id: string) => {
    setGalleries(prev => prev.filter(gallery => gallery.id !== id));
  };

  const addImageToGallery = (galleryId: string, imageData: Omit<GalleryImage, 'id' | 'uploadedAt'>) => {
    const newImage: GalleryImage = {
      ...imageData,
      id: crypto.randomUUID(),
      uploadedAt: new Date().toISOString(),
    };

    setGalleries(prev => prev.map(gallery => {
      if (gallery.id === galleryId) {
        return {
          ...gallery,
          images: [...gallery.images, newImage],
          updatedAt: new Date().toISOString(),
        };
      }
      return gallery;
    }));
  };

  const updateImage = (galleryId: string, imageId: string, imageData: Partial<Omit<GalleryImage, 'id' | 'uploadedAt'>>) => {
    setGalleries(prev => prev.map(gallery => {
      if (gallery.id === galleryId) {
        return {
          ...gallery,
          images: gallery.images.map(image =>
            image.id === imageId
              ? { ...image, ...imageData }
              : image
          ),
          updatedAt: new Date().toISOString(),
        };
      }
      return gallery;
    }));
  };

  const deleteImage = (galleryId: string, imageId: string) => {
    setGalleries(prev => prev.map(gallery => {
      if (gallery.id === galleryId) {
        return {
          ...gallery,
          images: gallery.images.filter(image => image.id !== imageId),
          updatedAt: new Date().toISOString(),
        };
      }
      return gallery;
    }));
  };

  return (
    <GalleryContext.Provider value={{
      galleries,
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

export function useGallery() {
  const context = useContext(GalleryContext);
  if (context === undefined) {
    throw new Error('useGallery must be used within a GalleryProvider');
  }
  return context;
} 
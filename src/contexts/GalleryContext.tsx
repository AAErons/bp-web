import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

export interface GalleryItem {
  id: string;
  title: string;
  imageUrl: string;
  description: string;
}

interface GalleryContextType {
  items: GalleryItem[];
  addItem: (item: Omit<GalleryItem, 'id'>) => void;
  updateItem: (id: string, item: Partial<GalleryItem>) => void;
  deleteItem: (id: string) => void;
}

const GalleryContext = createContext<GalleryContextType | undefined>(undefined);

export function GalleryProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<GalleryItem[]>(() => {
    const saved = localStorage.getItem('galleryItems');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('galleryItems', JSON.stringify(items));
  }, [items]);

  const addItem = (item: Omit<GalleryItem, 'id'>) => {
    const newItem: GalleryItem = {
      ...item,
      id: crypto.randomUUID(),
    };
    setItems(prev => [...prev, newItem]);
  };

  const updateItem = (id: string, updates: Partial<GalleryItem>) => {
    setItems(prev => prev.map(item => 
      item.id === id ? { ...item, ...updates } : item
    ));
  };

  const deleteItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  return (
    <GalleryContext.Provider value={{ items, addItem, updateItem, deleteItem }}>
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
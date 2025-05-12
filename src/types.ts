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
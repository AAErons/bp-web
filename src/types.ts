export interface GalleryImage {
  id: string;
  url: string;
  cloudinaryId: string;
  title?: string;
  description?: string;
  uploadedAt: string;
  titleImage?: boolean;
  _id?: string;
}

export interface Gallery {
  _id: string;
  id: string;
  name: string;
  eventDate: string;
  description?: string;
  images: GalleryImage[];
  createdAt: string;
  updatedAt: string;
} 
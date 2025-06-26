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

export interface TeamMember {
  _id: string;
  id: string;
  name: string;
  description: string;
  smallImage: string;
  fullImage: string;
  createdAt: string;
  updatedAt: string;
} 
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Gallery, GalleryImage } from '../types';

interface GalleryViewProps {
  galleries: Gallery[];
  onGalleryClick?: (gallery: Gallery) => void;
}

export default function GalleryView({ galleries, onGalleryClick }: GalleryViewProps) {
  const [selectedGallery, setSelectedGallery] = useState<Gallery | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const navigate = useNavigate();

  const handleGalleryClick = (gallery: Gallery) => {
    if (onGalleryClick) {
      onGalleryClick(gallery);
    } else {
      setSelectedGallery(gallery);
      setSelectedImageIndex(0);
    }
  };

  const handleCloseModal = () => {
    setSelectedGallery(null);
    setSelectedImageIndex(0);
  };

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
  };

  const handlePrevImage = () => {
    if (!selectedGallery) return;
    setSelectedImageIndex((prev) => 
      prev === 0 ? selectedGallery.images.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    if (!selectedGallery) return;
    setSelectedImageIndex((prev) => 
      prev === selectedGallery.images.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <>
      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {galleries.map((gallery) => (
          <div
            key={gallery.id}
            className="group relative bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
            onClick={() => handleGalleryClick(gallery)}
          >
            {/* Gallery Cover Image */}
            <div className="aspect-w-16 aspect-h-9 bg-gray-200 relative">
              {gallery.images.length > 0 ? (
                <img
                  src={gallery.images[0].url}
                  alt={gallery.name}
                  className="object-cover w-full h-64"
                />
              ) : (
                <div className="w-full h-64 flex items-center justify-center bg-gray-100">
                  <span className="text-gray-400">No images</span>
                </div>
              )}
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300" />
            </div>

            {/* Gallery Info */}
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{gallery.name}</h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">{gallery.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">
                  {new Date(gallery.eventDate).toLocaleDateString()}
                </span>
                <span className="text-sm text-gray-500">
                  {gallery.images.length} {gallery.images.length === 1 ? 'image' : 'images'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedGallery && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90">
          <div className="relative w-full h-full flex flex-col">
            {/* Header */}
            <div className="absolute top-0 left-0 right-0 z-10 p-4 bg-gradient-to-b from-black to-transparent">
              <div className="flex justify-between items-center text-white">
                <h2 className="text-2xl font-semibold">{selectedGallery.name}</h2>
                <button
                  onClick={handleCloseModal}
                  className="p-2 hover:bg-white hover:bg-opacity-10 rounded-full transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Main Image */}
            <div className="flex-1 flex items-center justify-center p-4">
              {selectedGallery.images.length > 0 ? (
                <div className="relative max-w-4xl max-h-[80vh]">
                  <img
                    src={selectedGallery.images[selectedImageIndex].url}
                    alt={selectedGallery.images[selectedImageIndex].title || 'Gallery image'}
                    className="max-w-full max-h-[80vh] object-contain"
                  />
                  {selectedGallery.images[selectedImageIndex].title && (
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent text-white">
                      <h3 className="text-lg font-medium">
                        {selectedGallery.images[selectedImageIndex].title}
                      </h3>
                      {selectedGallery.images[selectedImageIndex].description && (
                        <p className="text-sm text-gray-200">
                          {selectedGallery.images[selectedImageIndex].description}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-white text-center">
                  <p>No images in this gallery</p>
                </div>
              )}
            </div>

            {/* Navigation Buttons */}
            {selectedGallery.images.length > 1 && (
              <>
                <button
                  onClick={handlePrevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black bg-opacity-50 text-white hover:bg-opacity-75 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={handleNextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black bg-opacity-50 text-white hover:bg-opacity-75 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}

            {/* Thumbnails */}
            {selectedGallery.images.length > 1 && (
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
                <div className="flex space-x-2 overflow-x-auto pb-2">
                  {selectedGallery.images.map((image, index) => (
                    <button
                      key={image.id}
                      onClick={() => handleImageClick(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                        index === selectedImageIndex
                          ? 'border-white scale-110'
                          : 'border-transparent hover:border-white hover:border-opacity-50'
                      }`}
                    >
                      <img
                        src={image.url}
                        alt={image.title || 'Gallery thumbnail'}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
} 
import { useState } from 'react';
import type { Gallery } from '../types';

interface GalleryViewProps {
  galleries: Gallery[];
  onGalleryClick?: (gallery: Gallery) => void;
  onDeleteGallery?: (id: string) => void;
}

function groupGalleriesByYear(galleries: Gallery[]) {
  const groups: Record<string, Gallery[]> = {};
  galleries.forEach(gallery => {
    const year = new Date(gallery.eventDate).getFullYear().toString();
    if (!groups[year]) groups[year] = [];
    groups[year].push(gallery);
  });
  return groups;
}

function formatDateEU(dateString: string) {
  const d = new Date(dateString);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
}

export default function GalleryView({ galleries, onGalleryClick, onDeleteGallery }: GalleryViewProps) {
  const [selectedGallery, setSelectedGallery] = useState<Gallery | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

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

  // Group and sort galleries by year
  const grouped = groupGalleriesByYear(galleries);
  const years = Object.keys(grouped).sort((a, b) => Number(b) - Number(a));
  const currentYear = new Date().getFullYear().toString();

  return (
    <>
      {/* Grouped Gallery Grid */}
      {years.map((year, idx) => (
        <div key={year} className="mb-12">
          <div className="flex items-center my-8">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-6 text-2xl font-bold text-gray-700 bg-white px-4 py-1 uppercase tracking-widest shadow-sm">
              {year}
            </span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {grouped[year]
              .sort((a, b) => new Date(b.eventDate).getTime() - new Date(a.eventDate).getTime())
              .map((gallery) => (
                <div
                  key={gallery._id || gallery.id}
                  className="group relative bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
                  onClick={() => handleGalleryClick(gallery)}
                >
                  {/* Gallery Cover Image */}
                  <div className="aspect-w-16 aspect-h-9 bg-gray-200 relative">
                    {gallery.images.length > 0 ? (
                      <img
                        src={gallery.images.find(img => img.titleImage)?.url || gallery.images[0].url}
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
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">
                        {formatDateEU(gallery.eventDate)}
                      </span>
                      <span className="text-sm text-gray-500">
                        {gallery.images.length} {gallery.images.length === 1 ? 'image' : 'images'}
                      </span>
                    </div>
                    {onDeleteGallery && (
                      <button
                        className="mt-4 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                        onClick={e => {
                          e.stopPropagation();
                          onDeleteGallery(gallery._id);
                        }}
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </div>
      ))}

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
                      key={image.id || image._id || index}
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
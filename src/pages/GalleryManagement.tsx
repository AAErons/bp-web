import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGallery, type Gallery } from '../contexts/GalleryContext';
import GalleryView from '../components/GalleryView';

export default function GalleryManagement() {
  const { galleries, addGallery, updateGallery } = useGallery();
  const navigate = useNavigate();
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<Gallery, 'id' | 'createdAt' | 'updatedAt' | 'images'>>({
    name: '',
    description: '',
    eventDate: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingId) {
      updateGallery(editingId, formData);
      setEditingId(null);
    } else {
      addGallery(formData);
      setIsAdding(false);
    }

    setFormData({
      name: '',
      description: '',
      eventDate: '',
    });
  };

  const handleGalleryClick = (gallery: Gallery) => {
    navigate(`/admin/gallery/${gallery.id}`);
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
              <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow space-y-4">
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
                    Description
                  </label>
                  <textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    rows={3}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>

                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => {
                      setEditingId(null);
                      setIsAdding(false);
                      setFormData({
                        name: '',
                        description: '',
                        eventDate: '',
                      });
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
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
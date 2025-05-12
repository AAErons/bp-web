import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGallery, type Gallery } from '../contexts/GalleryContext';

export default function GalleryManagement() {
  const { galleries, addGallery, updateGallery, deleteGallery } = useGallery();
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

  const handleEdit = (gallery: Gallery) => {
    setEditingId(gallery.id);
    setFormData({
      name: gallery.name,
      description: gallery.description,
      eventDate: gallery.eventDate,
    });
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this gallery? This will also delete all images in the gallery.')) {
      deleteGallery(id);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setIsAdding(false);
    setFormData({
      name: '',
      description: '',
      eventDate: '',
    });
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
                    onClick={handleCancel}
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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {galleries.map((gallery) => (
                <div key={gallery.id} className="bg-white rounded-lg shadow overflow-hidden">
                  <div className="p-4">
                    <h3 className="font-medium text-lg mb-1">{gallery.name}</h3>
                    <p className="text-gray-600 text-sm mb-2">
                      Event Date: {new Date(gallery.eventDate).toLocaleDateString()}
                    </p>
                    <p className="text-gray-600 text-sm mb-4">{gallery.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">
                        {gallery.images.length} {gallery.images.length === 1 ? 'image' : 'images'}
                      </span>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => navigate(`/admin/gallery/${gallery.id}`)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          Manage Images
                        </button>
                        <button
                          onClick={() => handleEdit(gallery)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(gallery.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

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
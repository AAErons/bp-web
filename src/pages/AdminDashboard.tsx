import { useAdmin } from '../contexts/AdminContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function AdminDashboard() {
  const { isAuthenticated, logout } = useAdmin();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin');
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/admin');
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <h1 className="text-xl font-semibold">Admin Dashboard</h1>
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-medium mb-4">Welcome to the Admin Panel</h2>
            <p className="text-gray-600 mb-6">
              This is a protected admin area. You can manage your website content here.
            </p>
            
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <div className="bg-gray-50 p-6 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                   onClick={() => navigate('/admin/gallery')}>
                <h3 className="font-medium text-lg mb-2">Gallery Management</h3>
                <p className="text-sm text-gray-600">Add, edit, or remove gallery items</p>
                <div className="mt-4 text-blue-600">Manage Gallery →</div>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-medium text-lg mb-2">Team Members</h3>
                <p className="text-sm text-gray-600">Manage your team members and their information</p>
                <div className="mt-4 text-gray-400">Coming soon</div>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-medium text-lg mb-2">Testimonials</h3>
                <p className="text-sm text-gray-600">Update testimonials and partner information</p>
                <div className="mt-4 text-gray-400">Coming soon</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 
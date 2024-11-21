import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PhoneCall } from 'lucide-react';

const MainMenu = () => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('token') !== null;
  
  useEffect(() => {
    const fetchUserData = async () => {
      if (isLoggedIn) {
        try {
          const response = await fetch('http://localhost:5000/api/users/profile', {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          });
          const data = await response.json();
          setUsername(data.user.username);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };

    fetchUserData();
  }, [isLoggedIn]);

  const sampleBooks = Array(10).fill({
    title: 'Sampul buku',
    image: '/api/placeholder/200/300'
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold">e-Library</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              {!isLoggedIn ? (
                <>
                  <button
                    onClick={() => navigate('/login')}
                    className="px-4 py-2 text-gray-700 hover:text-gray-900"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => navigate('/register')}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Sign Up
                  </button>
                </>
              ) : (
                <button
                  onClick={() => navigate('/profile')}
                  className="flex items-center space-x-2 text-gray-700 hover:text-gray-900"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  <span>{username || 'User'}</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-12">
            <div className="flex space-x-8">
              <button className="text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                Buku
              </button>
              <button className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                Forum
              </button>
            </div>
            <button className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
              Surprise Me!
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {sampleBooks.map((book, index) => (
            <div
              key={index}
              className="bg-gray-200 rounded-lg p-4 flex items-center justify-center h-64"
            >
              <img
                src={book.image}
                alt={book.title}
                className="w-full h-full object-cover rounded"
              />
            </div>
          ))}
        </div>
      </main>

      {/* Support Button */}
      <div className="fixed bottom-8 left-8">
        <button className="flex items-center space-x-2 bg-gray-800 text-white px-4 py-2 rounded-full hover:bg-gray-700">
          <PhoneCall size={20} />
          <span>Support and Help Center</span>
        </button>
      </div>
    </div>
  );
};

export default MainMenu;
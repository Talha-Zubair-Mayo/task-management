import React, { useState } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import Button from './Button';
import { useAuthStore } from '../store/authStore';

const Layout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout, isAuthenticated } = useAuthStore();
  const [logoutLoading, setLogoutLoading] = useState(false);
  const [navLoading, setNavLoading] = useState(false);

  const handleLogout = async () => {
    setLogoutLoading(true);
    try {
      await logout();
      navigate('/login');
    } finally {
      setLogoutLoading(false);
    }
  };

  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Link to={isAuthenticated ? "/tasks" : "/login"} className="text-xl font-bold text-indigo-600">
                  Task Manager
                </Link>
              </div>
              {isAuthenticated && (
                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                  <Link
                    to="/tasks"
                    className={`${location.pathname === '/tasks'
                      ? 'border-indigo-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                      } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                  >
                    Tasks
                  </Link>
                </div>
              )}
            </div>
            <div className="flex items-center">
              {isAuthenticated ? (
                <Button
                  onClick={handleLogout}
                  variant="primary"
                  className="ml-3"
                  disabled={logoutLoading}
                >
                  {logoutLoading ? 'Logging out...' : 'Logout'}
                </Button>
              ) : !isAuthPage && (
                <div className="flex items-center space-x-4">
                  <Link to="/login">
                    <Button variant="secondary" disabled={navLoading} onClick={() => setNavLoading(true)}>
                      {navLoading ? 'Loading...' : 'Login'}
                    </Button>
                  </Link>
                  <Link to="/register">
                    <Button variant="primary" disabled={navLoading} onClick={() => setNavLoading(true)}>
                      {navLoading ? 'Loading...' : 'Register'}
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-grow">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Syringe, Menu, X, User, LogOut } from 'lucide-react';
import { signOut } from '../services/authService';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isEmployerDashboard = location.pathname.startsWith('/employers/dashboard');

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <header className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Syringe className="w-8 h-8 text-rose-500" />
            <h1 className="text-2xl font-bold text-gray-900">InjectorJobs</h1>
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-gray-600" />
            ) : (
              <Menu className="w-6 h-6 text-gray-600" />
            )}
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {isEmployerDashboard ? (
              <>
                <Link 
                  to="/employers/post-job" 
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Post New Job
                </Link>
                <Link 
                  to="/employers/dashboard" 
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Dashboard
                </Link>
                <div className="relative group">
                  <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
                    <User className="w-5 h-5" />
                    Account
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 hidden group-hover:block">
                    <button
                      onClick={handleSignOut}
                      className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Link 
                  to="/blog" 
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Blog
                </Link>
                <Link 
                  to="/community" 
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Injector Community
                </Link>
                <Link 
                  to="/login" 
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Sign In
                </Link>
                <Link 
                  to="/signup" 
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Sign Up
                </Link>
                <Link 
                  to="/employers" 
                  className="btn btn-primary"
                >
                  For Employers
                </Link>
              </>
            )}
          </nav>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4">
            <div className="flex flex-col gap-4">
              {isEmployerDashboard ? (
                <>
                  <Link 
                    to="/employers/post-job" 
                    className="text-gray-600 hover:text-gray-900 transition-colors py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Post New Job
                  </Link>
                  <Link 
                    to="/employers/dashboard" 
                    className="text-gray-600 hover:text-gray-900 transition-colors py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="text-gray-600 hover:text-gray-900 transition-colors py-2 flex items-center gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    to="/blog" 
                    className="text-gray-600 hover:text-gray-900 transition-colors py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Blog
                  </Link>
                  <Link 
                    to="/community" 
                    className="text-gray-600 hover:text-gray-900 transition-colors py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Injector Community
                  </Link>
                  <Link 
                    to="/login" 
                    className="text-gray-600 hover:text-gray-900 transition-colors py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link 
                    to="/signup" 
                    className="text-gray-600 hover:text-gray-900 transition-colors py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                  <Link 
                    to="/employers" 
                    className="btn btn-primary w-full text-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    For Employers
                  </Link>
                </>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
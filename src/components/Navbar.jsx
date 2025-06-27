import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext';
import { useTheme } from "../context/ThemeContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [cartCount, setCartCount] = useState(2);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  
  const searchRef = useRef(null);
  const userMenuRef = useRef(null);
  const { theme } = useTheme();
  const { user, loading, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdowns when clicking outside or pressing Escape
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchOpen(false);
        setSearchQuery("");
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setSearchOpen(false);
        setUserMenuOpen(false);
        setSearchQuery("");
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
    setSearchOpen(false);
    setUserMenuOpen(false);
  }, [navigate]);

  const toggleMenu = () => setIsOpen(!isOpen);
  
  const toggleSearch = () => {
    if (searchOpen) {
      // Close search
      setSearchOpen(false);
      setSearchQuery("");
    } else {
      // Open search and focus input
      setSearchOpen(true);
      // Focus after animation completes
      setTimeout(() => {
        const input = document.querySelector('[data-search-input]');
        if (input) input.focus();
      }, 300);
    }
  };

  const closeSearch = () => {
    setSearchOpen(false);
    setSearchQuery("");
  };

  // Auto-close search when not being used (5 seconds of inactivity)
  useEffect(() => {
    let timer;
    if (searchOpen && !searchQuery.trim()) {
      timer = setTimeout(() => {
        setSearchOpen(false);
        setSearchQuery("");
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [searchOpen, searchQuery]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
      setIsOpen(false);
      setUserMenuOpen(false);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to search results
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      closeSearch();
      setIsOpen(false); // Close mobile menu if open
    }
  };

  const navLinks = [
    { to: "/events", label: "Events", icon: "📅" },
    { to: "/userprofile", label: "Profile", protected: true, icon: "👤" },
    { to: "/members", label: "Members", icon: "👥" },
    { to: "/shop", label: "Shop", icon: "🛍️" },
    { to: "/contact", label: "Contact", icon: "📧" },
    { to: "/vote", label: "Vote", icon: "🗳️" },
    // Removed the Dashboard link
  ];

  const activeClass = `text-purple-400 font-medium relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-gradient-to-r after:from-purple-400 after:to-pink-400 after:transform after:scale-x-100`;
  const inactiveClass = `text-gray-300 hover:text-purple-300 transition-all duration-300 relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-gradient-to-r after:from-purple-400 after:to-pink-400 after:transform after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300`;

  return (
    <>
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled 
          ? "backdrop-blur-xl bg-black/70 border-b border-purple-500/30 shadow-lg shadow-purple-500/10" 
          : "backdrop-blur-md bg-black/50 border-b border-purple-400/20"
      }`}>
        {/* Animated geometric lines */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-400/40 to-transparent animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-400/30 to-transparent"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 lg:h-20">
            {/* Logo */}
            <Link 
              to="/" 
              className="flex items-center space-x-2 sm:space-x-3 group flex-shrink-0" 
              aria-label="Tales House Home"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 transition-transform duration-300 group-hover:scale-110">
                <img 
                  src="https://raw.githubusercontent.com/Zedent-lab/Tales-House/main/public/Tale-House-Official-Logo.png"
                  alt="Tales House Logo" 
                  className="w-full h-full object-contain group-hover:brightness-125 transition-all duration-300" 
                />
              </div>
              <div className="relative hidden sm:block">
                <span className="text-lg sm:text-xl lg:text-2xl font-bold text-transparent bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text">
                  Tale House
                </span>
                <div className="absolute -bottom-1 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-400/40 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navLinks.map(({ to, label, protected: isProtected }) => {
                if (isProtected && !user) return null;
                
                return (
                  <NavLink
                    key={to}
                    to={to}
                    className={({ isActive }) =>
                      `px-3 py-2 text-sm font-medium transition-all duration-300 ${isActive ? activeClass : inactiveClass}`
                    }
                  >
                    {label}
                  </NavLink>
                );
              })}
            </div>

            {/* Right side icons and user menu */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              {/* Enhanced Search Toggle */}
              <div className="relative" ref={searchRef}>
                <button 
                  onClick={toggleSearch} 
                  className={`p-2 rounded-lg transition-all duration-300 transform hover:scale-110 ${
                    searchOpen 
                      ? "text-purple-400 bg-purple-400/20 shadow-lg shadow-purple-500/25 scale-110" 
                      : "text-gray-300 hover:text-purple-300 hover:bg-white/10"
                  }`}
                  aria-label={searchOpen ? "Close search" : "Open search"}
                >
                  <div className="relative">
                    {/* Search Icon */}
                    <svg 
                      className={`w-5 h-5 transition-all duration-300 ${
                        searchOpen ? 'opacity-0 scale-75 rotate-90' : 'opacity-100 scale-100 rotate-0'
                      }`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <circle cx="11" cy="11" r="8"></circle>
                      <path d="m21 21-4.35-4.35"></path>
                    </svg>
                    
                    {/* Close Icon */}
                    <svg 
                      className={`w-5 h-5 absolute inset-0 transition-all duration-300 ${
                        searchOpen ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-75 -rotate-90'
                      }`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                </button>
              </div>

              {/* Cart - Only show if user is logged in */}
              {user && (
                <Link 
                  to="/userprofile?tab=cart" // Link directly to the cart tab in Userprofile
                  className="relative p-2 text-gray-300 hover:text-purple-300 transition-all duration-300 hover:bg-white/10 rounded-lg transform hover:scale-110"
                  aria-label={`Shopping cart with ${cartCount} items`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-2 9m5-9v9m4-9v9m5-9l2 9" />
                  </svg>
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center font-semibold animate-bounce">
                      {cartCount > 99 ? '99+' : cartCount}
                    </span>
                  )}
                </Link>
              )}

              {/* User Menu / Auth */}
              <div className="relative hidden lg:block" ref={userMenuRef}>
                {loading ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-400"></div>
                    <span className="text-sm text-gray-400">Loading...</span>
                  </div>
                ) : user ? (
                  <div className="relative">
                    <button
                      onClick={() => setUserMenuOpen(!userMenuOpen)}
                      className="flex items-center space-x-2 p-2 rounded-lg hover:bg-white/10 transition-all duration-300"
                    >
                      <img
                        src={user.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.displayName || user.email)}&background=7c3aed&color=fff`}
                        alt="Profile"
                        className="w-8 h-8 rounded-full border-2 border-purple-400/50 hover:border-purple-400 transition-colors duration-300"
                      />
                      <span className="text-sm text-gray-300 max-w-24 truncate hidden xl:block">
                        {user.displayName || user.email?.split('@')[0]}
                      </span>
                      <svg 
                        className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${userMenuOpen ? 'rotate-180' : ''}`}
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {/* User Dropdown */}
                    {userMenuOpen && (
                      <div className="absolute right-0 mt-2 w-48 bg-black/90 backdrop-blur-xl rounded-lg shadow-xl border border-purple-400/20 py-2 animate-in slide-in-from-top-2 duration-200">
                        <Link
                          to="/userprofile"
                          className="block px-4 py-2 text-sm text-gray-300 hover:text-purple-300 hover:bg-purple-400/10 transition-colors duration-200"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          Profile
                        </Link>
                        <Link
                          to="/settings"
                          className="block px-4 py-2 text-sm text-gray-300 hover:text-purple-300 hover:bg-purple-400/10 transition-colors duration-200"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          Settings
                        </Link>
                        <hr className="my-2 border-purple-400/20" />
                        <button
                          onClick={handleLogout}
                          className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-400/10 transition-colors duration-200"
                        >
                          Logout
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link 
                    to="/login" 
                    className="px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/25"
                  >
                    Login
                  </Link>
                )}
              </div>

              {/* Mobile Menu Button */}
              <button 
                onClick={toggleMenu} 
                className="lg:hidden p-2 text-gray-300 hover:text-purple-300 transition-all duration-300 hover:bg-white/10 rounded-lg transform hover:scale-110"
                aria-label="Toggle mobile menu"
              >
                <svg 
                  className="w-6 h-6 transition-transform duration-300" 
                  fill="none" 
                  stroke="currentColor" 
                  style={{ transform: isOpen ? "rotate(90deg)" : "rotate(0deg)" }}
                  viewBox="0 0 24 24"
                >
                  {isOpen
                    ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  }
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Enhanced Search Bar with Smooth Transitions */}
        <div className={`absolute top-full left-0 right-0 bg-black/95 backdrop-blur-xl border-b border-purple-400/30 z-40 transition-all duration-500 ease-out ${
          searchOpen 
            ? "opacity-100 translate-y-0 visible max-h-32" 
            : "opacity-0 -translate-y-8 invisible max-h-0"
        }`}>
          <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-500 ${
            searchOpen ? "py-4" : "py-0"
          }`}>
            <form onSubmit={handleSearch} className="relative">
              <input
                data-search-input
                type="text"
                placeholder="Search events, members, products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-12 py-3 bg-white/10 border border-purple-400/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-400/60 focus:ring-2 focus:ring-purple-400/20 focus:bg-white/15 transition-all duration-300"
                onBlur={(e) => {
                  // Don't close immediately if user is still interacting
                  setTimeout(() => {
                    if (!e.target.matches(':focus') && !searchQuery.trim()) {
                      setSearchOpen(false);
                    }
                  }, 200);
                }}
              />
              
              {/* Search Icon in Input */}
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.35-4.35"></path>
                </svg>
              </div>
              
              {/* Clear/Close Button */}
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-12 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-all duration-200 hover:scale-110"
                  aria-label="Clear search"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
              
              <button
                type="button"
                onClick={closeSearch}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-all duration-200 hover:scale-110"
                aria-label="Close search"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </form>
            
            {/* Search Hint */}
            <div className={`mt-2 text-xs text-gray-400 transition-all duration-300 ${
              searchQuery ? "opacity-100" : "opacity-60"
            }`}>
              {searchQuery 
                ? `Press Enter to search for "${searchQuery}"` 
                : "Press Escape to close • Auto-closes after 5s of inactivity"
              }
            </div>
          </div>
        </div>
      </nav>

      {/* Enhanced Mobile Menu */}
      <div className={`lg:hidden fixed top-0 left-0 w-full max-w-sm h-full z-40 backdrop-blur-xl bg-black/90 border-r border-purple-400/30 transform transition-all duration-300 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}>
        <div className="flex flex-col h-full">
          {/* Mobile Header */}
          <div className="flex items-center justify-between p-4 border-b border-purple-400/20">
            <div className="flex items-center space-x-2">
              <img 
                src="/Tale-House-Official-Logo.png" 
                alt="Logo" 
                className="w-8 h-8 object-contain" 
              />
              <span className="text-lg font-bold text-white">Tale House</span>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-2 text-gray-400 hover:text-white transition-colors duration-200"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            {/* User Info in Mobile */}
            {user && (
              <div className="flex items-center space-x-3 p-4 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-xl border border-purple-400/20 mb-6">
                <img
                  src={user.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.displayName || user.email)}&background=7c3aed&color=fff`}
                  alt="Profile"
                  className="w-12 h-12 rounded-full border-2 border-purple-400/50"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-medium truncate">
                    {user.displayName || 'User'}
                  </p>
                  <p className="text-gray-400 text-xs truncate">
                    {user.email}
                  </p>
                </div>
              </div>
            )}

            {/* Navigation Links */}
            <div className="space-y-2 mb-6">
              {navLinks.map(({ to, label, protected: isProtected, icon }) => {
                if (isProtected && !user) return null;
                
                return (
                  <NavLink
                    key={to}
                    to={to}
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center space-x-3 px-4 py-3 text-sm font-medium rounded-xl transition-all duration-300 ${
                        isActive
                          ? "text-purple-400 bg-purple-400/20 border-l-4 border-purple-400 shadow-lg"
                          : "text-gray-300 hover:text-purple-300 hover:bg-white/10 hover:border-l-4 hover:border-purple-400/50"
                      }`
                    }
                  >
                    <span className="text-lg">{icon}</span>
                    <span>{label}</span>
                  </NavLink>
                );
              })}
            </div>

            {/* Enhanced Mobile Search */}
            <div className="mb-6">
              <div className="relative">
                <form onSubmit={handleSearch}>
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-10 py-3 bg-white/10 border border-purple-400/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-400/60 focus:ring-2 focus:ring-purple-400/20 transition-all duration-300"
                  />
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <circle cx="11" cy="11" r="8"></circle>
                      <path d="m21 21-4.35-4.35"></path>
                    </svg>
                  </div>
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-200"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </form>
              </div>
            </div>
          </div>

          {/* Mobile Auth Section */}
          <div className="p-4 border-t border-purple-400/20">
            {loading ? (
              <div className="flex items-center justify-center py-4">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-400"></div>
                <span className="ml-2 text-gray-300 text-sm">Loading...</span>
              </div>
            ) : user ? (
              <div className="space-y-2">
                <Link
                  to="/settings"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-gray-300 hover:text-purple-300 hover:bg-white/10 rounded-lg transition-colors duration-200"
                >
                  <span>⚙️</span>
                  <span>Settings</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 w-full px-4 py-3 text-sm font-semibold text-white bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 rounded-xl transition-all duration-300 shadow-lg hover:shadow-red-500/25"
                >
                  <span>🚪</span>
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center space-x-2 w-full px-4 py-3 text-sm font-semibold text-white bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 rounded-xl transition-all duration-300 shadow-lg hover:shadow-purple-500/25"
              >
                <span>🔐</span>
                <span>Login / Signup</span>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Enhanced Mobile Menu Overlay */}
      {isOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-30 transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
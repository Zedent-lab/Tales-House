import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

/**
 * Elegant Futuristic Navbar with clean lines and integrated logo
 */
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const { theme } = useTheme();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleSearch = () => setSearchOpen(!searchOpen);

  // Simulate cart count
  useEffect(() => {
    setCartCount(2);
  }, []);

  const activeClass = `text-purple-400 font-medium relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-gradient-to-r after:from-purple-400 after:to-pink-400 after:transform after:scale-x-100`;

  const inactiveClass = `text-gray-300 hover:text-purple-300 transition-all duration-300 relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-gradient-to-r after:from-purple-400 after:to-pink-400 after:transform after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300`;

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled 
            ? 'backdrop-blur-lg bg-black/60 border-b border-purple-500/20' 
            : 'backdrop-blur-md bg-black/40 border-b border-purple-400/10'
        }`}
        aria-label="Primary Navigation"
      >
        {/* Subtle geometric lines */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-400/30 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-400/20 to-transparent"></div>
        
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center relative">
          {/* Logo and Brand */}
          <Link
            to="/"
            className="flex items-center space-x-3 group"
            aria-label="Tales House Home"
          >
            {/* Logo Image */}
            <div className="relative w-24 h-24 flex-shrink-0">
              <img 
                src="https://i.imgur.com/XkDQqzr.png" 
                alt="Tales House Logo" 
                className="w-full h-full object-contain filter brightness-110 group-hover:brightness-125 transition-all duration-300"
              />
              <div className="absolute inset-0 bg-purple-400/20 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            
            {/* Brand Text */}
            <div className="relative">
              <span className="text-2xl font-bold text-transparent bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text">
                Tales House
              </span>
              {/* Subtle geometric accent */}
              <div className="absolute -bottom-1 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-400/40 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex md:items-center md:space-x-8">
            {[
              { to: "/events", label: "Events" },
              { to: "/userprofile", label: "Profile" },
              { to: "/members", label: "Members" },
              { to: "/shop", label: "Shop" },
              { to: "/contact", label: "Contact" },
            ].map(({ to, label }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  className={({ isActive }) =>
                    `px-4 py-2 text-sm font-medium transition-all duration-300 ${
                      isActive ? activeClass : inactiveClass
                    }`
                  }
                  onClick={() => setIsOpen(false)}
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Action Icons */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <button
              onClick={toggleSearch}
              aria-label="Toggle Search"
              className="p-2 text-gray-300 hover:text-purple-300 transition-colors duration-300 relative group"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1110.5 3a7.5 7.5 0 016.15 13.65z" />
              </svg>
              <div className="absolute inset-0 border border-purple-400/0 group-hover:border-purple-400/30 rounded transition-colors duration-300"></div>
            </button>

            {/* Shopping Cart */}
            <Link
              to="/cart"
              className="relative p-2 text-gray-300 hover:text-purple-300 transition-colors duration-300 group"
              aria-label="Shopping Cart"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 9m5-9v9m4-9v9m5-9l2 9" />
              </svg>
              <div className="absolute inset-0 border border-purple-400/0 group-hover:border-purple-400/30 rounded transition-colors duration-300"></div>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full text-xs w-4 h-4 flex items-center justify-center font-medium">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-gray-300 hover:text-purple-300 transition-colors duration-300 group"
              onClick={toggleMenu}
              aria-label="Toggle Menu"
              aria-expanded={isOpen}
            >
              <svg className="w-5 h-5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ transform: isOpen ? "rotate(90deg)" : "rotate(0deg)" }}>
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
              <div className="absolute inset-0 border border-purple-400/0 group-hover:border-purple-400/30 rounded transition-colors duration-300"></div>
            </button>
          </div>
        </div>

        {/* Search Bar - Positioned below navbar when open */}
        {searchOpen && (
          <div className="absolute top-full left-0 right-0 bg-black/90 backdrop-blur-lg border-b border-purple-400/20 z-50">
            <div className="max-w-7xl mx-auto px-6 py-4">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-purple-400/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-400/60 transition-colors duration-300"
                autoFocus
              />
            </div>
          </div>
        )}
      </nav>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed top-0 left-0 w-72 h-full z-40 backdrop-blur-xl bg-black/80 border-r border-purple-400/20 transform transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Geometric accent lines */}
        <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-purple-400/30 to-transparent"></div>
        
        <div className="p-6 pt-20">
          <ul className="space-y-4">
            {[
              { to: "/events", label: "Events" },
              { to: "/userprofile", label: "My Profile" },
              { to: "/members", label: "Meet the Members" },
              { to: "/shop", label: "Shop" },
              { to: "/contact", label: "Contact" },
            ].map(({ to, label }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  className={({ isActive }) =>
                    `block px-4 py-3 text-sm font-medium transition-all duration-300 rounded-lg relative ${
                      isActive
                        ? 'text-purple-400 bg-purple-400/10 border-l-2 border-purple-400'
                        : 'text-gray-300 hover:text-purple-300 hover:bg-white/5'
                    }`
                  }
                  onClick={() => setIsOpen(false)}
                >
                  {label}
                  {/* Subtle line accent */}
                  <div className="absolute bottom-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-purple-400/20 to-transparent"></div>
                </NavLink>
              </li>
            ))}
          </ul>
          
          {/* Mobile Search */}
          <div className="mt-8 p-4 bg-white/5 border border-purple-400/20 rounded-lg">
            <input
              type="text"
              placeholder="Search..."
              className="w-full bg-transparent text-white placeholder-gray-400 border-none outline-none text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Mobile Menu Backdrop */}
      {isOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-30"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
}
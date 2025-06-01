import React, { useState, useEffect, useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { AuthContext } from '../contexts/AuthContext';
import { useTheme } from "../context/ThemeContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [cartCount, setCartCount] = useState(2); // simulate cart count
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const { theme } = useTheme();
  const { user, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleSearch = () => setSearchOpen(!searchOpen);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
      setIsOpen(false);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const navLinks = [
    { to: "/events", label: "Events" },
    { to: "/userprofile", label: "Profile", protected: true },
    { to: "/members", label: "Members" },
    { to: "/shop", label: "Shop" },
    { to: "/contact", label: "Contact" },
  ];

  const activeClass = `text-purple-400 font-medium relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-gradient-to-r after:from-purple-400 after:to-pink-400 after:transform after:scale-x-100`;
  const inactiveClass = `text-gray-300 hover:text-purple-300 transition-all duration-300 relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-gradient-to-r after:from-purple-400 after:to-pink-400 after:transform after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300`;

  return (
    <>
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? "backdrop-blur-lg bg-black/60 border-b border-purple-500/20" 
          : "backdrop-blur-md bg-black/40 border-b border-purple-400/10"
      }`}>
        {/* Geometric lines */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-400/30 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-400/20 to-transparent"></div>

        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center relative">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group" aria-label="Tales House Home">
            <div className="w-24 h-24">
              <img src="https://i.imgur.com/XkDQqzr.png" alt="Logo" className="w-full h-full object-contain group-hover:brightness-125 transition-all duration-300" />
            </div>
            <div className="relative">
              <span className="text-2xl font-bold text-transparent bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text">Tale House</span>
              <div className="absolute -bottom-1 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-400/40 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center space-x-8">
            {navLinks.map(({ to, label, protected: isProtected }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  className={({ isActive }) =>
                    `px-4 py-2 text-sm font-medium ${isActive ? activeClass : inactiveClass}`
                  }
                >
                  {label}
                </NavLink>
              </li>
            ))}
            
            {/* Auth Section */}
            {loading ? (
              <li>
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-400"></div>
              </li>
            ) : user ? (
              <>
                {/* User Info */}
                <li className="flex items-center space-x-3">
                  <img
                    src={user.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.displayName || user.email)}&background=7c3aed&color=fff`}
                    alt="Profile"
                    className="w-8 h-8 rounded-full border-2 border-purple-400/50 hover:border-purple-400 transition-colors duration-300"
                  />
                  <span className="text-sm text-gray-300 hidden lg:block">
                    {user.displayName || user.email?.split('@')[0]}
                  </span>
                </li>
                {/* Logout Button */}
                <li>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 rounded-lg transition-all duration-300 transform hover:scale-105"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li>
                <Link to="/login" className="px-4 py-2 text-sm font-semibold text-white bg-purple-500 hover:bg-purple-600 rounded-lg transition">
                  Login / Signup
                </Link>
              </li>
            )}
          </ul>

          {/* Icons */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <button onClick={toggleSearch} className="p-2 text-gray-300 hover:text-purple-300 transition">
              <svg className="w-5 h-5" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35A7.5 7.5 0 1010.5 3a7.5 7.5 0 016.15 13.65z" /></svg>
            </button>

            {/* Cart */}
            <Link to="/cart" className="relative p-2 text-gray-300 hover:text-purple-300 transition">
              <svg className="w-5 h-5" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-2 9m5-9v9m4-9v9m5-9l2 9" /></svg>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-purple-500 text-white rounded-full text-xs w-4 h-4 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button onClick={toggleMenu} className="md:hidden p-2 text-gray-300 hover:text-purple-300">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" style={{ transform: isOpen ? "rotate(90deg)" : "rotate(0deg)" }}>
                {isOpen
                  ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                }
              </svg>
            </button>
          </div>
        </div>

        {/* Search Bar */}
        {searchOpen && (
          <div className="absolute top-full left-0 right-0 bg-black/90 backdrop-blur-lg border-b border-purple-400/20 z-50">
            <div className="max-w-7xl mx-auto px-6 py-4">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-purple-400/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-400/60"
              />
            </div>
          </div>
        )}
      </nav>

      {/* Mobile Nav */}
      <div className={`md:hidden fixed top-0 left-0 w-72 h-full z-40 backdrop-blur-xl bg-black/80 border-r border-purple-400/20 transform transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}>
        <div className="p-6 pt-20 space-y-4">
          {/* User Info in Mobile */}
          {user && (
            <div className="flex items-center space-x-3 p-4 bg-purple-400/10 rounded-lg border border-purple-400/20 mb-4">
              <img
                src={user.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.displayName || user.email)}&background=7c3aed&color=fff`}
                alt="Profile"
                className="w-10 h-10 rounded-full border-2 border-purple-400/50"
              />
              <div>
                <p className="text-white text-sm font-medium">
                  {user.displayName || 'User'}
                </p>
                <p className="text-gray-400 text-xs">
                  {user.email}
                </p>
              </div>
            </div>
          )}

          {navLinks.map(({ to, label, protected: isProtected }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `block px-4 py-3 text-sm font-medium rounded-lg ${
                  isActive
                    ? "text-purple-400 bg-purple-400/10 border-l-2 border-purple-400"
                    : "text-gray-300 hover:text-purple-300 hover:bg-white/5"
                }`
              }
            >
              {label}
            </NavLink>
          ))}
          
          {/* Auth Buttons */}
          {user ? (
            <button
              onClick={handleLogout}
              className="block w-full px-4 py-3 text-sm font-semibold text-white bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 rounded-lg transition mt-4"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className="block px-4 py-3 text-sm font-semibold text-white bg-purple-500 hover:bg-purple-600 rounded-lg transition"
            >
              Login / Signup
            </Link>
          )}
        </div>
      </div>
    </>
  );
}
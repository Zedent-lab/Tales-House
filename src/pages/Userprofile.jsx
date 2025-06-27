import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import BackgroundWrapper from '../components/Background';
import { useAuth } from '../context/AuthContext'; // Assuming AuthContext provides user info
import { fetchUserData, fetchCartItems, fetchBookings, fetchPurchaseHistory } from '../api/userApi'; // Mock API functions

const Userprofile = () => {
  const { user } = useAuth();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('profile');
  const [userData, setUserData] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [purchaseHistory, setPurchaseHistory] = useState([]);
  const [error, setError] = useState(null); // New state for error handling

  useEffect(() => {
    // Check for the 'tab' query parameter in the URL
    const params = new URLSearchParams(location.search);
    const tab = params.get('tab');
    if (tab) {
      setActiveTab(tab);
    }
  }, [location]);

  useEffect(() => {
    if (user) {
      const fetchData = async () => {
        try {
          const [userData, cart, bookings, history] = await Promise.all([
            fetchUserData(user.id),
            fetchCartItems(user.id),
            fetchBookings(user.id),
            fetchPurchaseHistory(user.id),
          ]);
          setUserData(userData);
          setCartItems(cart);
          setBookings(bookings);
          setPurchaseHistory(history);
        } catch (err) {
          setError('Failed to load data. Please try again later.');
        }
      };
      fetchData();
    }
  }, [user]);

  const TabButton = ({ id, label, isActive, onClick }) => (
    <button
      onClick={() => onClick(id)}
      className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
        isActive
          ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
          : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 hover:text-white'
      }`}
    >
      {label}
    </button>
  );

  const CartItem = ({ item }) => (
    <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300">
      <div className="flex items-center space-x-4">
        <img 
          src={item.image} 
          alt={item.title}
          className="w-16 h-16 rounded-lg object-cover"
        />
        <div className="flex-1">
          <h3 className="text-white font-semibold">{item.title}</h3>
          <p className="text-purple-300 text-sm">{item.type}</p>
          <p className="text-gray-400 text-sm">{item.duration}</p>
        </div>
        <div className="text-right">
          <p className="text-white font-bold">${item.price}</p>
          <button className="text-red-400 hover:text-red-300 text-sm mt-1 transition-colors">
            Remove
          </button>
        </div>
      </div>
    </div>
  );

  const BookingCard = ({ booking }) => (
    <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300">
      <div className="flex items-start space-x-4">
        <img 
          src={booking.image} 
          alt={booking.title}
          className="w-20 h-20 rounded-lg object-cover"
        />
        <div className="flex-1">
          <h3 className="text-white font-semibold text-lg">{booking.title}</h3>
          <p className="text-purple-300 mb-2">{booking.type}</p>
          <div className="space-y-1 text-sm text-gray-300">
            <p>📅 {booking.date}</p>
            <p>🕐 {booking.time}</p>
            <p>💰 ${booking.price}</p>
          </div>
        </div>
        <div className="text-right">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
            booking.status === 'Confirmed' 
              ? 'bg-green-600/20 text-green-400' 
              : 'bg-yellow-600/20 text-yellow-400'
          }`}>
            {booking.status}
          </span>
          <div className="mt-3 space-y-2">
            <button className="block w-full px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm rounded-lg transition-colors">
              View Details
            </button>
            <button className="block w-full px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white text-sm rounded-lg transition-colors">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    if (error) {
      return <p className="text-red-500">{error}</p>;
    }

    switch (activeTab) {
      case 'profile':
        return userData ? (
          <div className="space-y-8">
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
              <div className="flex items-center space-x-6 mb-8">
                <img 
                  src={userData.avatar} 
                  alt="Profile"
                  className="w-24 h-24 rounded-full object-cover border-4 border-purple-500/50"
                />
                <div>
                  <h2 className="text-2xl font-bold text-white">{userData.name}</h2>
                  <p className="text-gray-300">{userData.email}</p>
                  <p className="text-purple-300">Member since {userData.memberSince}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">Full Name</label>
                  <input 
                    type="text" 
                    value={userData.name}
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">Email</label>
                  <input 
                    type="email" 
                    value={userData.email}
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">Phone</label>
                  <input 
                    type="tel" 
                    value={userData.phone}
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">Preferred Genre</label>
                  <select className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                    <option>Fantasy</option>
                    <option>Mystery</option>
                    <option>Romance</option>
                    <option>Sci-Fi</option>
                  </select>
                </div>
              </div>
              
              <button className="mt-6 px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium rounded-lg hover:shadow-lg transition-all duration-300">
                Update Profile
              </button>
            </div>
          </div>
        ) : (
          <p className="text-gray-300">Loading profile...</p>
        );

      case 'cart':
        const subtotal = cartItems.reduce((acc, item) => acc + item.price, 0);
        const tax = (subtotal * 0.1).toFixed(2); // Example: 10% tax
        const total = (subtotal + parseFloat(tax)).toFixed(2);

        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">Shopping Cart</h2>
              <span className="text-gray-300">{cartItems.length} items</span>
            </div>
            <div className="space-y-4">
              {cartItems.map(item => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>
            
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-300">Subtotal:</span>
                <span className="text-white font-semibold">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-300">Tax:</span>
                <span className="text-white font-semibold">${tax}</span>
              </div>
              <div className="border-t border-gray-600 pt-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-semibold text-white">Total:</span>
                  <span className="text-lg font-bold text-white">${total}</span>
                </div>
                <button
                  className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium rounded-lg hover:shadow-lg transition-all duration-300"
                  disabled={cartItems.length === 0} // Disable if cart is empty
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        );

      case 'bookings':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">My Bookings</h2>
            <div className="space-y-6">
              {bookings.map(booking => (
                <BookingCard key={booking.id} booking={booking} />
              ))}
            </div>
          </div>
        );

      case 'history':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Purchase History</h2>
            <div className="space-y-4">
              {purchaseHistory.map(purchase => (
                <div key={purchase.id} className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-white font-semibold">{purchase.title}</h3>
                      <p className="text-gray-400 text-sm">{purchase.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-bold">${purchase.price}</p>
                      <span className="text-green-400 text-sm">{purchase.status}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <BackgroundWrapper>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">My Profile</h1>
          <p className="text-lg text-gray-300">
            Manage your account, bookings, and preferences
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-4 mb-8">
          <TabButton 
            id="profile" 
            label="Profile" 
            isActive={activeTab === 'profile'} 
            onClick={setActiveTab} 
          />
          <TabButton 
            id="cart" 
            label="Cart" 
            isActive={activeTab === 'cart'} 
            onClick={setActiveTab} 
          />
          <TabButton 
            id="bookings" 
            label="Bookings" 
            isActive={activeTab === 'bookings'} 
            onClick={setActiveTab} 
          />
          <TabButton 
            id="history" 
            label="History" // Reverted label
            isActive={activeTab === 'history'} 
            onClick={setActiveTab} 
          />
        </div>

        {/* Tab Content */}
        <div className="min-h-[60vh]">
          {renderTabContent()} // Reverted content rendering
        </div>
      </div>
    </BackgroundWrapper>
  );
};

export default Userprofile;
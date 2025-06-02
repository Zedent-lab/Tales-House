import React, { useState } from 'react';

const EventsPage = () => {
  // State for managing which modal is open
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Event data - easily editable for adding/removing/modifying events
  const events = [
    {
      id: 1,
      title: "Tales in the Big Apple",
      date: "March 15, 2025",
      location: "New York City, NY",
      venue: "Madison Square Garden Theater",
      image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80", // NYC skyline
      description: "Join us for an unforgettable evening of storytelling in the heart of Manhattan. Experience tales that capture the pulse of the city that never sleeps.",
      capacity: "500 people",
      dresscode: "Smart casual - think NYC chic. Dark colors preferred to match our aesthetic.",
      fullAddress: "4 Pennsylvania Plaza, New York, NY 10001",
      time: "7:30 PM - 10:00 PM",
      price: "$45"
    },
    {
      id: 2,
      title: "London Tales Gathering",
      date: "April 8, 2025",
      location: "London, England",
      venue: "Royal Festival Hall",
      image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80", // London Bridge & Big Ben
      description: "Immerse yourself in the rich storytelling tradition of London. From ancient legends to modern narratives that shaped the city.",
      capacity: "800 people",
      dresscode: "Business casual with a touch of British elegance. Blazers and smart shoes recommended.",
      fullAddress: "Southbank Centre, Belvedere Rd, London SE1 8XX, UK",
      time: "8:00 PM - 10:30 PM",
      price: "£35"
    },
    {
      id: 3,
      title: "Parisian Story Soirée",
      date: "May 20, 2025",
      location: "Paris, France",
      venue: "Théâtre du Châtelet",
      image: "https://images.unsplash.com/photo-1431274172761-fca41d930114?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80", // Paris Eiffel Tower
      description: "An elegant evening of tales in the City of Light. Discover stories that illuminate the romance and mystery of Paris.",
      capacity: "600 people",
      dresscode: "Sophisticated evening wear - embrace Parisian elegance. Think little black dress or sharp suit.",
      fullAddress: "1 Place du Châtelet, 75001 Paris, France",
      time: "7:00 PM - 9:30 PM",
      price: "€40"
    },
    {
      id: 4,
      title: "Tokyo Tales Experience",
      date: "June 12, 2025",
      location: "Tokyo, Japan",
      venue: "Tokyo International Forum",
      image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-4.0.3&auto=format&fit=crop&w=2088&q=80", // Tokyo cityscape
      description: "Explore the fusion of ancient traditions and modern innovation through captivating stories from the land of the rising sun.",
      capacity: "700 people",
      dresscode: "Modern minimalist style - clean lines, neutral colors. Respect for traditional aesthetics appreciated.",
      fullAddress: "3 Chome-5-1 Marunouchi, Chiyoda City, Tokyo 100-0005, Japan",
      time: "6:30 PM - 9:00 PM",
      price: "¥5,500"
    },
    {
      id: 5,
      title: "Sydney Harbor Stories",
      date: "July 18, 2025",
      location: "Sydney, Australia",
      venue: "Sydney Opera House",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80", // Sydney Opera House & Harbor
      description: "Set against the backdrop of Sydney's iconic harbor, dive into tales from the land down under that will transport you across vast landscapes.",
      capacity: "900 people",
      dresscode: "Relaxed sophisticated - think Sydney style. Light fabrics and comfortable elegance.",
      fullAddress: "Bennelong Point, Sydney NSW 2000, Australia",
      time: "7:00 PM - 9:45 PM",
      price: "AUD $55"
    },
    {
      id: 6,
      title: "Cape Town Chronicles",
      date: "August 25, 2025",
      location: "Cape Town, South Africa",
      venue: "Artscape Theatre Centre",
      image: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80", // Cape Town Table Mountain
      description: "Experience the vibrant storytelling culture of South Africa with tales that celebrate heritage, resilience, and the beauty of the rainbow nation.",
      capacity: "650 people",
      dresscode: "Colorful and expressive - celebrate African fashion and vibrant patterns. Comfortable yet stylish.",
      fullAddress: "D.F. Malan St, Foreshore, Cape Town, 8001, South Africa",
      time: "6:00 PM - 8:30 PM",
      price: "R350"
    }
  ];

  // Function to open booking modal
  const openBookingModal = (event) => {
    setSelectedEvent(event);
  };

  // Function to close booking modal
  const closeBookingModal = () => {
    setSelectedEvent(null);
  };

  // Function to handle booking (placeholder - connect to your booking system)
  const handleBooking = (eventId) => {
    // TODO: Connect to your actual booking system/API
    alert(`Booking initiated for ${selectedEvent.title}. Redirecting to payment...`);
    closeBookingModal();
  };

  return (
    <div className="events-page">
      {/* ===== HERO SECTION ===== */}
      <section className="hero-section">
        {/* Main logo - much bigger to occupy more space */}
        <img 
          src="/Tale-House-Official-Logo.png" 
          alt="Tales House Logo" 
          className="w-64 md:w-80 lg:w-96 h-auto mb-8 filter drop-shadow-lg animate-pulse"
        />
        <h1 className="text-6xl font-bold text-center mb-4 bg-gradient-to-r from-white via-purple-400 to-indigo-400 bg-clip-text text-transparent">
          TALE HOUSE EVENTS
        </h1>
        <p className="text-xl text-center opacity-80 mb-12 tracking-widest">
          WHERE STORIES UNFOLD ACROSS THE GLOBE
        </p>
      </section>

      {/* ===== FLOATING LOGO - TOP RIGHT ===== */}
      <img 
        src="/Tale-House-Official-Logo.png" 
        alt="Tales House Logo" 
        className="fixed top-5 right-5 w-16 h-auto opacity-70 hover:opacity-100 transition-opacity duration-300 z-50"
      />

      {/* ===== EVENTS SECTION ===== */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        {/* Section header with logo */}
        <div className="text-center mb-16">
          <img 
            src="/Tale-House-Official-Logo.png" 
            alt="Tales House Logo" 
            className="w-20 h-auto mx-auto mb-4 opacity-80"
          />
          <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-white to-purple-400 bg-clip-text text-transparent">
            UPCOMING EVENTS
          </h2>
        </div>

        {/* Events grid - responsive layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <div 
              key={event.id}
              className="bg-gradient-to-br from-purple-900/20 to-indigo-900/20 backdrop-blur-sm rounded-2xl overflow-hidden border border-purple-500/30 hover:border-purple-500/60 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20"
            >
              {/* Event image */}
              <div className="overflow-hidden">
                <img 
                  src={event.image} 
                  alt={event.location}
                  className="w-full h-64 object-cover transition-transform duration-300 hover:scale-110"
                />
              </div>
              
              {/* Event content */}
              <div className="p-6">
                {/* Event date */}
                <div className="text-purple-400 font-bold text-sm mb-2 uppercase tracking-wide">
                  {event.date}
                </div>
                
                {/* Event title */}
                <h3 className="text-xl font-bold mb-3 text-white">
                  {event.title}
                </h3>
                
                {/* Event location */}
                <div className="text-gray-300 mb-3 flex items-center gap-2">
                  <span>📍</span>
                  <span>{event.location}</span>
                </div>
                
                {/* Event description */}
                <p className="text-gray-400 leading-relaxed mb-6 text-sm">
                  {event.description}
                </p>
                
                {/* Get tickets button */}
                <button 
                  onClick={() => openBookingModal(event)}
                  className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 hover:transform hover:translateY-1 hover:shadow-lg uppercase tracking-wide"
                >
                  Get Tickets
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== BOOKING MODAL ===== */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-gradient-to-br from-gray-900 to-purple-900/50 rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-purple-500/30">
            {/* Modal header */}
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">
                  {selectedEvent.title}
                </h2>
                <p className="text-purple-400 font-semibold">
                  {selectedEvent.date} • {selectedEvent.time}
                </p>
              </div>
              {/* Close button */}
              <button 
                onClick={closeBookingModal}
                className="text-gray-400 hover:text-white text-2xl font-bold transition-colors"
              >
                ×
              </button>
            </div>

            {/* Event image in modal */}
            <img 
              src={selectedEvent.image} 
              alt={selectedEvent.location}
              className="w-full h-48 object-cover rounded-xl mb-6"
            />

            {/* Event details */}
            <div className="space-y-4 mb-8">
              {/* Location details */}
              <div>
                <h3 className="text-lg font-semibold text-purple-400 mb-2">📍 Location</h3>
                <p className="text-gray-300">{selectedEvent.venue}</p>
                <p className="text-gray-400 text-sm">{selectedEvent.fullAddress}</p>
              </div>

              {/* Capacity */}
              <div>
                <h3 className="text-lg font-semibold text-purple-400 mb-2">👥 Capacity</h3>
                <p className="text-gray-300">{selectedEvent.capacity}</p>
              </div>

              {/* Dress code */}
              <div>
                <h3 className="text-lg font-semibold text-purple-400 mb-2">👔 What to Wear</h3>
                <p className="text-gray-300">{selectedEvent.dresscode}</p>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-lg font-semibold text-purple-400 mb-2">📖 About This Event</h3>
                <p className="text-gray-300 leading-relaxed">{selectedEvent.description}</p>
              </div>

              {/* Price */}
              <div>
                <h3 className="text-lg font-semibold text-purple-400 mb-2">💰 Price</h3>
                <p className="text-2xl font-bold text-white">{selectedEvent.price}</p>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex gap-4">
              <button 
                onClick={() => handleBooking(selectedEvent.id)}
                className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold py-4 px-8 rounded-full transition-all duration-300 hover:transform hover:translateY-1 hover:shadow-lg uppercase tracking-wide"
              >
                Book Now - {selectedEvent.price}
              </button>
              <button 
                onClick={closeBookingModal}
                className="px-8 py-4 border-2 border-gray-600 text-gray-300 hover:text-white hover:border-gray-400 rounded-full transition-all duration-300 font-semibold"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===== FOOTER SECTION ===== */}
      <footer className="bg-gradient-to-r from-purple-900/20 to-indigo-900/20 backdrop-blur-sm border-t border-purple-500/30 py-12 text-center">
        <img 
          src="/Tale-House-Official-Logo.png" 
          alt="Tales House Logo" 
          className="w-24 h-auto mx-auto mb-4"
        />
        <p className="text-gray-400 mb-8 text-lg tracking-wide">
          WHERE STORIES COME TO LIFE
        </p>
        <div className="flex justify-center gap-4">
          <a 
            href="#" 
            className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 hover:transform hover:translateY-1"
          >
            📘 FOLLOW
          </a>
          <a 
            href="#" 
            className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 hover:transform hover:translateY-1"
          >
            🎵 WATCH
          </a>
        </div>
      </footer>
    </div>
  );
};

export default EventsPage;
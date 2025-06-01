import React, { useState, useEffect } from 'react';
import { Instagram, ExternalLink, Calendar, MapPin, ArrowDown } from 'lucide-react';

const TalesHouseLanding = () => {
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState({});

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    // Intersection Observer for animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(prev => ({
            ...prev,
            [entry.target.id]: entry.isIntersecting
          }));
        });
      },
      { threshold: 0.1 }
    );

    // Observe all sections
    document.querySelectorAll('section[id]').forEach((section) => {
      observer.observe(section);
    });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      observer.disconnect();
    };
  }, []);

  const events = [
    {
      id: 1,
      title: "xxxxxxx",
      date: "xxxxxxx",
      location: "Somewhere in Kenya",
      image: "https://images.unsplash.com/photo-1614332287897-cdc485fa562d?w=800&h=600&fit=crop&q=80",
      description: "xxxxxxxx"
    },
    {
      id: 2,
      title: "xxxxxxx",
      date: "xxxxxxx",
      location: "Somewhere in Kenya",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop&q=80",
      description: "xxxxxxxx"
    },
    {
      id: 3,
      title: "xxxxxxx",
      date: "xxxxxxx",
      location: "Somewhere in Kenya",
      image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&h=600&fit=crop&q=80",
      description: "xxxxxxxx"
    }
  ];
  
  const smoothScroll = (targetId) => {
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Enhanced Background Grid - More Visible */}
      <div className="fixed inset-0 opacity-[0.08]">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(147, 51, 234, 0.15) 1px, transparent 1px),
              linear-gradient(90deg, rgba(147, 51, 234, 0.15) 1px, transparent 1px),
              radial-gradient(circle at 25% 25%, rgba(147, 51, 234, 0.08) 0%, transparent 50%),
              radial-gradient(circle at 75% 75%, rgba(147, 51, 234, 0.08) 0%, transparent 50%)
            `,
            backgroundSize: '100px 100px, 100px 100px, 800px 800px, 800px 800px'
          }}
        />
      </div>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className={`mb-16 transition-all duration-1000 ${isVisible.home ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="w-48 h-48 md:w-60 md:h-60 lg:w-72 lg:h-72 mx-auto mb-12 flex items-center justify-center hover:scale-105 transition-transform duration-500">
              <img 
                src="https://i.imgur.com/XkDQqzr.png" 
                alt="Tales House Logo" 
                className="w-full h-full object-contain"
              />
            </div>
          </div>
          
          <h1 
            className={`text-5xl md:text-7xl lg:text-8xl font-light mb-8 tracking-[0.15em] bg-gradient-to-r from-white via-purple-200 to-purple-300 bg-clip-text text-transparent transition-all duration-1200 delay-200 ${isVisible.home ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
            style={{ 
              fontFamily: '"Inter", "SF Pro Display", system-ui, sans-serif',
              lineHeight: '0.9',
              background: 'linear-gradient(135deg, #ffffff 0%, #e879f9 50%, #c084fc 100%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text'
            }}
          >
            TALES HOUSE
          </h1>
          
          <p 
            className={`text-lg md:text-xl text-white/60 font-light tracking-[0.4em] mb-16 transition-all duration-1000 delay-400 ${isVisible.home ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            style={{ fontFamily: '"Inter", "SF Pro Display", system-ui, sans-serif' }}
          >
            WHERE STORIES COME TO LIFE
          </p>
          
          <div className={`flex flex-col sm:flex-row items-center justify-center gap-8 transition-all duration-1000 delay-600 ${isVisible.home ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <a 
              href="https://www.instagram.com/talehousee/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group flex items-center space-x-3 px-8 py-4 border border-white/20 hover:border-purple-400/50 hover:bg-purple-400/5 transition-all duration-500 hover:scale-105"
            >
              <Instagram size={16} className="group-hover:text-purple-300 transition-colors" />
              <span className="text-sm font-light tracking-[0.15em] group-hover:text-purple-300 transition-colors">
                FOLLOW
              </span>
            </a>
            
            <a 
              href="https://www.tiktok.com/@talehousee" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-purple-600/20 to-purple-800/20 hover:from-purple-600/30 hover:to-purple-800/30 backdrop-blur-sm transition-all duration-500 hover:scale-105"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.10z" fill="currentColor"/>
              </svg>
              <span className="text-sm font-light tracking-[0.15em]">WATCH</span>
            </a>
          </div>
        </div>
        
        {/* Enhanced Scroll Indicator */}
        <button 
          onClick={() => smoothScroll('events')}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 group cursor-pointer"
        >
          <div className="flex flex-col items-center space-y-2">
            <div className="w-px h-16 bg-gradient-to-b from-white/40 to-transparent"></div>
            <ArrowDown size={16} className="text-white/40 group-hover:text-purple-300 transition-colors animate-bounce" />
          </div>
        </button>
      </section>

      {/* Events Section */}
      <section id="events" className="relative py-32">
        <div className="max-w-6xl mx-auto px-6">
          <div className={`text-center mb-20 transition-all duration-1000 ${isVisible.events ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 
              className="text-4xl md:text-5xl lg:text-6xl font-light mb-6 tracking-[0.1em] bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent"
              style={{ 
                fontFamily: '"Inter", "SF Pro Display", system-ui, sans-serif',
                background: 'linear-gradient(135deg, #ffffff 0%, #e879f9 50%, #c084fc 100%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text'
              }}
            >
              UPCOMING EVENTS
            </h2>
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-purple-300/60 to-transparent mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-12 lg:gap-8">
            {events.map((event, index) => (
              <div 
                key={event.id} 
                className={`group relative overflow-hidden transition-all duration-1000 delay-${index * 200} ${isVisible.events ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                style={{
                  transform: `translateY(${scrollY * 0.01 * (index + 1)}px)`
                }}
              >
                <div className="aspect-[4/3] overflow-hidden mb-6 rounded-lg border border-white/10">
                  <img 
                    src={event.image} 
                    alt={event.title}
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                  />
                </div>
                
                <div className="space-y-4">
                  <h3 
                    className="text-xl md:text-2xl font-light tracking-[0.05em] group-hover:text-purple-300 transition-colors duration-300"
                    style={{ fontFamily: '"Inter", "SF Pro Display", system-ui, sans-serif' }}
                  >
                    {event.title}
                  </h3>
                  
                  <p className="text-white/60 text-sm leading-relaxed">
                    {event.description}
                  </p>
                  
                  <div className="flex flex-col space-y-2 text-white/50">
                    <div className="flex items-center space-x-2">
                      <Calendar size={14} />
                      <span className="text-sm font-light">{event.date}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin size={14} />
                      <span className="text-sm font-light">{event.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dynamic Barcode Section */}
      <section className="relative py-32">
        <div className={`max-w-2xl mx-auto px-6 text-center transition-all duration-1000 ${isVisible.events ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-block p-12 border border-white/10 bg-gradient-to-br from-white/[0.02] to-white/[0.05] backdrop-blur-sm rounded-2xl">
            
            {/* Dynamic Animated Barcode */}
            <div className="w-80 h-24 mx-auto mb-8 bg-black/90 rounded-lg p-4 flex items-center justify-center overflow-hidden border border-purple-400/20">
              <div className="flex items-center space-x-[2px] h-full">
                {Array.from({ length: 60 }).map((_, i) => {
                  const heights = [20, 35, 45, 25, 55, 30, 40, 50, 28, 38];
                  const baseHeight = heights[i % heights.length];
                  return (
                    <div
                      key={i}
                      className="bg-gradient-to-t from-purple-400 to-purple-200 rounded-sm transition-all duration-1000 ease-in-out"
                      style={{
                        width: '3px',
                        height: `${baseHeight + Math.sin((Date.now() / 1000 + i) * 0.5) * 10}px`,
                        animationDelay: `${i * 50}ms`,
                        opacity: 0.8 + Math.sin((Date.now() / 1000 + i) * 0.3) * 0.2
                      }}
                    />
                  );
                })}
              </div>
              
              {/* Scanning line effect */}
              <div 
                className="absolute w-1 h-full bg-gradient-to-b from-transparent via-purple-300/60 to-transparent"
                style={{
                  animation: 'scan 3s ease-in-out infinite',
                  left: '50%',
                  transform: 'translateX(-50%)'
                }}
              />
            </div>

            {/* Holographic ID Card */}
            <div className="w-64 h-40 mx-auto mb-8 bg-gradient-to-br from-black/80 to-purple-900/20 rounded-xl border border-purple-400/30 backdrop-blur-sm overflow-hidden relative">
              {/* Holographic effect overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-300/10 to-transparent transform -skew-x-12 animate-pulse"></div>
              
              <div className="p-6 relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  </div>
                  <div className="text-xs font-mono text-purple-300/60">ID: TH-2025</div>
                </div>
                
                <div className="space-y-2">
                  <div className="h-2 bg-gradient-to-r from-purple-400/60 to-transparent rounded"></div>
                  <div className="h-2 bg-gradient-to-r from-purple-400/40 to-transparent rounded w-3/4"></div>
                  <div className="h-2 bg-gradient-to-r from-purple-400/50 to-transparent rounded w-1/2"></div>
                </div>
                
                <div className="mt-4 text-xs font-mono text-purple-300/80">
                  VERIFIED MEMBER
                </div>
              </div>
              
              {/* Corner accent */}
              <div className="absolute bottom-2 right-2 w-8 h-8 border-r-2 border-b-2 border-purple-400/30"></div>
            </div>
            
            <p 
              className="text-purple-300/80 text-sm font-light tracking-[0.3em] mb-2"
              style={{ fontFamily: '"JetBrains Mono", "SF Mono", monospace' }}
            >
              EXCLUSIVE ACCESS
            </p>
            <p 
              className="text-white/40 text-xs font-light tracking-[0.2em]"
              style={{ fontFamily: '"JetBrains Mono", "SF Mono", monospace' }}
            >
              TH-2025-COLLECTION
            </p>
          </div>
        </div>
        
        <style jsx>{`
          @keyframes scan {
            0%, 100% { transform: translateX(-200px); opacity: 0; }
            50% { transform: translateX(200px); opacity: 1; }
          }
        `}</style>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative py-32">
        <div className={`max-w-4xl mx-auto px-6 text-center transition-all duration-1000 ${isVisible.contact ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 
            className="text-4xl md:text-5xl lg:text-6xl font-light mb-16 tracking-[0.1em] bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent"
            style={{ 
              fontFamily: '"Inter", "SF Pro Display", system-ui, sans-serif',
              background: 'linear-gradient(135deg, #ffffff 0%, #e879f9 50%, #c084fc 100%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text'
            }}
          >
            CONNECT
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            <a 
              href="https://www.instagram.com/talehousee/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group p-8 border border-white/10 hover:border-purple-400/30 hover:bg-gradient-to-br hover:from-purple-600/5 hover:to-purple-800/5 transition-all duration-500 rounded-xl backdrop-blur-sm hover:scale-105"
            >
              <Instagram size={24} className="mx-auto mb-4 group-hover:text-purple-300 transition-colors" />
              <h3 className="text-lg font-light mb-2 group-hover:text-purple-300 transition-colors">Instagram</h3>
              <p className="text-white/60 text-sm">@talehousee</p>
            </a>

            <a 
              href="https://www.tiktok.com/@talehousee" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group p-8 border border-white/10 hover:border-purple-400/30 hover:bg-gradient-to-br hover:from-purple-600/5 hover:to-purple-800/5 transition-all duration-500 rounded-xl backdrop-blur-sm hover:scale-105"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto mb-4 group-hover:text-purple-300 transition-colors">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.10z" fill="currentColor"/>
              </svg>
              <h3 className="text-lg font-light mb-2 group-hover:text-purple-300 transition-colors">TikTok</h3>
              <p className="text-white/60 text-sm">@talehousee</p>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-white/5 py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <div className="w-8 h-8 flex items-center justify-center">
                <img 
                  src="https://i.imgur.com/XkDQqzr.png" 
                  alt="Tales House Logo" 
                  className="w-12 h-12 object-contain"
                />
              </div>
              <span 
                className="text-lg font-light tracking-[0.2em] text-white/60"
                style={{ fontFamily: '"Inter", "SF Pro Display", system-ui, sans-serif' }}
              >
                TALES HOUSE
              </span>
            </div>
            
            <p className="text-white/40 text-sm font-light">
              Crafting stories through fashion since 2025
            </p>
          </div>
          
          <div className="text-center pt-8 border-t border-white/5">
            <p className="text-white/40 text-sm font-light">
              © 2025 Tales House. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default TalesHouseLanding;
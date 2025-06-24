import React, { useState, useEffect } from 'react';

const IntroAnimation = ({ onComplete }) => {
  const [currentText, setCurrentText] = useState('');
  const [isAnimating, setIsAnimating] = useState(true);
  const [showTransition, setShowTransition] = useState(false);
  const [textCompleted, setTextCompleted] = useState(false);
  const [logoLoaded, setLogoLoaded] = useState(false);
  
  const targetText = 'TALE HOUSE';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ01234?56789*%$£@!';

  useEffect(() => {
    let iteration = 0;
    
    const interval = setInterval(() => {
      setCurrentText(prev => {
        return targetText
          .split('')
          .map((letter, index) => {
            if (index < iteration) {
              return targetText[index];
            }
            return characters[Math.floor(Math.random() * characters.length)];
          })
          .join('');
      });

      if (iteration >= targetText.length) {
        clearInterval(interval);
        setTextCompleted(true);
        setTimeout(() => {
          setIsAnimating(false);
          setTimeout(() => {
            setShowTransition(true);
            setTimeout(() => {
              onComplete && onComplete();
            }, 100); // Fast transition
          }, 2000); // Shorter stay time
        }, 500);
      }

      iteration += 1 / 2;
    }, 60);

    return () => clearInterval(interval);
  }, [targetText, onComplete]);

  return (
    <div className={`fixed inset-0 z-50 ${showTransition ? 'opacity-0' : 'opacity-100'}`} style={{
      transition: 'opacity 150ms ease-out'
    }}>
      {/* Clean dark background */}
      <div className="absolute inset-0 bg-black">
        {/* Simplified grid - less processing */}
        <div className="absolute inset-0 opacity-10">
          <div 
            className="w-full h-full"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                               linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
              backgroundSize: '50px 50px'
            }}
          />
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <div className="text-center">
          {/* Logo - Optimized */}
          <div className={`mb-8 md:mb-12 ${!isAnimating ? 'opacity-100' : 'opacity-80'}`} style={{
            transition: 'opacity 300ms ease-out'
          }}>
            <img 
              src="https://github.com/Zedent-lab/Tales-House/blob/main/public/Tale-House-Official-Logo.png?raw=true"
              className="w-42 h-42 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 xl:w-72 xl:h-72 mx-auto opacity-95 object-contain"
              onLoad={() => setLogoLoaded(true)}
              onError={(e) => {
                console.log('Image failed to load');
                e.target.style.display = 'none';
              }}
            />
          </div>

          {/* Main text - Simplified */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 md:mb-6 tracking-[0.15em]">
            <span className="font-sans" style={{
              fontFamily: '"SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              fontWeight: '700'
            }}>
              {currentText}
            </span>
          </h1>
          
          {/* Subtitle - Simplified */}
          <div className={`${!isAnimating ? 'opacity-100' : 'opacity-0'}`} style={{
            transition: 'opacity 500ms ease-out'
          }}>
            <p className="text-sm md:text-base text-gray-400 font-light tracking-[0.3em] uppercase">
              WHERE STORIES COME TO LIFE
            </p>
            
            {/* Simple loading indicator */}
            <div className="mt-12 flex justify-center">
              <div className="w-20 h-px bg-gray-500 opacity-60"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntroPage;
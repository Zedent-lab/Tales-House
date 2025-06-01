import React, { useEffect, useRef, useCallback, useMemo } from 'react';
import { useTheme } from '../context/ThemeContext';

const Background = ({ theme }) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const starsRef = useRef([]);
  const isAnimatingRef = useRef(true);

  // Optimized Star class with better performance
  const Star = useMemo(() => {
    return class {
      constructor(width, height) {
        this.reset(width, height);
        
        // Performance optimization: pre-calculate static values
        const magnitude = Math.random();
        if (magnitude < 0.05) {
          // Rare bright stars (5%)
          this.size = 1.2 + Math.random() * 0.8;
          this.brightness = 0.8 + Math.random() * 0.2;
          this.twinkleIntensity = 0.9;
          this.glowRadius = 4;
          this.isBright = true;
          this.hasSparkle = true;
        } else if (magnitude < 0.15) {
          // Medium stars (10%)
          this.size = 0.8 + Math.random() * 0.4;
          this.brightness = 0.6 + Math.random() * 0.2;
          this.twinkleIntensity = 0.7;
          this.glowRadius = 2.5;
          this.isBright = false;
          this.hasSparkle = false;
        } else if (magnitude < 0.4) {
          // Regular stars (25%)
          this.size = 0.5 + Math.random() * 0.3;
          this.brightness = 0.4 + Math.random() * 0.3;
          this.twinkleIntensity = 0.5;
          this.glowRadius = 1.5;
          this.isBright = false;
          this.hasSparkle = false;
        } else {
          // Dim stars (60%)
          this.size = 0.2 + Math.random() * 0.3;
          this.brightness = 0.2 + Math.random() * 0.3;
          this.twinkleIntensity = 0.3;
          this.glowRadius = 1;
          this.isBright = false;
          this.hasSparkle = false;
        }
        
        // Optimized twinkle speeds
        this.twinkleSpeed = 0.02 + Math.random() * 0.04;
        this.twinklePhase = Math.random() * Math.PI * 2;
        this.baseOpacity = this.brightness;
      }
      
      reset(width, height) {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
      }
      
      update() {
        this.twinklePhase += this.twinkleSpeed;
        if (this.twinklePhase > Math.PI * 2) {
          this.twinklePhase -= Math.PI * 2;
        }
      }
      
      draw(ctx, theme) {
        // Simplified twinkling calculation
        const twinkle = 0.3 + 0.7 * (Math.sin(this.twinklePhase) * 0.5 + 0.5);
        const opacity = this.baseOpacity * twinkle;
        
        if (opacity < 0.1) return; // Skip very dim stars
        
        ctx.save();
        ctx.globalAlpha = opacity;
        
        // Set color based on theme
        const starColor = theme === 'dark' ? '#ffffff' : '#1e293b';
        
        // Main star body
        if (this.isBright) {
          ctx.shadowColor = starColor;
          ctx.shadowBlur = this.glowRadius * twinkle;
        }
        
        ctx.fillStyle = starColor;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Sparkle effect for bright stars
        if (this.hasSparkle && twinkle > 0.8) {
          ctx.shadowBlur = 0;
          ctx.strokeStyle = starColor;
          ctx.lineWidth = 0.5;
          ctx.globalAlpha = opacity * 0.6;
          
          const sparkleLength = this.size * 2;
          
          ctx.beginPath();
          ctx.moveTo(this.x, this.y - sparkleLength);
          ctx.lineTo(this.x, this.y + sparkleLength);
          ctx.moveTo(this.x - sparkleLength, this.y);
          ctx.lineTo(this.x + sparkleLength, this.y);
          ctx.stroke();
        }
        
        ctx.restore();
      }
    };
  }, []);

  // Optimized initialization
  const initStars = useCallback((width, height) => {
    const density = Math.min(width * height / 8000, 150); // Reduced density for better performance
    const starCount = Math.floor(density);
    
    starsRef.current = [];
    for (let i = 0; i < starCount; i++) {
      starsRef.current.push(new Star(width, height));
    }
  }, [Star]);

  // Animation loop with performance optimizations
  const animate = useCallback(() => {
    if (!isAnimatingRef.current) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    
    // Clear canvas efficiently
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Update and draw stars
    starsRef.current.forEach(star => {
      star.update();
      star.draw(ctx, theme);
    });
    
    animationRef.current = requestAnimationFrame(animate);
  }, [theme]);

  // Resize handler
  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    canvas.width = width;
    canvas.height = height;
    
    // Reset star positions
    starsRef.current.forEach(star => {
      if (star.x > width || star.y > height) {
        star.reset(width, height);
      }
    });
    
    // Adjust star count based on new screen size
    const targetCount = Math.floor(Math.min(width * height / 8000, 150));
    
    if (starsRef.current.length < targetCount) {
      // Add more stars
      while (starsRef.current.length < targetCount) {
        starsRef.current.push(new Star(width, height));
      }
    } else if (starsRef.current.length > targetCount) {
      // Remove excess stars
      starsRef.current.splice(targetCount);
    }
  }, [Star]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    // Initialize canvas
    const width = window.innerWidth;
    const height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
    
    // Initialize stars
    initStars(width, height);
    
    // Start animation
    isAnimatingRef.current = true;
    animate();
    
    // Add resize listener
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      isAnimatingRef.current = false;
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, [initStars, animate, handleResize]);

  // Pause animation when not visible (performance optimization)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        isAnimatingRef.current = false;
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
      } else {
        isAnimatingRef.current = true;
        animate();
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [animate]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
      style={{ 
        opacity: 0.8,
        mixBlendMode: theme === 'dark' ? 'screen' : 'multiply'
      }}
      aria-hidden="true"
    />
  );
};

const BackgroundWrapper = ({ children }) => {
  const { theme } = useTheme();

  return (
    <div className={`min-h-screen transition-all duration-700 relative overflow-hidden ${
      theme === 'dark' 
        ? 'bg-gradient-to-br from-black via-gray-950 to-black text-white' 
        : 'bg-gradient-to-br from-slate-50 via-gray-100 to-slate-200 text-slate-900'
    }`}>
      {/* Subtle grid pattern optimized for landing page */}
      <div 
        className="fixed inset-0 opacity-[0.02] pointer-events-none z-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(139, 69, 19, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139, 69, 19, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px'
        }}
      />
      
      {/* Radial gradient overlays for depth */}
      <div 
        className="fixed inset-0 opacity-[0.03] pointer-events-none z-0"
        style={{
          background: `
            radial-gradient(circle at 25% 25%, rgba(139, 69, 19, 0.05) 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, rgba(139, 69, 19, 0.05) 0%, transparent 50%)
          `,
          backgroundSize: '800px 800px'
        }}
      />
      
      <Background theme={theme} />
      
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default BackgroundWrapper;
import React, { useRef, useEffect, useCallback, useMemo } from 'react';

// Enhanced Star Background Component
const StarBackground = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const starsRef = useRef([]);
  const isAnimatingRef = useRef(true);

  // Enhanced Star class with more visible twinkling
  const Star = useMemo(() => {
    return class {
      constructor(width, height) {
        this.reset(width, height);
        
        // Enhanced star categories with better visibility
        const magnitude = Math.random();
        if (magnitude < 0.08) {
          // Bright stars (8%) - more noticeable
          this.size = 1.5 + Math.random() * 1.0;
          this.brightness = 0.9 + Math.random() * 0.1;
          this.twinkleIntensity = 1.0;
          this.glowRadius = 6;
          this.isBright = true;
          this.hasSparkle = true;
          this.minOpacity = 0.4;
        } else if (magnitude < 0.2) {
          // Medium-bright stars (12%)
          this.size = 1.0 + Math.random() * 0.5;
          this.brightness = 0.7 + Math.random() * 0.2;
          this.twinkleIntensity = 0.8;
          this.glowRadius = 3;
          this.isBright = false;
          this.hasSparkle = true;
          this.minOpacity = 0.3;
        } else if (magnitude < 0.45) {
          // Medium stars (25%)
          this.size = 0.6 + Math.random() * 0.4;
          this.brightness = 0.5 + Math.random() * 0.3;
          this.twinkleIntensity = 0.7;
          this.glowRadius = 2;
          this.isBright = false;
          this.hasSparkle = false;
          this.minOpacity = 0.2;
        } else {
          // Dim stars (55%)
          this.size = 0.3 + Math.random() * 0.3;
          this.brightness = 0.3 + Math.random() * 0.4;
          this.twinkleIntensity = 0.6;
          this.glowRadius = 1;
          this.isBright = false;
          this.hasSparkle = false;
          this.minOpacity = 0.15;
        }
        
        // Faster, more varied twinkle speeds
        this.twinkleSpeed = 0.04 + Math.random() * 0.08;
        this.twinklePhase = Math.random() * Math.PI * 2;
        this.baseOpacity = this.brightness;
        
        // Secondary twinkle for more complex effect
        this.secondaryTwinkleSpeed = 0.02 + Math.random() * 0.03;
        this.secondaryPhase = Math.random() * Math.PI * 2;
      }
      
      reset(width, height) {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
      }
      
      update() {
        this.twinklePhase += this.twinkleSpeed;
        this.secondaryPhase += this.secondaryTwinkleSpeed;
        
        if (this.twinklePhase > Math.PI * 2) {
          this.twinklePhase -= Math.PI * 2;
        }
        if (this.secondaryPhase > Math.PI * 2) {
          this.secondaryPhase -= Math.PI * 2;
        }
      }
      
      draw(ctx) {
        // Enhanced twinkling calculation with two sine waves
        const primaryTwinkle = Math.sin(this.twinklePhase) * 0.5 + 0.5;
        const secondaryTwinkle = Math.sin(this.secondaryPhase) * 0.3 + 0.7;
        
        // Combine twinkles for more dynamic effect
        const combinedTwinkle = (primaryTwinkle * this.twinkleIntensity + secondaryTwinkle) / (1 + this.twinkleIntensity);
        
        // Ensure minimum visibility
        const opacity = Math.max(this.minOpacity, this.baseOpacity * combinedTwinkle);
        
        if (opacity < 0.1) return;
        
        ctx.save();
        ctx.globalAlpha = opacity;
        
        // Always use white stars for dark theme visibility
        const starColor = '#ffffff';
        
        // Enhanced glow effect
        if (this.glowRadius > 1) {
          ctx.shadowColor = starColor;
          ctx.shadowBlur = this.glowRadius * combinedTwinkle;
        }
        
        ctx.fillStyle = starColor;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * (0.8 + 0.2 * combinedTwinkle), 0, Math.PI * 2);
        ctx.fill();
        
        // Enhanced sparkle effect
        if (this.hasSparkle) {
          ctx.shadowBlur = 0;
          ctx.strokeStyle = starColor;
          ctx.lineWidth = 0.8;
          ctx.globalAlpha = opacity * (0.3 + 0.5 * combinedTwinkle);
          
          const sparkleLength = this.size * (1.5 + combinedTwinkle);
          
          ctx.beginPath();
          // Vertical sparkle
          ctx.moveTo(this.x, this.y - sparkleLength);
          ctx.lineTo(this.x, this.y + sparkleLength);
          // Horizontal sparkle
          ctx.moveTo(this.x - sparkleLength, this.y);
          ctx.lineTo(this.x + sparkleLength, this.y);
          
          // Diagonal sparkles for bright stars
          if (this.isBright && combinedTwinkle > 0.7) {
            const diagLength = sparkleLength * 0.7;
            ctx.moveTo(this.x - diagLength, this.y - diagLength);
            ctx.lineTo(this.x + diagLength, this.y + diagLength);
            ctx.moveTo(this.x + diagLength, this.y - diagLength);
            ctx.lineTo(this.x - diagLength, this.y + diagLength);
          }
          
          ctx.stroke();
        }
        
        ctx.restore();
      }
    };
  }, []);

  // Optimized initialization
  const initStars = useCallback((width, height) => {
    const density = Math.min(width * height / 7000, 180);
    const starCount = Math.floor(density);
    
    starsRef.current = [];
    for (let i = 0; i < starCount; i++) {
      starsRef.current.push(new Star(width, height));
    }
  }, [Star]);

  // Animation loop
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
      star.draw(ctx);
    });
    
    animationRef.current = requestAnimationFrame(animate);
  }, []);

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
    const targetCount = Math.floor(Math.min(width * height / 7000, 180));
    
    if (starsRef.current.length < targetCount) {
      while (starsRef.current.length < targetCount) {
        starsRef.current.push(new Star(width, height));
      }
    } else if (starsRef.current.length > targetCount) {
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

  // Pause animation when not visible
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
      style={{ opacity: 0.9 }}
      aria-hidden="true"
    />
  );
};

export default StarBackground;

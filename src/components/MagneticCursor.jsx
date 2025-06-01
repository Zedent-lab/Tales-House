import React, { useEffect, useRef } from 'react';

/**
 * Custom cursor component with magnetic effect and petal trail
 * Follows mouse movement and attracts to interactive elements
 */
export default function MagneticCursor() {
  const cursorRef = useRef(null);
  const cursorTrailRef = useRef(null);
  const petalsRef = useRef([]);
  const mousePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const cursor = cursorRef.current;
    const trail = cursorTrailRef.current;
    let animationFrameId;
    let petals = [];

    // Create petal elements
    for (let i = 0; i < 5; i++) {
      const petal = document.createElement('div');
      petal.className = 'absolute w-2 h-2 rounded-full bg-brand-pink opacity-50 pointer-events-none';
      trail.appendChild(petal);
      petals.push({
        element: petal,
        x: 0,
        y: 0,
        angle: (i * Math.PI * 2) / 5,
        speed: 0.5 + Math.random() * 0.5,
      });
    }
    petalsRef.current = petals;

    // Handle mouse movement
    function onMouseMove(e) {
      mousePos.current = { x: e.clientX, y: e.clientY };
      
      // Update cursor position with smooth transition
      cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;

      // Check for magnetic elements
      const magneticElements = document.querySelectorAll('.magnetic-hover');
      magneticElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const distance = Math.hypot(e.clientX - centerX, e.clientY - centerY);
        
        if (distance < 100) {
          const angle = Math.atan2(centerY - e.clientY, centerX - e.clientX);
          const force = (100 - distance) * 0.2;
          const moveX = Math.cos(angle) * force;
          const moveY = Math.sin(angle) * force;
          
          el.style.setProperty('--mx', `${moveX}px`);
          el.style.setProperty('--my', `${moveY}px`);
          el.classList.add('animate-magnetic');
        } else {
          el.style.setProperty('--mx', '0px');
          el.style.setProperty('--my', '0px');
          el.classList.remove('animate-magnetic');
        }
      });
    }

    // Animate petals
    function animatePetals() {
      petalsRef.current.forEach((petal, i) => {
        const time = Date.now() * petal.speed * 0.001;
        const radius = 20;
        
        petal.x = mousePos.current.x + Math.cos(petal.angle + time) * radius;
        petal.y = mousePos.current.y + Math.sin(petal.angle + time) * radius;
        
        petal.element.style.transform = `translate(${petal.x}px, ${petal.y}px)`;
        petal.element.style.opacity = 0.5 + Math.sin(time * 2) * 0.5;
      });

      animationFrameId = requestAnimationFrame(animatePetals);
    }

    // Initialize
    document.addEventListener('mousemove', onMouseMove);
    animatePetals();

    // Hide default cursor
    document.body.style.cursor = 'none';

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animationFrameId);
      document.body.style.cursor = 'auto';
      petalsRef.current.forEach(petal => petal.element.remove());
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed w-4 h-4 rounded-full bg-brand-pink mix-blend-difference pointer-events-none z-50 transition-transform duration-100 ease-out -translate-x-2 -translate-y-2"
      />
      <div
        ref={cursorTrailRef}
        className="fixed top-0 left-0 w-full h-full pointer-events-none z-40"
      />
    </>
  );
}

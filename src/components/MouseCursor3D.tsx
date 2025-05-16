
import { useEffect, useState } from 'react';

const MouseCursor3D = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);
  const [clicking, setClicking] = useState(false);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    // Show cursor after a slight delay
    const timer = setTimeout(() => setVisible(true), 500);

    const updateMousePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseDown = () => setClicking(true);
    const handleMouseUp = () => setClicking(false);
    
    const handleMouseOver = (e: MouseEvent) => {
      // Check if we're hovering over a button, link or interactive element
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' || 
          target.tagName === 'BUTTON' || 
          target.closest('a') || 
          target.closest('button') ||
          target.getAttribute('role') === 'button' ||
          target.classList.contains('interactive')) {
        setHovering(true);
      } else {
        setHovering(false);
      }
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  if (!visible) return null;

  return (
    <>
      {/* Main cursor */}
      <div 
        className="hidden lg:block fixed pointer-events-none z-50 mix-blend-difference"
        style={{ 
          left: `${position.x}px`, 
          top: `${position.y}px`, 
          transform: 'translate(-50%, -50%)',
        }}
      >
        <div 
          className={`w-5 h-5 rounded-full bg-white transition-transform duration-200 ${
            clicking ? 'scale-50' : hovering ? 'scale-150' : 'scale-100'
          }`}
        ></div>
      </div>

      {/* Outer ring */}
      <div 
        className="hidden lg:block fixed pointer-events-none z-50 mix-blend-difference"
        style={{ 
          left: `${position.x}px`, 
          top: `${position.y}px`, 
          transform: 'translate(-50%, -50%)',
          transition: 'width 0.3s, height 0.3s',
        }}
      >
        <div 
          className={`w-10 h-10 rounded-full border border-white/80 transition-transform duration-300 ${
            clicking ? 'scale-75' : hovering ? 'scale-200 opacity-50' : 'scale-100'
          } animate-pulse-soft`}
        ></div>
      </div>

      {/* Trailing particles */}
      <div 
        className="hidden lg:block fixed pointer-events-none z-40 mix-blend-difference"
        style={{ 
          left: `${position.x}px`, 
          top: `${position.y}px`, 
          transform: 'translate(-50%, -50%)',
          transition: 'width 0.4s, height 0.4s',
        }}
      >
        <div className="relative">
          {[...Array(8)].map((_, i) => (
            <div 
              key={i}
              className="absolute w-2 h-2 rounded-full bg-white/30"
              style={{
                left: Math.sin(i * (Math.PI / 4)) * 20 + 'px',
                top: Math.cos(i * (Math.PI / 4)) * 20 + 'px',
                animationDelay: `${i * 0.1}s`,
                animation: `pulse-soft ${1 + i * 0.2}s infinite alternate`,
                opacity: clicking ? '0.8' : '0.3',
                transform: `scale(${hovering ? 1.5 : 1})`,
                transition: 'transform 0.3s, opacity 0.3s'
              }}
            ></div>
          ))}
        </div>
      </div>
    </>
  );
};
export default MouseCursor3D;

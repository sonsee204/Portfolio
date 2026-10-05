import React, { useRef, useState } from 'react';

interface MagnetProps {
  children: React.ReactNode;
  padding?: number;
  strength?: number;
  className?: string;
}

// Hiệu ứng hút nam châm theo vị trí chuột trong vùng padding
export default function Magnet({
  children,
  padding = 150,
  strength = 3,
  className = '',
}: MagnetProps): React.JSX.Element {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const dist = Math.hypot(e.clientX - centerX, e.clientY - centerY);

    if (dist < padding + rect.width / 2) {
      setIsHovered(true);
      setPosition({
        x: (e.clientX - centerX) / strength,
        y: (e.clientY - centerY) / strength,
      });
    } else {
      setIsHovered(false);
      setPosition({ x: 0, y: 0 });
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setPosition({ x: 0, y: 0 });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`inline-block ${className}`}
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        transition: isHovered ? 'transform 0.3s ease-out' : 'transform 0.6s ease-in-out',
        willChange: 'transform',
      }}
    >
      {children}
    </div>
  );
}

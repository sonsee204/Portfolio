import React from 'react';

interface ContactButtonProps {
  label?: string;
  onClick?: () => void;
  className?: string;
}

// Nút bấm liên hệ nổi bật với gradient đa sắc và viền sáng âm (inset shadow)
export default function ContactButton({
  label = 'Contact Me',
  onClick,
  className = '',
}: ContactButtonProps): React.JSX.Element {
  return (
    <a
      href="mailto:sx051204@gmail.com"
      onClick={onClick}
      className={`inline-flex items-center justify-center rounded-full text-white font-medium uppercase tracking-widest transition-transform hover:scale-105 active:scale-95 px-8 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4 text-xs sm:text-sm md:text-base outline outline-2 outline-white -outline-offset-[3px] shadow-[0px_4px_4px_rgba(181,1,167,0.25)] ${className}`}
      style={{
        background: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
        boxShadow: 'inset 4px 4px 12px #7721B1, 0px 4px 4px rgba(181, 1, 167, 0.25)',
      }}
    >
      {label}
    </a>
  );
}

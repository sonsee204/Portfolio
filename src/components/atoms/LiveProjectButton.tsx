import React from 'react';

interface LiveProjectButtonProps {
  label?: string;
  href?: string;
  onClick?: () => void;
}

// Nút bấm ghost outline viền sáng phong cách tối giản
export default function LiveProjectButton({
  label = 'Live Project',
  href,
  onClick,
}: LiveProjectButtonProps): React.JSX.Element {
  return (
    <a
      href={href || '#'}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
      className="inline-flex items-center justify-center rounded-full border-2 border-[#D7E2EA] text-[#D7E2EA] font-medium uppercase tracking-widest transition-colors hover:bg-[#D7E2EA]/10 px-6 py-2 sm:px-8 sm:py-2.5 text-xs sm:text-sm"
    >
      {label}
    </a>
  );
}

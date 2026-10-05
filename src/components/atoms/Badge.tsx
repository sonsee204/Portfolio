import React from 'react';

interface BadgeProps {
  text: string;
}

// Thẻ nhãn kỹ năng công nghệ nhỏ gọn
export default function Badge({ text }: BadgeProps): React.JSX.Element {
  return (
    <span className="inline-block px-3 py-1 text-xs sm:text-sm font-light rounded-full bg-[#1A1A1A] text-[#D7E2EA] border border-[#2E2E2E]">
      {text}
    </span>
  );
}

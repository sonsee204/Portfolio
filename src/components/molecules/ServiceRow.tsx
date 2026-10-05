import React from 'react';
import FadeIn from './FadeIn.tsx';

interface ServiceRowProps {
  number: string;
  title: string;
  description: string;
  index: number;
}

// Một dòng dịch vụ gồm số thứ tự khổng lồ và nội dung tóm tắt
export default function ServiceRow({
  number,
  title,
  description,
  index,
}: ServiceRowProps): React.JSX.Element {
  return (
    <FadeIn delay={index * 0.1} className="w-full">
      <div className="flex flex-col md:flex-row md:items-center justify-between py-8 sm:py-10 md:py-12 border-b border-[#0C0C0C]/15 gap-4 md:gap-12">
        <span className="font-black text-[#0C0C0C] text-[3.5rem] sm:text-[5rem] md:text-[7rem] leading-none shrink-0 w-28 sm:w-36 md:w-44">
          {number}
        </span>
        <div className="flex-1">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-medium uppercase text-[#0C0C0C]">
            {title}
          </h3>
          <p className="mt-2 text-sm sm:text-base md:text-lg font-light leading-relaxed text-[#0C0C0C]/70 max-w-2xl">
            {description}
          </p>
        </div>
      </div>
    </FadeIn>
  );
}

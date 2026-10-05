import React from 'react';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  lightTheme?: boolean;
  className?: string;
}

// Tiêu đề phân khu với font chữ Kanit khổ lớn và hiệu ứng gradient
export default function SectionHeading({
  title,
  subtitle,
  lightTheme = false,
  className = '',
}: SectionHeadingProps): React.JSX.Element {
  return (
    <div className={`text-center ${className}`}>
      <h2
        className={`font-black uppercase tracking-tight leading-none text-[3rem] sm:text-[4.5rem] md:text-[6rem] lg:text-[7.5rem] ${
          lightTheme ? 'text-[#0C0C0C]' : 'hero-heading'
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-[#D7E2EA]/70 text-sm sm:text-base md:text-lg max-w-xl mx-auto uppercase tracking-wide">
          {subtitle}
        </p>
      )}
    </div>
  );
}

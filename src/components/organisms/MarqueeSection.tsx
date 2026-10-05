import React, { useEffect, useState, useRef } from 'react';
import { marqueeImages } from '../../data/portfolioData.ts';

/**
 * Băng chuyền 2 hàng ảnh preview / GIF chuyển động ngược chiều nhau dựa theo vị trí cuộn trang (scroll offset)
 * Sử dụng passive scroll event listener và will-change-transform để tối ưu hóa hiệu năng render
 */
export default function MarqueeSection(): React.JSX.Element {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState<number>(0);

  useEffect(() => {
    // Hàm tính toán độ dịch chuyển dựa vào khoảng cách cuộn của trang so với phân khu
    const handleScroll = (): void => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const currentScroll = window.scrollY || window.pageYOffset;
      const sectionTop = currentScroll + rect.top;
      const calculated = (currentScroll - sectionTop + window.innerHeight) * 0.3;
      setOffset(calculated);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Nhân bản mảng ảnh để tạo hiệu ứng nối dài vô tận khi trượt
  const row1Images = [...marqueeImages.slice(0, 11), ...marqueeImages.slice(0, 11), ...marqueeImages.slice(0, 11)];
  const row2Images = [...marqueeImages.slice(11), ...marqueeImages.slice(11), ...marqueeImages.slice(11)];

  return (
    <section ref={sectionRef} className="w-full bg-[#0C0C0C] pt-20 sm:pt-28 md:pt-36 pb-12 overflow-hidden">
      <div className="flex flex-col gap-3">
        {/* Hàng 1: Di chuyển sang phải theo cuộn */}
        <div
          className="flex gap-3 will-change-transform"
          style={{ transform: `translateX(${offset - 400}px)` }}
        >
          {row1Images.map((src, i) => (
            <img
              key={`row1-${i}`}
              src={src}
              alt="Project Showcase"
              loading="lazy"
              className="w-[280px] h-[180px] sm:w-[360px] sm:h-[230px] md:w-[420px] md:h-[270px] rounded-2xl object-cover shrink-0 select-none"
            />
          ))}
        </div>

        {/* Hàng 2: Di chuyển sang trái theo cuộn */}
        <div
          className="flex gap-3 will-change-transform"
          style={{ transform: `translateX(${-(offset - 400)}px)` }}
        >
          {row2Images.map((src, i) => (
            <img
              key={`row2-${i}`}
              src={src}
              alt="Project Showcase"
              loading="lazy"
              className="w-[280px] h-[180px] sm:w-[360px] sm:h-[230px] md:w-[420px] md:h-[270px] rounded-2xl object-cover shrink-0 select-none"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

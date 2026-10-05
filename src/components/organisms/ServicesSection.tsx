import React from 'react';
import SectionHeading from '../atoms/SectionHeading.tsx';
import ServiceRow from '../molecules/ServiceRow.tsx';
import FadeIn from '../molecules/FadeIn.tsx';
import { servicesData } from '../../data/portfolioData.ts';

/**
 * Phân khu dịch vụ năng lực (ServicesSection - "What I Do")
 * Thiết kế nền trắng tương phản (#FFFFFF) với góc bo trên lớn (rounded-t-[40px] md:rounded-t-[60px])
 * Hiển thị danh sách 5 dòng năng lực đánh số khổ lớn 01 - 05
 */
export default function ServicesSection(): React.JSX.Element {
  return (
    <section className="w-full bg-[#FFFFFF] text-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-12 py-20 sm:py-24 md:py-32">
      <div className="max-w-5xl mx-auto">
        <FadeIn delay={0} y={30}>
          <SectionHeading title="What I Do" lightTheme className="mb-14 sm:mb-20 md:mb-24" />
        </FadeIn>

        <div className="flex flex-col">
          {servicesData.map((item, index) => (
            <ServiceRow
              key={item.number}
              number={item.number}
              title={item.title}
              description={item.description}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

import React from 'react';
import SectionHeading from '../atoms/SectionHeading.tsx';
import Badge from '../atoms/Badge.tsx';
import FadeIn from '../molecules/FadeIn.tsx';
import { skillsData } from '../../data/portfolioData.ts';

/**
 * Phân khu kỹ năng công nghệ (SkillsSection)
 * Hiển thị 4 nhóm kỹ năng chuyên môn dạng thẻ kính mờ (glassmorphism card)
 * kết hợp các thẻ Badge công nghệ và hiệu ứng FadeIn khi cuộn trang
 */
export default function SkillsSection(): React.JSX.Element {
  return (
    <section id="skills" className="w-full bg-[#0C0C0C] px-6 sm:px-10 md:px-16 py-20 sm:py-28">
      <div className="max-w-6xl mx-auto">
        <FadeIn delay={0} y={30}>
          <SectionHeading title="Skills & Tech" subtitle="Thành thạo hệ sinh thái TypeScript, Real-time & Kiến trúc phân tầng" />
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mt-16">
          {skillsData.map((category, index) => (
            <FadeIn key={category.title} delay={index * 0.1} y={30}>
              <div className="h-full p-6 sm:p-8 rounded-3xl bg-[#121212] border border-[#242424] hover:border-[#3E3E3E] transition-colors flex flex-col justify-between">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold uppercase text-[#BBCCD7] mb-4">
                    {category.title}
                  </h3>
                  <div className="flex flex-wrap gap-2.5">
                    {category.skills.map((skill) => (
                      <Badge key={skill} text={skill} />
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

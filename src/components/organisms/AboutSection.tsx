import React from 'react';
import SectionHeading from '../atoms/SectionHeading.tsx';
import AnimatedText from '../molecules/AnimatedText.tsx';
import ContactButton from '../atoms/ContactButton.tsx';
import FadeIn from '../molecules/FadeIn.tsx';
import { personalInfo } from '../../data/portfolioData.ts';

/**
 * Phân khu giới thiệu năng lực bản thân (About Me)
 * Bao gồm 4 hình ảnh 3D trang trí ở 4 góc với hiệu ứng xuất hiện FadeIn,
 * tiêu đề phân khu, nội dung bio trích xuất từ CV qua hiệu ứng chữ sáng dần AnimatedText
 * và nút kêu gọi hành động ContactButton.
 */
export default function AboutSection(): React.JSX.Element {
  return (
    <section
      id="about"
      className="relative min-h-screen w-full bg-[#0C0C0C] px-5 sm:px-8 md:px-12 py-24 sm:py-32 flex flex-col items-center justify-center overflow-hidden"
    >
      {/* 1. Ảnh 3D trang trí góc trên bên trái */}
      <FadeIn delay={0.1} x={-80} y={0} duration={0.9} className="absolute top-[4%] left-[2%] sm:left-[4%] pointer-events-none z-10">
        <img
          src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png"
          alt="Decorative Moon"
          className="w-[100px] sm:w-[150px] md:w-[200px]"
        />
      </FadeIn>

      {/* 2. Ảnh 3D trang trí góc trên bên phải */}
      <FadeIn delay={0.15} x={80} y={0} duration={0.9} className="absolute top-[4%] right-[2%] sm:right-[4%] pointer-events-none z-10">
        <img
          src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png"
          alt="Decorative Lego"
          className="w-[100px] sm:w-[150px] md:w-[200px]"
        />
      </FadeIn>

      {/* 3. Ảnh 3D trang trí góc dưới bên trái */}
      <FadeIn delay={0.25} x={-80} y={0} duration={0.9} className="absolute bottom-[6%] left-[2%] sm:left-[6%] pointer-events-none z-10">
        <img
          src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png"
          alt="Decorative Shape"
          className="w-[90px] sm:w-[130px] md:w-[170px]"
        />
      </FadeIn>

      {/* 4. Ảnh 3D trang trí góc dưới bên phải */}
      <FadeIn delay={0.3} x={80} y={0} duration={0.9} className="absolute bottom-[6%] right-[2%] sm:right-[6%] pointer-events-none z-10">
        <img
          src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png"
          alt="Decorative 3D Cluster"
          className="w-[110px] sm:w-[150px] md:w-[210px]"
        />
      </FadeIn>

      {/* 5. Khối nội dung trung tâm: Tiêu đề, đoạn giới thiệu và nút liên hệ */}
      <div className="relative z-20 max-w-3xl flex flex-col items-center text-center gap-12 sm:gap-16">
        <FadeIn delay={0} y={40}>
          <SectionHeading title="About Me" />
        </FadeIn>

        <div className="max-w-[620px] text-center font-medium text-base sm:text-lg md:text-xl lg:text-2xl px-4">
          <AnimatedText text={personalInfo.aboutParagraph} />
        </div>

        <FadeIn delay={0.4} y={20}>
          <ContactButton label="Let's Talk" />
        </FadeIn>
      </div>
    </section>
  );
}

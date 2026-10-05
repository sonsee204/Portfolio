import React from 'react';
import Navbar from './Navbar.tsx';
import HeroScene from './HeroScene.tsx';
import ContactButton from '../atoms/ContactButton.tsx';
import FadeIn from '../molecules/FadeIn.tsx';

// Phân khu Hero chính toàn màn hình
export default function HeroSection(): React.JSX.Element {
  return (
    <section className="relative w-full h-screen flex flex-col justify-between overflow-x-clip bg-[#0C0C0C]">
      {/* 1. Navbar trên cùng */}
      <Navbar />

      {/* 2. Tiêu đề H1 cực lớn */}
      <div className="w-full px-4 sm:px-6 md:px-10 mt-2 sm:mt-0 overflow-hidden text-center z-20">
        <FadeIn delay={0.15} y={40}>
          <h1 className="hero-heading font-black uppercase tracking-tight leading-none whitespace-nowrap text-[13vw] sm:text-[15vw] md:text-[16vw] lg:text-[17.5vw]">
            Hi, i&apos;m sơn
          </h1>
        </FadeIn>
      </div>

      {/* 3. Khối 3D Interactive Canvas đặt ở trung tâm */}
      <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
        <div className="w-[300px] h-[300px] sm:w-[420px] sm:h-[420px] md:w-[540px] md:h-[540px] lg:w-[620px] lg:h-[620px] pointer-events-auto">
          <HeroScene />
        </div>
      </div>

      {/* 4. Thanh đáy (Bottom Bar) */}
      <div className="w-full px-6 md:px-12 pb-7 sm:pb-8 md:pb-10 flex justify-between items-end z-20">
        <FadeIn delay={0.35} y={20}>
          <p className="text-[#D7E2EA] font-light uppercase tracking-wide leading-snug max-w-[180px] sm:max-w-[260px] md:max-w-[320px] text-xs sm:text-sm md:text-base">
            Full Stack Software Engineer driven by high-scale real-time systems, WebRTC & striking web/mobile apps.
          </p>
        </FadeIn>

        <FadeIn delay={0.5} y={20}>
          <ContactButton />
        </FadeIn>
      </div>
    </section>
  );
}

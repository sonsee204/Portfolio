import React from 'react';
import HeroSection from './components/organisms/HeroSection.tsx';
import MarqueeSection from './components/organisms/MarqueeSection.tsx';
import AboutSection from './components/organisms/AboutSection.tsx';
import SkillsSection from './components/organisms/SkillsSection.tsx';
import ServicesSection from './components/organisms/ServicesSection.tsx';
import ProjectsSection from './components/organisms/ProjectsSection.tsx';
import ContactSection from './components/organisms/ContactSection.tsx';

// Component trang chủ Portfolio tích hợp 7 phân khu chính
export default function App(): React.JSX.Element {
  return (
    <main className="w-full min-h-screen bg-[#0C0C0C] text-[#D7E2EA] overflow-x-clip selection:bg-[#BBCCD7] selection:text-[#0C0C0C]">
      {/* 1. Hero Section với 3D Scene */}
      <HeroSection />

      {/* 2. Marquee 2 hàng preview cuộn ngược chiều */}
      <MarqueeSection />

      {/* 3. About Section với 4 icon 3D và AnimatedText */}
      <AboutSection />

      {/* 4. Skills Section hiển thị công nghệ */}
      <SkillsSection />

      {/* 5. Services Section nền trắng tương phản */}
      <ServicesSection />

      {/* 6. Projects Section với hiệu ứng Sticky Stacking */}
      <ProjectsSection />

      {/* 7. Contact Section & Footer */}
      <ContactSection />
    </main>
  );
}

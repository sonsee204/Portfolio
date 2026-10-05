import React from 'react';
import SectionHeading from '../atoms/SectionHeading.tsx';
import ContactButton from '../atoms/ContactButton.tsx';
import FadeIn from '../molecules/FadeIn.tsx';
import { personalInfo } from '../../data/portfolioData.ts';
import { Mail, Phone, Github, MapPin } from 'lucide-react';

/**
 * Phân khu liên hệ (ContactSection) và Footer chân trang
 * Bao gồm tiêu đề lớn, nút gửi email trực tiếp, lưới 4 thẻ thông tin liên hệ và thông tin bản quyền
 */
export default function ContactSection(): React.JSX.Element {
  return (
    <footer id="contact" className="w-full bg-[#0C0C0C] border-t border-[#1C1C1C] px-6 sm:px-12 py-20 sm:py-28">
      <div className="max-w-5xl mx-auto flex flex-col items-center text-center">
        {/* Tiêu đề phân khu liên hệ */}
        <FadeIn delay={0} y={30}>
          <SectionHeading title="Let's Connect" subtitle="Bạn đang có ý tưởng hoặc dự án cần hiện thực hóa? Đừng ngần ngại liên hệ với tôi!" />
        </FadeIn>

        {/* Nút gửi email hành động chính */}
        <FadeIn delay={0.2} y={20} className="mt-10">
          <ContactButton label="Gửi Email Trực Tiếp" />
        </FadeIn>

        {/* Lưới 4 thẻ thông tin liên hệ nhanh */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-16 w-full text-left">
          {/* Card 1: Địa chỉ Email */}
          <div className="p-4 rounded-2xl bg-[#141414] border border-[#222222] flex items-center gap-3">
            <Mail className="w-5 h-5 text-[#BBCCD7] shrink-0" />
            <div className="truncate">
              <span className="text-xs text-[#8E8E93] uppercase block">Email</span>
              <a href={`mailto:${personalInfo.email}`} className="text-sm font-medium hover:text-[#BBCCD7] transition-colors truncate block">
                {personalInfo.email}
              </a>
            </div>
          </div>

          {/* Card 2: Số điện thoại */}
          <div className="p-4 rounded-2xl bg-[#141414] border border-[#222222] flex items-center gap-3">
            <Phone className="w-5 h-5 text-[#BBCCD7] shrink-0" />
            <div>
              <span className="text-xs text-[#8E8E93] uppercase block">Điện Thoại</span>
              <a href={`tel:${personalInfo.phone}`} className="text-sm font-medium hover:text-[#BBCCD7] transition-colors">
                {personalInfo.phone}
              </a>
            </div>
          </div>

          {/* Card 3: Tài khoản GitHub */}
          <div className="p-4 rounded-2xl bg-[#141414] border border-[#222222] flex items-center gap-3">
            <Github className="w-5 h-5 text-[#BBCCD7] shrink-0" />
            <div className="truncate">
              <span className="text-xs text-[#8E8E93] uppercase block">GitHub</span>
              <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="text-sm font-medium hover:text-[#BBCCD7] transition-colors truncate block">
                sonsee204
              </a>
            </div>
          </div>

          {/* Card 4: Địa chỉ làm việc */}
          <div className="p-4 rounded-2xl bg-[#141414] border border-[#222222] flex items-center gap-3">
            <MapPin className="w-5 h-5 text-[#BBCCD7] shrink-0" />
            <div>
              <span className="text-xs text-[#8E8E93] uppercase block">Địa Điểm</span>
              <span className="text-sm font-medium text-[#D7E2EA]">
                {personalInfo.location}
              </span>
            </div>
          </div>
        </div>

        {/* Thông tin bản quyền chân trang */}
        <div className="mt-20 pt-8 border-t border-[#1A1A1A] w-full flex flex-col sm:flex-row justify-between items-center text-xs text-[#8E8E93] gap-4">
          <p>© {new Date().getFullYear()} Hạ Xuân Sơn. All rights reserved.</p>
          <p>Designed with 3D Aesthetics & Built with React, Tailwind & Three.js</p>
        </div>
      </div>
    </footer>
  );
}

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import SectionHeading from '../atoms/SectionHeading.tsx';
import LiveProjectButton from '../atoms/LiveProjectButton.tsx';
import { projectsData, ProjectItem } from '../../data/portfolioData.ts';

interface CardProps {
  project: ProjectItem;
  index: number;
  totalCards: number;
}

/**
 * Thẻ hiển thị một dự án tiêu biểu với hiệu ứng dính (sticky) và co giãn theo vị trí cuộn
 */
function ProjectCard({ project, index, totalCards }: CardProps): React.JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'start start'],
  });

  const targetScale = 1 - (totalCards - 1 - index) * 0.04;
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);

  return (
    <div
      ref={containerRef}
      className="h-[85vh] flex items-center justify-center sticky top-20 sm:top-24 md:top-28"
    >
      <motion.div
        style={{
          scale,
          top: `calc(${index * 24}px)`,
        }}
        className="w-full max-w-6xl rounded-[32px] sm:rounded-[44px] md:rounded-[56px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-6 sm:p-8 md:p-10 flex flex-col justify-between shadow-2xl relative overflow-hidden"
      >
        {/* Top bar của card: Số thứ tự, tên danh mục, tiêu đề và nút liên kết */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#D7E2EA]/20 pb-6">
          <div className="flex items-center gap-4 sm:gap-6">
            <span className="font-black text-[#D7E2EA] text-3xl sm:text-5xl md:text-6xl">
              {project.number}
            </span>
            <div>
              <span className="text-xs sm:text-sm font-light uppercase tracking-wider text-[#BBCCD7]">
                {project.category}
              </span>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold uppercase text-white">
                {project.name}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {project.githubUrl && (
              <LiveProjectButton label="Source" href={project.githubUrl} />
            )}
            {project.liveUrl && (
              <LiveProjectButton label="Live Project" href={project.liveUrl} />
            )}
          </div>
        </div>

        {/* Thông tin mô tả & danh sách công nghệ sử dụng */}
        <div className="my-4">
          <p className="text-sm sm:text-base text-[#D7E2EA]/80 font-light max-w-3xl">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2 mt-3">
            {project.techStack.map((tech) => (
              <span key={tech} className="text-xs px-2.5 py-0.5 rounded-full bg-[#1A1A1A] text-[#BBCCD7]">
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Lưới 2 cột ảnh mockup preview */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 h-[240px] sm:h-[300px] md:h-[340px]">
          {/* Cột 1: 2 ảnh xếp chồng (40% width trên desktop) */}
          <div className="hidden md:flex md:col-span-5 flex-col gap-4 h-full">
            <img
              src={project.images.col1Top}
              alt={`${project.name} Preview 1`}
              className="w-full h-1/2 object-cover rounded-2xl border border-[#D7E2EA]/20"
            />
            <img
              src={project.images.col1Bottom}
              alt={`${project.name} Preview 2`}
              className="w-full h-1/2 object-cover rounded-2xl border border-[#D7E2EA]/20"
            />
          </div>

          {/* Cột 2: 1 ảnh cao toàn phần (60% width trên desktop) */}
          <div className="col-span-1 md:col-span-7 h-full">
            <img
              src={project.images.col2Tall}
              alt={`${project.name} Main View`}
              className="w-full h-full object-cover rounded-2xl sm:rounded-3xl border border-[#D7E2EA]/20"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/**
 * Phân khu danh sách dự án tiêu biểu với hiệu ứng thẻ dính xếp lớp (Sticky Stacking Cards)
 */
export default function ProjectsSection(): React.JSX.Element {
  return (
    <section
      id="projects"
      className="relative w-full bg-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 z-20 px-4 sm:px-8 md:px-12 pt-20 sm:pt-24 md:pt-28 pb-32"
    >
      <div className="max-w-6xl mx-auto mb-16 sm:mb-20">
        <SectionHeading title="Projects" subtitle="Những sản phẩm thực chiến tiêu biểu được thiết kế và triển khai hoàn thiện" />
      </div>

      <div className="max-w-6xl mx-auto flex flex-col gap-12">
        {projectsData.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={index}
            totalCards={projectsData.length}
          />
        ))}
      </div>
    </section>
  );
}

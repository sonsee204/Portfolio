import React, { useRef } from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';

interface AnimatedTextProps {
  text: string;
  className?: string;
}

interface CharSpanProps {
  char: string;
  progress: MotionValue<number>;
  range: [number, number];
}

// Ký tự đơn lẻ hiển thị hiệu ứng mờ dần dựa trên MotionValue tiến trình cuộn
function CharSpan({ char, progress, range }: CharSpanProps): React.JSX.Element {
  const opacity = useTransform(progress, range, [0.2, 1]);
  return (
    <span className="relative inline-block">
      <span className="opacity-20">{char}</span>
      <motion.span style={{ opacity }} className="absolute left-0 top-0 text-[#D7E2EA]">
        {char}
      </motion.span>
    </span>
  );
}

// Đoạn văn bản hiển thị sáng dần từng ký tự theo tiến trình cuộn trang
export default function AnimatedText({ text, className = '' }: AnimatedTextProps): React.JSX.Element {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.8', 'end 0.2'],
  });

  const characters = text.split('');
  const total = characters.length;

  return (
    <p ref={containerRef} className={`leading-relaxed ${className}`}>
      {characters.map((char, index) => {
        const start = index / total;
        const end = start + 1 / total;
        return (
          <CharSpan
            key={index}
            char={char === ' ' ? ' ' : char}
            progress={scrollYProgress}
            range={[start, end]}
          />
        );
      })}
    </p>
  );
}

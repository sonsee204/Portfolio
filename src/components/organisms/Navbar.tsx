import React from 'react';
import FadeIn from '../molecules/FadeIn.tsx';

// Thanh điều hướng trên cùng với 4 liên kết phân khu
export default function Navbar(): React.JSX.Element {
  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <FadeIn delay={0} y={-20} className="w-full">
      <header className="w-full flex justify-between items-center px-6 md:px-12 pt-6 md:pt-8 text-[#D7E2EA]">
        <div className="font-extrabold tracking-wider text-lg uppercase">
          XS<span className="text-[#BBCCD7]">.</span>DEV
        </div>
        <nav className="flex space-x-6 sm:space-x-8 md:space-x-12">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm md:text-base lg:text-[1.2rem] font-medium uppercase tracking-wider transition-opacity hover:opacity-70"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </header>
    </FadeIn>
  );
}

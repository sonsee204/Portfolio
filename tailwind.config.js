// Cấu hình Tailwind CSS cho dự án Portfolio
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#0C0C0C',
        foreground: '#D7E2EA',
      },
      fontFamily: {
        kanit: ['Kanit', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

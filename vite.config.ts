// Cấu hình Vite cho dự án Portfolio Hạ Xuân Sơn
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: './',
  plugins: [react()],
  server: {
    port: 3000,
    open: false,
  },
});

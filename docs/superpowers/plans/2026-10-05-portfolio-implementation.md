# Landing Page Portfolio Hạ Xuân Sơn — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Xây dựng landing page portfolio cá nhân hoàn chỉnh cho kỹ sư phần mềm Full Stack Hạ Xuân Sơn, lấy cảm hứng từ phong cách "Jack — 3D Creator", tích hợp 3D canvas tương tác, Framer Motion animations và thiết kế responsive đa nền tảng.

**Architecture:** Frontend Single Page Application xây dựng trên Vite + React 18 + TypeScript strict, chia tách theo nguyên lý Atomic Design (Atoms, Molecules, Organisms). Toàn bộ dữ liệu kỹ năng, kinh nghiệm và dự án được tập trung hóa trong Data Layer (`portfolioData.ts`). Khu vực Hero tích hợp Canvas 3D độc lập bằng `@react-three/fiber` và `@react-three/drei`.

**Tech Stack:** React 18, TypeScript 5, Vite, Tailwind CSS 3.4, Framer Motion 12, Three.js, @react-three/fiber, @react-three/drei, Lucide React.

**Spec:** `docs/superpowers/specs/2026-10-05-portfolio-design.md`

## Global Constraints

- Màu nền chủ đạo bắt buộc là `#0C0C0C` trên toàn bộ thẻ html, body và container gốc.
- Font chữ hiển thị toàn trang là Google Font `'Kanit', sans-serif` (weights 300 đến 900).
- Text gradient tiêu đề chuẩn `.hero-heading`: `linear-gradient(180deg, #646973 0%, #BBCCD7 100%)` với clip-text trong suốt.
- TypeScript ở chế độ Strict mode tuyệt đối, không dùng `any` và không dùng `@ts-ignore`.
- Comment giải thích trong mã nguồn sử dụng Tiếng Việt chuẩn mực theo quy tắc backend/frontend của dự án.
- Không tạo git worktree (tuân thủ `block-worktree.ps1`).

## Review Focus

1. **Hiển thị WebGL trên thiết bị không hỗ trợ hoặc máy yếu:** Hero 3D Canvas phải bọc trong `Suspense` và có fallback nhẹ nhàng, tránh làm trắng trang.
2. **Scroll performance của Marquee Section:** Tính toán translateX phải dùng passive listener và `will-change: transform` để đảm bảo 60fps khi cuộn nhanh.
3. **Sticky stacking cards tính toán scale sai:** Kiểm tra kỹ công thức `targetScale = 1 - (totalCards - 1 - index) * 0.03` và offset top tương ứng để không bị chồng đè mất nội dung.
4. **Responsive vỡ chữ ở H1 Hero:** Sử dụng fluid clamp typography `clamp(3rem, 14vw, 17.5vw)` để không tràn ngang màn hình điện thoại nhỏ (375px).
5. **Đồng bộ liên kết ngoài:** Tất cả liên kết GitHub, email `mailto:sx051204@gmail.com` và hotline hoạt động chính xác khi click.

---

### Task 1: Khởi Tạo Dự Án Vite & Cấu Hình Base Styling (Tailwind, Kanit Font, Types)

**Files:**
- Create: `package.json`
- Create: `vite.config.ts`
- Create: `tsconfig.json`
- Create: `tsconfig.node.json`
- Create: `tailwind.config.js`
- Create: `postcss.config.js`
- Create: `index.html`
- Create: `src/index.css`
- Create: `src/main.tsx`
- Create: `src/App.tsx`

**Interfaces:**
- Consumes: None (Root setup)
- Produces: Base running React 18 app với Tailwind CSS, Google Font Kanit và class `.hero-heading`

- [ ] **Step 1: Tạo cấu hình `package.json` với đầy đủ dependencies cần thiết**

```json
{
  "name": "portfolio-xuan-son",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "@react-three/drei": "^9.122.0",
    "@react-three/fiber": "^8.18.0",
    "framer-motion": "^12.4.7",
    "lucide-react": "^0.475.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "three": "^0.173.0"
  },
  "devDependencies": {
    "@types/react": "^18.3.18",
    "@types/react-dom": "^18.3.5",
    "@types/three": "^0.173.0",
    "@vitejs/plugin-react": "^4.3.4",
    "autoprefixer": "^10.4.20",
    "postcss": "^8.5.3",
    "tailwindcss": "^3.4.17",
    "typescript": "^5.7.3",
    "vite": "^6.2.0"
  }
}
```

- [ ] **Step 2: Cài đặt packages qua npm**

Chạy: `npm install`
Kỳ vọng: Thành công sinh ra `node_modules` và `package-lock.json`.

- [ ] **Step 3: Cấu hình `vite.config.ts`, `tsconfig.json`, `tailwind.config.js` và `postcss.config.js`**

`vite.config.ts`:
```ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: false,
  },
});
```

`tailwind.config.js`:
```js
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
```

`postcss.config.js`:
```js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

`tsconfig.json`:
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"]
}
```

- [ ] **Step 4: Cấu hình `index.html` với Google Fonts Kanit và `src/index.css`**

`index.html`:
```html
<!doctype html>
<html lang="vi" class="bg-[#0C0C0C] text-[#D7E2EA]">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Hạ Xuân Sơn — Full Stack & Real-time Engineer</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Kanit:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,400&display=swap" rel="stylesheet">
  </head>
  <body class="bg-[#0C0C0C] font-kanit m-0 p-0 overflow-x-hidden selection:bg-[#BBCCD7] selection:text-[#0C0C0C]">
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

`src/index.css`:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer utilities {
  .hero-heading {
    background: linear-gradient(180deg, #646973 0%, #BBCCD7 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}

html, body, #root {
  background-color: #0C0C0C;
  color: #D7E2EA;
  font-family: 'Kanit', sans-serif;
  min-height: 100vh;
}
```

- [ ] **Step 5: Tạo entry point `src/main.tsx` và `src/App.tsx` tạm thời để kiểm thử build**

`src/main.tsx`:
```tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
```

`src/App.tsx`:
```tsx
import React from 'react';

// Component trang chủ gốc của portfolio
export default function App(): React.JSX.Element {
  return (
    <main className="w-full min-h-screen bg-[#0C0C0C] text-[#D7E2EA] flex items-center justify-center">
      <h1 className="hero-heading text-5xl font-black uppercase">
        Hạ Xuân Sơn Portfolio
      </h1>
    </main>
  );
}
```

- [ ] **Step 6: Kiểm tra type check & build thử nghiệm**

Chạy: `npx tsc --noEmit`
Kỳ vọng: Không có lỗi type.

---

### Task 2: Xây Dựng Data Layer Trung Tâm (`src/data/portfolioData.ts`)

**Files:**
- Create: `src/data/portfolioData.ts`

**Interfaces:**
- Consumes: None
- Produces: `personalInfo`, `skillsData`, `servicesData`, `projectsData`, `marqueeImages` typed exports

- [ ] **Step 1: Viết tệp dữ liệu chi tiết trích xuất toàn bộ thông tin CV của Hạ Xuân Sơn**

```ts
// Dữ liệu tập trung cho toàn bộ portfolio của Hạ Xuân Sơn

export interface ProjectItem {
  id: string;
  number: string;
  name: string;
  category: string;
  tagline: string;
  description: string;
  highlights: string[];
  techStack: string[];
  liveUrl?: string;
  githubUrl?: string;
  images: {
    col1Top: string;
    col1Bottom: string;
    col2Tall: string;
  };
}

export interface ServiceItem {
  number: string;
  title: string;
  description: string;
}

export interface SkillCategory {
  title: string;
  skills: string[];
}

export const personalInfo = {
  name: "Hạ Xuân Sơn",
  role: "Full Stack Developer (Web & Mobile)",
  location: "Hà Nội, Việt Nam",
  phone: "0984494204",
  email: "sx051204@gmail.com",
  github: "https://github.com/sonsee204",
  portfolio: "yourdomain.dev",
  bioShort: "A Full Stack Engineer driven by crafting resilient real-time platforms, high-scale architectures, and striking digital experiences.",
  aboutParagraph: "Kỹ sư phần mềm tốt nghiệp chuyên ngành CNTT tại Đại học Kinh Doanh Và Công Nghệ Hà Nội (GPA 3.2/4.0), định hướng kiến trúc phân tầng chuẩn mực và bảo mật Zero-Trust. Với thế mạnh chuyên sâu về hệ thống thời gian thực (WebSocket, WebRTC P2P Call), đồng bộ hợp đồng dữ liệu qua Zod và tối ưu hóa truy vấn MongoDB quy mô lớn dưới 50ms, tôi luôn sẵn sàng cùng bạn kiến tạo những sản phẩm công nghệ đột phá và bền vững!",
};

export const marqueeImages: string[] = [
  "https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif",
  "https://motionsites.ai/assets/hero-codenest-preview-Cgppc2qV.gif",
  "https://motionsites.ai/assets/hero-vex-ventures-preview-BczMFIiw.gif",
  "https://motionsites.ai/assets/hero-stellar-ai-v2-preview-DjvxjG3C.gif",
  "https://motionsites.ai/assets/hero-asme-preview-B_nGDnTP.gif",
  "https://motionsites.ai/assets/hero-transform-data-preview-Cx5OU29N.gif",
  "https://motionsites.ai/assets/hero-vitara-preview-Cjz2QYyU.gif",
  "https://motionsites.ai/assets/hero-terra-preview-BFjrCr7T.gif",
  "https://motionsites.ai/assets/hero-skyelite-preview-DHaZIgUv.gif",
  "https://motionsites.ai/assets/hero-aethera-preview-DknSlcTa.gif",
  "https://motionsites.ai/assets/hero-designpro-preview-D8c5_een.gif",
  "https://motionsites.ai/assets/hero-stellar-ai-preview-D3HL6bw1.gif",
  "https://motionsites.ai/assets/hero-xportfolio-preview-D4A8maiC.gif",
  "https://motionsites.ai/assets/hero-orbit-web3-preview-BXt4OttD.gif",
  "https://motionsites.ai/assets/hero-nexora-preview-cx5HmUgo.gif",
  "https://motionsites.ai/assets/hero-evr-ventures-preview-DZxeVFEX.gif",
  "https://motionsites.ai/assets/hero-planet-orbit-preview-DWAP8Z1P.gif",
  "https://motionsites.ai/assets/hero-new-era-preview-CocuDUm9.gif",
  "https://motionsites.ai/assets/hero-wealth-preview-B70idl_u.gif",
  "https://motionsites.ai/assets/hero-luminex-preview-CxOP7ce6.gif",
  "https://motionsites.ai/assets/hero-celestia-preview-0yO3jXO8.gif",
];

export const skillsData: SkillCategory[] = [
  {
    title: "Backend & Real-time",
    skills: ["Node.js", "Express.js", "Socket.IO", "WebRTC (P2P)", "RESTful API", "Zod Validation", "OpenAPI / Swagger"],
  },
  {
    title: "Web & Mobile Client",
    skills: ["React 18", "TypeScript", "Vite", "Feature-Sliced Design", "Tailwind CSS", "Radix UI", "TanStack Query", "Zustand", "React Native", "Expo"],
  },
  {
    title: "Database & Multimedia",
    skills: ["MongoDB (Mongoose)", "Redis (Pub/Sub)", "Cloudinary", "Sharp (Image Processing)", "FFmpeg (Transcoding)"],
  },
  {
    title: "Security & DevOps",
    skills: ["JWT Handshake", "Refresh Token Rotation", "Docker", "GitHub Actions (CI/CD)", "Vitest", "Strict Mode"],
  },
];

export const servicesData: ServiceItem[] = [
  {
    number: "01",
    title: "Real-Time Systems & WebRTC",
    description: "Thiết kế và triển khai luồng truyền phát P2P Audio/Video chất lượng cao, signaling Socket.IO, cơ chế watchdog tự ngắt kết nối và dọn dẹp orphan calls.",
  },
  {
    number: "02",
    title: "Full Stack Web Engineering",
    description: "Xây dựng Web Client React 18 theo kiến trúc Atomic Design & FSD, đồng bộ dữ liệu bằng TanStack Query, Optimistic Updates và Zero-Trust validation.",
  },
  {
    number: "03",
    title: "Mobile App Development",
    description: "Phát triển ứng dụng di động React Native tái sử dụng 100% contracts & validation schemas từ Backend, tối ưu hóa vòng đời Socket theo AppState.",
  },
  {
    number: "04",
    title: "High-Performance Database",
    description: "Quy hoạch schema MongoDB tối ưu, phân trang Cursor-based Pagination với compound index, đảm bảo độ trễ truy vấn tin nhắn luôn ổn định <50ms.",
  },
  {
    number: "05",
    title: "Media Processing & DevOps",
    description: "Thiết lập pipeline xử lý đa phương tiện tự động (Sharp, FFmpeg) trước khi upload Cloudinary; thiết lập CI/CD pipeline tự động hóa kiểm thử mã nguồn.",
  },
];

export const projectsData: ProjectItem[] = [
  {
    id: "messages-app",
    number: "01",
    name: "MessagesApp Platform",
    category: "Full Stack (Solo)",
    tagline: "Real-time Messaging & WebRTC Platform",
    description: "Nền tảng nhắn tin và gọi thoại/video P2P thời gian thực end-to-end gồm REST API, Real-time Gateway, Web Client và Mobile App xây dựng trên kiến trúc Shared Contracts.",
    highlights: [
      "WebRTC P2P Call với cơ chế watchdog 10s tự đóng phiên và chống double-offer",
      "Socket.IO JWT handshake và cô lập phòng theo quyền hạn thành viên",
      "Cursor-based pagination MongoDB đảm bảo truy vấn tin nhắn <50ms",
      "React 18 FSD + Optimistic Updates kết hợp Mobile React Native",
    ],
    techStack: ["Node.js", "Express", "Socket.IO", "WebRTC", "React 18", "React Native", "MongoDB", "Zod"],
    githubUrl: "https://github.com/sonsee204/MessagesApp",
    liveUrl: "https://chat.yourdomain.dev",
    images: {
      col1Top: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055344_5eff02e0-87a5-41ce-b64f-eb08da8f33db.png&w=1280&q=85",
      col1Bottom: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055431_11d841fd-8b41-46a5-82e4-b04f2407a7d8.png&w=1280&q=85",
      col2Tall: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055451_e317bf2d-28d4-48cc-86b0-6f72f25b6327.png&w=1280&q=85",
    },
  },
  {
    id: "media-pipeline",
    number: "02",
    name: "Media Transcode Pipeline",
    category: "Backend & Systems",
    tagline: "Automated Media Processing Microservice",
    description: "Dịch vụ xử lý ảnh tự động với Sharp và transcode video, trích xuất thumbnail bằng FFmpeg tối ưu băng thông và giảm 70% dung lượng truyền tải mạng.",
    highlights: [
      "Nén ảnh tự động đa định dạng WebP/AVIF qua Sharp",
      "FFmpeg transcode video background job không chặn main thread",
      "Tích hợp lưu trữ đám mây Cloudinary với token bảo mật",
    ],
    techStack: ["Node.js", "TypeScript", "Sharp", "FFmpeg", "Cloudinary", "Docker"],
    githubUrl: "https://github.com/sonsee204",
    images: {
      col1Top: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055654_911201c5-36d9-4bc6-bac7-331adfce159f.png&w=1280&q=85",
      col1Bottom: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055723_5ceda0b8-d9c2-4665-b2e3-83ba19ba76d1.png&w=1280&q=85",
      col2Tall: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055753_adc5dcbd-a8e6-49c0-b43a-9b030d835cea.png&w=1280&q=85",
    },
  },
  {
    id: "contracts-ecosystem",
    number: "03",
    name: "Shared Contracts Ecosystem",
    category: "Architecture & DX",
    tagline: "End-to-End Type Safety & Zero-Trust Validation",
    description: "Bộ kiến trúc mẫu chia sẻ type và schema Zod giữa Backend, Web Client và Mobile App, tự động sinh OpenAPI spec và loại bỏ hoàn toàn lỗi runtime lệch dữ liệu.",
    highlights: [
      "100% schema validation ở tầng boundary",
      "Tự động sinh tài liệu Swagger/OpenAPI từ Zod schemas",
      "Chia sẻ mã nguồn TypeScript xuyên suốt 3 nền tảng",
    ],
    techStack: ["TypeScript", "Zod", "Swagger", "React", "React Native", "Express"],
    githubUrl: "https://github.com/sonsee204",
    images: {
      col1Top: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055759_963cfb0b-4bd1-4b0f-9d0a-09bd6cf95b2f.png&w=1280&q=85",
      col1Bottom: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_060108_438f781a-9846-4dcc-89ab-c4e6cb830f5b.png&w=1280&q=85",
      col2Tall: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055818_9d062121-ad7e-46b9-999a-1a6a692ef1ee.png&w=1280&q=85",
    },
  },
];
```

- [ ] **Step 2: Chạy kiểm tra TypeScript type check**

Chạy: `npx tsc --noEmit`
Kỳ vọng: PASS.

---

### Task 3: Xây Dựng Các Nguyên Tử Giao Diện (Atoms Layer)

**Files:**
- Create: `src/components/atoms/ContactButton.tsx`
- Create: `src/components/atoms/LiveProjectButton.tsx`
- Create: `src/components/atoms/Badge.tsx`
- Create: `src/components/atoms/SectionHeading.tsx`

**Interfaces:**
- Consumes: None
- Produces:
  - `ContactButton`: Props `{ label?: string; onClick?: () => void; className?: string }`
  - `LiveProjectButton`: Props `{ label?: string; href?: string; onClick?: () => void }`
  - `Badge`: Props `{ text: string }`
  - `SectionHeading`: Props `{ title: string; subtitle?: string; lightTheme?: boolean }`

- [ ] **Step 1: Viết `src/components/atoms/ContactButton.tsx`**

Nút bấm gradient chuẩn spec Jack: `linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)`, viền phát sáng và hiệu ứng hover nhẹ.

```tsx
import React from 'react';

interface ContactButtonProps {
  label?: string;
  onClick?: () => void;
  className?: string;
}

// Nút bấm liên hệ nổi bật với gradient đa sắc và viền sáng âm (inset shadow)
export default function ContactButton({
  label = 'Contact Me',
  onClick,
  className = '',
}: ContactButtonProps): React.JSX.Element {
  return (
    <a
      href="mailto:sx051204@gmail.com"
      onClick={onClick}
      className={`inline-flex items-center justify-center rounded-full text-white font-medium uppercase tracking-widest transition-transform hover:scale-105 active:scale-95 px-8 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4 text-xs sm:text-sm md:text-base outline outline-2 outline-white -outline-offset-[3px] shadow-[0px_4px_4px_rgba(181,1,167,0.25)] ${className}`}
      style={{
        background: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
        boxShadow: 'inset 4px 4px 12px #7721B1, 0px 4px 4px rgba(181, 1, 167, 0.25)',
      }}
    >
      {label}
    </a>
  );
}
```

- [ ] **Step 2: Viết `src/components/atoms/LiveProjectButton.tsx`**

```tsx
import React from 'react';

interface LiveProjectButtonProps {
  label?: string;
  href?: string;
  onClick?: () => void;
}

// Nút bấm ghost outline viền sáng phong cách tối giản
export default function LiveProjectButton({
  label = 'Live Project',
  href,
  onClick,
}: LiveProjectButtonProps): React.JSX.Element {
  return (
    <a
      href={href || '#'}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
      className="inline-flex items-center justify-center rounded-full border-2 border-[#D7E2EA] text-[#D7E2EA] font-medium uppercase tracking-widest transition-colors hover:bg-[#D7E2EA]/10 px-6 py-2 sm:px-8 sm:py-2.5 text-xs sm:text-sm"
    >
      {label}
    </a>
  );
}
```

- [ ] **Step 3: Viết `src/components/atoms/Badge.tsx` và `src/components/atoms/SectionHeading.tsx`**

`src/components/atoms/Badge.tsx`:
```tsx
import React from 'react';

interface BadgeProps {
  text: string;
}

// Thẻ nhãn kỹ năng công nghệ nhỏ gọn
export default function Badge({ text }: BadgeProps): React.JSX.Element {
  return (
    <span className="inline-block px-3 py-1 text-xs sm:text-sm font-light rounded-full bg-[#1A1A1A] text-[#D7E2EA] border border-[#2E2E2E]">
      {text}
    </span>
  );
}
```

`src/components/atoms/SectionHeading.tsx`:
```tsx
import React from 'react';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  lightTheme?: boolean;
  className?: string;
}

// Tiêu đề phân khu với font chữ Kanit khổ lớn và hiệu ứng gradient
export default function SectionHeading({
  title,
  subtitle,
  lightTheme = false,
  className = '',
}: SectionHeadingProps): React.JSX.Element {
  return (
    <div className={`text-center ${className}`}>
      <h2
        className={`font-black uppercase tracking-tight leading-none text-[3rem] sm:text-[4.5rem] md:text-[6rem] lg:text-[7.5rem] ${
          lightTheme ? 'text-[#0C0C0C]' : 'hero-heading'
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-[#D7E2EA]/70 text-sm sm:text-base md:text-lg max-w-xl mx-auto uppercase tracking-wide">
          {subtitle}
        </p>
      )}
    </div>
  );
}
```

- [ ] **Step 4: Kiểm tra type check**

Chạy: `npx tsc --noEmit`
Kỳ vọng: PASS.

---

### Task 4: Xây Dựng Các Phân Tử Chuyển Động (Molecules Layer)

**Files:**
- Create: `src/components/molecules/FadeIn.tsx`
- Create: `src/components/molecules/Magnet.tsx`
- Create: `src/components/molecules/AnimatedText.tsx`
- Create: `src/components/molecules/ServiceRow.tsx`

**Interfaces:**
- Consumes: `framer-motion`
- Produces:
  - `FadeIn`: Wrapper animating on viewport enter
  - `Magnet`: Mouse magnet follower effect
  - `AnimatedText`: Scroll-driven character opacity reveal
  - `ServiceRow`: Single row for services list

- [ ] **Step 1: Viết `src/components/molecules/FadeIn.tsx`**

```tsx
import React from 'react';
import { motion } from 'framer-motion';

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
  className?: string;
}

// Wrapper chuyển động xuất hiện dần với Framer Motion khi cuộn tới viewport
export default function FadeIn({
  children,
  delay = 0,
  duration = 0.7,
  x = 0,
  y = 30,
  className = '',
}: FadeInProps): React.JSX.Element {
  return (
    <motion.div
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '50px', amount: 0 }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 2: Viết `src/components/molecules/Magnet.tsx`**

Hiệu ứng hút theo con trỏ chuột theo công thức của spec: `padding = 150`, `strength = 3`.

```tsx
import React, { useRef, useState } from 'react';

interface MagnetProps {
  children: React.ReactNode;
  padding?: number;
  strength?: number;
  className?: string;
}

// Hiệu ứng hút nam châm theo vị trí chuột trong vùng padding
export default function Magnet({
  children,
  padding = 150,
  strength = 3,
  className = '',
}: MagnetProps): React.JSX.Element {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const dist = Math.hypot(e.clientX - centerX, e.clientY - centerY);

    if (dist < padding + rect.width / 2) {
      setIsHovered(true);
      setPosition({
        x: (e.clientX - centerX) / strength,
        y: (e.clientY - centerY) / strength,
      });
    } else {
      setIsHovered(false);
      setPosition({ x: 0, y: 0 });
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setPosition({ x: 0, y: 0 });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`inline-block ${className}`}
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        transition: isHovered ? 'transform 0.3s ease-out' : 'transform 0.6s ease-in-out',
        willChange: 'transform',
      }}
    >
      {children}
    </div>
  );
}
```

- [ ] **Step 3: Viết `src/components/molecules/AnimatedText.tsx`**

Từng ký tự thay đổi độ mờ từ `0.2` sang `1` khi cuộn trang, offset `['start 0.8', 'end 0.2']`.

```tsx
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface AnimatedTextProps {
  text: string;
  className?: string;
}

interface CharSpanProps {
  char: string;
  progress: any;
  range: [number, number];
}

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
```

- [ ] **Step 4: Viết `src/components/molecules/ServiceRow.tsx`**

```tsx
import React from 'react';
import FadeIn from './FadeIn.tsx';

interface ServiceRowProps {
  number: string;
  title: string;
  description: string;
  index: number;
}

// Một dòng dịch vụ gồm số thứ tự khổng lồ và nội dung tóm tắt
export default function ServiceRow({
  number,
  title,
  description,
  index,
}: ServiceRowProps): React.JSX.Element {
  return (
    <FadeIn delay={index * 0.1} className="w-full">
      <div className="flex flex-col md:flex-row md:items-center justify-between py-8 sm:py-10 md:py-12 border-b border-[#0C0C0C]/15 gap-4 md:gap-12">
        <span className="font-black text-[#0C0C0C] text-[3.5rem] sm:text-[5rem] md:text-[7rem] leading-none shrink-0 w-28 sm:w-36 md:w-44">
          {number}
        </span>
        <div className="flex-1">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-medium uppercase text-[#0C0C0C]">
            {title}
          </h3>
          <p className="mt-2 text-sm sm:text-base md:text-lg font-light leading-relaxed text-[#0C0C0C]/70 max-w-2xl">
            {description}
          </p>
        </div>
      </div>
    </FadeIn>
  );
}
```

- [ ] **Step 5: Kiểm tra type check**

Chạy: `npx tsc --noEmit`
Kỳ vọng: PASS.

---

### Task 5: Xây Dựng 3D Interactive Scene Trung Tâm (`HeroScene.tsx`)

**Files:**
- Create: `src/components/organisms/HeroScene.tsx`

**Interfaces:**
- Consumes: `@react-three/fiber`, `@react-three/drei`, `three`
- Produces: `HeroScene` React 3D canvas component

- [ ] **Step 1: Viết `src/components/organisms/HeroScene.tsx`**

Tạo một khối hình học tinh thể 3D bóng bẩy (TorusKnot hoặc Icosahedron với MeshDistortMaterial/MeshStandardMaterial), xoay chậm và tương tác nhẹ theo tọa độ chuột. Bọc trong `Suspense` an toàn.

```tsx
import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

// Khối 3D đa diện tương tác chuột
function InteractiveMesh(): React.JSX.Element {
  const meshRef = useRef<THREE.Mesh>(null);
  const targetRotation = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  useFrame((state) => {
    if (!meshRef.current) return;
    // Nội suy góc xoay theo vị trí con trỏ chuột trên viewport
    targetRotation.current.x = state.pointer.y * 0.4;
    targetRotation.current.y = state.pointer.x * 0.6;

    meshRef.current.rotation.x = THREE.MathUtils.lerp(
      meshRef.current.rotation.x,
      targetRotation.current.x + state.clock.getElapsedTime() * 0.15,
      0.05,
    );
    meshRef.current.rotation.y = THREE.MathUtils.lerp(
      meshRef.current.rotation.y,
      targetRotation.current.y + state.clock.getElapsedTime() * 0.2,
      0.05,
    );
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1.2}>
      <mesh ref={meshRef} scale={2.1}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color="#A5B4FC"
          roughness={0.15}
          metalness={0.9}
          wireframe={false}
        />
      </mesh>
    </Float>
  );
}

// Fallback nhẹ nếu trình duyệt không hỗ trợ WebGL
function SceneFallback(): React.JSX.Element {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-48 h-48 rounded-full bg-gradient-to-tr from-[#646973] to-[#BBCCD7] opacity-60 blur-xl animate-pulse" />
    </div>
  );
}

// Canvas chính cho khu vực Hero
export default function HeroScene(): React.JSX.Element {
  return (
    <div className="w-full h-full relative cursor-grab active:cursor-grabbing">
      <Suspense fallback={<SceneFallback />}>
        <Canvas
          camera={{ position: [0, 0, 5], fov: 45 }}
          className="w-full h-full pointer-events-auto"
          gl={{ antialias: true, alpha: true }}
        >
          <ambientLight intensity={0.8} />
          <directionalLight position={[10, 10, 5]} intensity={1.5} color="#BBCCD7" />
          <pointLight position={[-10, -10, -5]} intensity={0.5} color="#B600A8" />
          <InteractiveMesh />
        </Canvas>
      </Suspense>
    </div>
  );
}
```

- [ ] **Step 2: Kiểm tra type check**

Chạy: `npx tsc --noEmit`
Kỳ vọng: PASS.

---

### Task 6: Hoàn Thiện HeroSection & Navbar

**Files:**
- Create: `src/components/organisms/Navbar.tsx`
- Create: `src/components/organisms/HeroSection.tsx`

**Interfaces:**
- Consumes: `HeroScene`, `ContactButton`, `FadeIn`, `personalInfo`
- Produces: `Navbar`, `HeroSection`

- [ ] **Step 1: Viết `src/components/organisms/Navbar.tsx`**

```tsx
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
```

- [ ] **Step 2: Viết `src/components/organisms/HeroSection.tsx`**

Layout `h-screen` với chữ `HI, I'M SƠN`, Canvas 3D trung tâm, đoạn văn bản giới thiệu ngắn và nút Contact Me.

```tsx
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
```

- [ ] **Step 3: Kiểm tra type check**

Chạy: `npx tsc --noEmit`
Kỳ vọng: PASS.

---

### Task 7: Xây Dựng MarqueeSection & AboutSection

**Files:**
- Create: `src/components/organisms/MarqueeSection.tsx`
- Create: `src/components/organisms/AboutSection.tsx`

**Interfaces:**
- Consumes: `marqueeImages`, `personalInfo`, `AnimatedText`, `ContactButton`, `FadeIn`
- Produces: `MarqueeSection`, `AboutSection`

- [ ] **Step 1: Viết `src/components/organisms/MarqueeSection.tsx`**

2 hàng ảnh di chuyển sang trái/phải dựa theo cuộn trang của người dùng với passive scroll listener.

```tsx
import React, { useEffect, useState, useRef } from 'react';
import { marqueeImages } from '../../data/portfolioData.ts';

// Băng chuyền 2 hàng ảnh preview di chuyển theo scroll position
export default function MarqueeSection(): React.JSX.Element {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const currentScroll = window.scrollY || window.pageYOffset;
      const sectionTop = currentScroll + rect.top;
      const calculated = (currentScroll - sectionTop + window.innerHeight) * 0.3;
      setOffset(calculated);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const row1Images = [...marqueeImages.slice(0, 11), ...marqueeImages.slice(0, 11), ...marqueeImages.slice(0, 11)];
  const row2Images = [...marqueeImages.slice(11), ...marqueeImages.slice(11), ...marqueeImages.slice(11)];

  return (
    <section ref={sectionRef} className="w-full bg-[#0C0C0C] pt-20 sm:pt-28 md:pt-36 pb-12 overflow-hidden">
      <div className="flex flex-col gap-3">
        {/* Hàng 1: Di chuyển sang phải */}
        <div
          className="flex gap-3 will-change-transform"
          style={{ transform: `translateX(${offset - 400}px)` }}
        >
          {row1Images.map((src, i) => (
            <img
              key={`row1-${i}`}
              src={src}
              alt="Project Showcase"
              loading="lazy"
              className="w-[280px] h-[180px] sm:w-[360px] sm:h-[230px] md:w-[420px] md:h-[270px] rounded-2xl object-cover shrink-0 select-none"
            />
          ))}
        </div>

        {/* Hàng 2: Di chuyển sang trái */}
        <div
          className="flex gap-3 will-change-transform"
          style={{ transform: `translateX(${-(offset - 400)}px)` }}
        >
          {row2Images.map((src, i) => (
            <img
              key={`row2-${i}`}
              src={src}
              alt="Project Showcase"
              loading="lazy"
              className="w-[280px] h-[180px] sm:w-[360px] sm:h-[230px] md:w-[420px] md:h-[270px] rounded-2xl object-cover shrink-0 select-none"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Viết `src/components/organisms/AboutSection.tsx`**

4 icon 3D nổi bật đặt 4 góc + AnimatedText trích xuất từ CV.

```tsx
import React from 'react';
import SectionHeading from '../atoms/SectionHeading.tsx';
import AnimatedText from '../molecules/AnimatedText.tsx';
import ContactButton from '../atoms/ContactButton.tsx';
import FadeIn from '../molecules/FadeIn.tsx';
import { personalInfo } from '../../data/portfolioData.ts';

// Phân khu giới thiệu năng lực bản thân kèm 4 icon 3D nổi bật ở 4 góc
export default function AboutSection(): React.JSX.Element {
  return (
    <section id="about" className="relative min-h-screen w-full bg-[#0C0C0C] px-5 sm:px-8 md:px-12 py-24 sm:py-32 flex flex-col items-center justify-center overflow-hidden">
      {/* 4 ảnh 3D trang trí 4 góc */}
      <FadeIn delay={0.1} x={-80} y={0} duration={0.9} className="absolute top-[4%] left-[2%] sm:left-[4%] pointer-events-none z-10">
        <img
          src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png"
          alt="Decorative Moon"
          className="w-[100px] sm:w-[150px] md:w-[200px]"
        />
      </FadeIn>

      <FadeIn delay={0.15} x={80} y={0} duration={0.9} className="absolute top-[4%] right-[2%] sm:right-[4%] pointer-events-none z-10">
        <img
          src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png"
          alt="Decorative Lego"
          className="w-[100px] sm:w-[150px] md:w-[200px]"
        />
      </FadeIn>

      <FadeIn delay={0.25} x={-80} y={0} duration={0.9} className="absolute bottom-[6%] left-[2%] sm:left-[6%] pointer-events-none z-10">
        <img
          src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png"
          alt="Decorative Shape"
          className="w-[90px] sm:w-[130px] md:w-[170px]"
        />
      </FadeIn>

      <FadeIn delay={0.3} x={80} y={0} duration={0.9} className="absolute bottom-[6%] right-[2%] sm:right-[6%] pointer-events-none z-10">
        <img
          src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png"
          alt="Decorative 3D Cluster"
          className="w-[110px] sm:w-[150px] md:w-[210px]"
        />
      </FadeIn>

      {/* Nội dung trung tâm */}
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
```

- [ ] **Step 3: Kiểm tra type check**

Chạy: `npx tsc --noEmit`
Kỳ vọng: PASS.

---

### Task 8: Xây Dựng SkillsSection & ServicesSection

**Files:**
- Create: `src/components/organisms/SkillsSection.tsx`
- Create: `src/components/organisms/ServicesSection.tsx`

**Interfaces:**
- Consumes: `skillsData`, `servicesData`, `ServiceRow`, `SectionHeading`, `Badge`, `FadeIn`
- Produces: `SkillsSection`, `ServicesSection`

- [ ] **Step 1: Viết `src/components/organisms/SkillsSection.tsx`**

Lưới 4 nhóm kỹ năng thẻ kính mờ glassmorphism tinh tế.

```tsx
import React from 'react';
import SectionHeading from '../atoms/SectionHeading.tsx';
import Badge from '../atoms/Badge.tsx';
import FadeIn from '../molecules/FadeIn.tsx';
import { skillsData } from '../../data/portfolioData.ts';

// Phân khu hiển thị toàn bộ kỹ năng công nghệ chuẩn hóa từ CV
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
```

- [ ] **Step 2: Viết `src/components/organisms/ServicesSection.tsx`**

Phân khu nền trắng tương phản `#FFFFFF` với góc bo lớn `rounded-t-[40px] md:rounded-t-[60px]`, hiển thị 5 mục năng lực số khổ lớn.

```tsx
import React from 'react';
import SectionHeading from '../atoms/SectionHeading.tsx';
import ServiceRow from '../molecules/ServiceRow.tsx';
import FadeIn from '../molecules/FadeIn.tsx';
import { servicesData } from '../../data/portfolioData.ts';

// Phân khu What I Do với nền trắng tương phản theo đúng phong cách của bản spec
export default function ServicesSection(): React.JSX.Element {
  return (
    <section className="w-full bg-[#FFFFFF] text-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-12 py-20 sm:py-24 md:py-32">
      <div className="max-w-5xl mx-auto">
        <FadeIn delay={0} y={30}>
          <SectionHeading title="What I Do" lightTheme className="mb-14 sm:mb-20 md:mb-24" />
        </FadeIn>

        <div className="flex flex-col">
          {servicesData.map((item, index) => (
            <ServiceRow
              key={item.number}
              number={item.number}
              title={item.title}
              description={item.description}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Kiểm tra type check**

Chạy: `npx tsc --noEmit`
Kỳ vọng: PASS.

---

### Task 9: Xây Dựng ProjectsSection (Sticky Stacking Cards) & ContactSection

**Files:**
- Create: `src/components/organisms/ProjectsSection.tsx`
- Create: `src/components/organisms/ContactSection.tsx`

**Interfaces:**
- Consumes: `projectsData`, `personalInfo`, `SectionHeading`, `LiveProjectButton`, `FadeIn`
- Produces: `ProjectsSection`, `ContactSection`

- [ ] **Step 1: Viết `src/components/organisms/ProjectsSection.tsx`**

Triển khai hiệu ứng Sticky Stacking Cards chuẩn xác: Mỗi card cố định `sticky top-24 md:top-32`, thu nhỏ scale nhẹ qua Framer Motion `useScroll` và `useTransform`.

```tsx
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
        {/* Top bar của card */}
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

        {/* Thông tin & highlights */}
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

        {/* Lưới 2 cột ảnh mockup */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 h-[240px] sm:h-[300px] md:h-[340px]">
          {/* Cột 1: 2 ảnh xếp chồng (40% width) */}
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

          {/* Cột 2: 1 ảnh cao (60% width) */}
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

// Phân khu danh sách dự án với hiệu ứng xếp thẻ dính
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
```

- [ ] **Step 2: Viết `src/components/organisms/ContactSection.tsx`**

Footer liên hệ toàn diện, tích hợp số điện thoại, email, GitHub và vị trí Hà Nội.

```tsx
import React from 'react';
import SectionHeading from '../atoms/SectionHeading.tsx';
import ContactButton from '../atoms/ContactButton.tsx';
import FadeIn from '../molecules/FadeIn.tsx';
import { personalInfo } from '../../data/portfolioData.ts';
import { Mail, Phone, Github, MapPin } from 'lucide-react';

// Phân khu liên hệ và Footer chân trang
export default function ContactSection(): React.JSX.Element {
  return (
    <footer id="contact" className="w-full bg-[#0C0C0C] border-t border-[#1C1C1C] px-6 sm:px-12 py-20 sm:py-28">
      <div className="max-w-5xl mx-auto flex flex-col items-center text-center">
        <FadeIn delay={0} y={30}>
          <SectionHeading title="Let's Connect" subtitle="Bạn đang có ý tưởng hoặc dự án cần hiện thực hóa? Đừng ngần ngại liên hệ với tôi!" />
        </FadeIn>

        <FadeIn delay={0.2} y={20} className="mt-10">
          <ContactButton label="Gửi Email Trực Tiếp" />
        </FadeIn>

        {/* Thông tin liên hệ nhanh */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-16 w-full text-left">
          <div className="p-4 rounded-2xl bg-[#141414] border border-[#222222] flex items-center gap-3">
            <Mail className="w-5 h-5 text-[#BBCCD7] shrink-0" />
            <div className="truncate">
              <span className="text-xs text-[#8E8E93] uppercase block">Email</span>
              <a href={`mailto:${personalInfo.email}`} className="text-sm font-medium hover:text-[#BBCCD7] transition-colors truncate block">
                {personalInfo.email}
              </a>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#141414] border border-[#222222] flex items-center gap-3">
            <Phone className="w-5 h-5 text-[#BBCCD7] shrink-0" />
            <div>
              <span className="text-xs text-[#8E8E93] uppercase block">Điện Thoại</span>
              <a href={`tel:${personalInfo.phone}`} className="text-sm font-medium hover:text-[#BBCCD7] transition-colors">
                {personalInfo.phone}
              </a>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#141414] border border-[#222222] flex items-center gap-3">
            <Github className="w-5 h-5 text-[#BBCCD7] shrink-0" />
            <div className="truncate">
              <span className="text-xs text-[#8E8E93] uppercase block">GitHub</span>
              <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="text-sm font-medium hover:text-[#BBCCD7] transition-colors truncate block">
                sonsee204
              </a>
            </div>
          </div>

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

        {/* Bản quyền */}
        <div className="mt-20 pt-8 border-t border-[#1A1A1A] w-full flex flex-col sm:flex-row justify-between items-center text-xs text-[#8E8E93] gap-4">
          <p>© {new Date().getFullYear()} Hạ Xuân Sơn. All rights reserved.</p>
          <p>Designed with 3D Aesthetics & Built with React, Tailwind & Three.js</p>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 3: Kiểm tra type check**

Chạy: `npx tsc --noEmit`
Kỳ vọng: PASS.

---

### Task 10: Tích Hợp Toàn Bộ Vào `src/App.tsx` & Kiểm Thử Toàn Diện (End-to-End Build & Run)

**Files:**
- Modify: `src/App.tsx`

**Interfaces:**
- Consumes: `HeroSection`, `MarqueeSection`, `AboutSection`, `SkillsSection`, `ServicesSection`, `ProjectsSection`, `ContactSection`
- Produces: Complete working landing page

- [ ] **Step 1: Viết `src/App.tsx` ghép nối 7 sections theo đúng thứ tự**

```tsx
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
```

- [ ] **Step 2: Chạy kiểm tra TypeScript type check**

Chạy: `npx tsc --noEmit`
Kỳ vọng: PASS không có bất kỳ lỗi nào.

- [ ] **Step 3: Chạy build production để đảm bảo bundle tối ưu**

Chạy: `npm run build`
Kỳ vọng: Lệnh `vite build` tạo ra thư mục `dist/` thành công.

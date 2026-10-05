# Thiết Kế Chi Tiết Landing Page Portfolio Hạ Xuân Sơn (Full Stack Developer)

- **Ngày tạo**: 2026-10-05
- **Trạng thái**: Đã phê duyệt (Approved)
- **Tác giả / Đối tượng**: Hạ Xuân Sơn — Full Stack Developer (Web & Mobile, Real-time & WebRTC)
- **Cảm hứng & Design Language**: Phỏng theo phong cách "Jack — 3D Creator", nền tối `#0C0C0C`, font Google `Kanit`, hiệu ứng Framer Motion và tương tác 3D với `@react-three/fiber`.

---

## 1. Mục Tiêu & Phạm Vi (Goals & Scope)

### 1.1 Mục Tiêu Kỹ Thuật
- Tạo một landing page portfolio cá nhân độc đáo, hiện đại và chuẩn mực cao về UX/UI cũng như hiệu năng.
- Tích hợp trọn vẹn thông tin kỹ năng, kinh nghiệm thực chiến từ CV của Hạ Xuân Sơn (chuyên sâu Real-time WebRTC, Socket.IO, kiến trúc phân tầng, React 18, React Native, Node.js, MongoDB).
- Đạt điểm tối đa về độ mượt mà của animation (60fps), tương tác chuột 3D (Three.js/R3F), và khả năng hiển thị responsive từ điện thoại di động đến màn hình 4K.

### 1.2 Phạm Vi Tính Năng (7 Phân Khu Chính)
1. **Hero Section**: Navbar, tiêu đề cực lớn `HI, I'M SƠN` với text gradient, 3D Interactive Canvas trung tâm, bio tóm tắt và nút `Contact Me`.
2. **Marquee Section**: 2 dải ảnh/preview động cuộn ngang ngược chiều nhau theo tốc độ scroll chuột.
3. **About Section**: Giới thiệu năng lực giải pháp Full Stack với `AnimatedText` (từng ký tự sáng dần khi scroll) cùng 4 icon 3D nổi 4 góc.
4. **Skills Section**: Bảng phân nhóm kỹ năng công nghệ chuẩn mực (Backend, Web, Mobile, Database/Media, DevOps).
5. **Services Section ("What I Do")**: 5 dịch vụ/thế mạnh kỹ thuật được đánh số lớn `01` - `05`.
6. **Projects Section**: Danh sách dự án nổi bật với hiệu ứng thẻ dính xếp tầng (Sticky-stacking cards), tâm điểm là nền tảng Real-time Messaging & WebRTC Platform.
7. **Contact & Footer Section**: Thông tin liên hệ nhanh qua mailto, điện thoại, GitHub, LinkedIn và bản quyền.

---

## 2. Kiến Trúc Kỹ Thuật & Cấu Trúc Thư Mục

### 2.1 Tech Stack
- **Build tool & Framework**: Vite + React 18 + TypeScript (Strict Mode).
- **Styling**: Tailwind CSS v3.4 + Semantic Tokens + Google Font `Kanit` (weights 300–900).
- **Animation**: `framer-motion` v12.
- **3D Graphics**: `three`, `@react-three/fiber`, `@react-three/drei`.
- **Icons**: `lucide-react`.

### 2.2 Quy Hoạch Cấu Trúc (Atomic Design)
```text
portfolio/
├── index.html
├── package.json
├── tailwind.config.js
├── tsconfig.json
├── vite.config.ts
└── src/
    ├── main.tsx
    ├── App.tsx
    ├── index.css
    ├── data/
    │   └── portfolioData.ts       # Dữ liệu nguồn: Thông tin cá nhân, skills, dự án, services
    ├── components/
    │   ├── atoms/
    │   │   ├── ContactButton.tsx  # Nút bấm gradient pill với viền phát sáng inset
    │   │   ├── LiveProjectButton.tsx # Nút bấm ghost outline
    │   │   ├── SectionHeading.tsx # Tiêu đề với gradient .hero-heading
    │   │   └── Badge.tsx          # Thẻ tag kỹ năng
    │   ├── molecules/
    │   │   ├── FadeIn.tsx         # Wrapper chuyển động mượt với Framer Motion
    │   │   ├── Magnet.tsx         # Wrapper hút chuột tương tác
    │   │   ├── AnimatedText.tsx   # Hiệu ứng scroll text lộ dần từng ký tự
    │   │   └── ServiceRow.tsx     # Một dòng dịch vụ với số thứ tự cực lớn
    │   └── organisms/
    │       ├── Navbar.tsx         # Thanh điều hướng trên cùng
    │       ├── HeroSection.tsx    # Khu vực Hero chính
    │       ├── HeroScene.tsx      # R3F Canvas 3D đối tượng trừu tượng tương tác chuột
    │       ├── MarqueeSection.tsx # Băng chuyền GIF 2 hàng theo scroll
    │       ├── AboutSection.tsx   # Giới thiệu bản thân + 4 khối 3D góc
    │       ├── SkillsSection.tsx  # Lưới phân nhóm kỹ năng
    │       ├── ServicesSection.tsx# Danh sách năng lực 01-05
    │       ├── ProjectsSection.tsx# Sticky stacking project cards
    │       └── ContactSection.tsx # Thông tin liên hệ & footer
```

---

## 3. Đặc Tả Chi Tiết Từng Component & Section

### 3.1 Global Styles & Typography
- **Màu nền chủ đạo**: `#0C0C0C` trên toàn bộ trang.
- **Font chữ**: `'Kanit', sans-serif`.
- **Gradient text `.hero-heading`**:
  ```css
  background: linear-gradient(180deg, #646973 0%, #BBCCD7 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  ```
- **Màu chữ phụ/nhãn**: `#D7E2EA`.

### 3.2 Hero Section & 3D Canvas
- **Navbar**: 4 mục ("ABOUT", "SKILLS", "PROJECTS", "CONTACT"), `justify-between`, chữ in hoa, font-medium, padding lớn, hover mờ nhẹ.
- **H1 Header**: "HI, I'M SƠN", font-black, cỡ chữ cực lớn `14vw - 17.5vw`, leading-none, whitespace-nowrap.
- **Trung tâm Hero (3D Scene)**:
  - Một `Canvas` nhẹ chứa mô hình hình học đa diện (Icosahedron / TorusKnot / Octahedron tinh thể kim loại phản xạ).
  - Tự động xoay chậm kết hợp chuyển hướng góc nhìn nhẹ theo con trỏ chuột (`useFrame` nội suy góc xoay mượt mà).
  - Dùng vật liệu `MeshDistortMaterial` hoặc `MeshStandardMaterial` ánh kim loại tông màu xám bạc `#A5B4FC` / `#BBCCD7` để tôn lên phong cách công nghệ cao.
- **Bottom Bar**:
  - Bên trái: Đoạn mô tả năng lực: *"FULL STACK SOFTWARE ENGINEER SPECIALIZING IN HIGH-SCALE REAL-TIME SYSTEMS, WEBRTC & MODERN WEB/MOBILE APPS"*.
  - Bên phải: `ContactButton` (mở liên kết `mailto:sx051204@gmail.com`).

### 3.3 Marquee Section
- Chứa 2 hàng ảnh preview / GIF thể hiện dự án và công nghệ.
- Hàng 1 di chuyển sang phải khi cuộn trang; Hàng 2 di chuyển sang trái.
- Tốc độ tính toán mượt mà dựa trên `window.scrollY` qua passive event listener và `will-change: transform`.

### 3.4 About Section
- Heading: "ABOUT ME" cỡ lớn với `.hero-heading`.
- 4 ảnh 3D nổi bật đặt tại 4 góc tuyệt đối với hiệu ứng `FadeIn` trôi từ ngoài vào.
- Đoạn văn bản giới thiệu sâu về quá trình học tập tại Đại học Kinh Doanh và Công Nghệ Hà Nội (GPA 3.2/4.0), định hướng kiến trúc phân tầng 3 lớp, zero-trust validation và đam mê tối ưu hóa hệ thống thời gian thực.
- Sử dụng component `AnimatedText` để biến chuyển opacity từ `0.2` lên `1` cho từng ký tự dựa vào scroll progress.

### 3.5 Skills Section (Bổ Sung)
- Gồm 5 khối thẻ kính mờ (glassmorphism nhẹ với nền `#121212`, viền `#262626`):
  1. **Languages**: TypeScript, JavaScript (ES6+), SQL, HTML5/CSS3.
  2. **Backend & Real-time**: Node.js, Express.js, Socket.IO, WebRTC (P2P), RESTful API, Zod, OpenAPI/Swagger.
  3. **Web & Mobile Client**: React 18, Vite, Tailwind CSS, Radix UI, TanStack Query, Zustand, React Native, Expo.
  4. **Database & Multimedia**: MongoDB (Mongoose), Redis (Caching/Pub-Sub), Cloudinary, Sharp, FFmpeg.
  5. **Security & DevOps**: JWT Handshake, Refresh Token Rotation, Docker, GitHub Actions CI/CD, Vitest.

### 3.6 Services Section ("What I Do")
- Nền trắng tương phản `#FFFFFF` với góc bo trên `rounded-t-[40px] md:rounded-t-[60px]`, chữ đen `#0C0C0C`.
- 5 dòng dịch vụ với số thứ tự khổng lồ bên trái:
  - `01` — **Real-Time Systems & WebRTC**: Xây dựng kiến trúc gọi thoại/video P2P, signaling Socket.IO, chống double-offer, tự thu dọn orphan calls.
  - `02` — **Full Stack Web Engineering**: Phát triển Web React 18 chuẩn Atomic Design, FSD, server state TanStack Query và optimistic UI.
  - `03` — **Mobile App Development**: Ứng dụng di động React Native chia sẻ 100% contracts & validation schema từ backend.
  - `04` — **High-Performance Database**: Tối ưu MongoDB, thiết kế index chuyên biệt, Cursor-based pagination cho hàng triệu tin nhắn <50ms.
  - `05` — **Media Processing & CI/CD**: Pipeline nén ảnh tự động Sharp, transcode FFmpeg, container hóa Docker và GitHub Actions.

### 3.7 Projects Section (Sticky Stacking)
- Nền đen `#0C0C0C`, góc bo trên lớn đè lên section trắng trước đó.
- 3 Project Cards xếp chồng dạng sticky top:
  - **Project 01 (Flagship)**: *Real-time Messaging & WebRTC Platform*
    - Tag: `Full Stack & Mobile (Solo)`
    - Mô tả: Hệ thống nhắn tin, gọi video P2P thời gian thực với Socket.IO, WebRTC, React, React Native, Node.js và MongoDB.
    - Nút `Live Project` / `GitHub Repository`.
  - **Project 02**: *High-Performance Media & Asset Pipeline*
    - Tag: `Backend & Microservice`
    - Mô tả: Dịch vụ xử lý media tự động hóa: nén ảnh Sharp, render thumbnail video FFmpeg và lưu trữ đám mây.
  - **Project 03**: *E-Commerce & Shared Contracts Showcase*
    - Tag: `Web Client & Architecture`
    - Mô tả: Ứng dụng mẫu tối ưu hóa state, Zero-trust validation Zod đồng bộ giữa client và server.

### 3.8 Contact Section
- Tiêu đề "LET'S CONNECT".
- Hiển thị đầy đủ thông tin:
  - Email: `sx051204@gmail.com`
  - Hotline / Zalo: `0984494204`
  - GitHub: `https://github.com/sonsee204`
  - Địa điểm: `Hà Nội, Việt Nam`
- Footer ghi nhận bản quyền cá nhân của Hạ Xuân Sơn.

---

## 4. Kiểm Thử & Tiêu Chí Nghiệm Thu (Acceptance Criteria)

1. **Giao diện & Thẩm mỹ**:
   - Đúng tông màu tối `#0C0C0C` chuẩn xác, font Kanit hiển thị đồng bộ.
   - Text gradient `.hero-heading` mượt mà, không bị răng cưa.
   - Canvas 3D tải trơn tru, không gây drop frame khi người dùng di chuột.
2. **Hiệu ứng & Chuyển động**:
   - Marquee cuộn ngang êm ái, không bị giật lag (CLS = 0).
   - Sticky cards xếp chồng đúng tỷ lệ thu nhỏ `targetScale = 1 - (totalCards - 1 - index) * 0.03`.
   - `AnimatedText` trong About section đổi độ mờ chính xác theo vị trí cuộn trang.
3. **Responsive**:
   - Hoạt động trơn tru trên mọi độ phân giải từ Mobile (375px) đến Desktop (1920px+).
4. **Code Quality & Type Safety**:
   - TypeScript kiểm tra không có lỗi (`tsc --noEmit`).
   - Không vi phạm các Hard Bans (`any`, `@ts-ignore`).

// Dữ liệu tập trung cho toàn bộ portfolio của Hạ Xuân Sơn

/**
 * Đại diện cho một dự án trong danh mục dự án nổi bật
 */
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

/**
 * Đại diện cho một dịch vụ chuyên môn được cung cấp
 */
export interface ServiceItem {
  number: string;
  title: string;
  description: string;
}

/**
 * Đại diện cho một nhóm kỹ năng chuyên môn
 */
export interface SkillCategory {
  title: string;
  skills: string[];
}

/**
 * Thông tin cá nhân, liên hệ và giới thiệu chung của Hạ Xuân Sơn
 */
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

/**
 * Danh sách hình ảnh động (GIF) cho dải chạy marquee vô tận tại phần Hero
 */
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

/**
 * Danh sách kỹ năng kỹ thuật chia theo từng nhóm chuyên môn
 */
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

/**
 * Danh sách dịch vụ chuyên nghiệp cung cấp cho khách hàng và đối tác
 */
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

/**
 * Danh sách dự án tiêu biểu kèm hình ảnh, công nghệ và tính năng nổi bật
 */
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

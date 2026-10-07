import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Bot,
  Sparkles,
  Brain,
  Search,
  Palette,
  Rocket,
  Flame,
  Check,
  CheckCircle2,
  ShieldCheck,
  Zap,
  Clock,
  Lock,
  Headphones,
  Users,
  Star,
  ChevronDown,
  X,
  MessageCircle,
  QrCode,
  CreditCard,
  ArrowRight,
  Copy,
  ShoppingBag,
  Filter,
  CheckCheck,
  PhoneCall,
  Send,
  HelpCircle,
  Menu,
  Play,
  Pause,
  Eye,
  Film,
  Activity,
  UserCheck,
  BadgeCheck,
  Video,
  Clapperboard,
  Scissors,
  Wand2,
  Tv,
  Brush,
  PenTool,
  Layout,
  Image as ImageIcon,
  Type,
  FolderDown,
  Layers
} from 'lucide-react';

// Product Type definition
interface AIProduct {
  id: string;
  category: 'chatgpt' | 'gemini' | 'claude' | 'perplexity' | 'midjourney' | 'grok' | 'combo' | 'video' | 'design';
  brand: string;
  name: string;
  price: string;
  originalPrice: string;
  period: string;
  popular?: boolean;
  hot?: boolean;
  badge?: string;
  icon: React.ReactNode;
  accentColor: string;
  borderGlow: string;
  features: string[];
}

// Particle Canvas Background
const ParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const particleCount = Math.min(width > 768 ? 60 : 30, 70);
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2 + 0.6,
      vx: (Math.random() - 0.5) * 0.45,
      vy: (Math.random() - 0.5) * 0.45,
      alpha: Math.random() * 0.5 + 0.25,
      color: Math.random() > 0.5 ? '#818cf8' : '#38bdf8'
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 105) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = '#6366f1';
            ctx.globalAlpha = (1 - dist / 105) * 0.12;
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10 opacity-70"
    />
  );
};

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<AIProduct | null>(null);
  const [orderModalOpen, setOrderModalOpen] = useState<boolean>(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [copiedKey, setCopiedKey] = useState<boolean>(false);

  // Background Motion Video state & ref
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [videoOpacity, setVideoOpacity] = useState<number>(0.85); // 85% high vibrancy motion default
  const [isVideoPlaying, setIsVideoPlaying] = useState<boolean>(true);
  const [showMotionControls, setShowMotionControls] = useState<boolean>(true);

  // Ensure video autoplays smoothly on mount
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay handled if browser requires user gesture
      });
    }
  }, []);

  const toggleVideoPlayback = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsVideoPlaying(true);
    } else {
      videoRef.current.pause();
      setIsVideoPlaying(false);
    }
  };

  // Live order activity toast stream
  const [liveToast, setLiveToast] = useState<{ name: string; city: string; item: string; time: string } | null>(null);

  useEffect(() => {
    const orders = [
      { name: 'Hoàng Nam', city: 'Hà Nội', item: 'ChatGPT Plus — 99k', time: '1 phút trước' },
      { name: 'Thảo My', city: 'TP. HCM', item: 'Combo 4 AI — 299k', time: '2 phút trước' },
      { name: 'Minh Quân', city: 'Đà Nẵng', item: 'Claude Pro — 99k', time: 'Vừa xong' },
      { name: 'Bích Ngọc', city: 'Hải Phòng', item: 'Perplexity Pro 1 năm', time: '3 phút trước' },
      { name: 'Đỗ Gia Huy', city: 'Hà Nội', item: 'Midjourney Standard — 149k', time: 'Vừa xong' },
      { name: 'Quốc Anh', city: 'Bình Dương', item: 'Gemini AI Ultra — 199k', time: '4 phút trước' },
      { name: 'Thanh Vân', city: 'Cần Thơ', item: 'SuperGrok — 99k', time: 'Vừa xong' },
      { name: 'Vũ Thắng', city: 'Quảng Ninh', item: 'Combo VIP — 499k', time: '5 phút trước' }
    ];

    let index = 0;
    const interval = setInterval(() => {
      setLiveToast(orders[index % orders.length]);
      index++;
      setTimeout(() => {
        setLiveToast(null);
      }, 4500);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  // Order form state
  const [customerName, setCustomerName] = useState<string>('');
  const [customerEmail, setCustomerEmail] = useState<string>('');
  const [customerPhone, setCustomerPhone] = useState<string>('');
  const [customerNote, setCustomerNote] = useState<string>('');
  const [orderSubmitted, setOrderSubmitted] = useState<boolean>(false);
  const [orderId, setOrderId] = useState<string>('');

  // Full product catalog
  const products: AIProduct[] = [
    // 🤖 CHATGPT
    {
      id: 'chatgpt-plus',
      category: 'chatgpt',
      brand: 'ChatGPT',
      name: 'ChatGPT Plus',
      price: '99.000đ',
      originalPrice: '499.000đ',
      period: '1 tháng',
      popular: true,
      badge: 'BÁN CHẠY NHẤT 🔥',
      icon: <Bot className="w-6 h-6 text-emerald-400" />,
      accentColor: 'from-emerald-500/20 to-teal-500/20',
      borderGlow: 'hover:border-emerald-500/60 hover:shadow-emerald-500/20',
      features: [
        'Mô hình GPT-4o & GPT-4o mini không giới hạn',
        'Tạo hình ảnh DALL-E 3 siêu nét & tùy biến phong cách',
        'Phân tích tài liệu, file Excel, PDF, hình ảnh trực tiếp',
        'Duyệt web thời gian thực & sử dụng kho Custom GPTs',
        'Tốc độ phản hồi ưu tiên cao nhất, không bị quá tải'
      ]
    },
    {
      id: 'chatgpt-pro',
      category: 'chatgpt',
      brand: 'ChatGPT',
      name: 'ChatGPT Pro',
      price: '199.000đ',
      originalPrice: '4.900.000đ',
      period: '1 tháng',
      badge: 'CÔNG NGHỆ O1-PRO',
      icon: <Bot className="w-6 h-6 text-teal-300" />,
      accentColor: 'from-teal-500/20 to-cyan-500/20',
      borderGlow: 'hover:border-teal-500/60 hover:shadow-teal-500/20',
      features: [
        'Truy cập không giới hạn mô hình OpenAI o1 & o1-mini',
        'Chế độ o1-pro mode suy luận toán học, lập trình đỉnh cao',
        'Cụm tài nguyên GPU ưu tiên chuyên dụng, không nghẽn mạng',
        'Độ dài ngữ cảnh tối đa để giải quyết đề tài nghiên cứu khó',
        'Trải nghiệm trước toàn bộ tính năng thử nghiệm mới nhất'
      ]
    },

    // ✨ GEMINI
    {
      id: 'gemini-pro',
      category: 'gemini',
      brand: 'Gemini',
      name: 'Gemini AI Pro',
      price: '99.000đ',
      originalPrice: '490.000đ',
      period: '1 tháng',
      icon: <Sparkles className="w-6 h-6 text-blue-400" />,
      accentColor: 'from-blue-500/20 to-cyan-500/20',
      borderGlow: 'hover:border-blue-500/60 hover:shadow-blue-500/20',
      features: [
        'Mô hình Gemini 1.5 Pro với Context 2 triệu token',
        'Phân tích video dài 1 tiếng, tài liệu 1.500 trang cực nhanh',
        'Tích hợp trực tiếp Google Docs, Gmail, Drive & YouTube',
        'Hỗ trợ lập trình đa ngôn ngữ, tự động sửa lỗi logic code',
        'Tặng kèm dung lượng lưu trữ đám mây Google One'
      ]
    },
    {
      id: 'gemini-ultra',
      category: 'gemini',
      brand: 'Gemini',
      name: 'Gemini AI Ultra',
      price: '199.000đ',
      originalPrice: '650.000đ',
      period: '1 tháng',
      badge: 'GOOGLE ADVANCED',
      icon: <Sparkles className="w-6 h-6 text-indigo-400" />,
      accentColor: 'from-indigo-500/20 to-purple-500/20',
      borderGlow: 'hover:border-indigo-500/60 hover:shadow-indigo-500/20',
      features: [
        'Mô hình mạnh nhất của Google cho tác vụ phức tạp nhất',
        'Gói dung lượng Google One 2TB lưu trữ ảnh và dữ liệu',
        'Hỗ trợ tính năng Gemini Live đàm thoại giọng nói tức thì',
        'Tích hợp sâu trong Google Workspace cho doanh nghiệp',
        'Bảo hành chính chủ 1 đổi 1 suốt 30 ngày'
      ]
    },

    // 🧠 CLAUDE
    {
      id: 'claude-pro',
      category: 'claude',
      brand: 'Claude',
      name: 'Claude Pro',
      price: '99.000đ',
      originalPrice: '520.000đ',
      period: '1 tháng',
      popular: true,
      badge: 'CODE & VIẾT VĂN SỐ 1',
      icon: <Brain className="w-6 h-6 text-amber-400" />,
      accentColor: 'from-amber-500/20 to-orange-500/20',
      borderGlow: 'hover:border-amber-500/60 hover:shadow-amber-500/20',
      features: [
        'Mô hình Claude 3.5 Sonnet đỉnh cao lập trình & văn phong',
        'Giao diện Claude Artifacts hiển thị code & website trực quan',
        'Số lượng tin nhắn gấp 5 lần so với tài khoản miễn phí',
        'Xử lý tài liệu và dữ liệu lớn lên tới 200.000 token',
        'Văn phong tiếng Việt tự nhiên, logic và mượt mà nhất'
      ]
    },
    {
      id: 'claude-max',
      category: 'claude',
      brand: 'Claude',
      name: 'Claude Max',
      price: '199.000đ',
      originalPrice: '990.000đ',
      period: '1 tháng',
      icon: <Brain className="w-6 h-6 text-orange-400" />,
      accentColor: 'from-orange-500/20 to-rose-500/20',
      borderGlow: 'hover:border-orange-500/60 hover:shadow-orange-500/20',
      features: [
        'Không giới hạn tin nhắn ngay cả trong giờ cao điểm quốc tế',
        'Sử dụng cả mô hình Claude 3 Opus và Claude 3.5 Sonnet',
        'Tính năng Claude Projects để quản lý bộ nhớ dự án dài hạn',
        'Tải lên đồng thời nhiều thư mục mã nguồn và tài liệu lớn',
        'Hỗ trợ kỹ thuật ưu tiên 24/7'
      ]
    },

    // 🔎 PERPLEXITY
    {
      id: 'perplexity-pro',
      category: 'perplexity',
      brand: 'Perplexity',
      name: 'Perplexity Pro',
      price: '79.000đ',
      originalPrice: '490.000đ',
      period: '1 tháng',
      icon: <Search className="w-6 h-6 text-cyan-400" />,
      accentColor: 'from-cyan-500/20 to-blue-500/20',
      borderGlow: 'hover:border-cyan-500/60 hover:shadow-cyan-500/20',
      features: [
        'Hơn 300+ lượt tìm kiếm chuyên sâu Pro Search mỗi ngày',
        'Tùy chọn tự do mô hình: Claude 3.5, GPT-4o, Sonar',
        'Trích xuất dẫn nguồn học thuật, báo cáo & bài báo uy tín',
        'Tải lên và tra cứu không giới hạn file PDF, doc, ảnh',
        'Tặng $5 API credit mỗi tháng cho lập trình viên'
      ]
    },
    {
      id: 'perplexity-1year',
      category: 'perplexity',
      brand: 'Perplexity',
      name: 'Perplexity Pro 1 năm',
      price: '399.000đ',
      originalPrice: '4.900.000đ',
      period: '1 năm (12 tháng)',
      badge: 'TIẾT KIỆM 70% 💰',
      icon: <Search className="w-6 h-6 text-sky-400" />,
      accentColor: 'from-sky-500/20 to-indigo-500/20',
      borderGlow: 'hover:border-sky-500/60 hover:shadow-sky-500/20',
      features: [
        'Sử dụng trọn vẹn 365 ngày không lo gián đoạn',
        'Đầy đủ mọi tính năng Pro Search không giới hạn hàng ngày',
        'Chuyển đổi qua lại giữa GPT-4o, Claude 3.5 và Sonar',
        'Tiết kiệm hơn 70% so với mua từng tháng lẻ',
        'Bảo hành 1 đổi 1 cam kết uy tín trọn vẹn 1 năm'
      ]
    },

    // 🎨 MIDJOURNEY
    {
      id: 'midjourney-basic',
      category: 'midjourney',
      brand: 'Midjourney',
      name: 'Midjourney Basic',
      price: '99.000đ',
      originalPrice: '260.000đ',
      period: '1 tháng',
      icon: <Palette className="w-6 h-6 text-pink-400" />,
      accentColor: 'from-pink-500/20 to-purple-500/20',
      borderGlow: 'hover:border-pink-500/60 hover:shadow-pink-500/20',
      features: [
        'Khoảng 200 lượt tạo ảnh Fast GPU tốc độ cao mỗi tháng',
        'Quyền thương mại toàn bộ tác phẩm nghệ thuật tạo ra',
        'Truy cập phòng trưng bày cộng đồng và thư viện mẫu prompt',
        'Tạo 3 tác vụ song song cùng một lúc',
        'Sử dụng các phiên bản mới nhất v6, Niji 6'
      ]
    },
    {
      id: 'midjourney-standard',
      category: 'midjourney',
      brand: 'Midjourney',
      name: 'Midjourney Standard',
      price: '149.000đ',
      originalPrice: '780.000đ',
      period: '1 tháng',
      popular: true,
      badge: 'DESIGNER YÊU THÍCH',
      icon: <Palette className="w-6 h-6 text-fuchsia-400" />,
      accentColor: 'from-fuchsia-500/20 to-rose-500/20',
      borderGlow: 'hover:border-fuchsia-500/60 hover:shadow-fuchsia-500/20',
      features: [
        '15 giờ tạo ảnh Fast GPU siêu tốc mỗi tháng',
        'Tạo ảnh KHÔNG GIỚI HẠN với chế độ Relax GPU vĩnh viễn',
        'Tự do sáng tạo banner, poster, nhân vật game, kiến trúc',
        'Hỗ trợ chế độ phóng to Upscale sắc nét 4K/8K',
        'Quyền thương mại tuyệt đối cho khách hàng & dự án'
      ]
    },
    {
      id: 'midjourney-pro',
      category: 'midjourney',
      brand: 'Midjourney',
      name: 'Midjourney Pro',
      price: '249.000đ',
      originalPrice: '1.560.000đ',
      period: '1 tháng',
      badge: 'CHẾ ĐỘ STEALTH ẨN DANH',
      icon: <Palette className="w-6 h-6 text-rose-400" />,
      accentColor: 'from-rose-500/20 to-purple-500/20',
      borderGlow: 'hover:border-rose-500/60 hover:shadow-rose-500/20',
      features: [
        '30 giờ Fast GPU và Relax GPU không giới hạn',
        'Chế độ Stealth Mode: Ẩn toàn bộ ảnh, bảo mật prompt độc quyền',
        'Chạy tối đa 12 tác vụ Fast đồng thời cùng lúc',
        'Thích hợp cho Studio, Agency thiết kế và Doanh nghiệp',
        'Bảo hành chính chủ 100% suốt chu kỳ sử dụng'
      ]
    },

    // 🚀 GROK
    {
      id: 'grok-super',
      category: 'grok',
      brand: 'Grok',
      name: 'SuperGrok',
      price: '99.000đ',
      originalPrice: '400.000đ',
      period: '1 tháng',
      icon: <Rocket className="w-6 h-6 text-violet-400" />,
      accentColor: 'from-violet-500/20 to-indigo-500/20',
      borderGlow: 'hover:border-violet-500/60 hover:shadow-violet-500/20',
      features: [
        'Mô hình Grok 2 & Grok 2 mini của xAI (Elon Musk)',
        'Dữ liệu tin tức thời gian thực từ mạng xã hội X (Twitter)',
        'Tạo ảnh với mô hình Flux 1 không bị kiểm duyệt khắt khe',
        'Văn phong hóm hỉnh, đối đáp chân thực và sắc sảo',
        'Bảo hành 1 đổi 1 trong vòng 30 ngày'
      ]
    },
    {
      id: 'grok-heavy',
      category: 'grok',
      brand: 'Grok',
      name: 'SuperGrok Heavy',
      price: '199.000đ',
      originalPrice: '800.000đ',
      period: '1 tháng',
      badge: 'HIỆU NĂNG TỐI ĐA',
      icon: <Rocket className="w-6 h-6 text-purple-400" />,
      accentColor: 'from-purple-500/20 to-blue-500/20',
      borderGlow: 'hover:border-purple-500/60 hover:shadow-purple-500/20',
      features: [
        'Tốc độ suy luận tối đa với cụm máy chủ Colossus của xAI',
        'Số lượng prompt mở rộng không giới hạn mỗi 2 giờ',
        'Tạo ảnh Flux Pro chất lượng hình ảnh cao nhất',
        'Phân tích xu hướng thị trường tài chính và crypto real-time',
        'Hỗ trợ kỹ thuật 24/7'
      ]
    },

    // 🔥 COMBO AI
    {
      id: 'combo-2-ai',
      category: 'combo',
      brand: 'Combo',
      name: 'Combo 2 AI',
      price: '149.000đ',
      originalPrice: '398.000đ',
      period: '1 tháng',
      hot: true,
      badge: 'TIẾT KIỆM 30% ⚡',
      icon: <Flame className="w-6 h-6 text-orange-400" />,
      accentColor: 'from-orange-500/25 to-amber-500/20',
      borderGlow: 'hover:border-orange-500/70 hover:shadow-orange-500/25',
      features: [
        'Tùy chọn 2 công cụ AI bất kỳ (VD: ChatGPT Plus + Claude Pro)',
        'Hoặc kết hợp Midjourney + ChatGPT Plus để viết & vẽ',
        'Tiết kiệm hơn 30% so với mua từng tài khoản riêng lẻ',
        'Bảo hành đồng bộ 1 đổi 1 suốt 30 ngày cho cả 2 tài khoản',
        'Kích hoạt nhanh chóng trong 30 giây'
      ]
    },
    {
      id: 'combo-4-ai',
      category: 'combo',
      brand: 'Combo',
      name: 'Combo 4 AI',
      price: '299.000đ',
      originalPrice: '796.000đ',
      period: '1 tháng',
      popular: true,
      hot: true,
      badge: 'COMBO ĐƯỢC CHỌN NHIỀU NHẤT 🌟',
      icon: <Flame className="w-6 h-6 text-rose-400" />,
      accentColor: 'from-rose-500/25 to-purple-500/20',
      borderGlow: 'hover:border-rose-500/70 hover:shadow-rose-500/25',
      features: [
        'Trọn bộ 4 công cụ AI hàng đầu: ChatGPT + Claude + Midjourney + Perplexity',
        'Đầy đủ giải pháp: Viết lách, Lập trình, Vẽ ảnh nghệ thuật & Tra cứu',
        'Tiết kiệm hơn 60% chi phí cho sinh viên & dân văn phòng',
        'Tặng kèm tài liệu Prompt Engineering độc quyền trị giá 500k',
        'Hỗ trợ kỹ thuật ưu tiên 24/7 qua Zalo riêng'
      ]
    },
    {
      id: 'combo-vip',
      category: 'combo',
      brand: 'Combo',
      name: 'Combo VIP',
      price: '499.000đ',
      originalPrice: '1.450.000đ',
      period: '1 tháng',
      hot: true,
      badge: 'TRỌN BỘ TẤT CẢ CÔNG CỤ 👑',
      icon: <Flame className="w-6 h-6 text-purple-400" />,
      accentColor: 'from-purple-500/30 to-indigo-500/25',
      borderGlow: 'hover:border-purple-500/80 hover:shadow-purple-500/30',
      features: [
        'TRỌN BỘ TẤT CẢ CÔNG CỤ AI: ChatGPT, Gemini, Claude, Perplexity, Midjourney, Grok',
        'TẶNG KÈM tài khoản Canva Pro vĩnh viễn trị giá 400.000đ',
        'Không lo giới hạn prompt, thỏa sức làm việc đa nền tảng',
        'Bảo hành VIP 1 đổi 1 đổi mới tức thì trong 3 phút',
        'Hỗ trợ 1 kèm 1 cài đặt & tối ưu workflow doanh nghiệp'
      ]
    },

    // 🎬 CAPCUT PRO
    {
      id: 'capcut-pro-1m',
      category: 'video',
      brand: 'CapCut',
      name: 'CapCut Pro (1 tháng)',
      price: '49.000đ',
      originalPrice: '150.000đ',
      period: '1 tháng',
      popular: true,
      badge: 'HOT TIKTOK 🔥',
      icon: <Scissors className="w-6 h-6 text-cyan-400" />,
      accentColor: 'from-cyan-500/20 to-teal-500/20',
      borderGlow: 'hover:border-cyan-500/60 hover:shadow-cyan-500/20',
      features: [
        'Mở khóa toàn bộ hiệu ứng Pro, kho hiệu ứng & chuyển cảnh VIP',
        'Tính năng AI Smart Cutout tách nền thông minh 1 chạm',
        'Tự động tạo phụ đề tiếng Việt chuẩn xác 99%',
        'Xuất video 4K 60fps cực mượt không watermark logo',
        'Sử dụng mượt mà trên cả PC (Windows/Mac) và điện thoại'
      ]
    },
    {
      id: 'capcut-pro-3m',
      category: 'video',
      brand: 'CapCut',
      name: 'CapCut Pro (3 tháng)',
      price: '129.000đ',
      originalPrice: '450.000đ',
      period: '3 tháng',
      badge: 'TIẾT KIỆM 20% ⚡',
      icon: <Scissors className="w-6 h-6 text-teal-400" />,
      accentColor: 'from-teal-500/20 to-emerald-500/20',
      borderGlow: 'hover:border-teal-500/60 hover:shadow-teal-500/20',
      features: [
        'Trọn gói 90 ngày sử dụng CapCut Pro không gián đoạn',
        'Kho âm thanh bản quyền thương mại và bộ lọc màu điện ảnh',
        'Tính năng AI khử rung video và làm nét chuyển động',
        'Dung lượng lưu trữ đám mây CapCut Cloud sao lưu dự án',
        'Bảo hành chính chủ 1 đổi 1 suốt 3 tháng sử dụng'
      ]
    },
    {
      id: 'capcut-pro-1y',
      category: 'video',
      brand: 'CapCut',
      name: 'CapCut Pro (1 năm)',
      price: '399.000đ',
      originalPrice: '1.600.000đ',
      period: '1 năm (12 tháng)',
      popular: true,
      badge: 'TIẾT KIỆM 75% 🎬',
      icon: <Scissors className="w-6 h-6 text-emerald-400" />,
      accentColor: 'from-emerald-500/20 to-cyan-500/20',
      borderGlow: 'hover:border-emerald-500/60 hover:shadow-emerald-500/20',
      features: [
        'Bản quyền 365 ngày trọn vẹn dành cho Editor chuyên nghiệp',
        'Đồng bộ tài khoản trên PC, laptop, iPhone và Android',
        'Tất cả tính năng AI mới nhất được cập nhật tự động',
        'Xuất video hàng loạt tốc độ cao cho TikTok, Shorts, Reels',
        'Bảo hành cam kết 1 đổi 1 uy tín suốt 12 tháng'
      ]
    },

    // 🎥 RUNWAY
    {
      id: 'runway-standard',
      category: 'video',
      brand: 'Runway',
      name: 'Runway Standard',
      price: '99.000đ',
      originalPrice: '380.000đ',
      period: '1 tháng',
      icon: <Film className="w-6 h-6 text-indigo-400" />,
      accentColor: 'from-indigo-500/20 to-purple-500/20',
      borderGlow: 'hover:border-indigo-500/60 hover:shadow-indigo-500/20',
      features: [
        'Mô hình Gen-3 Alpha tạo video từ chữ & ảnh đẳng cấp nhất',
        '625 credits hàng tháng tạo video AI chất lượng cao',
        'Công cụ Motion Brush điều khiển góc máy & chuyển động chi tiết',
        'Xuất video 1080p sắc nét không dính logo watermark',
        'Khám phá công nghệ làm phim AI thế hệ mới dẫn đầu thế giới'
      ]
    },
    {
      id: 'runway-pro',
      category: 'video',
      brand: 'Runway',
      name: 'Runway Pro',
      price: '199.000đ',
      originalPrice: '890.000đ',
      period: '1 tháng',
      popular: true,
      badge: 'LÀM PHIM AI ĐỈNH CAO 🎥',
      icon: <Film className="w-6 h-6 text-violet-400" />,
      accentColor: 'from-violet-500/20 to-fuchsia-500/20',
      borderGlow: 'hover:border-violet-500/60 hover:shadow-violet-500/20',
      features: [
        '2.250 credits hàng tháng phục vụ các dự án phim & MV chuyên nghiệp',
        'Độ phân giải video 4K sắc nét chuẩn điện ảnh Hollywood',
        'Tính năng huấn luyện giọng nói & gương mặt Custom Voice/Face',
        'Tốc độ kết xuất GPU ưu tiên, thời gian render siêu nhanh',
        'Bảo hành 1 đổi 1 uy tín trong suốt 30 ngày'
      ]
    },
    {
      id: 'runway-unlimited',
      category: 'video',
      brand: 'Runway',
      name: 'Runway Unlimited',
      price: '299.000đ',
      originalPrice: '2.200.000đ',
      period: '1 tháng',
      hot: true,
      badge: 'KHÔNG GIỚI HẠN GEN-3 🚀',
      icon: <Film className="w-6 h-6 text-fuchsia-400" />,
      accentColor: 'from-fuchsia-500/20 to-pink-500/20',
      borderGlow: 'hover:border-fuchsia-500/70 hover:shadow-fuchsia-500/25',
      features: [
        'Tạo video Gen-3 Alpha & Gen-2 KHÔNG GIỚI HẠN lượt tạo',
        'Chế độ Relax Mode kết xuất video liên tục không lo hết credit',
        'Đầy đủ bộ công cụ Text-to-Video, Video-to-Video & Motion Brush',
        'Lựa chọn tối ưu số 1 cho Studio, Agency và Nhà sáng tạo nội dung',
        'Hỗ trợ kỹ thuật 24/7 trực tiếp từ quản trị viên'
      ]
    },

    // ✨ KLING AI
    {
      id: 'kling-basic',
      category: 'video',
      brand: 'Kling AI',
      name: 'Kling AI Basic',
      price: '99.000đ',
      originalPrice: '350.000đ',
      period: '1 tháng',
      icon: <Sparkles className="w-6 h-6 text-yellow-400" />,
      accentColor: 'from-yellow-500/20 to-amber-500/20',
      borderGlow: 'hover:border-yellow-500/60 hover:shadow-yellow-500/20',
      features: [
        'Mô hình Kling AI 1.5 tạo chuyển động người & vật lý siêu thực',
        '660 credits tạo video chất lượng cao mỗi tháng',
        'Thời lượng video mở rộng lên tới 10 giây mỗi clip ấn tượng',
        'Khả năng mô phỏng biểu cảm khuôn mặt và động tác tự nhiên',
        'Bảo hành uy tín trọn chu kỳ 30 ngày sử dụng'
      ]
    },
    {
      id: 'kling-pro',
      category: 'video',
      brand: 'Kling AI',
      name: 'Kling AI Pro',
      price: '199.000đ',
      originalPrice: '850.000đ',
      period: '1 tháng',
      badge: 'VẬT LÝ SIÊU THỰC 🌟',
      icon: <Sparkles className="w-6 h-6 text-amber-400" />,
      accentColor: 'from-amber-500/20 to-orange-500/20',
      borderGlow: 'hover:border-amber-500/60 hover:shadow-amber-500/20',
      features: [
        '3.000 credits hàng tháng cho nhà sáng tạo nội dung chuyên sâu',
        'Xuất video độ phân giải 1080p chuẩn điện ảnh với độ mượt mà cao',
        'Hỗ trợ Prompt tiếng Việt và tiếng Anh nhận diện chính xác',
        'Hàng đợi ưu tiên Fast Queue không phải chờ đợi lâu',
        'Hỗ trợ kỹ thuật 24/7 suốt quá trình sử dụng'
      ]
    },

    // 🎞️ VEED
    {
      id: 'veed-pro',
      category: 'video',
      brand: 'Veed',
      name: 'Veed Pro',
      price: '99.000đ',
      originalPrice: '450.000đ',
      period: '1 tháng',
      icon: <Clapperboard className="w-6 h-6 text-blue-400" />,
      accentColor: 'from-blue-500/20 to-cyan-500/20',
      borderGlow: 'hover:border-blue-500/60 hover:shadow-blue-500/20',
      features: [
        'Tự động tạo phụ đề Auto Subtitles đa ngôn ngữ chuẩn xác',
        'Dịch phụ đề video sang hơn 50+ ngôn ngữ phổ biến',
        'Tính năng Clean Audio xóa tạp âm tiếng ồn bằng AI 1 chạm',
        'Kho nhạc bản quyền, template mẫu và nhãn dán phong phú',
        'Xuất video Full HD 1080p không dính logo watermark'
      ]
    },
    {
      id: 'veed-business',
      category: 'video',
      brand: 'Veed',
      name: 'Veed Business',
      price: '199.000đ',
      originalPrice: '1.200.000đ',
      period: '1 tháng',
      badge: 'DOANH NGHIỆP & TIKTOK 💼',
      icon: <Clapperboard className="w-6 h-6 text-sky-400" />,
      accentColor: 'from-sky-500/20 to-indigo-500/20',
      borderGlow: 'hover:border-sky-500/60 hover:shadow-sky-500/20',
      features: [
        'Xuất video 4K chuẩn nét cho YouTube và quảng cáo truyền hình',
        'Thời lượng tạo phụ đề tự động lên tới 8.000 phút/năm',
        'Tính năng AI Voice Cloning nhân bản giọng nói chân thực',
        'Tạo video với nhân vật ảo AI Avatars đại diện thương hiệu',
        'Bộ nhận diện thương hiệu Brand Kit độc quyền cho công ty'
      ]
    },

    // 🎬 FILMORA
    {
      id: 'filmora-1m',
      category: 'video',
      brand: 'Filmora',
      name: 'Wondershare Filmora (1 tháng)',
      price: '79.000đ',
      originalPrice: '250.000đ',
      period: '1 tháng',
      icon: <Video className="w-6 h-6 text-teal-400" />,
      accentColor: 'from-teal-500/20 to-cyan-500/20',
      borderGlow: 'hover:border-teal-500/60 hover:shadow-teal-500/20',
      features: [
        'Bản quyền Filmora mới nhất mở khóa 100% tính năng cao cấp',
        'Hàng ngàn hiệu ứng Boris FX và NewBlue FX chuẩn studio',
        'Tính năng AI Smart Cutout, AI Audio Stretch và AI Copilot',
        'Xuất video 4K siêu tốc không có hình mờ watermark',
        'Tương thích hoàn hảo cả Windows và macOS'
      ]
    },
    {
      id: 'filmora-1y',
      category: 'video',
      brand: 'Filmora',
      name: 'Wondershare Filmora (1 năm)',
      price: '399.000đ',
      originalPrice: '1.300.000đ',
      period: '1 năm (12 tháng)',
      popular: true,
      badge: 'TIẾT KIỆM 70% 🎬',
      icon: <Video className="w-6 h-6 text-teal-300" />,
      accentColor: 'from-teal-500/20 to-emerald-500/20',
      borderGlow: 'hover:border-teal-500/60 hover:shadow-teal-500/20',
      features: [
        'Bản quyền chính hãng 365 ngày cập nhật phiên bản mới liên tục',
        'Truy cập trọn vẹn kho hiệu ứng Effects & Plug-in VIP',
        '15GB dung lượng lưu trữ đám mây Wondershare Filmora Cloud',
        'Đầy đủ bộ công cụ AI xử lý âm thanh, giọng nói & khung hình',
        'Bảo hành chính chủ 1 đổi 1 suốt trọn vẹn 1 năm'
      ]
    },

    // 🎥 ADOBE PREMIERE PRO
    {
      id: 'premiere-1m',
      category: 'video',
      brand: 'Adobe Premiere Pro',
      name: 'Adobe Premiere Pro (1 tháng)',
      price: '199.000đ',
      originalPrice: '650.000đ',
      period: '1 tháng',
      icon: <Tv className="w-6 h-6 text-purple-400" />,
      accentColor: 'from-purple-500/20 to-indigo-500/20',
      borderGlow: 'hover:border-purple-500/60 hover:shadow-purple-500/20',
      features: [
        'Kích hoạt trực tiếp trên email Adobe Creative Cloud chính chủ',
        'Phần mềm dựng phim chuyên nghiệp hàng đầu thế giới',
        'Công cụ AI Generative Extend và lọc tạp âm Enhance Speech đỉnh cao',
        'Đồng bộ dễ dàng với After Effects, Photoshop và Audition',
        'Cài đặt trực tiếp từ ứng dụng Adobe Creative Cloud Desktop'
      ]
    },
    {
      id: 'premiere-1y',
      category: 'video',
      brand: 'Adobe Premiere Pro',
      name: 'Adobe Premiere Pro (1 năm)',
      price: '999.000đ',
      originalPrice: '6.500.000đ',
      period: '1 năm (12 tháng)',
      hot: true,
      badge: 'CHÍNH CHỦ ADOBE 👑',
      icon: <Tv className="w-6 h-6 text-indigo-400" />,
      accentColor: 'from-indigo-500/20 to-purple-500/20',
      borderGlow: 'hover:border-indigo-500/80 hover:shadow-indigo-500/30',
      features: [
        'Bản quyền trọn gói 365 ngày trên Email cá nhân của bạn',
        '100GB lưu trữ đám mây Adobe Cloud và đồng bộ dữ liệu dự án',
        'Kho phông chữ độc quyền Adobe Fonts hơn 20.000 font chữ đẹp',
        'Cập nhật tự động phiên bản Premiere Pro mới nhất từ Adobe',
        'Bảo hành chính chủ cam kết 1 đổi 1 suốt 1 năm'
      ]
    },

    // 🎨 CANVA PRO
    {
      id: 'canva-pro-1m',
      category: 'video',
      brand: 'Canva',
      name: 'Canva Pro (1 tháng)',
      price: '49.000đ',
      originalPrice: '150.000đ',
      period: '1 tháng',
      icon: <Wand2 className="w-6 h-6 text-rose-400" />,
      accentColor: 'from-rose-500/20 to-pink-500/20',
      borderGlow: 'hover:border-rose-500/60 hover:shadow-rose-500/20',
      features: [
        'Nâng cấp trực tiếp trên email Canva cá nhân của bạn',
        'Hơn 100+ triệu hình ảnh, video, đồ họa và âm thanh bản quyền',
        'Xóa phông nền ảnh & video 1 chạm siêu chuẩn xác với Magic Eraser',
        'Đổi cỡ ma thuật Magic Switch tức thì cho mọi mạng xã hội',
        'Giữ nguyên toàn bộ thiết kế và thư viện cũ trong tài khoản'
      ]
    },
    {
      id: 'canva-pro-1y',
      category: 'video',
      brand: 'Canva',
      name: 'Canva Pro (1 năm)',
      price: '299.000đ',
      originalPrice: '1.299.000đ',
      period: '1 năm (12 tháng)',
      popular: true,
      badge: 'THIẾT KẾ KHÔNG GIỚI HẠN 🎨',
      icon: <Wand2 className="w-6 h-6 text-pink-400" />,
      accentColor: 'from-pink-500/20 to-purple-500/20',
      borderGlow: 'hover:border-pink-500/60 hover:shadow-pink-500/20',
      features: [
        'Bản quyền 365 ngày nâng cấp trực tiếp trên tài khoản chính chủ',
        '1TB dung lượng lưu trữ đám mây Canva Cloud lưu trữ thoải mái',
        'Bộ nhận diện thương hiệu Brand Kit: Quản lý Logo, Màu, Font chữ',
        'Bộ công cụ trí tuệ nhân tạo Canva Magic Studio toàn năng',
        'Bảo hành uy tín 1 đổi 1 suốt 12 tháng sử dụng'
      ]
    },

    // 🎨 CANVA PRO (THIẾT KẾ ĐỒ HỌA)
    {
      id: 'canva-design-1m',
      category: 'design',
      brand: 'Canva Pro',
      name: 'Canva Pro (1 tháng)',
      price: '49.000đ',
      originalPrice: '150.000đ',
      period: '1 tháng',
      popular: true,
      badge: 'BÁN CHẠY NHẤT 🎨',
      icon: <Wand2 className="w-6 h-6 text-pink-400" />,
      accentColor: 'from-pink-500/20 to-rose-500/20',
      borderGlow: 'hover:border-pink-500/60 hover:shadow-pink-500/20',
      features: [
        'Nâng cấp trực tiếp trên Email cá nhân của bạn',
        'Truy cập hơn 100+ triệu hình ảnh, video, đồ họa và âm thanh Pro',
        'Công cụ xóa phông ảnh & video 1 chạm siêu chuẩn với Magic Eraser',
        'Đổi kích thước thiết kế ma thuật Magic Switch tức thì',
        'Tương thích hoàn hảo mọi thiết bị: PC, Mac, iPad, iPhone, Android'
      ]
    },
    {
      id: 'canva-design-3m',
      category: 'design',
      brand: 'Canva Pro',
      name: 'Canva Pro (3 tháng)',
      price: '129.000đ',
      originalPrice: '450.000đ',
      period: '3 tháng',
      badge: 'TIẾT KIỆM 20% ⚡',
      icon: <Wand2 className="w-6 h-6 text-rose-400" />,
      accentColor: 'from-rose-500/20 to-purple-500/20',
      borderGlow: 'hover:border-rose-500/60 hover:shadow-rose-500/20',
      features: [
        'Bản quyền 90 ngày thiết kế không giới hạn',
        'Đầy đủ bộ nhận diện thương hiệu Brand Kit (Logo, Palette, Font)',
        'Sử dụng toàn bộ kho hiệu ứng và font chữ VIP bản quyền',
        'Dung lượng lưu trữ đám mây 1TB lưu trữ mọi ấn phẩm truyền thông',
        'Bảo hành chính chủ 1 đổi 1 suốt 3 tháng'
      ]
    },
    {
      id: 'canva-design-1y',
      category: 'design',
      brand: 'Canva Pro',
      name: 'Canva Pro (1 năm)',
      price: '299.000đ',
      originalPrice: '1.299.000đ',
      period: '1 năm (12 tháng)',
      popular: true,
      hot: true,
      badge: 'GÓI TIẾT KIỆM 77% 🌟',
      icon: <Wand2 className="w-6 h-6 text-fuchsia-400" />,
      accentColor: 'from-fuchsia-500/20 to-pink-500/20',
      borderGlow: 'hover:border-fuchsia-500/70 hover:shadow-fuchsia-500/25',
      features: [
        'Bản quyền trọn gói 365 ngày trên tài khoản chính chủ',
        'Kho tài nguyên khổng lồ phục vụ Marketing, Banner, Social Media',
        'Bộ công cụ AI Magic Studio tạo nội dung & chuyển thể thông minh',
        'Tải file chất lượng cao PDF in ấn, SVG vector, PNG trong suốt',
        'Bảo hành cam kết 1 đổi 1 suốt 12 tháng sử dụng'
      ]
    },

    // 🖌️ ADOBE PHOTOSHOP
    {
      id: 'photoshop-1m',
      category: 'design',
      brand: 'Adobe Photoshop',
      name: 'Adobe Photoshop (1 tháng)',
      price: '199.000đ',
      originalPrice: '650.000đ',
      period: '1 tháng',
      popular: true,
      badge: 'ĐỒ HỌA SỐ 1 THẾ GIỚI 🖌️',
      icon: <Brush className="w-6 h-6 text-blue-400" />,
      accentColor: 'from-blue-500/20 to-cyan-500/20',
      borderGlow: 'hover:border-blue-500/60 hover:shadow-blue-500/20',
      features: [
        'Kích hoạt bản quyền chính hãng trên Email Adobe cá nhân',
        'Tính năng Generative Fill và Generative Expand với Adobe Firefly AI',
        'Cắt ghép, chỉnh màu, phục chế ảnh và thiết kế banner đỉnh cao',
        'Tải trực tiếp phiên bản mới nhất từ Adobe Creative Cloud',
        'Hỗ trợ cài đặt trên Windows và macOS (Apple Silicon M1/M2/M3/M4)'
      ]
    },
    {
      id: 'photoshop-1y',
      category: 'design',
      brand: 'Adobe Photoshop',
      name: 'Adobe Photoshop (1 năm)',
      price: '999.000đ',
      originalPrice: '6.500.000đ',
      period: '1 năm (12 tháng)',
      hot: true,
      badge: 'CHÍNH CHỦ ADOBE 👑',
      icon: <Brush className="w-6 h-6 text-sky-400" />,
      accentColor: 'from-sky-500/20 to-blue-500/20',
      borderGlow: 'hover:border-sky-500/80 hover:shadow-sky-500/30',
      features: [
        'Bản quyền trọn gói 365 ngày chính chủ bảo hành 1 đổi 1',
        '100GB dung lượng lưu trữ đám mây Adobe Cloud đồng bộ thiết kế',
        'Truy cập đầy đủ kho font chữ thương mại Adobe Fonts VIP',
        'Không lo bị khóa bản quyền, cập nhật mượt mà mọi bản vá',
        'Tặng kèm kho plugin và brush nghệ thuật chuyên dụng'
      ]
    },

    // ✏️ ADOBE ILLUSTRATOR
    {
      id: 'illustrator-1m',
      category: 'design',
      brand: 'Adobe Illustrator',
      name: 'Adobe Illustrator (1 tháng)',
      price: '199.000đ',
      originalPrice: '650.000đ',
      period: '1 tháng',
      icon: <PenTool className="w-6 h-6 text-amber-400" />,
      accentColor: 'from-amber-500/20 to-orange-500/20',
      borderGlow: 'hover:border-amber-500/60 hover:shadow-amber-500/20',
      features: [
        'Phần mềm đồ họa vector chuyên nghiệp hàng đầu cho Designer',
        'Thiết kế logo, biểu tượng, ấn phẩm in ấn, bao bì và minh họa',
        'Tính năng Text to Vector Graphic tạo vector tự động bằng AI',
        'Công cụ vẽ Pen Tool, Shape Builder, Gradients cực kỳ mạnh mẽ',
        'Đồng bộ dễ dàng với Photoshop, InDesign và After Effects'
      ]
    },
    {
      id: 'illustrator-1y',
      category: 'design',
      brand: 'Adobe Illustrator',
      name: 'Adobe Illustrator (1 năm)',
      price: '999.000đ',
      originalPrice: '6.500.000đ',
      period: '1 năm (12 tháng)',
      popular: true,
      badge: 'VECTOR CHUYÊN NGHIỆP ✏️',
      icon: <PenTool className="w-6 h-6 text-orange-400" />,
      accentColor: 'from-orange-500/20 to-amber-500/20',
      borderGlow: 'hover:border-orange-500/70 hover:shadow-orange-500/25',
      features: [
        'Bản quyền trọn gói 1 năm trên tài khoản Adobe chính chủ',
        '100GB lưu trữ đám mây Adobe Creative Cloud an toàn tuyệt đối',
        'Sử dụng không giới hạn kho Adobe Fonts bản quyền thương mại',
        'Cập nhật tự động phiên bản mới nhất từ Creative Cloud Desktop',
        'Bảo hành chính chủ 1 đổi 1 suốt 365 ngày'
      ]
    },

    // 🎬 ADOBE AFTER EFFECTS
    {
      id: 'aftereffects-1m',
      category: 'design',
      brand: 'Adobe After Effects',
      name: 'Adobe After Effects (1 tháng)',
      price: '199.000đ',
      originalPrice: '650.000đ',
      period: '1 tháng',
      icon: <Layers className="w-6 h-6 text-purple-400" />,
      accentColor: 'from-purple-500/20 to-indigo-500/20',
      borderGlow: 'hover:border-purple-500/60 hover:shadow-purple-500/20',
      features: [
        'Phần mềm tạo kỹ xảo điện ảnh và đồ họa chuyển động đỉnh cao',
        'Hàng ngàn hiệu ứng visual effects, 3D camera tracking và compositing',
        'Tính năng Roto Brush 3 ứng dụng AI tách chủ thể nhanh gấp 10 lần',
        'Tương thích hoàn hảo các plugin Red Giant, Trapcode, Element 3D',
        'Kích hoạt trực tiếp trên email Adobe của bạn'
      ]
    },
    {
      id: 'aftereffects-1y',
      category: 'design',
      brand: 'Adobe After Effects',
      name: 'Adobe After Effects (1 năm)',
      price: '999.000đ',
      originalPrice: '6.500.000đ',
      period: '1 năm (12 tháng)',
      hot: true,
      badge: 'KỸ XẢO & MOTION 🌟',
      icon: <Layers className="w-6 h-6 text-violet-400" />,
      accentColor: 'from-violet-500/20 to-purple-500/20',
      borderGlow: 'hover:border-violet-500/80 hover:shadow-violet-500/30',
      features: [
        'Bản quyền chính hãng 365 ngày cho Motion Designer & Video Editor',
        '100GB lưu trữ đám mây Adobe Cloud và đồng bộ asset làm việc',
        'Liên kết trực tiếp Dynamic Link với Premiere Pro không cần render',
        'Hỗ trợ render tăng tốc phần cứng GPU tối đa trên cả PC và Mac',
        'Bảo hành chính hãng 1 đổi 1 suốt 1 năm sử dụng'
      ]
    },

    // 📐 FIGMA
    {
      id: 'figma-pro',
      category: 'design',
      brand: 'Figma',
      name: 'Figma Professional',
      price: '99.000đ',
      originalPrice: '380.000đ',
      period: '1 tháng',
      popular: true,
      badge: 'UI/UX DESIGN SỐ 1 📐',
      icon: <Layout className="w-6 h-6 text-emerald-400" />,
      accentColor: 'from-emerald-500/20 to-teal-500/20',
      borderGlow: 'hover:border-emerald-500/60 hover:shadow-emerald-500/20',
      features: [
        'Không giới hạn số lượng tệp Figma và bảng vẽ dự án',
        'Lịch sử phiên bản tệp không giới hạn Version History',
        'Chia sẻ và quản lý thư viện Team Component Libraries chuyên nghiệp',
        'Chế độ xem quyền hạn và phân quyền thành viên dự án rõ ràng',
        'Sử dụng mượt mà tính năng thiết kế giao diện web & app đa nền tảng'
      ]
    },
    {
      id: 'figma-org',
      category: 'design',
      brand: 'Figma',
      name: 'Figma Organization',
      price: '199.000đ',
      originalPrice: '1.150.000đ',
      period: '1 tháng',
      badge: 'ENTERPRISE & DESIGN SYSTEM',
      icon: <Layout className="w-6 h-6 text-teal-400" />,
      accentColor: 'from-teal-500/20 to-cyan-500/20',
      borderGlow: 'hover:border-teal-500/60 hover:shadow-teal-500/20',
      features: [
        'Quản lý hệ thống Design System toàn tổ chức và doanh nghiệp',
        'Tính năng phân tích thiết kế Design System Analytics chi tiết',
        'Bảo mật dữ liệu nâng cao SSO, quản trị không gian làm việc tập trung',
        'Tính năng Dev Mode hoàn chỉnh hỗ trợ lập trình viên bóc tách code',
        'Bảo hành tài khoản 1 đổi 1 suốt 30 ngày'
      ]
    },

    // 🖼️ FREEPIK PREMIUM
    {
      id: 'freepik-1m',
      category: 'design',
      brand: 'Freepik',
      name: 'Freepik Premium (1 tháng)',
      price: '79.000đ',
      originalPrice: '290.000đ',
      period: '1 tháng',
      icon: <ImageIcon className="w-6 h-6 text-cyan-400" />,
      accentColor: 'from-cyan-500/20 to-blue-500/20',
      borderGlow: 'hover:border-cyan-500/60 hover:shadow-cyan-500/20',
      features: [
        'Tải không giới hạn hàng triệu Vector, PSD mockup, hình ảnh Stock VIP',
        'Tải nhanh tốc độ cao không bị giới hạn số lượt tải hàng ngày',
        'Bản quyền thương mại đầy đủ Commercial License cho dự án khách hàng',
        'Không chứa quảng cáo làm gián đoạn quá trình tìm kiếm ý tưởng',
        'Kèm quyền sử dụng công cụ AI Flaticon & Freepik Pikaso'
      ]
    },
    {
      id: 'freepik-1y',
      category: 'design',
      brand: 'Freepik',
      name: 'Freepik Premium (1 năm)',
      price: '399.000đ',
      originalPrice: '1.800.000đ',
      period: '1 năm (12 tháng)',
      popular: true,
      badge: 'TIẾT KIỆM 75% 🖼️',
      icon: <ImageIcon className="w-6 h-6 text-blue-400" />,
      accentColor: 'from-blue-500/20 to-indigo-500/20',
      borderGlow: 'hover:border-blue-500/60 hover:shadow-blue-500/20',
      features: [
        'Tài khoản Premium trọn gói 365 ngày tải tài nguyên thoải mái',
        'Hơn 150+ triệu tài sản đồ họa chất lượng cao phục vụ Designer',
        'Tải file mockup PSD đa lớp, vector AI/EPS sẵn sàng chỉnh sửa',
        'Thích hợp cho cá nhân làm Freelance, Agency và Studio thiết kế',
        'Bảo hành uy tín 1 đổi 1 suốt 12 tháng sử dụng'
      ]
    },

    // 📸 ENVATO ELEMENTS
    {
      id: 'envato-1m',
      category: 'design',
      brand: 'Envato Elements',
      name: 'Envato Elements (1 tháng)',
      price: '99.000đ',
      originalPrice: '390.000đ',
      period: '1 tháng',
      icon: <FolderDown className="w-6 h-6 text-emerald-400" />,
      accentColor: 'from-emerald-500/20 to-teal-500/20',
      borderGlow: 'hover:border-emerald-500/60 hover:shadow-emerald-500/20',
      features: [
        'Tải KHÔNG GIỚI HẠN mọi tài nguyên đồ họa trên Envato Elements',
        'Kho video mẫu Premiere, template After Effects, âm thanh bản quyền',
        'Template website WordPress, HTML, font chữ, đồ họa 3D',
        'Cấp phép sử dụng thương mại trọn đời cho các tác phẩm đã tải',
        'Hỗ trợ đăng nhập nhanh chóng và bảo hành đổi mới nếu phát sinh lỗi'
      ]
    },
    {
      id: 'envato-1y',
      category: 'design',
      brand: 'Envato Elements',
      name: 'Envato Elements (1 năm)',
      price: '499.000đ',
      originalPrice: '2.400.000đ',
      period: '1 năm (12 tháng)',
      hot: true,
      badge: 'KHO TÀI NGUYÊN VÔ TẬN 📸',
      icon: <FolderDown className="w-6 h-6 text-teal-400" />,
      accentColor: 'from-teal-500/20 to-emerald-500/20',
      borderGlow: 'hover:border-teal-500/70 hover:shadow-teal-500/25',
      features: [
        'Sử dụng trọn vẹn 365 ngày tải thỏa sức không lo hết hạn ngạch',
        'Hơn 60+ triệu mẫu đồ họa, stock footage, template video đỉnh cao',
        'Tối ưu chi phí cực đại cho các nhà làm phim, agency sáng tạo',
        'Cập nhật tài nguyên sáng tạo mới mỗi ngày từ các creator toàn cầu',
        'Bảo hành cam kết 1 đổi 1 suốt trọn vẹn 1 năm'
      ]
    },

    // 🔤 FONTS & DESIGN ASSETS
    {
      id: 'fonts-basic',
      category: 'design',
      brand: 'Design Assets',
      name: 'Fonts & Assets (Gói cơ bản)',
      price: '49.000đ',
      originalPrice: '190.000đ',
      period: 'Vĩnh viễn',
      icon: <Type className="w-6 h-6 text-amber-400" />,
      accentColor: 'from-amber-500/20 to-yellow-500/20',
      borderGlow: 'hover:border-amber-500/60 hover:shadow-amber-500/20',
      features: [
        'Bộ sưu tập 3.000+ Font chữ Việt Hóa đẹp cho đồ họa & quảng cáo',
        'Đầy đủ phong cách: Serif thanh lịch, Sans-serif hiện đại, Script viết tay',
        'Kho 500+ Texture, Overlay ánh sáng, bụi phim chất lượng cao',
        'Bộ mockup sản phẩm, áo thun, biển hiệu cơ bản',
        'Link tải Google Drive tốc độ cao, sở hữu vĩnh viễn không hết hạn'
      ]
    },
    {
      id: 'fonts-premium',
      category: 'design',
      brand: 'Design Assets',
      name: 'Fonts & Assets (Gói Premium)',
      price: '149.000đ',
      originalPrice: '690.000đ',
      period: 'Vĩnh viễn',
      popular: true,
      hot: true,
      badge: 'TRỌN BỘ 10.000+ FONT VIỆT HÓA 🔤',
      icon: <Type className="w-6 h-6 text-rose-400" />,
      accentColor: 'from-rose-500/20 to-amber-500/20',
      borderGlow: 'hover:border-rose-500/70 hover:shadow-rose-500/25',
      features: [
        'TRỌN BỘ 10.000+ Font chữ Việt Hóa độc quyền đã kiểm tra lỗi dấu',
        'Bộ sưu tập Mockup PSD siêu thực hơn 2.000 mẫu chuẩn Studio',
        'Kho Preset màu Lightroom, Photoshop và LUTs màu video điện ảnh',
        'Bộ Vector Icon, 3D Illustration & Pattern thương mại cao cấp',
        'Cập nhật thư mục Google Drive vĩnh viễn trọn đời, hỗ trợ cài đặt 1 kèm 1'
      ]
    }
  ];

  // Filtering products
  const filteredProducts = products.filter((p) => {
    const matchesCategory =
      selectedCategory === 'all' || p.category === selectedCategory;
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.features.some((f) => f.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  // Open checkout modal
  const handleBuyNow = (product: AIProduct) => {
    setSelectedProduct(product);
    setOrderId('AI-' + Math.floor(10000 + Math.random() * 90000));
    setOrderSubmitted(false);
    setOrderModalOpen(true);
  };

  // Submit order form
  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerEmail && !customerPhone) {
      alert('Vui lòng điền Email hoặc Số điện thoại / Zalo để nhận thông tin tài khoản!');
      return;
    }
    setOrderSubmitted(true);
  };

  // Copy text to clipboard helper
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  return (
    <div className="relative min-h-screen bg-[#07080c] text-slate-100 font-sans selection:bg-purple-600 selection:text-white overflow-x-hidden">
      {/* 1. CINEMATIC VIDEO MOTION BACKGROUND (High Vibrancy & Motion) */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#07080c]">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          style={{ opacity: videoOpacity }}
          className="w-full h-full object-cover transition-opacity duration-700 filter brightness-95 contrast-110"
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_171521_25968ba2-b594-4b32-aab7-f6b69398a6fa.mp4"
        />
        {/* Subtle cinematic gradient scrim so text stays super readable while motion video is vividly visible */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/30 to-[#07080c]/90 pointer-events-none" />
      </div>

      {/* 2. PARTICLE CANVAS AMBIENT EFFECT */}
      <ParticleBackground />

      {/* Background radial gradient glow spots */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[550px] bg-gradient-to-b from-indigo-600/15 via-purple-600/10 to-transparent blur-[120px] pointer-events-none z-0" />
      <div className="fixed bottom-0 right-0 w-[600px] h-[600px] bg-gradient-to-tl from-cyan-600/10 via-blue-600/5 to-transparent blur-[140px] pointer-events-none z-0" />

      {/* HEADER & NAVIGATION WITH MOTION */}
      <motion.header
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="sticky top-0 z-50 backdrop-blur-xl bg-[#07080c]/80 border-b border-white/[0.07]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-indigo-600 to-purple-600 p-[1px] shadow-lg shadow-indigo-500/25 group-hover:shadow-indigo-500/40 transition-shadow">
              <div className="w-full h-full bg-[#0d0f17] rounded-[11px] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-cyan-400 group-hover:rotate-12 transition-transform" />
              </div>
            </div>
            <div>
              <div className="text-xl font-bold tracking-tight flex items-center gap-1.5">
                <span className="text-white">Vesper</span>
                <span className="text-gradient font-black">AI Store</span>
              </div>
              <p className="text-[11px] text-slate-400 -mt-0.5">Tài Khoản AI Bản Quyền</p>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 bg-white/[0.03] border border-white/[0.08] p-1.5 rounded-full">
            <a
              href="#pricing"
              onClick={() => setSelectedCategory('all')}
              className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-white/[0.06] rounded-full transition-colors"
            >
              Bảng Giá AI
            </a>
            <a
              href="#pricing"
              onClick={() => setSelectedCategory('design')}
              className="px-4 py-2 text-sm font-medium text-pink-300 hover:text-white hover:bg-pink-500/10 rounded-full transition-colors flex items-center gap-1 border border-pink-500/20"
            >
              <Palette className="w-3.5 h-3.5 text-pink-400" />
              <span>Thiết Kế Đồ Họa</span>
            </a>
            <a
              href="#pricing"
              onClick={() => setSelectedCategory('video')}
              className="px-4 py-2 text-sm font-medium text-cyan-300 hover:text-white hover:bg-cyan-500/10 rounded-full transition-colors flex items-center gap-1 border border-cyan-500/20"
            >
              <Scissors className="w-3.5 h-3.5 text-cyan-400" />
              <span>Edit Video</span>
            </a>
            <a
              href="#why-us"
              className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-white/[0.06] rounded-full transition-colors"
            >
              Tại Sao Chọn Chúng Tôi
            </a>
            <a
              href="#how-it-works"
              className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-white/[0.06] rounded-full transition-colors"
            >
              Quy Trình 3 Bước
            </a>
            <a
              href="#reviews"
              className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-white/[0.06] rounded-full transition-colors"
            >
              Đánh Giá
            </a>
            <a
              href="#faq"
              className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-white/[0.06] rounded-full transition-colors"
            >
              Hỏi Đáp
            </a>
            <a
              href="#seller-contact"
              className="px-4 py-2 text-sm font-medium text-cyan-300 hover:text-white hover:bg-cyan-500/10 rounded-full transition-colors flex items-center gap-1.5 border border-cyan-500/20"
            >
              <UserCheck className="w-3.5 h-3.5 text-cyan-400" />
              <span>Người Bán &amp; Hỗ Trợ</span>
            </a>
          </nav>

          {/* Header Action Button */}
          <div className="hidden lg:flex items-center gap-3">
            <motion.a
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              href="https://zalo.me/0941144975"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-xs font-semibold px-4 py-2.5 rounded-full bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.1] text-slate-200 transition-colors"
            >
              <MessageCircle className="w-4 h-4 text-cyan-400" />
              <span>Zalo: 0941.144.975</span>
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              href="#pricing"
              className="flex items-center gap-2 text-xs font-bold px-5 py-2.5 rounded-full bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white shadow-lg shadow-indigo-600/30 hover:shadow-indigo-600/50 transition-all"
            >
              <Zap className="w-4 h-4 fill-white" />
              <span>Xem Bảng Giá</span>
            </motion.a>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-300 hover:text-white rounded-lg bg-white/[0.05]"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Dropdown with AnimatePresence */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="md:hidden px-4 pt-2 pb-6 border-b border-white/[0.08] bg-[#0c0e17] space-y-2 overflow-hidden"
            >
              <a
                href="#pricing"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 text-base font-medium text-slate-200 rounded-lg hover:bg-white/5"
              >
                Bảng Giá AI
              </a>
              <a
                href="#pricing"
                onClick={() => {
                  setSelectedCategory('design');
                  setMobileMenuOpen(false);
                }}
                className="block px-3 py-2 text-base font-medium text-pink-300 rounded-lg hover:bg-white/5 flex items-center gap-2"
              >
                <Palette className="w-4 h-4 text-pink-400" />
                <span>🎨 Thiết Kế Đồ Họa (Canva, Photoshop, Figma...)</span>
              </a>
              <a
                href="#pricing"
                onClick={() => {
                  setSelectedCategory('video');
                  setMobileMenuOpen(false);
                }}
                className="block px-3 py-2 text-base font-medium text-cyan-300 rounded-lg hover:bg-white/5 flex items-center gap-2"
              >
                <Scissors className="w-4 h-4 text-cyan-400" />
                <span>🎬 Edit Video (CapCut, Runway, Kling...)</span>
              </a>
              <a
                href="#why-us"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 text-base font-medium text-slate-200 rounded-lg hover:bg-white/5"
              >
                Tại Sao Chọn Chúng Tôi
              </a>
              <a
                href="#how-it-works"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 text-base font-medium text-slate-200 rounded-lg hover:bg-white/5"
              >
                Quy Trình 3 Bước
              </a>
              <a
                href="#reviews"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 text-base font-medium text-slate-200 rounded-lg hover:bg-white/5"
              >
                Đánh Giá Khách Hàng
              </a>
              <a
                href="#faq"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 text-base font-medium text-slate-200 rounded-lg hover:bg-white/5"
              >
                Câu Hỏi Thường Gặp
              </a>
              <a
                href="#seller-contact"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 text-base font-medium text-cyan-300 rounded-lg hover:bg-white/5 flex items-center gap-2"
              >
                <UserCheck className="w-4 h-4 text-cyan-400" />
                <span>Người Bán &amp; Hỗ Trợ</span>
              </a>
              <div className="pt-3 flex flex-col gap-2">
                <a
                  href="#pricing"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2.5 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold text-sm"
                >
                  Xem Bảng Giá Ngay
                </a>
                <a
                  href="https://zalo.me/0941144975"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full text-center py-2.5 rounded-lg bg-white/[0.08] hover:bg-white/[0.12] border border-white/[0.1] text-cyan-300 font-bold text-sm flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 text-cyan-400" />
                  <span>Chat Zalo: 0941.144.975</span>
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* CONTINUOUS MOVING MARQUEE TICKER (DYNAMIC MOTION) */}
      <div className="relative z-20 w-full overflow-hidden py-2.5 bg-white/[0.03] border-b border-white/[0.08] backdrop-blur-md">
        <motion.div
          animate={{ x: [0, -2200] }}
          transition={{ repeat: Infinity, duration: 38, ease: 'linear' }}
          className="flex items-center gap-8 whitespace-nowrap text-xs font-semibold text-slate-300"
        >
          <span className="flex items-center gap-1.5 text-cyan-400">
            <Bot className="w-3.5 h-3.5" /> ChatGPT Plus 99k
          </span>
          <span className="text-slate-600">•</span>
          <span className="flex items-center gap-1.5 text-pink-400 font-bold">
            <Wand2 className="w-3.5 h-3.5" /> Canva Pro 49k
          </span>
          <span className="text-slate-600">•</span>
          <span className="flex items-center gap-1.5 text-blue-400 font-bold">
            <Brush className="w-3.5 h-3.5" /> Adobe Photoshop 199k
          </span>
          <span className="text-slate-600">•</span>
          <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
            <Layout className="w-3.5 h-3.5" /> Figma Pro 99k
          </span>
          <span className="text-slate-600">•</span>
          <span className="flex items-center gap-1.5 text-orange-400 font-bold">
            <PenTool className="w-3.5 h-3.5" /> Illustrator 199k
          </span>
          <span className="text-slate-600">•</span>
          <span className="flex items-center gap-1.5 text-cyan-300 font-bold">
            <Scissors className="w-3.5 h-3.5" /> CapCut Pro 49k
          </span>
          <span className="text-slate-600">•</span>
          <span className="flex items-center gap-1.5 text-violet-400 font-bold">
            <Film className="w-3.5 h-3.5" /> Runway Gen-3 99k
          </span>
          <span className="text-slate-600">•</span>
          <span className="flex items-center gap-1.5 text-amber-400">
            <Brain className="w-3.5 h-3.5" /> Claude Pro 3.5 Sonnet
          </span>
          <span className="text-slate-600">•</span>
          <span className="flex items-center gap-1.5 text-sky-400 font-bold">
            <ImageIcon className="w-3.5 h-3.5" /> Freepik Premium 79k
          </span>
          <span className="text-slate-600">•</span>
          <span className="flex items-center gap-1.5 text-teal-400 font-bold">
            <FolderDown className="w-3.5 h-3.5" /> Envato Elements 99k
          </span>
          <span className="text-slate-600">•</span>
          <span className="flex items-center gap-1.5 text-rose-400 font-bold">
            <Flame className="w-3.5 h-3.5" /> Combo 4 AI Tiết kiệm 60%
          </span>
          <span className="text-slate-600">•</span>
          <span className="flex items-center gap-1.5 text-emerald-400">
            <Zap className="w-3.5 h-3.5" /> Kích hoạt tự động trong 30 giây
          </span>
          <span className="text-slate-600">•</span>
          <span className="flex items-center gap-1.5 text-teal-400">
            <ShieldCheck className="w-3.5 h-3.5" /> Bảo hành 1 đổi 1 trọn thời gian
          </span>
          <span className="text-slate-600">•</span>

          {/* Duplicate set for seamless infinite loop */}
          <span className="flex items-center gap-1.5 text-cyan-400">
            <Bot className="w-3.5 h-3.5" /> ChatGPT Plus 99k
          </span>
          <span className="text-slate-600">•</span>
          <span className="flex items-center gap-1.5 text-pink-400 font-bold">
            <Wand2 className="w-3.5 h-3.5" /> Canva Pro 49k
          </span>
          <span className="text-slate-600">•</span>
          <span className="flex items-center gap-1.5 text-blue-400 font-bold">
            <Brush className="w-3.5 h-3.5" /> Adobe Photoshop 199k
          </span>
          <span className="text-slate-600">•</span>
          <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
            <Layout className="w-3.5 h-3.5" /> Figma Pro 99k
          </span>
          <span className="text-slate-600">•</span>
          <span className="flex items-center gap-1.5 text-cyan-300 font-bold">
            <Scissors className="w-3.5 h-3.5" /> CapCut Pro 49k
          </span>
          <span className="text-slate-600">•</span>
          <span className="flex items-center gap-1.5 text-violet-400 font-bold">
            <Film className="w-3.5 h-3.5" /> Runway Gen-3 99k
          </span>
        </motion.div>
      </div>

      {/* HERO SECTION WITH MOTION */}
      <section className="relative z-20 pt-14 pb-20 md:pt-20 md:pb-28 text-center px-4 max-w-5xl mx-auto">
        {/* Promo Chip */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-purple-500/20 via-indigo-500/20 to-cyan-500/20 border border-purple-500/40 mb-8 backdrop-blur-md shadow-lg shadow-purple-500/10"
        >
          <Sparkles className="w-4 h-4 text-purple-400 animate-spin" style={{ animationDuration: '6s' }} />
          <span className="text-xs md:text-sm font-semibold text-purple-200">
            Ưu Đãi Đặc Biệt: Tặng Tài Khoản Canva Pro Vĩnh Viễn Khi Mua Combo AI
          </span>
        </motion.div>

        {/* Main H1 Headline with Entrance Motion & Instrument Serif */}
        <motion.h1
          initial={{ y: 25, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white mb-6 leading-[1.14]"
        >
          Nâng Cấp Tài Khoản <br className="hidden sm:inline" />
          <span className="font-instrument-serif text-5xl sm:text-7xl md:text-8xl italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-indigo-200 to-purple-200 mr-3">
            AI agents
          </span>
          <span className="text-gradient font-black">Bản Quyền</span>
        </motion.h1>

        {/* Exact Prompt Description */}
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="text-lg sm:text-2xl font-medium text-slate-300 max-w-3xl mx-auto mb-4 tracking-wide"
        >
          <span className="text-cyan-400 font-semibold">ChatGPT</span> •{' '}
          <span className="text-blue-400 font-semibold">Gemini</span> •{' '}
          <span className="text-amber-400 font-semibold">Claude</span> •{' '}
          <span className="text-sky-400 font-semibold">Perplexity</span> •{' '}
          <span className="text-pink-400 font-semibold">Midjourney</span> •{' '}
          <span className="text-purple-400 font-semibold">Grok</span> •{' '}
          <span className="text-cyan-300 font-semibold">CapCut Pro</span> •{' '}
          <span className="text-violet-400 font-semibold">Runway</span>{' '}
          và nhiều công cụ AI khác
        </motion.p>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Kích hoạt chính hãng siêu tốc trong 30 giây. Sử dụng ổn định, bảo mật 100%, bảo hành 1 đổi 1 trọn thời gian với mức giá tiết kiệm đến 80% so với mua trực tiếp từ hãng.
        </motion.p>

        {/* CTA Buttons with Motion */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <motion.a
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            href="#pricing"
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-bold text-base shadow-xl shadow-indigo-600/30 hover:shadow-indigo-600/50 transition-all flex items-center justify-center gap-2"
          >
            <ShoppingBag className="w-5 h-5" />
            <span>Khám Phá Bảng Giá AI</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            href="https://zalo.me/0941144975"
            target="_blank"
            rel="noreferrer"
            className="w-full sm:w-auto px-7 py-4 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.12] text-slate-200 font-semibold text-base transition-all flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-5 h-5 text-cyan-400" />
            <span>Tư Vấn Zalo: 0941.144.975</span>
          </motion.a>
        </motion.div>

        {/* Trust Badges Bar */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto p-4 rounded-2xl bg-white/[0.04] border border-white/[0.1] backdrop-blur-xl"
        >
          <div className="flex items-center gap-3 p-2 justify-center">
            <Zap className="w-5 h-5 text-amber-400 flex-shrink-0" />
            <div className="text-left">
              <div className="text-xs text-slate-400">Kích hoạt</div>
              <div className="text-sm font-bold text-white">Chỉ 30 Giây</div>
            </div>
          </div>
          <div className="flex items-center gap-3 p-2 justify-center">
            <ShieldCheck className="w-5 h-5 text-emerald-400 flex-shrink-0" />
            <div className="text-left">
              <div className="text-xs text-slate-400">Bảo hành</div>
              <div className="text-sm font-bold text-white">1 Đổi 1 Uy Tín</div>
            </div>
          </div>
          <div className="flex items-center gap-3 p-2 justify-center">
            <Users className="w-5 h-5 text-cyan-400 flex-shrink-0" />
            <div className="text-left">
              <div className="text-xs text-slate-400">Khách hàng</div>
              <div className="text-sm font-bold text-white">15,000+ Tin Dùng</div>
            </div>
          </div>
          <div className="flex items-center gap-3 p-2 justify-center">
            <Star className="w-5 h-5 text-yellow-400 fill-yellow-400 flex-shrink-0" />
            <div className="text-left">
              <div className="text-xs text-slate-400">Đánh giá</div>
              <div className="text-sm font-bold text-white">4.9 / 5.0 ⭐</div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* PRICING SECTION WITH MOTION */}
      <section id="pricing" className="relative z-20 py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            BẢNG GIÁ CHÍNH THỨC
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
            Bảng Giá Nâng Cấp <span className="text-gradient">Các Công Cụ AI</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            Lựa chọn gói tài khoản phù hợp với nhu cầu học tập, sáng tạo nội dung, lập trình và kinh doanh của bạn.
          </p>
        </motion.div>

        {/* Search Bar & Category Filter Tabs */}
        <div className="max-w-4xl mx-auto mb-10 space-y-4">
          {/* Search box */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm nhanh gói AI (ví dụ: ChatGPT Plus, Claude Pro, Midjourney, Grok, Combo...)"
              className="w-full h-12 pl-12 pr-4 bg-white/[0.04] border border-white/[0.1] rounded-2xl text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400/60 focus:bg-white/[0.07] transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Filter Tabs with Motion Layout */}
          <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {[
              { id: 'all', label: `Tất cả (${products.length})` },
              { id: 'design', label: '🎨 Thiết Kế Đồ Họa (17)' },
              { id: 'video', label: '🎬 Edit Video (16)' },
              { id: 'chatgpt', label: '🤖 ChatGPT' },
              { id: 'gemini', label: '✨ Gemini' },
              { id: 'claude', label: '🧠 Claude' },
              { id: 'perplexity', label: '🔎 Perplexity' },
              { id: 'midjourney', label: '🎨 Midjourney' },
              { id: 'grok', label: '🚀 Grok' },
              { id: 'combo', label: '🔥 Combo AI' }
            ].map((tab) => (
              <motion.button
                key={tab.id}
                type="button"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => setSelectedCategory(tab.id)}
                className={`relative px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors z-10 cursor-pointer ${
                  selectedCategory === tab.id
                    ? 'text-white'
                    : 'bg-white/[0.04] text-slate-300 hover:text-white hover:bg-white/[0.08] border border-white/[0.06]'
                }`}
              >
                {selectedCategory === tab.id && (
                  <motion.div
                    layoutId="activeCategoryPill"
                    transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 shadow-lg shadow-indigo-600/35 -z-10"
                  />
                )}
                <span className="relative z-10">{tab.label}</span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid with AnimatePresence & Stagger */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((prod) => (
              <motion.div
                key={prod.id}
                layout
                initial={{ opacity: 0, scale: 0.92, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92, y: 20 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -8, scale: 1.02 }}
                className={`relative rounded-3xl glass-panel p-6 sm:p-7 flex flex-col justify-between transition-shadow duration-300 ${
                  prod.popular
                    ? 'border-indigo-500/50 shadow-indigo-500/20 shadow-xl'
                    : 'border-white/[0.08]'
                } ${prod.borderGlow}`}
              >
                {/* Badges */}
                {prod.badge && (
                  <div className="absolute -top-3.5 right-6">
                    <span className="px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-gradient-to-r from-amber-400 to-orange-500 text-black shadow-md shadow-orange-500/20">
                      {prod.badge}
                    </span>
                  </div>
                )}

                {/* Card Top Header */}
                <div>
                  <div className="flex items-center gap-3.5 mb-4">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${prod.accentColor} border border-white/[0.1] flex items-center justify-center shadow-inner`}>
                      {prod.icon}
                    </div>
                    <div>
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                        {prod.brand}
                      </span>
                      <h3 className="text-xl font-bold text-white tracking-tight">
                        {prod.name}
                      </h3>
                    </div>
                  </div>

                  {/* Price Display */}
                  <div className="py-4 border-y border-white/[0.07] mb-5">
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                        {prod.price}
                      </span>
                      <span className="text-xs text-slate-400 font-medium">
                        / {prod.period}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-slate-500 line-through">
                        Giá gốc: {prod.originalPrice}
                      </span>
                      <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md">
                        Bảo hành 1 đổi 1
                      </span>
                    </div>
                  </div>

                  {/* Feature checklist */}
                  <div className="space-y-2.5 mb-6">
                    <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                      Quyền lợi bao gồm:
                    </div>
                    {prod.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                        <span className="leading-snug">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={() => handleBuyNow(prod)}
                  className={`w-full py-3.5 px-4 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg ${
                    prod.popular || prod.hot
                      ? 'bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white shadow-indigo-600/30'
                      : 'bg-white/[0.08] hover:bg-white/[0.16] border border-white/[0.12] text-white'
                  }`}
                >
                  <Zap className="w-4 h-4 fill-current" />
                  <span>MUA NGAY — {prod.price}</span>
                </motion.button>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty state if search finds nothing */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-16 bg-white/[0.02] rounded-3xl border border-white/[0.06]">
            <Search className="w-12 h-12 text-slate-500 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-white mb-1">Không tìm thấy gói AI phù hợp</h3>
            <p className="text-sm text-slate-400 mb-4">Vui lòng thử tìm kiếm với từ khóa khác hoặc liên hệ hotline để được hỗ trợ.</p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="px-5 py-2 rounded-xl bg-white/10 text-white text-xs font-semibold hover:bg-white/15"
            >
              Xem lại tất cả sản phẩm
            </button>
          </div>
        )}
      </section>

      {/* WHY CHOOSE US SECTION WITH MOTION */}
      <section id="why-us" className="relative z-20 py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/[0.07]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-semibold mb-4">
            <ShieldCheck className="w-3.5 h-3.5" />
            CAM KẾT UY TÍN
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
            Tại Sao Chọn <span className="text-gradient">Vesper AI Store?</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            Hơn 15.000 khách hàng là lập trình viên, designer, sinh viên và doanh nghiệp tin tưởng đồng hành.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              icon: <ShieldCheck className="w-7 h-7 text-emerald-400" />,
              title: 'Bảo Hành 1 Đổi 1 Trọn Thời Gian',
              desc: 'Bất kỳ trục trặc nào phát sinh trong quá trình sử dụng đều được đội ngũ hỗ trợ đổi mới tài khoản hoặc hoàn tiền ngay trong vòng 5 phút.'
            },
            {
              icon: <Zap className="w-7 h-7 text-amber-400" />,
              title: 'Kích Hoạt Tự Động Trong 30s',
              desc: 'Hệ thống xử lý đơn hàng tự động 24/7. Nhận tài khoản ngay qua Email và Zalo sau khi quét mã QR thanh toán mà không cần chờ đợi.'
            },
            {
              icon: <Lock className="w-7 h-7 text-cyan-400" />,
              title: 'Chính Chủ & Riêng Tư 100%',
              desc: 'Nâng cấp trực tiếp trên email cá nhân của bạn hoặc bàn giao tài khoản riêng độc lập. Lịch sử chat và dữ liệu cá nhân được bảo mật tuyệt đối.'
            },
            {
              icon: <Sparkles className="w-7 h-7 text-purple-400" />,
              title: 'Tiết Kiệm Lên Đến 80% Chi Phí',
              desc: 'Mức giá tối ưu cho thị trường Việt Nam. Trải nghiệm trọn bộ công nghệ AI hàng đầu thế giới với chi phí hợp lý nhất.'
            },
            {
              icon: <Headphones className="w-7 h-7 text-blue-400" />,
              title: 'Hỗ Trợ Kỹ Thuật Zalo 24/7',
              desc: 'Đội ngũ chuyên viên túc trực hỗ trợ cài đặt VPN, hướng dẫn viết prompt hiệu quả và giải đáp mọi thắc mắc của bạn bất cứ lúc nào.'
            },
            {
              icon: <Users className="w-7 h-7 text-rose-400" />,
              title: 'Cộng Đồng Hơn 15.000 Khách Hàng',
              desc: 'Được đánh giá 4.9/5 sao từ hàng nghìn khách hàng trên toàn quốc. Đầy đủ hóa đơn và chính sách bảo vệ người mua rõ ràng.'
            }
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="glass-panel p-7 rounded-3xl border border-white/[0.08] hover:border-purple-500/40 transition-shadow"
            >
              <div className="w-14 h-14 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center mb-5">
                {item.icon}
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS (3 STEPS) WITH MOTION */}
      <section id="how-it-works" className="relative z-20 py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/[0.07]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold mb-4">
            <Clock className="w-3.5 h-3.5" />
            ĐƠN GIẢN &amp; NHANH CHÓNG
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
            Quy Trình Mua Hàng <span className="text-gradient">3 Bước Dễ Dàng</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            Sở hữu tài khoản AI cao cấp chưa bao giờ dễ dàng và an tâm đến thế.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {[
            {
              step: '01',
              title: 'Chọn Gói AI Phù Hợp',
              desc: 'Lựa chọn công cụ AI đơn lẻ hoặc các gói Combo AI tiết kiệm tùy theo nhu cầu học tập và làm việc của bạn.',
              icon: <ShoppingBag className="w-6 h-6 text-cyan-400" />
            },
            {
              step: '02',
              title: 'Quét Mã Thanh Toán VietQR',
              desc: 'Quét mã VietQR trên ứng dụng ngân hàng hoặc ví MoMo. Hệ thống tự động nhận diện thanh toán chính xác 100%.',
              icon: <QrCode className="w-6 h-6 text-indigo-400" />
            },
            {
              step: '03',
              title: 'Nhận Tài Khoản & Sử Dụng',
              desc: 'Thông tin tài khoản và hướng dẫn chi tiết được gửi tức thì qua Email và Zalo trong vòng 30 giây để bạn bắt đầu dùng ngay.',
              icon: <CheckCheck className="w-6 h-6 text-emerald-400" />
            }
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              whileHover={{ y: -6 }}
              className="glass-panel p-8 rounded-3xl border border-white/[0.08] relative group hover:border-cyan-500/40 transition-all"
            >
              <div className="text-5xl font-black text-white/[0.08] absolute top-6 right-6 select-none group-hover:text-cyan-500/20 transition-colors">
                {item.step}
              </div>
              <div className="w-12 h-12 rounded-2xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center mb-6">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS / CUSTOMER REVIEWS WITH MOTION */}
      <section id="reviews" className="relative z-20 py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/[0.07]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold mb-4">
            <Star className="w-3.5 h-3.5 fill-amber-300" />
            KHÁCH HÀNG NÓI GÌ
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
            Đánh Giá Từ <span className="text-gradient">Khách Hàng Thực Tế</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            Hơn 15.000 người dùng đã nâng cấp tài khoản và để lại phản hồi tích cực.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              name: 'Nguyễn Hoàng Nam',
              role: 'Senior Frontend Developer',
              tool: 'Claude Pro — 99k',
              comment: 'Mua Claude Pro ở shop dùng sướng thật sự, code Artifact trực quan ăn đứt ChatGPT bản cũ. Kích hoạt tài khoản siêu nhanh, quét mã xong 30s là có.'
            },
            {
              name: 'Trần Thảo My',
              role: 'Marketing Lead & Content Creator',
              tool: 'Combo 4 AI — 299k',
              comment: 'Gói Combo 4 AI quá hời! Vừa có ChatGPT Plus viết bài, vừa có Midjourney vẽ minh họa. Đợt trước bị lỗi 1 lần được admin đổi mới sau đúng 2 phút.'
            },
            {
              name: 'Lê Minh Quân',
              role: 'Sinh viên ĐH Bách Khoa',
              tool: 'ChatGPT Plus — 99k',
              comment: 'Giá 99k cho sinh viên quá hợp lý. GPT-4o giải toán, đọc tài liệu PDF và viết báo cáo mượt mà. Đã gia hạn tháng thứ 3 liên tiếp ở shop!'
            },
            {
              name: 'Đỗ Gia Huy',
              role: 'Freelance UI/UX Designer',
              tool: 'Midjourney Standard — 149k',
              comment: 'Midjourney Standard tạo ảnh Relax GPU không giới hạn, sáng tạo ý tưởng cho khách hàng thoải mái. Giao diện website thanh toán rất tiện và chuyên nghiệp.'
            },
            {
              name: 'Phạm Bích Ngọc',
              role: 'Chuyên viên Nghiên cứu & Dữ liệu',
              tool: 'Perplexity Pro 1 năm — 399k',
              comment: 'Gói Perplexity 1 năm 399k quá rẻ so với giá gốc $200 của hãng. Dùng tra cứu nguồn học thuật và trích dẫn bài báo rất chuẩn xác.'
            },
            {
              name: 'Vũ Đức Thắng',
              role: 'Founder E-Commerce Store',
              tool: 'Combo VIP — 499k',
              comment: 'Mua Combo VIP cho cả team dùng. Có đủ hết từ ChatGPT, Claude, Midjourney tới Grok. Hỗ trợ viên bên Zalo nhiệt tình, hướng dẫn cực kỳ chu đáo.'
            }
          ].map((rev, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -6 }}
              className="glass-panel p-6 sm:p-7 rounded-3xl border border-white/[0.08] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1 text-amber-400 mb-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6 italic">
                  "{rev.comment}"
                </p>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-white/[0.06]">
                <div>
                  <div className="font-bold text-white text-sm">{rev.name}</div>
                  <div className="text-xs text-slate-400">{rev.role}</div>
                </div>
                <span className="text-[11px] font-semibold text-cyan-300 bg-cyan-500/10 px-2.5 py-1 rounded-full border border-cyan-500/20">
                  {rev.tool}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQ SECTION WITH MOTION */}
      <section id="faq" className="relative z-20 py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto border-t border-white/[0.07]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold mb-4">
            <HelpCircle className="w-3.5 h-3.5" />
            HỎI ĐÁP PHỔ BIẾN
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
            Câu Hỏi <span className="text-gradient">Thường Gặp (FAQ)</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            Giải đáp mọi băn khoăn của bạn về chất lượng tài khoản và chính sách bảo hành.
          </p>
        </motion.div>

        <div className="space-y-4">
          {[
            {
              q: 'Tài khoản mua tại Vesper AI Store là tài khoản dùng chung hay dùng riêng?',
              a: 'Tùy theo nhu cầu của bạn! Shop cung cấp cả tùy chọn nâng cấp trực tiếp trên Email chính chủ cá nhân của bạn, hoặc bàn giao tài khoản riêng độc lập. Bạn có toàn quyền quản lý mật khẩu, không bị ai khác can thiệp vào lịch sử trò chuyện.'
            },
            {
              q: 'Chính sách bảo hành 1 đổi 1 hoạt động như thế nào nếu tài khoản gặp lỗi?',
              a: 'Chúng tôi cam kết bảo hành 1 ĐỔI 1 TRỌN THỜI GIAN sử dụng. Nếu tài khoản gặp sự cố đăng nhập hoặc quá hạn, đội ngũ hỗ trợ sẽ đổi tài khoản mới hoặc khắc phục ngay trong vòng 5 phút qua Zalo 0941.144.975 / Telegram. Nếu không xử lý được, shop hoàn tiền 100% theo số ngày chưa dùng.'
            },
            {
              q: 'Tôi có thể nâng cấp trực tiếp trên email cá nhân của mình không?',
              a: 'Hoàn toàn được! Đối với các gói như ChatGPT Plus, Gemini Pro, Claude Pro, Perplexity Pro... bạn có thể gửi email để shop nâng cấp trực tiếp, giữ nguyên vẹn toàn bộ dữ liệu chat và lịch sử nghiên cứu từ trước.'
            },
            {
              q: 'Sau khi thanh toán xong thì bao lâu tôi nhận được tài khoản?',
              a: 'Hệ thống website xử lý đơn hàng tự động 24/7. Ngay sau khi bạn quét mã VietQR hoặc chuyển khoản thành công, thông tin tài khoản và hướng dẫn sử dụng chi tiết sẽ được gửi tức thì qua Email và Zalo trong vòng 30 giây.'
            },
            {
              q: 'Shop hỗ trợ những hình thức thanh toán nào?',
              a: 'Shop hỗ trợ thanh toán qua chuyển khoản ngân hàng quét mã VietQR tự động (tất cả các ngân hàng Việt Nam: Vietcombank, Techcombank, MB Bank, VPBank, ACB...), ví điện tử MoMo, ZaloPay, ViettelPay và thẻ ATM nội địa.'
            }
          ].map((faq, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="glass-panel rounded-2xl border border-white/[0.08] overflow-hidden transition-all"
            >
              <button
                type="button"
                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-white hover:text-cyan-300 transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-5 h-5 text-slate-400 flex-shrink-0 transition-transform duration-300 ${
                    activeFaq === idx ? 'rotate-180 text-cyan-400' : ''
                  }`}
                />
              </button>
              <AnimatePresence>
                {activeFaq === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-white/[0.05] pt-4">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </section>

      {/* KHUNG ẢNH NGƯỜI BÁN & TÁC GIẢ LIÊN HỆ GIẢI QUYẾT */}
      <section id="seller-contact" className="relative z-20 py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto border-t border-white/[0.08]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold mb-4">
            <UserCheck className="w-3.5 h-3.5" />
            CHỦ SHOP &amp; TÁC GIẢ CHÍNH CHỦ
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
            Thông Tin Người Bán &amp; <span className="text-gradient">Liên Hệ Giải Quyết</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            Mọi vấn đề về tài khoản, cần hỗ trợ kỹ thuật hoặc bảo hành đổi mới sẽ do chính tác giả trực tiếp xử lý nhanh trong 1 – 3 phút.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* CỘT TRÁI: KHUNG CHỨNG NHẬN TÁC GIẢ & TRUNG TÂM GIẢI QUYẾT (KHÔNG DÙNG ẢNH CÁ NHÂN) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 relative group"
          >
            {/* Glowing gradient back-aura */}
            <div className="absolute -inset-1.5 bg-gradient-to-tr from-cyan-500/30 via-indigo-500/25 to-purple-500/35 rounded-3xl blur-2xl opacity-75 group-hover:opacity-100 transition-opacity pointer-events-none" />

            <div className="relative glass-panel rounded-3xl p-6 sm:p-7 border border-white/[0.12] overflow-hidden shadow-2xl bg-[#0b0e18]/90">
              {/* Top Status Bar */}
              <div className="flex items-center justify-between gap-2 mb-6 pb-4 border-b border-white/[0.08]">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
                  </span>
                  <span className="text-xs font-bold text-emerald-400 tracking-wide uppercase">
                    Đang Trực Tuyến 24/7
                  </span>
                </div>
                <span className="px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                  Tác Giả Chính Hãng
                </span>
              </div>

              {/* Holographic Security & Creator Verification Emblem (Anti-Slop / Professional Tech Seal) */}
              <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-gradient-to-b from-[#13182b] via-[#0d111d] to-[#070913] border border-cyan-500/30 flex flex-col items-center justify-center p-6 text-center shadow-inner group-hover:border-cyan-400/60 transition-all">
                {/* Radial ambient glow behind shield */}
                <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/15 via-indigo-500/15 to-purple-500/10 pointer-events-none" />

                {/* Animated Rotating Orbit Ring */}
                <div className="relative w-28 h-28 mb-4 flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full border border-cyan-500/30 animate-spin" style={{ animationDuration: '14s' }} />
                  <div className="absolute inset-2 rounded-full border border-dashed border-indigo-400/40 animate-spin" style={{ animationDuration: '22s', animationDirection: 'reverse' }} />

                  {/* Center Cyber Shield Badge */}
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-cyan-500 via-indigo-600 to-purple-600 p-[1.5px] shadow-2xl shadow-cyan-500/30">
                    <div className="w-full h-full bg-[#0a0d17] rounded-[15px] flex items-center justify-center">
                      <ShieldCheck className="w-10 h-10 text-cyan-400 animate-pulse" />
                    </div>
                  </div>

                  <div className="absolute -bottom-1 -right-1 p-1.5 rounded-full bg-emerald-500 text-white shadow-lg">
                    <BadgeCheck className="w-4 h-4 fill-white text-emerald-600" />
                  </div>
                </div>

                <div className="relative z-10">
                  <h4 className="text-xl font-black text-white tracking-tight">
                    Trung Tâm Bảo Hành &amp; Khiếu Nại
                  </h4>
                  <p className="text-xs text-cyan-300 font-semibold mt-1">
                    Trực Tiếp Từ Tác Giả &amp; Quản Trị Viên Vesper.ai
                  </p>
                  <p className="text-[11px] text-slate-400 mt-2 max-w-xs mx-auto leading-relaxed">
                    Đảm bảo 100% quyền lợi khách hàng — Đổi mới tức thì hoặc hoàn tiền nếu không hài lòng.
                  </p>
                </div>
              </div>

              {/* Resolution Guarantee Badges */}
              <div className="mt-5 space-y-2.5 text-xs text-slate-300">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.04] border border-white/[0.08]">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 flex-shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-white text-xs">Xử lý thần tốc 1 – 3 phút</div>
                    <div className="text-[11px] text-slate-400">Không qua trung gian hay bot trả lời tự động</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.04] border border-white/[0.08]">
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400 flex-shrink-0">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-white text-xs">Cam kết bảo hành 1 đổi 1 trọn gói</div>
                    <div className="text-[11px] text-slate-400">Hoàn tiền 100% nếu có bất kỳ lỗi gián đoạn</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* CỘT PHẢI: THÔNG TIN LIÊN HỆ & CAM KẾT GIẢI QUYẾT */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-7 space-y-5"
          >
            {/* Header Card */}
            <div className="glass-panel p-6 sm:p-7 rounded-3xl border border-white/[0.1] space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
                    ĐƯỜNG DÂY NÓNG GIẢI QUYẾT KHIẾU NẠI &amp; BẢO HÀNH
                  </span>
                  <h3 className="text-2xl font-black text-white mt-1">
                    Liên Hệ Trực Tiếp Với Tác Giả
                  </h3>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center flex-shrink-0 text-cyan-400">
                  <PhoneCall className="w-6 h-6 animate-pulse" />
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Khi mua tài khoản AI tại Vesper AI Store, bạn được làm việc trực tiếp với người phát triển và quản trị viên hệ thống. Bất kỳ khiếu nại, sự cố kỹ thuật hoặc nhu cầu hoàn tiền đều được tiếp nhận và giải quyết ngay, không phải chờ đợi qua bot tự động.
              </p>

              {/* Contact info highlight box */}
              <div className="p-4 rounded-2xl bg-white/[0.04] border border-cyan-500/30 space-y-3">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <MessageCircle className="w-5 h-5 text-cyan-400" />
                    <span className="text-xs text-slate-300">Zalo giải quyết 24/7:</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-mono font-black text-cyan-300">0941.144.975</span>
                    <button
                      type="button"
                      onClick={() => handleCopy('0941144975')}
                      className="px-2.5 py-1 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 text-xs font-semibold transition-all flex items-center gap-1 cursor-pointer"
                    >
                      <Copy className="w-3 h-3" />
                      <span>Sao chép</span>
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between flex-wrap gap-2 pt-2 border-t border-white/[0.06]">
                  <div className="flex items-center gap-2">
                    <PhoneCall className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs text-slate-300">Hotline gọi điện:</span>
                  </div>
                  <a
                    href="tel:0941144975"
                    className="text-sm font-mono font-bold text-emerald-400 hover:underline"
                  >
                    0941.144.975 (Bấm để gọi)
                  </a>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <motion.a
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  href="https://zalo.me/0941144975"
                  target="_blank"
                  rel="noreferrer"
                  className="py-3.5 px-5 rounded-2xl bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-bold text-sm shadow-xl shadow-cyan-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer text-center"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Nhắn Zalo Giải Quyết Ngay</span>
                </motion.a>

                <motion.a
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  href="tel:0941144975"
                  className="py-3.5 px-5 rounded-2xl bg-white/[0.08] hover:bg-white/[0.14] border border-white/[0.12] text-white font-bold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer text-center"
                >
                  <PhoneCall className="w-4 h-4 text-emerald-400" />
                  <span>Gọi Điện: 0941.144.975</span>
                </motion.a>
              </div>
            </div>

            {/* 3 Resolution Commitments */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-4 rounded-2xl glass-panel border border-white/[0.08]">
                <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-2.5">
                  <Zap className="w-4 h-4" />
                </div>
                <div className="text-xs font-bold text-white mb-1">Xử lý trong 3 phút</div>
                <p className="text-[11px] text-slate-400 leading-snug">
                  Đổi mới tài khoản tức thì nếu có lỗi phát sinh.
                </p>
              </div>

              <div className="p-4 rounded-2xl glass-panel border border-white/[0.08]">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-2.5">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div className="text-xs font-bold text-white mb-1">Bảo hành 1 đổi 1</div>
                <p className="text-[11px] text-slate-400 leading-snug">
                  Trọn thời gian gói mua, an tâm tuyệt đối.
                </p>
              </div>

              <div className="p-4 rounded-2xl glass-panel border border-white/[0.08]">
                <div className="w-8 h-8 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-2.5">
                  <Headphones className="w-4 h-4" />
                </div>
                <div className="text-xs font-bold text-white mb-1">Hỗ trợ 1 kèm 1</div>
                <p className="text-[11px] text-slate-400 leading-snug">
                  Hướng dẫn đăng nhập, chia sẻ mẹo prompt hay.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-20 border-t border-white/[0.08] bg-[#050609] pt-16 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand Col */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 via-indigo-600 to-purple-600 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                Vesper <span className="text-gradient">AI Store</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Hệ thống cung cấp &amp; nâng cấp tài khoản trí tuệ nhân tạo (AI) bản quyền số 1 Việt Nam. Kích hoạt tự động, bảo hành uy tín 1 đổi 1.
            </p>
            <div className="text-xs text-emerald-400 font-semibold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Hệ thống trực tuyến 24/7</span>
            </div>
          </div>

          {/* AI Tools List Col */}
          <div>
            <h4 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">Các Công Cụ Đồ Họa &amp; AI</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><a href="#pricing" onClick={() => setSelectedCategory('design')} className="hover:text-pink-400 transition-colors text-pink-300 font-semibold">🎨 Canva Pro &amp; Photoshop</a></li>
              <li><a href="#pricing" onClick={() => setSelectedCategory('design')} className="hover:text-amber-400 transition-colors">✏️ Illustrator &amp; Figma Pro</a></li>
              <li><a href="#pricing" onClick={() => setSelectedCategory('design')} className="hover:text-sky-400 transition-colors">🖼️ Freepik &amp; Envato Elements</a></li>
              <li><a href="#pricing" onClick={() => setSelectedCategory('video')} className="hover:text-cyan-400 transition-colors">🎬 CapCut Pro &amp; Runway Gen-3</a></li>
              <li><a href="#pricing" onClick={() => setSelectedCategory('chatgpt')} className="hover:text-cyan-400 transition-colors">🤖 ChatGPT Plus &amp; Claude Pro</a></li>
              <li><a href="#pricing" onClick={() => setSelectedCategory('midjourney')} className="hover:text-pink-400 transition-colors">🎨 Midjourney v6 Standard</a></li>
              <li><a href="#pricing" onClick={() => setSelectedCategory('design')} className="hover:text-amber-400 transition-colors">🔤 Trọn bộ 10.000+ Font Việt Hóa</a></li>
            </ul>
          </div>

          {/* Policies Col */}
          <div>
            <h4 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">Chính Sách &amp; Hỗ Trợ</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><a href="#why-us" className="hover:text-cyan-400 transition-colors">Chính sách bảo hành 1 đổi 1</a></li>
              <li><a href="#how-it-works" className="hover:text-cyan-400 transition-colors">Quy trình kích hoạt trong 30s</a></li>
              <li><a href="#faq" className="hover:text-cyan-400 transition-colors">Cam kết bảo mật dữ liệu riêng tư</a></li>
              <li><a href="#faq" className="hover:text-cyan-400 transition-colors">Hướng dẫn thanh toán VietQR</a></li>
              <li><a href="#faq" className="hover:text-cyan-400 transition-colors">Chính sách hoàn tiền 100%</a></li>
            </ul>
          </div>

          {/* Contact Col */}
          <div>
            <h4 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">Thông Tin Liên Hệ</h4>
            <div className="space-y-3 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <PhoneCall className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                <span>Hotline / Zalo: <strong className="text-cyan-300 font-mono text-sm">0941.144.975</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <Send className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                <span>Telegram: <strong>@VesperAISupport</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>Thời gian: <strong>08:00 - 24:00 (Hàng ngày)</strong></span>
              </div>
              <div className="pt-2">
                <a
                  href="https://zalo.me/0941144975"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-300 font-bold border border-cyan-500/30 transition-all shadow-lg shadow-cyan-500/10"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Nhắn Zalo: 0941.144.975</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Vesper AI Store. Bản quyền thuộc về Vesper.ai. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span>ChatGPT • Gemini • Claude • Midjourney • Canva • Photoshop • Illustrator • Figma • CapCut</span>
          </div>
        </div>
      </footer>

      {/* FLOATING QUICK CONTACT BUTTON WITH BREATHING MOTION */}
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
        className="fixed bottom-20 right-5 z-40 flex flex-col items-end gap-3"
      >
        <motion.a
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          href="https://zalo.me/0941144975"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-xs shadow-xl shadow-cyan-500/30 hover:shadow-cyan-500/50 transition-all group"
          aria-label="Chat Zalo 0941144975"
        >
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-white" />
          </span>
          <MessageCircle className="w-4 h-4" />
          <span className="hidden sm:inline">Zalo: 0941.144.975</span>
        </motion.a>
      </motion.div>

      {/* CHECKOUT / ORDER MODAL WITH ANIMATEPRESENCE */}
      <AnimatePresence>
        {orderModalOpen && selectedProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl"
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 25 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 25 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              className="relative w-full max-w-lg rounded-3xl bg-[#0f111c] border border-white/[0.12] p-6 sm:p-8 shadow-2xl overflow-y-auto max-h-[92vh]"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setOrderModalOpen(false)}
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/[0.06] hover:bg-white/[0.15] text-slate-400 hover:text-white flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {!orderSubmitted ? (
                <>
                  {/* Modal Header */}
                  <div className="mb-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/25 text-indigo-300 text-xs font-semibold mb-2">
                      <Zap className="w-3.5 h-3.5" />
                      ĐẶT HÀNG &amp; KÍCH HOẠT TỨC THÌ
                    </div>
                    <h3 className="text-2xl font-black text-white">
                      Nâng Cấp {selectedProduct.name}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">
                      Bảo hành 1 đổi 1 trọn thời gian sử dụng — Kích hoạt tự động sau 30 giây.
                    </p>
                  </div>

                  {/* Product Summary Box */}
                  <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/[0.08] mb-6 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-xl bg-white/[0.05] border border-white/[0.1] flex items-center justify-center">
                        {selectedProduct.icon}
                      </div>
                      <div>
                        <div className="font-bold text-white text-sm">{selectedProduct.name}</div>
                        <div className="text-xs text-slate-400">Thời hạn: {selectedProduct.period}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-extrabold text-cyan-400">{selectedProduct.price}</div>
                      <div className="text-[11px] text-slate-500 line-through">{selectedProduct.originalPrice}</div>
                    </div>
                  </div>

                  {/* Checkout Form */}
                  <form onSubmit={handleSubmitOrder} className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Họ và tên của bạn
                      </label>
                      <input
                        type="text"
                        required
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder="Ví dụ: Nguyễn Văn Nam"
                        className="w-full h-11 px-4 bg-white/[0.04] border border-white/[0.1] rounded-xl text-white text-sm placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Email nhận tài khoản <span className="text-rose-400">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={customerEmail}
                        onChange={(e) => setCustomerEmail(e.target.value)}
                        placeholder="name@gmail.com"
                        className="w-full h-11 px-4 bg-white/[0.04] border border-white/[0.1] rounded-xl text-white text-sm placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Số điện thoại / Zalo hỗ trợ <span className="text-rose-400">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        placeholder="0988xxxxxx"
                        className="w-full h-11 px-4 bg-white/[0.04] border border-white/[0.1] rounded-xl text-white text-sm placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                      />
                    </div>

                    {selectedProduct.category === 'combo' && (
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                          Ghi chú công cụ muốn chọn trong Combo
                        </label>
                        <input
                          type="text"
                          value={customerNote}
                          onChange={(e) => setCustomerNote(e.target.value)}
                          placeholder="Ví dụ: Lấy ChatGPT Plus + Claude Pro"
                          className="w-full h-11 px-4 bg-white/[0.04] border border-white/[0.1] rounded-xl text-white text-sm placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                        />
                      </div>
                    )}

                    {/* Payment Method Preview */}
                    <div className="pt-2">
                      <div className="text-xs font-semibold text-slate-400 mb-2">Phương thức thanh toán tiện lợi:</div>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="p-3 rounded-xl bg-white/[0.05] border border-cyan-500/30 flex items-center gap-2 text-slate-200">
                          <QrCode className="w-4 h-4 text-cyan-400" />
                          <span>Chuyển khoản VietQR</span>
                        </div>
                        <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center gap-2 text-slate-300">
                          <CreditCard className="w-4 h-4 text-purple-400" />
                          <span>Ví MoMo / ZaloPay</span>
                        </div>
                      </div>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className="w-full mt-4 py-3.5 px-4 rounded-xl font-bold text-sm bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>TIẾP TỤC THANH TOÁN ({selectedProduct.price})</span>
                      <ArrowRight className="w-4 h-4" />
                    </motion.button>
                  </form>
                </>
              ) : (
                /* Payment & QR Screen */
                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-center py-2"
                >
                  <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto mb-4 text-emerald-400">
                    <Check className="w-7 h-7" />
                  </div>
                  <h3 className="text-2xl font-black text-white mb-1">
                    Đã Tạo Đơn Hàng Thành Công!
                  </h3>
                  <p className="text-xs text-slate-400 mb-6">
                    Mã đơn hàng: <strong className="text-cyan-400 font-mono text-sm">{orderId}</strong>
                  </p>

                  {/* QR Code Card */}
                  <div className="p-6 rounded-3xl bg-white/[0.05] border border-white/[0.1] max-w-sm mx-auto mb-6">
                    <div className="bg-white p-3.5 rounded-2xl inline-block mb-4 shadow-xl">
                      <div className="w-48 h-48 bg-slate-900 rounded-xl flex flex-col items-center justify-center p-3 text-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-tr from-indigo-900/40 to-cyan-900/40" />
                        <QrCode className="w-24 h-24 text-white relative z-10 mb-2" />
                        <div className="text-[10px] text-cyan-300 font-bold relative z-10">QUÉT MÃ VIETQR QUA APP NGÂN HÀNG</div>
                        <div className="text-[11px] text-white font-mono font-extrabold relative z-10">{selectedProduct.price}</div>
                      </div>
                    </div>

                    <div className="space-y-2 text-xs text-left bg-black/40 p-3.5 rounded-xl border border-white/[0.06]">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Ngân hàng:</span>
                        <span className="font-bold text-white">MB Bank (Quân Đội)</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-400">Số tài khoản:</span>
                        <button
                          type="button"
                          onClick={() => handleCopy('999988886666')}
                          className="font-mono font-bold text-cyan-300 flex items-center gap-1 hover:underline"
                        >
                          999988886666 <Copy className="w-3 h-3" />
                        </button>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Chủ tài khoản:</span>
                        <span className="font-bold text-white">VESPER AI STORE</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-400">Số tiền:</span>
                        <span className="font-bold text-emerald-400 text-sm">{selectedProduct.price}</span>
                      </div>
                      <div className="flex justify-between items-center pt-1 border-t border-white/[0.08]">
                        <span className="text-slate-400">Nội dung CK:</span>
                        <button
                          type="button"
                          onClick={() => handleCopy(orderId)}
                          className="font-mono font-bold text-amber-400 flex items-center gap-1 hover:underline"
                        >
                          {orderId} <Copy className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {copiedKey && (
                    <div className="text-xs text-emerald-400 font-medium mb-3">
                      ✓ Đã sao chép vào bộ nhớ tạm!
                    </div>
                  )}

                  <div className="space-y-3">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="button"
                      onClick={() => {
                        alert('Cảm ơn bạn! Đơn hàng ' + orderId + ' đang được hệ thống kích hoạt tự động. Vui lòng kiểm tra Email/Zalo sau 30 giây!');
                        setOrderModalOpen(false);
                      }}
                      className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold text-sm shadow-lg shadow-emerald-500/25 hover:from-emerald-400 hover:to-teal-500 transition-all cursor-pointer"
                    >
                      ✓ TÔI ĐÃ CHUYỂN KHOẢN THÀNH CÔNG
                    </motion.button>
                    <a
                      href="https://zalo.me/0941144975"
                      target="_blank"
                      rel="noreferrer"
                      className="block w-full py-3 rounded-xl bg-white/[0.08] hover:bg-white/[0.14] text-slate-200 text-xs font-semibold transition-colors flex items-center justify-center gap-2"
                    >
                      <MessageCircle className="w-4 h-4 text-cyan-400" />
                      <span>Cần hỗ trợ gấp? Nhắn Zalo: 0941.144.975</span>
                    </a>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FLOATING MOTION VIDEO CONTROLLER (Always accessible, proves motion is active & adjustable) */}
      <div className="fixed bottom-5 right-5 z-40 flex items-center gap-2">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="flex items-center gap-2 p-1.5 pr-3 rounded-full bg-black/80 backdrop-blur-xl border border-white/15 shadow-2xl shadow-purple-500/10 text-xs"
        >
          {/* Play/Pause Video Motion Button */}
          <button
            type="button"
            onClick={toggleVideoPlayback}
            title={isVideoPlaying ? 'Tạm dừng video chuyển động' : 'Tiếp tục phát video chuyển động'}
            className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white flex items-center justify-center transition-all shadow-md shadow-indigo-600/30 cursor-pointer"
          >
            {isVideoPlaying ? <Pause className="w-3.5 h-3.5 fill-white" /> : <Play className="w-3.5 h-3.5 fill-white ml-0.5" />}
          </button>

          {/* Indicator & Label */}
          <div className="flex items-center gap-2 mr-1">
            <span className="relative flex h-2 w-2">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isVideoPlaying ? 'bg-emerald-400' : 'bg-amber-400'}`} />
              <span className={`relative inline-flex rounded-full h-2 w-2 ${isVideoPlaying ? 'bg-emerald-500' : 'bg-amber-500'}`} />
            </span>
            <span className="font-semibold text-slate-200 hidden sm:inline">
              Motion Video: <span className="text-cyan-400">{Math.round(videoOpacity * 100)}%</span>
            </span>
          </div>

          {/* Opacity quick toggles */}
          <div className="flex items-center gap-1 bg-white/[0.06] p-0.5 rounded-full border border-white/[0.08]">
            {[
              { val: 1.0, label: '100%' },
              { val: 0.85, label: '85%' },
              { val: 0.5, label: '50%' }
            ].map((preset) => (
              <button
                key={preset.label}
                type="button"
                onClick={() => setVideoOpacity(preset.val)}
                className={`px-2 py-1 rounded-full text-[10px] font-bold transition-all cursor-pointer ${
                  videoOpacity === preset.val
                    ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {preset.label}
              </button>
            ))}
          </div>
        </motion.div>
      </div>

      {/* LIVE RECENT ACTIVITY TOAST (Real-time dynamic sliding motion) */}
      <AnimatePresence>
        {liveToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, x: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="fixed bottom-5 left-5 z-40 max-w-sm rounded-2xl bg-[#0e101a]/95 backdrop-blur-xl border border-white/[0.12] p-3.5 shadow-2xl shadow-indigo-950/50 flex items-center gap-3.5"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 flex items-center justify-center flex-shrink-0">
              <Zap className="w-5 h-5 text-cyan-400 animate-pulse" />
            </div>
            <div className="text-xs">
              <div className="font-bold text-white flex items-center gap-1.5">
                <span>{liveToast.name} ({liveToast.city})</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              </div>
              <p className="text-slate-300 font-medium">
                Vừa kích hoạt <span className="text-cyan-300 font-bold">{liveToast.item}</span>
              </p>
              <span className="text-[10px] text-slate-500 font-mono">{liveToast.time}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

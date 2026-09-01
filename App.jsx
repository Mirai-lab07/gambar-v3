import { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  Camera,
  Compass,
  Sliders,
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
  Music,
  Mail,
  Layers,
  MapPin,
  Cpu,
  Calendar,
  CheckCircle,
  Clock,
  ShieldCheck,
  Lock,
  User,
  Eye,
  Award,
  Slash,
  Minus,
  Plus,
  Printer,
  Image as ImageIcon,
  UploadCloud,
  FileImage,
  Crop,
  Sparkles,
  Package,
  Palette,
  Truck,
  Check,
  Info,
  Loader2,
} from "lucide-react";
import emailjs from "@emailjs/browser";

// Curated premium photographs including local Heritage captures
const PHOTOS = [
  {
    id: 1,
    title: "Green Wildlife",
    category: "street",
    url: "/image/IMG_0781.jpg",
    exif: {
      camera: "Iphone 12 pro max",
      lens: "Telephoto 65mm f/2.2",
      shutter: "1/580s",
      aperture: "f/2.2",
      iso: "20",
    },
    location: "DRC Kenaboi, Malaysia",
    year: "2026",
    aspect: "aspect-[3/4]",
  },
  {
    id: 2,
    title: "Skybound Phantom",
    category: "automotive",
    url: "/image/_DSC0196.jpg",
    exif: {
      camera: "Nikon D7000",
      lens: "Nikkor 55-300mm f/4.5-5.6G AF-S ED VR",
      shutter: "1/2500s",
      aperture: "f/5",
      iso: "320",
    },
    location: "<Merlimau>, Malaysia",
    year: "2025",
    aspect: "aspect-[16/10]",
  },
  {
    id: 3,
    title: "Brutalist Ascent",
    category: "cinematic",
    url: "/image/background/IMG_6931.jpg",
    exif: {
      camera: "Sony A7R V",
      lens: "FE 24-70mm f/2.8 GM II",
      shutter: "1/500s",
      aperture: "f/5.6",
      iso: "100",
    },
    location: "London, UK",
    year: "2025",
    aspect: "aspect-[3/4]",
  },
  {
    id: 4,
    title: "Lunar Monolith",
    category: "street",
    url: "/image/_DSC0534.JPG",
    exif: {
      camera: "NIKON D3100",
      lens: "Nikkor 70-300mm f/4.5-5.6G AF-S ED VR",
      shutter: "1/640s",
      aperture: "f/8",
      iso: "100",
    },
    location: "Ayer Keroh, Malaysia",
    year: "2026",
    aspect: "aspect-[4/5]",
  },
  {
    id: 5,
    title: "",
    category: "automotive",
    url: "/image/_DSC0133.jpg",
    exif: {
      camera: "NIKON D90",
      lens: "Nikkor 55-300mm f/4.5-5.6G AF-S ED VR",
      shutter: "1/250s",
      aperture: "f/7.1",
      iso: "640",
    },
    location: "Malaysia",
    year: "2026",
    aspect: "aspect-[16/9]",
  },
  {
    id: 6,
    title: "Flowing Silence",
    category: "cinematic",
    url: "/image/IMG_2885.JPG",
    exif: {
      camera: "Nikon D90",
      lens: "Nikkor 55-300mm f/4.5-5.6G AF-S ED VR",
      shutter: "1/3s",
      aperture: "f/22",
      iso: "100",
    },
    location: "Kuala Pilah , Malaysia",
    year: "2025",
    aspect: "aspect-[16/10]",
  },
  {
    id: 7,
    title: "Velodrome Motion",
    category: "street",
    url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200",
    exif: {
      camera: "Leica M11 Monochrom",
      lens: "Elmarit-M 28mm f/2.8",
      shutter: "1/1000s",
      aperture: "f/5.6",
      iso: "400",
    },
    location: "Berlin, Germany",
    year: "2026",
    aspect: "aspect-[4/3]",
  },
  {
    id: 8,
    title: "Aerodynamic Symphony",
    category: "automotive",
    url: "/image/IMG_2699.JPG",
    exif: {
      camera: "Nikon z5_2",
      lens: "NIKKOR Z 85mm f/1.8 S",
      shutter: "1/400s",
      aperture: "f/1.8",
      iso: "100",
    },
    location: "Eye on, Maleka",
    year: "2026",
    aspect: "aspect-[3/4]",
  },
  {
    id: 9,
    title: "Black&white Street",
    category: "street",
    url: "/image/IMG_1714.jpg",
    exif: {
      camera: "iPhone 12 Pro Max",
      lens: "Wide 26mm f/1.6",
      shutter: "1/3660s",
      aperture: "f/1.6",
      iso: "32",
    },
    location: "Negeri Sembilan, Malaysia",
    year: "2026",
    aspect: "aspect-[3/4]",
  },
  {
    id: 10,
    title: "Hypercar Silhouette",
    category: "automotive",
    url: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=1200",
    exif: {
      camera: "Sony A7R V",
      lens: "FE 90mm f/2.8 Macro",
      shutter: "1/320s",
      aperture: "f/2.8",
      iso: "200",
    },
    location: "Kuala Lumpur, Malaysia",
    year: "2026",
    aspect: "aspect-[16/10]",
  },
];

// Curated high-performance hardware inventory - custom layout configuration
const GEAR_ITEMS = [
  {
    id: "g1",
    name: "Nikon D90",
    type: "Primary Body",
    desc: "A legendary DX-format sensor classic, celebrated for its unique CCD-like color rendering profile and durable, tactile build structure.",
    spec: "12.3MP DX CMOS, Expeed processing engine, native skin tone rendering.",
    icon: Camera,
    size: "col-span-2 md:col-span-2 row-span-1",
  },
  {
    id: "g2",
    name: "AF-S NIKKOR 50mm f/1.8G",
    type: "Prime Glass",
    desc: "The timeless portrait standard. Highly regarded for its exceptional sharpness, natural background separation, and clean bokeh rendering.",
    spec: "Silent Wave Motor (SWM), 7-blade rounded aperture, f/1.8 maximum value.",
    icon: Layers,
    size: "col-span-1 md:col-span-1 row-span-1",
  },
  {
    id: "g3",
    name: "Nikon D3100",
    type: "Secondary Body",
    desc: "A lightweight, reliable backup camera perfect for fast street maneuvers and capturing authentic raw shadows on the move.",
    spec: "14.2MP DX CMOS Sensor, Expeed 2 color matrix, low visual footprint.",
    icon: Camera,
    size: "col-span-1 md:col-span-1 row-span-1",
  },
  {
    id: "g4",
    name: "NIKKOR 55-300mm f/4.5-5.6G ED VR",
    type: "Telephoto Lens",
    desc: "A high-reach telephoto lens with built-in stabilization. Excellent for compressed architectural perspectives and remote motion captures.",
    spec: "Vibration Reduction (VR II), Extra-low Dispersion (ED) glass architecture.",
    icon: Compass,
    size: "col-span-2 md:col-span-2 row-span-1",
  },
  {
    id: "g5",
    name: "Godox AD200 Pro",
    type: "Studio Lighting",
    desc: "A modular, battery-powered pocket flash setup capable of delivering studio-grade strobe control and dramatic light shaping in any outdoor location.",
    spec: "200Ws flash power, interchangeable heads, 1/8000s High Speed Sync.",
    icon: Sliders,
    size: "col-span-1 md:col-span-1 row-span-1",
  },
  {
    id: "g6",
    name: "Nikon D7000",
    type: "Third Body",
    desc: "Heavy-duty magnesium alloy backup chassis with weather-sealed architecture. Ideal for harsh conditions and multi-cam sets.",
    spec: "16.2MP DX Sensor, dual SD storage slots, 39-point AF autofocus array.",
    icon: Camera,
    size: "col-span-1 md:col-span-1 row-span-1",
  },
  {
    id: "g7",
    name: "Insta360 X4 Air",
    type: "Action Camera ",
    desc: "Spherical visual capture unit providing dynamic wide perspectives, high-stability tracking, and creative 360-degree framing possibilities.",
    spec: "8K 360 Video, FlowState Stabilization, deep horizontal leveling.",
    icon: Eye,
    size: "col-span-1 md:col-span-1 row-span-1",
  },
  {
    id: "g8",
    name: "HP Victus 15",
    type: "PortableEditing Workstation",
    desc: "The raw computational heart of the studio, built to process heavy batch RAW catalogs, grade cinema files, and export large scale print proofs.",
    spec: "Dedicated high-performance RTX GPU, color-accurate high-refresh panel.",
    icon: Cpu,
    size: "col-span-1 md:col-span-3 row-span-1",
  },
];

// Photo Printing Specifications & Pricing Catalog
const PHOTO_PRINT_SIZES = [
  {
    id: "4r",
    name: "4R Standard Print",
    dimensions: '4" × 6" (10 × 15 cm)',
    aspectRatio: "3:2",
    recommendedRes: "1200 × 1800 px (300 DPI)",
    basePrice: 2.0,
    desc: "Saiz album gambar standard & kenangan album pocket.",
    popularFor: "Album foto, hiasan dinding mini & kenangan",
    iconTag: "STANDARD",
    image: "/image/_DSC0196.jpg",
  },
  {
    id: "a4",
    name: "A4 Fine Art Exhibition",
    dimensions: '8.3" × 11.7" (21 × 29.7 cm)',
    aspectRatio: "1.41:1",
    recommendedRes: "2480 × 3508 px (300 DPI)",
    basePrice: 10.0,
    desc: "Cetakan galeri gred pameran dengan tona warna mendalam.",
    popularFor: "Portfolio artis, pameran galeri & bingkai besar",
    iconTag: "GALLERY CHOICE",
    image: "/image/background/_DSC0007.jpg",
  },
];

const PRINT_PAPER_TYPES = [
  {
    id: "Glossy",
    name: "Ultra Premium Glossy (260gsm)",
    extraCost: 0,
    desc: "Berkilat tinggi, warna vibran & kontras tajam.",
  },
  {
    id: "Matte",
    name: "Professional Silk / Matte (260gsm)",
    extraCost: 0,
    desc: "Kalis silau, tekstur sutera lembut & anti-cap jari.",
  },
  {
    id: "FineArt",
    name: "Archival Fine Art Cotton (310gsm)",
    extraCost: 3.0,
    desc: "Kertas kapas muzium, kalis luntur 100+ tahun (+RM 3.00/print).",
  },
];

const PRINT_FRAME_OPTIONS = [
  {
    id: "none",
    name: "Cetak Sahaja (Tanpa Bingkai)",
    extraCost: 0,
    desc: "Cetakan fizikal gred studio tanpa bingkai.",
  },
  {
    id: "black",
    name: "Bingkai Hitam Minimalis",
    extraCost: 15.0,
    desc: "Bingkai kayu hitam matte dengan cermin pelindung UV.",
  },
  {
    id: "oak",
    name: "Bingkai Jati / Oak Natural",
    extraCost: 20.0,
    desc: "Bingkai kayu jati asli bertekstur hangat gaya estetik.",
  },
  {
    id: "acrylic",
    name: "Acrylic Mount Borderless",
    extraCost: 30.0,
    desc: "Panel akrilik lutsinar berkilat tanpa bingkai tepi.",
  },
];

const calculatePrintingPricing = (sizeId, paperType, frameId, quantity) => {
  const sizeObj =
    PHOTO_PRINT_SIZES.find((s) => s.id === sizeId) || PHOTO_PRINT_SIZES[0];
  let basePrice = sizeObj.basePrice;
  let paperExtra = paperType === "FineArt" ? 3.0 : 0.0;

  let frameExtra = 0.0;
  if (frameId === "black")
    frameExtra = sizeId === "a3" || sizeId === "a4" ? 25.0 : 15.0;
  if (frameId === "oak")
    frameExtra = sizeId === "a3" || sizeId === "a4" ? 30.0 : 20.0;
  if (frameId === "acrylic")
    frameExtra = sizeId === "a3" || sizeId === "a4" ? 45.0 : 30.0;

  const unitPrice = basePrice + paperExtra + frameExtra;
  const rawSubtotal = unitPrice * Math.max(1, quantity);

  let discountPercent = 0;
  if (quantity >= 25) discountPercent = 20;
  else if (quantity >= 10) discountPercent = 10;

  const discountAmount = rawSubtotal * (discountPercent / 100);
  const finalSubtotal = rawSubtotal - discountAmount;

  return {
    sizeObj,
    unitPrice,
    basePrice,
    paperExtra,
    frameExtra,
    rawSubtotal,
    discountPercent,
    discountAmount,
    finalSubtotal,
    isDiscounted: discountPercent > 0,
  };
};

// Helper function for dynamic pricing calculations (e.g. tiered discounts)
const calculateRentalPricing = (rental, days, kit = "Standard Kit") => {
  if (!rental) return { dailyRate: 0, subtotal: 0, isDiscounted: false };

  let dailyRate = parseInt(rental.rate.replace(/[^0-9]/g, ""), 10);
  let isDiscounted = false;

  const isInsta360 =
    rental.id === "r3" || rental.name?.toLowerCase().includes("insta360");

  if (isInsta360) {
    if (kit === "Standard Kit") {
      dailyRate = 45; // Standard Kit (RM 45/day)
    } else if (kit === "Travel Kit") {
      dailyRate = 60; // Travel Kit (RM 60/day)
    } else if (kit === "Sport Kit") {
      dailyRate = 65; // Sport Kit (RM 65/day)
    }

    if (days > 3) {
      dailyRate = Math.max(35, dailyRate - 10);
      isDiscounted = true;
    }
  }

  const subtotal = dailyRate * days;
  return { dailyRate, subtotal, isDiscounted };
};

// Camera & Lens Rental inventory in MYR (RM)
const RENTAL_ITEMS = [
  {
    id: "r1",
    name: "Nikon D3100 Starter Kit",
    subtitle: "Classic DX Format Simplicity & Character",
    type: "Camera System",
    rate: "RM 30 / day",
    isAvailable: false, // Marked as not available as per user request
    desc: "Experience the highly balanced DX format sensor with standard kit optic. It serves as an excellent low-profile, highly tactile street setup for local explorations.",
    lensIncluded: "AF-S DX NIKKOR 18-55mm f/3.5-5.6G VR",
    specs: [
      "14.2 MP DX-format CMOS sensor",
      "Active D-Lighting contrast rendering",
      "Lightweight physical blueprint",
      "Includes 1x batteries & 32GB card",
    ],
    image:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "r2",
    name: "Nikon AF Zoom-Nikkor 70-300mm",
    subtitle: "f/4-5.6D ED Architecture & Reach",
    type: "Precision Optic",
    rate: "RM 60 / day",
    isAvailable: true,
    desc: "A highly acclaimed lightweight telephoto lens, prized for its mechanical aperture ring and authentic rendering. Perfect for high-compression urban designs.",
    lensIncluded: "Inherent mechanical focusing & aperture mechanics",
    specs: [
      "Focal range: 70-300mm FX-format compatible",
      "Extra-low Dispersion (ED) glass element",
      "Symmetric 9-blade configuration",
      "Excellent perspective perspective compression",
    ],
    image: "/image/background/_DSC0007.jpg",
  },
  {
    id: "r3",
    name: "Insta360 X4 Air Set",
    subtitle: "8K 360 Action Camera & Dynamic Rig",
    type: "360 Action Camera",
    rate: "Dari RM 45 / day",
    isAvailable: true,
    promoNote: "Standard: RM45 | Travel: RM60 | Sport: RM65",
    desc: "Complete spherical 8K video capture system with FlowState stabilization. Choose between Standard, Travel, and Sport kit packages.",
    lensIncluded: "Dual 360° lens array with optical guards",
    specs: [
      "Standard Kit (RM45): 1x Camera, 1x Bateri & Case",
      "Travel Kit (RM60): 2x Bateri, 80cm Invisible Stick & Case",
      "Sport Kit (RM65): Action Mount, 2x Bateri & Case",
      "Semua Pakej: Charger, 64GB SD, Lens Cloth, Pouch",
    ],
    image:
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&q=80&w=800",
  },
];

const MagneticButton = ({ children, className }) => {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    setPosition({ x: x * 0.35, y: y * 0.35 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 220, damping: 18, mass: 0.1 }}
      className={className}
    >
      {children}
    </motion.button>
  );
};

const CustomGlassCalendar = ({ startDate, endDate, onChange }) => {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1),
  );
  const [hoveredDate, setHoveredDate] = useState(null);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const getDaysInMonth = (y, m) => new Date(y, m + 1, 0).getDate();
  const getFirstDayIndex = (y, m) => new Date(y, m, 1).getDay();

  const totalDays = getDaysInMonth(year, month);
  const firstDayIndex = getFirstDayIndex(year, month);

  const handlePrevMonth = (e) => {
    e.preventDefault();
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = (e) => {
    e.preventDefault();
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const handleDayClick = (dayNum) => {
    const clickedDate = new Date(year, month, dayNum);
    const midnightToday = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
    );
    if (clickedDate < midnightToday) return;

    if (!startDate || (startDate && endDate)) {
      onChange(clickedDate, null);
    } else if (startDate && !endDate) {
      if (clickedDate < startDate) {
        onChange(clickedDate, null);
      } else {
        onChange(startDate, clickedDate);
      }
    }
  };

  const isSelectedStart = (dayNum) => {
    if (!startDate) return false;
    return (
      startDate.getFullYear() === year &&
      startDate.getMonth() === month &&
      startDate.getDate() === dayNum
    );
  };

  const isSelectedEnd = (dayNum) => {
    if (!endDate) return false;
    return (
      endDate.getFullYear() === year &&
      endDate.getMonth() === month &&
      endDate.getDate() === dayNum
    );
  };

  const isInRange = (dayNum) => {
    const checkDate = new Date(year, month, dayNum);
    if (startDate && endDate) {
      return checkDate >= startDate && checkDate <= endDate;
    }
    if (startDate && hoveredDate) {
      return checkDate >= startDate && checkDate <= hoveredDate;
    }
    return false;
  };

  const isPast = (dayNum) => {
    const checkDate = new Date(year, month, dayNum);
    const midnightToday = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
    );
    return checkDate < midnightToday;
  };

  const calendarCells = [];
  for (let i = 0; i < firstDayIndex; i++) {
    calendarCells.push(
      <div key={`empty-${i}`} className="h-8 w-8 sm:h-10 sm:w-10" />,
    );
  }

  for (let day = 1; day <= totalDays; day++) {
    const isStart = isSelectedStart(day);
    const isEnd = isSelectedEnd(day);
    const selectedRange = isInRange(day);
    const disabled = isPast(day);

    calendarCells.push(
      <button
        key={`day-${day}`}
        type="button"
        onMouseEnter={() =>
          !disabled && setHoveredDate(new Date(year, month, day))
        }
        onMouseLeave={() => setHoveredDate(null)}
        onClick={() => handleDayClick(day)}
        disabled={disabled}
        className={`h-8 w-8 sm:h-10 sm:w-10 flex items-center justify-center text-[11px] sm:text-xs font-mono rounded-full relative transition-all duration-200 ${
          disabled
            ? "text-zinc-700 cursor-not-allowed"
            : isStart || isEnd
              ? "bg-white text-black font-black shadow-lg shadow-white/10 z-10"
              : selectedRange
                ? "bg-white/15 text-white"
                : "text-zinc-300 hover:bg-white/10"
        }`}
      >
        {selectedRange && !isStart && !isEnd && (
          <div className="absolute inset-0 bg-white/5 pointer-events-none rounded-none" />
        )}
        <span className="relative z-10">{day}</span>
      </button>,
    );
  }

  return (
    <div className="bg-zinc-950/40 backdrop-blur-xl border border-white/5 p-3.5 sm:p-6 rounded-xl w-full max-w-sm mx-auto space-y-3 sm:space-y-4 shadow-2xl">
      <div className="flex justify-between items-center border-b border-white/5 pb-3">
        <button
          onClick={handlePrevMonth}
          className="p-1.5 hover:bg-white/5 border border-white/5 rounded-full text-zinc-400 hover:text-white transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <span className="text-xs uppercase font-mono tracking-widest text-zinc-200">
          {monthNames[month]} {year}
        </span>
        <button
          onClick={handleNextMonth}
          className="p-1.5 hover:bg-white/5 border border-white/5 rounded-full text-zinc-400 hover:text-white transition-colors"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center font-mono text-[9px] text-zinc-500 uppercase tracking-widest pb-1">
        <span>Su</span>
        <span>Mo</span>
        <span>Tu</span>
        <span>We</span>
        <span>Th</span>
        <span>Fr</span>
        <span>Sa</span>
      </div>

      <div className="grid grid-cols-7 gap-1 justify-items-center">
        {calendarCells}
      </div>

      <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500 border-t border-white/5 pt-3">
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-white" />
          <span>Selection</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 bg-white/15" />
          <span>In-Range</span>
        </div>
      </div>
    </div>
  );
};

const artisticThemes = [
  "PURE LIGHT CAPTURE",
  "BRUTALIST GEOMETRY",
  "STREET SUB-CULTURES",
  "TEMPORAL HONESTY",
];

export default function App() {
  const printFormRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("all");
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Dynamic Word-Swapping loop state for Hero
  const [activeThemeIndex, setActiveThemeIndex] = useState(0);

  // Authentication & Portal States
  const [isPortalOpen, setIsPortalOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [authForm, setAuthForm] = useState({
    email: "",
    password: "",
    code: "",
  });
  const [authError, setAuthError] = useState("");
  const [isSigningUp, setIsSigningUp] = useState(false);

  // Client Desk/Dashboard unreleased proof visual active state
  const [selectedProof, setSelectedProof] = useState(null);
  // Bookings setup with Start Date & End Date calculation
  const [selectedRental, setSelectedRental] = useState(null);
  const [rentalForm, setRentalForm] = useState({
    name: "",
    email: "",
    phone: "",
    startDate: null,
    endDate: null,
    selectedKit: "Standard Kit",
    submitMethod: "email",
    agreedToTerms: false,
  });
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [rentalSuccess, setRentalSuccess] = useState(false);
  const [bookingsList, setBookingsList] = useState([]);

  // Printing Service Modal & Form State
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);
  const [isPrintUploading, setIsPrintUploading] = useState(false);
  const [printForm, setPrintForm] = useState({
    sizeId: "4r",
    paperType: "Glossy",
    frameId: "none",
    borderStyle: "bleed",
    colorTone: "original",
    quantity: 5,
    pickupMethod: "pickup",
    submitMethod: "email",
    customNotes: "",
    name: "",
    email: "",
    phone: "",
    address: "",
    uploadedFile: null,
    uploadedPreviewUrl: null,
    uploadedImgDimensions: null,
    targetDate: null,
    agreedToTerms: false,
  });
  const [printOrderSuccess, setPrintOrderSuccess] = useState(false);

  const openPrintingModalWithSize = (sizeId) => {
    setPrintForm((prev) => ({
      ...prev,
      sizeId: sizeId || "4r",
    }));
    setIsPrintModalOpen(true);
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      const img = new Image();
      img.onload = () => {
        setPrintForm((prev) => ({
          ...prev,
          uploadedFile: file,
          uploadedPreviewUrl: previewUrl,
          uploadedImgDimensions: { width: img.width, height: img.height },
        }));
      };
      img.src = previewUrl;
    }
  };

  const handlePrintSubmit = async (e) => {
    e.preventDefault();
    if (
      !printForm.name ||
      !printForm.email ||
      !printForm.phone ||
      !printForm.agreedToTerms
    ) {
      return;
    }

    setIsPrintUploading(true);
    let fileUrl = "";

    if (printForm.uploadedFile) {
      try {
        const body = new FormData();
        body.append("file", printForm.uploadedFile);
        body.append("expire", "86400"); // 24 hours expiry

        const response = await fetch("https://tmpfiles.org/api/v1/upload", {
          method: "POST",
          body: body,
        });
        const result = await response.json();
        if (result.status === "success" && result.data && result.data.url) {
          // Convert preview page link to direct download link
          fileUrl = result.data.url.replace("tmpfiles.org/", "tmpfiles.org/dl/");
        }
      } catch (err) {
        console.error("Gagal memuat naik gambar:", err);
      }
    }

    setIsPrintUploading(false);

    const { sizeObj, finalSubtotal } = calculatePrintingPricing(
      printForm.sizeId,
      printForm.paperType,
      printForm.frameId,
      printForm.quantity,
    );

    const frameObj = PRINT_FRAME_OPTIONS.find(
      (f) => f.id === printForm.frameId,
    );
    const paperObj = PRINT_PAPER_TYPES.find(
      (p) => p.id === printForm.paperType,
    );

    const formattedDate = printForm.targetDate
      ? printForm.targetDate.toLocaleDateString("en-MY", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })
      : "Pickup/Delivery Scheduled";

    const newPrintBooking = {
      id: Math.random().toString(36).substring(7),
      equipmentName: `Photo Print - ${sizeObj.name}`,
      selectedKit: `${sizeObj.dimensions} (${paperObj?.name || printForm.paperType}) × ${printForm.quantity} pcs`,
      duration: `${printForm.quantity} pcs`,
      date: formattedDate,
      rate: `RM ${sizeObj.basePrice}/pc`,
      totalCost: `RM ${finalSubtotal.toFixed(2)}`,
      status: "Order Confirmed",
    };

    setBookingsList((prev) => [newPrintBooking, ...prev]);
    setPrintOrderSuccess(true);

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    const triggerMailtoFallback = () => {
      const emailSubject = `TEMPAHAN CETAKAN GAMBAR (PHOTO PRINTING ORDER) - ${printForm.name}`;
      const emailBody =
        `TEMPAHAN CETAKAN GAMBAR (PHOTO PRINTING ORDER)\n\n` +
        `Saiz Cetakan: ${sizeObj.name} (${sizeObj.dimensions})\n` +
        `Kemasan Kertas: ${paperObj?.name || printForm.paperType}\n` +
        `Bingkai/Mounting: ${frameObj?.name || "Cetak Sahaja"}\n` +
        `Gaya Margin: ${printForm.borderStyle === "bleed" ? "Full Bleed (Tanpa Border)" : "White Margin Border"}\n` +
        `Tona Warna: ${printForm.colorTone === "bw" ? "Hitam & Putih (B&W)" : printForm.colorTone === "vintage" ? "Vintage Warm" : "Warna Asal"}\n` +
        `Kuantiti: ${printForm.quantity} pcs\n` +
        (fileUrl ? `Pautan Fail Gambar (Download): ${fileUrl}\n` : "") +
        `Kaedah Terima: ${printForm.pickupMethod === "pickup" ? "Pickup Studio Melaka" : "Penghantaran Pos (Postage)"}\n` +
        (printForm.address ? `Alamat Pos: ${printForm.address}\n` : "") +
        (printForm.customNotes ? `Nota Tambahan: ${printForm.customNotes}\n` : "") +
        `\nMAKLUMAT PELANGGAN:\n` +
        `Nama: ${printForm.name}\n` +
        `Emel: ${printForm.email}\n` +
        `Telefon: ${printForm.phone}\n\n` +
        `JUMLAH KESELURUHAN: RM ${finalSubtotal.toFixed(2)}`;

      window.location.href = `mailto:kairuls.hakim@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
    };

    if (serviceId && templateId && publicKey) {
      const linkEl = document.getElementById("emailjs_download_link");
      if (linkEl) linkEl.value = fileUrl;

      emailjs
        .sendForm(serviceId, templateId, printFormRef.current, publicKey)
        .then((result) => {
          console.log("Email berjaya dihantar melalui EmailJS:", result.text);
        })
        .catch((error) => {
          console.error("Gagal menghantar melalui EmailJS, beralih ke mailto:", error);
          triggerMailtoFallback();
        });
    } else {
      console.warn("Kunci EmailJS tidak dijumpai dalam .env. Beralih ke mailto link.");
      triggerMailtoFallback();
    }
  };

  // Reset printing form after success modal timeout
  useEffect(() => {
    if (printOrderSuccess) {
      const timer = setTimeout(() => {
        setPrintOrderSuccess(false);
        setIsPrintModalOpen(false);
        setPrintForm({
          sizeId: "4r",
          paperType: "Glossy",
          frameId: "none",
          borderStyle: "bleed",
          colorTone: "original",
          quantity: 5,
          pickupMethod: "pickup",
          submitMethod: "email",
          customNotes: "",
          name: "",
          email: "",
          phone: "",
          address: "",
          uploadedFile: null,
          uploadedPreviewUrl: null,
          uploadedImgDimensions: null,
          targetDate: null,
          agreedToTerms: false,
        });
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [printOrderSuccess]);

  // Form Reset Logic after success
  useEffect(() => {
    if (rentalSuccess) {
      const timer = setTimeout(() => {
        setRentalSuccess(false);
        setSelectedRental(null);
        setRentalForm({
          name: "",
          email: "",
          phone: "",
          startDate: null,
          endDate: null,
          selectedKit: "Standard Kit",
          agreedToTerms: false,
        });
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [rentalSuccess]);

  // Mouse vector tracking
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [isHoveringClickable, setIsHoveringClickable] = useState(false);

  // Hook scroll events for header and parallax effects
  const { scrollY } = useScroll();

  // Scroll mapping equations to blur and fade the hero background image as user moves down
  const bgOpacity = useTransform(scrollY, [0, 600], [0.65, 0]);
  const bgScale = useTransform(scrollY, [0, 600], [1, 1.1]);
  const bgBlurVal = useTransform(scrollY, [0, 600], [0, 20]);
  const bgBlur = useTransform(bgBlurVal, (val) => `blur(${val}px)`);
  const bgY = useTransform(scrollY, [0, 600], [0, 100]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    const updateMouse = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", updateMouse);
    return () => window.removeEventListener("mousemove", updateMouse);
  }, []);

  // Preloader timeout simulation
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2800);
    return () => clearTimeout(timer);
  }, []);

  // Interval hook for looping artist word transitions
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveThemeIndex((prev) => (prev + 1) % artisticThemes.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Preset default dates when rental items are updated/selected (Default 1 day lease)
  useEffect(() => {
    if (selectedRental) {
      const today = new Date();

      const timer = setTimeout(() => {
        setRentalForm((prev) => ({
          ...prev,
          startDate: today,
          endDate: today,
          selectedKit: "Standard Kit",
          agreedToTerms: false,
        }));
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [selectedRental]);

  useEffect(() => {
    const handleMouseOver = (e) => {
      const target = e.target;
      if (
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("button") ||
        target.closest("a") ||
        target.classList.contains("interactive-item")
      ) {
        setIsHoveringClickable(true);
      } else {
        setIsHoveringClickable(false);
      }
    };
    window.addEventListener("mouseover", handleMouseOver);
    return () => window.removeEventListener("mouseover", handleMouseOver);
  }, []);

  const filteredPhotos =
    activeCategory === "all"
      ? PHOTOS
      : PHOTOS.filter((p) => p.category === activeCategory);

  const nextPhoto = (e) => {
    e.stopPropagation();
    setLightboxIndex((prev) => (prev + 1) % filteredPhotos.length);
  };

  const prevPhoto = (e) => {
    e.stopPropagation();
    setLightboxIndex(
      (prev) => (prev - 1 + filteredPhotos.length) % filteredPhotos.length,
    );
  };

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    setAuthError("");

    if (!authForm.email || !authForm.password) {
      setAuthError("Please fill in all core credentials.");
      return;
    }

    if (isSigningUp) {
      setUser({
        email: authForm.email,
        name: authForm.email.split("@")[0],
        tier: "Aesthetic Client",
        invited: true,
        uid: "UID_" + Math.random().toString(36).substr(2, 9),
      });
      setIsPortalOpen(false);
    } else {
      setUser({
        email: authForm.email,
        name: authForm.email.split("@")[0].toUpperCase(),
        tier: "Atelier Patron",
        invited: true,
        uid: "patron-client-session-991",
      });
      setIsPortalOpen(false);
    }
  };

  const handleLogOut = () => {
    setUser(null);
    setAuthForm({ email: "", password: "", code: "" });
  };

  const getDurationDays = (start, end) => {
    if (!start || !end) return 1;
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 1;
  };

  const handleRentalSubmit = (e) => {
    e.preventDefault();

    if (
      !rentalForm.startDate ||
      !rentalForm.endDate ||
      !rentalForm.name ||
      !rentalForm.email ||
      !rentalForm.phone ||
      !rentalForm.agreedToTerms
    ) {
      return;
    }

    setShowConfirmModal(true);
  };

  const executeRentalSubmission = () => {
    const days = getDurationDays(rentalForm.startDate, rentalForm.endDate);
    const { subtotal } = calculateRentalPricing(
      selectedRental,
      days,
      rentalForm.selectedKit,
    );
    const finalCost = subtotal;

    const formattedStart = rentalForm.startDate.toLocaleDateString("en-MY", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
    const formattedEnd = rentalForm.endDate.toLocaleDateString("en-MY", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

    const isInsta360 =
      selectedRental.id === "r3" ||
      selectedRental.name?.toLowerCase().includes("insta360");

    const newBooking = {
      id: Math.random().toString(36).substring(7),
      equipmentName: selectedRental.name,
      selectedKit: isInsta360 ? rentalForm.selectedKit || "Standard Kit" : null,
      duration: `${days} Days`,
      date: `${formattedStart} to ${formattedEnd}`,
      rate: selectedRental.rate,
      totalCost: `RM ${finalCost.toFixed(2)}`,
      status: "Processing Verification",
    };

    setBookingsList((prev) => [newBooking, ...prev]);
    setRentalSuccess(true);

    // Email Automation
    const emailSubject = `PERMOHONAN SEWAAN ALAT (LEASE REQUEST) - ${rentalForm.name}`;
    const emailBody =
      `PERMOHONAN SEWAAN PERALATAN (LEASE REQUEST)\n\n` +
      `Peralatan: ${selectedRental.name}\n` +
      (isInsta360 ? `Pakej Kit: ${rentalForm.selectedKit || "Standard Kit"}\n` : "") +
      `Tempoh: ${days} Hari (${formattedStart} hingga ${formattedEnd})\n` +
      `Jumlah Kos: RM ${finalCost.toFixed(2)}\n\n` +
      `MAKLUMAT PELANGGAN:\n` +
      `Nama: ${rentalForm.name}\n` +
      `Emel: ${rentalForm.email}\n` +
      `Telefon: ${rentalForm.phone}\n\n` +
      `Syarat Pickup: Sediakan Salinan IC (Depan & Belakang), Alamat Terkini & Media Sosial Aktif.`;

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    const triggerMailtoFallback = () => {
      window.location.href = `mailto:kairuls.hakim@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
    };

    if (serviceId && templateId && publicKey) {
      emailjs
        .send(
          serviceId,
          templateId,
          {
            to_name: "Mirul Studio Admin",
            from_name: rentalForm.name,
            client_email: rentalForm.email,
            client_phone: rentalForm.phone,
            equipment_name: selectedRental.name,
            selected_kit: isInsta360 ? rentalForm.selectedKit || "Standard Kit" : "-",
            duration: `${days} Hari (${formattedStart} hingga ${formattedEnd})`,
            total_price: `RM ${finalCost.toFixed(2)}`,
            notes: "Permohonan Sewaan Peralatan",
          },
          publicKey,
        )
        .then((result) => {
          console.log("Email sewaan berjaya dihantar melalui EmailJS:", result.text);
        })
        .catch((error) => {
          console.error("Gagal menghantar melalui EmailJS, beralih ke mailto:", error);
          triggerMailtoFallback();
        });
    } else {
      triggerMailtoFallback();
    }
  };

  const updateSelectedDates = (start, end) => {
    setRentalForm((prev) => ({
      ...prev,
      startDate: start,
      endDate: end,
    }));
  };

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-100 font-sans selection:bg-white selection:text-black antialiased relative overflow-x-hidden">
      {/* Premium Cursor Tracker */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-white/30 pointer-events-none z-[9999] hidden md:block"
        animate={{
          x: mousePos.x - 16,
          y: mousePos.y - 16,
          scale: isHoveringClickable ? 1.75 : 1,
          backgroundColor: isHoveringClickable
            ? "rgba(255, 255, 255, 0.1)"
            : "rgba(255,255,255,0)",
        }}
        transition={{ type: "spring", stiffness: 220, damping: 22, mass: 0.15 }}
      />
      <div
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-white rounded-full pointer-events-none z-[9999] hidden md:block"
        style={{
          left: `${mousePos.x}px`,
          top: `${mousePos.y}px`,
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Cinematic Loader Overlay */}
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{
              opacity: 0,
              transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] },
            }}
            className="fixed inset-0 bg-[#050505] z-[999] flex flex-col justify-between p-8 md:p-16"
          >
            <div className="flex justify-between items-center w-full">
              <span className="text-xs uppercase tracking-[0.25em] text-zinc-500 font-mono">
                MIRUL STUDIO
              </span>
              <span className="text-xs uppercase tracking-[0.25em] text-zinc-500 font-mono">
                ©2026 ARCHIVE
              </span>
            </div>

            <div className="flex flex-col justify-center items-start space-y-4 max-w-xl">
              <div className="overflow-hidden">
                <motion.h1
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                  className="font-serif text-3xl md:text-5xl italic font-light tracking-wide text-zinc-300"
                >
                  "Capturing shadow, light, and structured stillness."
                </motion.h1>
              </div>
              <div className="overflow-hidden">
                <motion.p
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{
                    duration: 1.2,
                    delay: 0.2,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="text-xs uppercase tracking-[0.3em] text-zinc-500 font-sans"
                >
                  VISUAL EXPERIENCES FOR THE CRAFTED EYE
                </motion.p>
              </div>
            </div>

            <div className="w-full flex items-center justify-between">
              <div className="w-24 h-[1px] bg-zinc-800 relative overflow-hidden">
                <motion.div
                  initial={{ left: "-100%" }}
                  animate={{ left: "100%" }}
                  transition={{
                    duration: 2.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute top-0 bottom-0 w-1/2 bg-white"
                />
              </div>
              <span className="text-xs font-mono text-zinc-500 tracking-[0.1em]">
                LOADING SYSTEM
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Glassmorphic Responsive Navbar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: showNavbar ? 0 : -100 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50 px-6 py-4 md:px-12 flex justify-between items-center pointer-events-none"
      >
        <a href="#hero" className="pointer-events-auto group flex flex-col">
          <span className="text-sm font-bold tracking-[0.3em] text-white">
            MIRUL STUDIO
          </span>
          <span className="text-[9px] font-mono tracking-[0.25em] text-zinc-500 transition-colors group-hover:text-white">
            VISUAL ARCHIVE
          </span>
        </a>

        <div className="pointer-events-auto bg-zinc-950/40 backdrop-blur-md border border-white/5 rounded-full px-6 py-2.5 flex items-center space-x-4 sm:space-x-8">
          <a
            href="#gallery"
            className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-zinc-400 hover:text-white transition-colors duration-300"
          >
            Archive
          </a>
          <a
            href="#gear"
            className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-zinc-400 hover:text-white transition-colors duration-300"
          >
            The Gear
          </a>
          <a
            href="#atelier"
            className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-zinc-400 hover:text-white transition-colors duration-300"
          >
            Rental
          </a>
          <a
            href="#printing"
            className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-zinc-400 hover:text-white transition-colors duration-300 flex items-center gap-1"
          >
            <Printer className="w-3 h-3 text-emerald-400" />
            <span>Photo Prints</span>
          </a>

          <button
            onClick={() => setIsPortalOpen(true)}
            className="px-3.5 py-1 bg-white/5 hover:bg-white text-zinc-300 hover:text-black rounded-full border border-white/10 text-[9px] sm:text-xs uppercase tracking-widest font-semibold transition-all duration-300 flex items-center gap-1.5"
          >
            <Lock className="w-2.5 h-2.5" />
            <span>{user ? user.name : "Client Portal"}</span>
          </button>
        </div>

        <div className="hidden lg:flex flex-col items-end text-right font-mono text-[10px] tracking-wider text-zinc-400">
          <span>MALACCA / GLOBAL</span>
          <span className="text-zinc-600">2° 16' N, 102° 16' E</span>
        </div>
      </motion.nav>

      {/* ========================================================
          CINEMATIC HERO ENTRANCE (SCROLL BLUR & TEXT LOOPING MARQUEE)
          ======================================================== */}
      <section
        id="hero"
        className="relative min-h-screen flex flex-col justify-center items-center px-6 md:px-16 pt-24 overflow-hidden bg-black"
      >
        {/* Parallax Background Image with Filter Mapping */}
        <motion.div
          style={{
            opacity: bgOpacity,
            scale: bgScale,
            filter: bgBlur,
            y: bgY,
          }}
          className="absolute inset-0 z-0 pointer-events-none"
        >
          {/* Architectural Concrete / Glass masterpiece perspective frame */}
          <img
            src="/image/background/IMG_6931.jpg"
            alt="Cinematic Architectural Blueprint"
            className="w-full h-full object-cover brightness-[0.50] contrast-[1.00]"
          />
        </motion.div>

        {/* Elegant ambient overlay layers to blend image seamlessly into the page backdrop */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60 z-0 pointer-events-none" />
        <div className="absolute inset-0 bg-radial-gradient z-0 opacity-40 pointer-events-none" />

        <div className="w-full max-w-7xl mx-auto flex flex-col justify-between h-full space-y-12 relative z-10">
          <div className="flex flex-col space-y-4 md:space-y-6 mt-12 md:mt-24">
            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 1,
                  delay: 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="text-xs font-mono uppercase tracking-[0.4em] text-zinc-400"
              >
                ESTABLISHED 2024
              </motion.h2>
            </div>

            <div className="space-y-4">
              <div className="overflow-hidden">
                <motion.h1
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{
                    duration: 1.2,
                    delay: 0.2,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="text-4xl md:text-8xl font-black tracking-tighter uppercase leading-none text-white drop-shadow-md"
                >
                  Visual Architecture
                </motion.h1>
              </div>

              {/* Looping Word Transition banner */}
              <div className="overflow-hidden flex items-center min-h-[40px] md:min-h-[75px]">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={activeThemeIndex}
                    initial={{ y: 25, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -25, opacity: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="text-2xl md:text-6xl font-serif font-light italic tracking-tight text-zinc-300"
                  >
                    &amp; {artisticThemes[activeThemeIndex]}
                  </motion.span>
                </AnimatePresence>
              </div>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="max-w-xl text-zinc-300 text-sm md:text-base tracking-wide font-light leading-relaxed pt-2 drop-shadow"
            >
              Documenting street subcultures, structural architecture, and
              cinematic movement. Crafted through premium medium-format and
              manual rangefinder optics to immortalize temporal honesty.
            </motion.p>
          </div>

          {/* Infinite Looping Text Marquee component */}
          <div className="w-full overflow-hidden border-t border-b border-white/5 py-4 my-4">
            <div className="flex whitespace-nowrap min-w-full">
              <motion.div
                animate={{ x: [0, -1000] }}
                transition={{
                  ease: "linear",
                  duration: 25,
                  repeat: Infinity,
                  repeatType: "loop",
                }}
                className="flex text-[10px] font-mono tracking-[0.3em] uppercase text-zinc-500 space-x-16 pr-16"
              >
                <span>MIRUL STUDIO DEPT</span>
                <span>•</span>
                <span>IMMORTALIZING SHADOWS &amp; GEOMETRY</span>
                <span>•</span>
                <span>MALACCA ARCHIVE EDITION</span>
                <span>•</span>
                <span>12.3MP DIGITAL CHASSIS</span>
                <span>•</span>
                <span>ANAMORPHIC MOTION RIGS</span>
                <span>•</span>
              </motion.div>
              <motion.div
                animate={{ x: [0, -1000] }}
                transition={{
                  ease: "linear",
                  duration: 25,
                  repeat: Infinity,
                  repeatType: "loop",
                }}
                className="flex text-[10px] font-mono tracking-[0.3em] uppercase text-zinc-500 space-x-16 pr-16"
              >
                <span>MIRUL STUDIO DEPT</span>
                <span>•</span>
                <span>IMMORTALIZING SHADOWS &amp; GEOMETRY</span>
                <span>•</span>
                <span>MALACCA ARCHIVE EDITION</span>
                <span>•</span>
                <span>60MP DIGITAL CHASSIS</span>
                <span>•</span>
                <span>ANAMORPHIC MOTION RIGS</span>
                <span>•</span>
              </motion.div>
            </div>
          </div>

          <div className="flex justify-between items-end w-full border-t border-zinc-900 pt-8 z-10 pb-12">
            <div className="flex space-x-12">
              <div>
                <p className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest">
                  FOCUS AREAS
                </p>
                <p className="text-xs text-zinc-300 tracking-wide mt-1">
                  Sport · Street · Monochrom Speedtrap
                </p>
              </div>
              <div className="hidden sm:block">
                <p className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest">
                  EXHIBITIONS
                </p>
                <p className="text-xs text-zinc-300 tracking-wide mt-1">
                  Malacca 33
                </p>
              </div>
            </div>

            <a href="#gallery">
              <MagneticButton className="group flex flex-col items-center justify-center p-3 relative interactive-item">
                <motion.div
                  className="w-12 h-12 rounded-full border border-zinc-800 flex items-center justify-center text-zinc-400 group-hover:border-white group-hover:text-white transition-colors duration-300"
                  whileHover={{ scale: 1.1 }}
                >
                  <ChevronRight className="w-5 h-5 transform rotate-90" />
                </motion.div>
                <span className="text-[9px] font-mono uppercase tracking-[0.2em] mt-2 text-zinc-500 group-hover:text-white transition-colors duration-300">
                  EXPLORE ARCHIVE
                </span>
              </MagneticButton>
            </a>
          </div>
        </div>
      </section>

      {/* ========================================================
          CLIENT AREA TIMELINE DESK / SECURE ACTIVE PORTAL VIEW
          ======================================================== */}
      <AnimatePresence>
        {user && (
          <motion.section
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="px-6 md:px-16 py-12 bg-gradient-to-b from-[#0e0e11] to-[#050505] border-t border-b border-zinc-800/50 relative z-10"
          >
            <div className="max-w-7xl mx-auto space-y-8">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-zinc-900 rounded-lg border border-zinc-800">
                    <Award className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold uppercase tracking-wider text-white">
                      Patron Access Active
                    </h3>
                    <p className="text-xs text-zinc-400 font-mono">
                      Welcome back, client {user.name} | Tier: {user.tier}
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleLogOut}
                  className="px-4 py-1.5 bg-red-950/40 hover:bg-red-900/60 border border-red-900/40 text-red-200 rounded-full text-xs uppercase tracking-widest font-mono transition-all"
                >
                  End Secure Session
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Bookings Timeline Panel */}
                <div className="bg-[#07070a] border border-zinc-900 p-6 rounded-xl space-y-4">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
                    Active Rental Leases
                  </span>
                  {bookingsList.length === 0 ? (
                    <div className="py-8 text-center border border-dashed border-zinc-900 rounded-lg">
                      <p className="text-xs text-zinc-500">
                        No active equipment reservations currently processed.
                      </p>
                      <a
                        href="#atelier"
                        className="text-[10px] text-emerald-400 hover:underline mt-2 inline-block"
                      >
                        Browse equipment atelier
                      </a>
                    </div>
                  ) : (
                    <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
                      {bookingsList.map((b) => (
                        <div
                          key={b.id}
                          className="bg-zinc-900/50 border border-zinc-800 p-3.5 rounded-lg flex justify-between items-center"
                        >
                          <div>
                            <p className="text-xs font-bold text-white">
                              {b.equipmentName}
                              {b.selectedKit && (
                                <span className="ml-2 text-[9px] font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-800/60 px-1.5 py-0.5 rounded">
                                  {b.selectedKit}
                                </span>
                              )}
                            </p>
                            <p className="text-[10px] text-zinc-400 font-mono">
                              {b.date}
                            </p>
                            <p className="text-[10px] text-zinc-500 font-mono">
                              {b.duration} · Total: {b.totalCost}
                            </p>
                          </div>
                          <span className="text-[9px] font-mono bg-emerald-950/50 text-emerald-400 border border-emerald-900 px-2 py-0.5 rounded-full">
                            {b.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Exclusive Unreleased Proof Viewing Area */}
                <div className="lg:col-span-2 bg-[#07070a] border border-zinc-900 p-6 rounded-xl space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
                      Private Showcase (Exclusive Proofs)
                    </span>
                    <span className="text-[9px] font-mono text-emerald-400">
                      UNRELEASED PLATES
                    </span>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div
                      onClick={() =>
                        setSelectedProof({
                          title: "Unreleased Shinjuku Mist",
                          url: "https://images.unsplash.com/photo-15420518418c7-d8689ba74620?auto=format&fit=crop&q=80&w=600",
                        })
                      }
                      className="group cursor-pointer overflow-hidden rounded-lg relative aspect-square border border-zinc-900"
                    >
                      <img
                        src="https://images.unsplash.com/photo-15420518418c7-d8689ba74620?auto=format&fit=crop&q=80&w=600"
                        className="object-cover h-full w-full grayscale group-hover:scale-105 transition-transform duration-500"
                        alt="Unreleased Mist"
                      />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-white">
                          Inspect Frame
                        </span>
                      </div>
                    </div>
                    <div
                      onClick={() =>
                        setSelectedProof({
                          title: "Atelier Shift Studies",
                          url: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&q=80&w=600",
                        })
                      }
                      className="group cursor-pointer overflow-hidden rounded-lg relative aspect-square border border-zinc-900"
                    >
                      <img
                        src="https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&q=80&w=600"
                        className="object-cover h-full w-full grayscale group-hover:scale-105 transition-transform duration-500"
                        alt="Atelier Studies"
                      />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-white">
                          Inspect Frame
                        </span>
                      </div>
                    </div>
                    <div
                      onClick={() =>
                        setSelectedProof({
                          title: "Alpine Monolith Phase III",
                          url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=600",
                        })
                      }
                      className="group cursor-pointer overflow-hidden rounded-lg relative aspect-square border border-zinc-900"
                    >
                      <img
                        src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=600"
                        className="object-cover h-full w-full grayscale group-hover:scale-105 transition-transform duration-500"
                        alt="Alpine Monolith"
                      />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-white">
                          Inspect Frame
                        </span>
                      </div>
                    </div>
                    <div
                      onClick={() =>
                        setSelectedProof({
                          title: "Low-Light Shibuya Rain",
                          url: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&q=80&w=600",
                        })
                      }
                      className="group cursor-pointer overflow-hidden rounded-lg relative aspect-square border border-zinc-900"
                    >
                      <img
                        src="https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&q=80&w=600"
                        className="object-cover h-full w-full grayscale group-hover:scale-105 transition-transform duration-500"
                        alt="Shibuya Rain"
                      />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-white">
                          Inspect Frame
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* ========================================================
          INTERACTIVE MASONRY GALLERY & CATEGORY FILTERS
          ======================================================== */}
      <section
        id="gallery"
        className="px-6 md:px-16 py-24 bg-[#0a0a0a] border-t border-zinc-900/60 relative z-10"
      >
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end space-y-6 md:space-y-0">
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-[0.4em] text-zinc-500">
                PORTFOLIO DEPT
              </span>
              <h3 className="text-3xl md:text-5xl font-semibold tracking-tight uppercase">
                Visual Archive
              </h3>
            </div>

            <div className="flex flex-wrap gap-2 pt-4">
              {["all", "street", "automotive", "cinematic"].map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 rounded-full text-xs uppercase tracking-widest transition-all duration-300 border ${
                    activeCategory === category
                      ? "bg-white text-black border-white"
                      : "bg-zinc-900/40 text-zinc-400 border-zinc-800 hover:border-zinc-500 hover:text-white"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Masonry Layout Cards */}
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[250px] md:auto-rows-[300px]"
          >
            <AnimatePresence mode="popLayout">
              {filteredPhotos.map((photo) => (
                <motion.div
                  key={photo.id}
                  layout
                  initial={{ opacity: 0, scale: 0.94, y: 30 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  exit={{ opacity: 0, scale: 0.9, y: 20 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  onClick={() =>
                    setLightboxIndex(PHOTOS.findIndex((p) => p.id === photo.id))
                  }
                  whileHover={{ y: -6, transition: { duration: 0.3 } }}
                  className={`group relative overflow-hidden rounded-lg bg-zinc-950 border border-zinc-900/80 cursor-pointer interactive-item flex flex-col justify-end ${photo.aspect} md:col-span-1`}
                  style={{
                    gridRow: photo.aspect.includes("16/") ? "span 1" : "span 2",
                  }}
                >
                  <motion.img
                    src={photo.url}
                    alt={photo.title}
                    className="absolute inset-0 w-full h-full object-cover grayscale brightness-90 contrast-[1.05] group-hover:grayscale-0 group-hover:scale-105 group-hover:brightness-75 transition-all duration-700 ease-out"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300 pointer-events-none" />

                  <div className="absolute top-4 left-4 flex items-center space-x-1.5 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/5 transform -translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 delay-75">
                    <MapPin className="w-3 h-3 text-zinc-400" />
                    <span className="text-[10px] font-mono tracking-wider uppercase text-zinc-300">
                      {photo.location}
                    </span>
                  </div>

                  <div className="p-6 relative z-10 flex justify-between items-end transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <div className="space-y-1">
                      <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
                        {photo.category}
                      </p>
                      <h4 className="text-lg font-medium text-white tracking-wide">
                        {photo.title}
                      </h4>

                      <div className="overflow-hidden max-h-0 group-hover:max-h-16 transition-all duration-500 ease-in-out">
                        <p className="text-[10px] font-mono text-zinc-400 pt-2 flex items-center gap-1.5">
                          <Camera className="w-3 h-3 inline text-zinc-500" />{" "}
                          {photo.exif.camera} · {photo.exif.lens}
                        </p>
                        <p className="text-[10px] font-mono text-zinc-500 mt-1">
                          {photo.exif.shutter} · {photo.exif.aperture} · ISO{" "}
                          {photo.exif.iso}
                        </p>
                      </div>
                    </div>

                    <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all duration-300">
                      <Maximize2 className="w-3.5 h-3.5 text-white" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* ========================================================
          THE GEAR MATRIX (BENTO LAYOUT ARCHIVE)
          ======================================================== */}
      <section
        id="gear"
        className="px-6 md:px-16 py-24 bg-[#050505] border-t border-zinc-900/60 relative z-10"
      >
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs font-mono uppercase tracking-[0.4em] text-zinc-500">
              HARDWARE MATRIX
            </span>
            <h3 className="text-3xl md:text-5xl font-semibold tracking-tight uppercase">
              The Arsenal
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[250px]">
            {GEAR_ITEMS.map((item) => {
              const Icon = item.icon;
              return (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  whileHover={{
                    y: -12,
                    scale: 1.03,
                    zIndex: 20,
                    boxShadow:
                      "0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.1)",
                  }}
                  transition={{ type: "spring", stiffness: 350, damping: 20 }}
                  key={item.id}
                  className={`bg-[#0c0c0e] border border-zinc-900 p-8 rounded-xl flex flex-col justify-between relative overflow-hidden group ${item.size} hover:border-zinc-700 transition-colors duration-300`}
                >
                  <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-white/[0.01] rounded-full blur-3xl pointer-events-none transition-all group-hover:bg-white/[0.04] duration-500" />

                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-sm font-bold text-white tracking-wide uppercase">
                        {item.name}
                      </h4>
                      <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mt-1">
                        {item.type}
                      </p>
                    </div>
                    <div className="p-3 bg-zinc-900/50 rounded-lg border border-zinc-800 text-zinc-400 group-hover:text-white transition-colors duration-300">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <p className="text-sm text-zinc-400 tracking-wide font-light leading-relaxed max-w-md">
                      {item.desc}
                    </p>

                    <div className="border-t border-zinc-900 pt-3 flex items-center justify-between">
                      <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
                        SPECS
                      </span>
                      <span className="text-[11px] font-mono text-zinc-300">
                        {item.spec}
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================
          CAMERA & LENS RENTAL (MYR & ENHANCED CALENDAR DRILL-DOWN)
          ======================================================== */}
      <section
        id="atelier"
        className="px-6 md:px-16 py-24 bg-[#0a0a0a] border-t border-zinc-900/60 relative z-10"
      >
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end space-y-4 md:space-y-0">
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-[0.4em] text-zinc-500">
                RENTAL BY MIRUL STUDIO
              </span>
              <h3 className="text-3xl md:text-5xl font-semibold tracking-tight uppercase">
                Equipment Lease
              </h3>
            </div>
            <p className="max-w-md text-zinc-400 text-xs md:text-sm font-light leading-relaxed">
              Curated precision instruments kept in climate-regulated storage.
              Available for creative leases, local shoots, and artistic
              experimentation. Pricing configured in MYR (RM).
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {RENTAL_ITEMS.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="bg-zinc-950/80 border border-zinc-900 rounded-xl overflow-hidden flex flex-col md:flex-row h-full group"
              >
                <div className="relative w-full md:w-2/5 min-h-[220px] md:min-h-auto overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="absolute inset-0 w-full h-full object-cover grayscale brightness-75 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-zinc-950 via-transparent to-transparent" />
                  <div className="absolute top-4 left-4 bg-zinc-950/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/5">
                    <span className="text-[10px] font-mono text-zinc-300 uppercase tracking-widest">
                      {item.type}
                    </span>
                  </div>

                  {item.isAvailable === false && (
                    <div className="absolute top-4 right-4 bg-red-950/90 backdrop-blur-md px-3 py-1 rounded-full border border-red-500/30">
                      <span className="text-[10px] font-mono text-red-400 uppercase tracking-widest font-semibold">
                        Not Available
                      </span>
                    </div>
                  )}
                </div>

                <div className="p-8 flex flex-col justify-between flex-1 space-y-6">
                  <div className="space-y-2">
                    <div className="flex justify-between items-start gap-2">
                      <h4 className="text-xl font-bold tracking-tight text-white">
                        {item.name}
                      </h4>
                      <div className="text-right flex-shrink-0">
                        <span className="text-sm font-mono text-emerald-400 font-semibold block">
                          {item.rate}
                        </span>
                        {item.promoNote && (
                          <span className="text-[10px] font-mono text-emerald-300/80 block mt-0.5">
                            {item.promoNote}
                          </span>
                        )}
                      </div>
                    </div>
                    <p className="text-xs text-zinc-400 font-light tracking-wide">
                      {item.subtitle}
                    </p>
                    <p className="text-xs text-zinc-500 leading-relaxed pt-2">
                      {item.desc}
                    </p>
                  </div>

                  <div className="space-y-4 pt-2">
                    <div className="space-y-1.5">
                      {item.specs.map((spec, sIdx) => (
                        <div key={sIdx} className="flex items-center space-x-2">
                          <div className="w-1 h-1 bg-zinc-600 rounded-full" />
                          <span className="text-[10px] font-mono text-zinc-400">
                            {spec}
                          </span>
                        </div>
                      ))}
                    </div>

                    {item.isAvailable === false ? (
                      <button
                        disabled
                        className="w-full py-2.5 bg-zinc-950 text-zinc-600 border border-zinc-900 rounded-lg text-xs uppercase tracking-widest font-semibold cursor-not-allowed flex items-center justify-center space-x-2"
                      >
                        <Slash className="w-3.5 h-3.5 text-red-500/60" />
                        <span className="text-zinc-500">
                          Temporarily Closed
                        </span>
                      </button>
                    ) : (
                      <button
                        onClick={() => setSelectedRental(item)}
                        className="w-full py-2.5 bg-zinc-900 hover:bg-white text-zinc-300 hover:text-black border border-zinc-800 hover:border-white rounded-lg text-xs uppercase tracking-widest font-semibold transition-all duration-300 interactive-item flex items-center justify-center space-x-2"
                      >
                        <Calendar className="w-3.5 h-3.5" />
                        <span>Request Booking</span>
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-zinc-900/60">
            <div className="flex items-start space-x-3">
              <Clock className="w-5 h-5 text-zinc-500 mt-0.5" />
              <div>
                <h5 className="text-xs uppercase font-mono tracking-wider text-zinc-300">
                  Flexible Periods
                </h5>
                <p className="text-[11px] text-zinc-500 mt-1 leading-relaxed">
                  Book with custom start and end dates. Automated daily rental
                  multipliers calculate your exact timeline instantly.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <ShieldCheck className="w-5 h-5 text-zinc-500 mt-0.5" />
              <div>
                <h5 className="text-xs uppercase font-mono tracking-wider text-zinc-300">
                  Optics Integrity
                </h5>
                <p className="text-[11px] text-zinc-500 mt-1 leading-relaxed">
                  Every kit passes dynamic lens alignment and element
                  inspections before being shipped.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-zinc-500 mt-0.5" />
              <div>
                <h5 className="text-xs uppercase font-mono tracking-wider text-zinc-300">
                  Global Coverage
                </h5>
                <p className="text-[11px] text-zinc-500 mt-1 leading-relaxed">
                  Comprehensive damage waiver and creative liability coverage is
                  integrated with every tie-in block.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          FINE ART & PHOTO PRINTING SERVICE SECTION
          ======================================================== */}
      <section
        id="printing"
        className="px-6 md:px-16 py-24 bg-[#07070a] border-t border-zinc-900/60 relative z-10"
      >
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Header */}
          <div className="text-center max-w-xl mx-auto space-y-3">
            <span className="text-xs font-mono uppercase tracking-[0.4em] text-emerald-400 animate-pulse">
              FINE ART &amp; PRINTING LAB
            </span>
            <h3 className="text-3xl md:text-4xl font-semibold tracking-tight uppercase">
              Photo Printing Service
            </h3>
            <p className="text-zinc-450 text-xs md:text-sm font-light leading-relaxed">
              Tukarkan gambar digital anda kepada cetakan fizikal berkualiti
              makmal foto profesional.
            </p>
          </div>

          {/* Single Configurator Card */}
          <div className="bg-zinc-950/60 border border-zinc-900/80 rounded-2xl p-6 md:p-8 max-w-4xl mx-auto shadow-2xl relative">
            {printOrderSuccess ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="py-16 flex flex-col items-center justify-center space-y-4 text-center"
              >
                <div className="p-4 bg-emerald-500/10 rounded-full border border-emerald-500/20 text-emerald-400">
                  <CheckCircle className="w-12 h-12" />
                </div>
                <div className="space-y-2">
                  <p className="text-base font-semibold text-white uppercase tracking-wider">
                    Tempahan Berjaya Dihantar!
                  </p>
                  <p className="text-xs text-zinc-400 max-w-md mx-auto leading-relaxed">
                    Tempahan anda telah dihantar melalui Emel. Anda juga boleh
                    memantau tempahan dalam Portal Pelanggan.
                  </p>
                </div>
              </motion.div>
            ) : (
              <form ref={printFormRef} onSubmit={handlePrintSubmit} className="space-y-6">
                {/* Hidden input fields for EmailJS template fields */}
                <input type="hidden" name="to_name" value="Mirul Studio Admin" />
                <input type="hidden" name="from_name" value={printForm.name} />
                <input type="hidden" name="client_email" value={printForm.email} />
                <input type="hidden" name="client_phone" value={printForm.phone} />
                <input type="hidden" name="print_size" value={(() => {
                  const { sizeObj } = calculatePrintingPricing(printForm.sizeId, printForm.paperType, printForm.frameId, printForm.quantity);
                  return sizeObj ? `${sizeObj.name} (${sizeObj.dimensions})` : printForm.sizeId;
                })()} />
                <input type="hidden" name="paper_type" value={(() => {
                  const paperObj = PRINT_PAPER_TYPES.find(p => p.id === printForm.paperType);
                  return paperObj?.name || printForm.paperType;
                })()} />
                <input type="hidden" name="border_style" value={printForm.borderStyle === "bleed" ? "Full Bleed" : "White Margin"} />
                <input type="hidden" name="color_tone" value={printForm.colorTone === "bw" ? "Hitam & Putih (B&W)" : printForm.colorTone === "vintage" ? "Vintage Warm" : "Warna Asal"} />
                <input type="hidden" name="quantity" value={`${printForm.quantity} pcs`} />
                <input type="hidden" name="pickup_method" value={printForm.pickupMethod === "pickup" ? "Pickup Studio Melaka" : "Penghantaran Pos (Postage)"} />
                <input type="hidden" name="postage_address" value={printForm.address || "-"} />
                <input type="hidden" name="custom_notes" value={printForm.customNotes || "-"} />
                <input type="hidden" name="total_price" value={(() => {
                  const { finalSubtotal } = calculatePrintingPricing(printForm.sizeId, printForm.paperType, printForm.frameId, printForm.quantity);
                  return `RM ${finalSubtotal.toFixed(2)}`;
                })()} />
                <input type="hidden" name="download_link" value="" id="emailjs_download_link" />

                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                  {/* Left Column: Photo Upload & Preview (5 Cols) */}
                  <div className="md:col-span-5 space-y-4">
                    <label className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest block">
                      1. Muat Naik &amp; Pratinjau
                    </label>

                    <label className="border border-dashed border-zinc-800 hover:border-emerald-500/50 bg-zinc-900/20 rounded-xl p-4 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 group min-h-[180px] relative overflow-hidden">
                      <input
                        type="file"
                        name="uploaded_file"
                        accept="image/*"
                        onChange={handlePhotoUpload}
                        className="hidden"
                      />
                      {printForm.uploadedPreviewUrl ? (
                        <div className="relative w-full h-44 flex items-center justify-center overflow-hidden rounded-lg bg-zinc-950">
                          <img
                            src={printForm.uploadedPreviewUrl}
                            alt="Preview Print"
                            className={`max-h-full max-w-full object-contain ${
                              printForm.colorTone === "bw"
                                ? "grayscale contrast-125"
                                : printForm.colorTone === "vintage"
                                  ? "sepia-[0.3] brightness-95"
                                  : ""
                            } ${
                              printForm.borderStyle === "border"
                                ? "p-3 bg-white"
                                : ""
                            }`}
                          />
                          <div className="absolute bottom-2 right-2 bg-zinc-900/90 backdrop-blur-sm text-[9px] font-mono text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/20">
                            Tukar Gambar
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center text-center space-y-2 py-4">
                          <div className="p-3 bg-zinc-900 group-hover:bg-emerald-950/20 rounded-full border border-zinc-800 group-hover:border-emerald-500/20 text-zinc-400 group-hover:text-emerald-400 transition-colors">
                            <UploadCloud className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-zinc-300 group-hover:text-white">
                              Pilih fail gambar di sini
                            </p>
                            <p className="text-[10px] font-mono text-zinc-500 mt-0.5">
                              PNG, JPG, WEBP
                            </p>
                          </div>
                        </div>
                      )}
                    </label>

                    {/* Metadata */}
                    {printForm.uploadedFile && (
                      <div className="bg-zinc-900/30 p-3 rounded-lg border border-zinc-900 space-y-1 font-mono text-[9px] text-zinc-400">
                        <div className="flex justify-between">
                          <span>Nama:</span>
                          <span className="truncate max-w-[150px] text-white">
                            {printForm.uploadedFile.name}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Status:</span>
                          <span className="text-emerald-400 font-bold">
                            {printForm.uploadedImgDimensions &&
                            printForm.uploadedImgDimensions.width > 1500
                              ? "✓ Kualiti Sangat Tajam"
                              : "⚠ Kualiti Sederhana"}
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Quick Preview Options */}
                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-1">
                        <label className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest block">
                          Gaya Margin
                        </label>
                        <select
                          value={printForm.borderStyle}
                          onChange={(e) =>
                            setPrintForm((prev) => ({
                              ...prev,
                              borderStyle: e.target.value,
                            }))
                          }
                          className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-1.5 text-[10px] text-zinc-300 focus:outline-none"
                        >
                          <option value="bleed">
                            Full Bleed (Tanpa Border)
                          </option>
                          <option value="border">
                            White Margin (Gaya Galeri)
                          </option>
                        </select>
                      </div>
                      <div className="space-y-1">
                        <label className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest block">
                          Tona Warna
                        </label>
                        <select
                          value={printForm.colorTone}
                          onChange={(e) =>
                            setPrintForm((prev) => ({
                              ...prev,
                              colorTone: e.target.value,
                            }))
                          }
                          className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-1.5 text-[10px] text-zinc-300 focus:outline-none"
                        >
                          <option value="original">Warna Asal</option>
                          <option value="bw">Hitam &amp; Putih</option>
                          <option value="vintage">Vintage Warm</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Configurations (7 Cols) */}
                  <div className="md:col-span-7 space-y-4">
                    {/* Size Selector */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest block">
                        2. Pilih Saiz
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        {PHOTO_PRINT_SIZES.map((sz) => {
                          const isSelected = printForm.sizeId === sz.id;
                          return (
                            <button
                              key={sz.id}
                              type="button"
                              onClick={() =>
                                setPrintForm((prev) => ({
                                  ...prev,
                                  sizeId: sz.id,
                                }))
                              }
                              className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between ${
                                isSelected
                                  ? "bg-white text-black border-white"
                                  : "bg-zinc-900/40 border-zinc-900 text-zinc-400 hover:border-zinc-850 hover:text-zinc-200"
                              }`}
                            >
                              <div className="flex justify-between items-center w-full">
                                <span
                                  className={`text-xs font-bold uppercase ${isSelected ? "text-black" : "text-white"}`}
                                >
                                  Saiz {sz.id.toUpperCase()}
                                </span>
                                {isSelected && (
                                  <Check className="w-3.5 h-3.5 text-black" />
                                )}
                              </div>
                              <div className="mt-2 font-mono text-[10px]">
                                <span className="block font-bold">
                                  RM {sz.basePrice.toFixed(2)}
                                </span>
                                <span
                                  className={`block text-[9px] ${isSelected ? "text-zinc-700" : "text-zinc-500"}`}
                                >
                                  {sz.dimensions}
                                </span>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Paper Finish & Postage Options */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Paper Finish */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest block">
                          3. Jenis Kertas
                        </label>
                        <select
                          value={printForm.paperType}
                          onChange={(e) =>
                            setPrintForm((prev) => ({
                              ...prev,
                              paperType: e.target.value,
                            }))
                          }
                          className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-2.5 text-xs text-zinc-300 focus:outline-none"
                        >
                          {PRINT_PAPER_TYPES.map((p) => (
                            <option key={p.id} value={p.id}>
                              {p.name}{" "}
                              {p.extraCost > 0 ? `(+RM ${p.extraCost})` : ""}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Postage/Pickup Toggle */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest block">
                          4. Penghantaran ("Post ke")
                        </label>
                        <div className="grid grid-cols-2 gap-1 bg-zinc-900 border border-zinc-800 p-1 rounded-lg">
                          {[
                            { id: "pickup", label: "Self-Pickup" },
                            { id: "postage", label: "Hantar Pos" },
                          ].map((m) => (
                            <button
                              key={m.id}
                              type="button"
                              onClick={() =>
                                setPrintForm((prev) => ({
                                  ...prev,
                                  pickupMethod: m.id,
                                }))
                              }
                              className={`py-1.5 rounded-md text-[11px] transition-all font-medium ${
                                printForm.pickupMethod === m.id
                                  ? "bg-zinc-950 text-white font-bold"
                                  : "text-zinc-500 hover:text-zinc-350"
                              }`}
                            >
                              {m.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Postage Address Input (if Postage selected) */}
                    {printForm.pickupMethod === "postage" && (
                      <div className="space-y-1.5 animate-fadeIn">
                        <label className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest block">
                          Alamat Penghantaran
                        </label>
                        <input
                          type="text"
                          required
                          value={printForm.address}
                          onChange={(e) =>
                            setPrintForm({
                              ...printForm,
                              address: e.target.value,
                            })
                          }
                          placeholder="Alamat Lengkap Penghantaran Pos *"
                          className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-zinc-500 placeholder-zinc-650"
                        />
                      </div>
                    )}

                    {/* Quantity & Pricing Estimate */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center pt-2 border-t border-zinc-900">
                      {/* Quantity */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest block">
                          5. Kuantiti (Pcs)
                        </label>
                        <div className="flex items-center bg-zinc-900 border border-zinc-800 rounded-lg p-1 max-w-[150px]">
                          <button
                            type="button"
                            onClick={() =>
                              setPrintForm((prev) => ({
                                ...prev,
                                quantity: Math.max(1, prev.quantity - 1),
                              }))
                            }
                            className="w-7 h-7 rounded bg-zinc-950 text-white font-bold hover:bg-zinc-800 flex items-center justify-center transition-colors text-xs"
                          >
                            <Minus className="w-2.5 h-2.5" />
                          </button>
                          <span className="flex-1 text-center text-xs font-bold font-mono text-white">
                            {printForm.quantity} pcs
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              setPrintForm((prev) => ({
                                ...prev,
                                quantity: prev.quantity + 1,
                              }))
                            }
                            className="w-7 h-7 rounded bg-zinc-950 text-white font-bold hover:bg-zinc-800 flex items-center justify-center transition-colors text-xs"
                          >
                            <Plus className="w-2.5 h-2.5" />
                          </button>
                        </div>
                      </div>

                      {/* Pricing Summary */}
                      {(() => {
                        const { finalSubtotal } = calculatePrintingPricing(
                          printForm.sizeId,
                          printForm.paperType,
                          printForm.frameId,
                          printForm.quantity,
                        );
                        return (
                          <div className="text-right">
                            <span className="block text-[9px] font-mono text-zinc-500 uppercase">
                              Jumlah Harga
                            </span>
                            <span className="text-lg font-bold text-emerald-400 font-mono">
                              RM {finalSubtotal.toFixed(2)}
                            </span>
                          </div>
                        );
                      })()}
                    </div>

                    {/* Customer Info */}
                    <div className="space-y-2 pt-2 border-t border-zinc-900">
                      <label className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest block">
                        6. Maklumat Hubungan
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <input
                          type="text"
                          required
                          value={printForm.name}
                          onChange={(e) =>
                            setPrintForm({ ...printForm, name: e.target.value })
                          }
                          placeholder="Nama Penuh *"
                          className="bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none placeholder-zinc-650"
                        />
                        <input
                          type="tel"
                          required
                          value={printForm.phone}
                          onChange={(e) =>
                            setPrintForm({
                              ...printForm,
                              phone: e.target.value,
                            })
                          }
                          placeholder="No. Telefon *"
                          className="bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none placeholder-zinc-650"
                        />
                      </div>
                      <input
                        type="email"
                        required
                        value={printForm.email}
                        onChange={(e) =>
                          setPrintForm({ ...printForm, email: e.target.value })
                        }
                        placeholder="Alamat Emel *"
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none placeholder-zinc-650"
                      />
                    </div>

                    {/* Agreement & Submit */}
                    <div className="space-y-3 pt-2">
                      <label className="flex items-start space-x-2 cursor-pointer group">
                        <input
                          type="checkbox"
                          required
                          checked={printForm.agreedToTerms}
                          onChange={(e) =>
                            setPrintForm((prev) => ({
                              ...prev,
                              agreedToTerms: e.target.checked,
                            }))
                          }
                          className="mt-0.5 w-3.5 h-3.5 rounded border-zinc-800 bg-zinc-950 text-emerald-500 focus:ring-emerald-500/20 accent-emerald-500 cursor-pointer"
                        />
                        <span className="text-[10px] text-zinc-500 group-hover:text-zinc-350 transition-colors leading-relaxed">
                          Saya mengesahkan maklumat tempahan ini betul &amp;
                          bersetuju dengan terma cetakan.
                        </span>
                      </label>

                      <button
                        type="submit"
                        disabled={
                          !printForm.name ||
                          !printForm.phone ||
                          !printForm.email ||
                          !printForm.agreedToTerms
                        }
                        className="w-full py-3 bg-white text-black hover:bg-zinc-200 disabled:bg-zinc-800 disabled:text-zinc-500 rounded-xl text-xs uppercase tracking-wider font-bold transition-all cursor-pointer disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                      >
                        <Mail className="w-3.5 h-3.5" />
                        <span>Tempah Sekarang via Emel</span>
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ========================================================
          CLIENT ACCESS PORTAL DRAWER (SECURE AUTHENTICATION)
          ======================================================== */}
      <AnimatePresence>
        {isPortalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#050505]/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.95, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 30 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="bg-zinc-950 border border-zinc-900 p-5 sm:p-8 rounded-xl w-full max-w-md space-y-4 sm:space-y-6 relative max-h-[90vh] overflow-y-auto"
            >
              <button
                type="button"
                onClick={() => setIsPortalOpen(false)}
                className="absolute top-3 right-3 sm:top-6 sm:right-6 p-2.5 bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-800 rounded-full text-zinc-400 hover:text-white transition-all shadow-md z-30 focus:outline-none active:scale-95"
                aria-label="Close portal modal"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              <div className="space-y-1.5 text-center">
                <span className="text-[9px] font-mono tracking-widest text-zinc-500 uppercase">
                  Mirul Studio Client Desk
                </span>
                <h4 className="text-2xl font-bold tracking-tight text-white">
                  Client Portal Access
                </h4>
                <p className="text-xs text-zinc-400">
                  Unlock private proofs, active rentals, and dedicated shoot
                  pipelines.
                </p>
              </div>

              {authError && (
                <div className="p-3 bg-red-950/50 border border-red-900/50 rounded-lg text-xs text-red-200 text-center">
                  {authError}
                </div>
              )}

              <form onSubmit={handleAuthSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest block">
                    Client Email
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-3 w-4 h-4 text-zinc-600" />
                    <input
                      type="email"
                      required
                      value={authForm.email}
                      onChange={(e) =>
                        setAuthForm({ ...authForm, email: e.target.value })
                      }
                      placeholder="e.g. client@domain.com"
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-lg pl-10 pr-4 py-2.5 text-xs text-white focus:outline-none focus:border-zinc-500 placeholder-zinc-600 transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest block">
                    Access Key
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-3 w-4 h-4 text-zinc-600" />
                    <input
                      type="password"
                      required
                      value={authForm.password}
                      onChange={(e) =>
                        setAuthForm({ ...authForm, password: e.target.value })
                      }
                      placeholder="••••••••"
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-lg pl-10 pr-4 py-2.5 text-xs text-white focus:outline-none focus:border-zinc-500 placeholder-zinc-600 transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest block">
                    Patron Invitation Code (Optional)
                  </label>
                  <input
                    type="text"
                    value={authForm.code}
                    onChange={(e) =>
                      setAuthForm({ ...authForm, code: e.target.value })
                    }
                    placeholder="e.g. MALACCA2026"
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:border-zinc-500 placeholder-zinc-600 transition-colors uppercase"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 bg-white text-black hover:bg-zinc-200 rounded-lg text-xs uppercase tracking-widest font-bold transition-all duration-300"
                  >
                    {isSigningUp
                      ? "Register Core Profile"
                      : "Authenticate Credentials"}
                  </button>
                </div>
              </form>

              <div className="border-t border-zinc-900 pt-4 text-center">
                <button
                  onClick={() => setIsSigningUp(!isSigningUp)}
                  className="text-[10px] text-zinc-500 hover:text-white transition-colors"
                >
                  {isSigningUp
                    ? "Already a verified patron? Log in here"
                    : "Need to request guest client status? Signup mock profile"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========================================================
          RENTAL LEASE SCHEDULING & RECEIPT DRAWER
          ======================================================== */}
      <AnimatePresence>
        {selectedRental && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#050505]/90 backdrop-blur-md flex items-start sm:items-center justify-center p-2.5 sm:p-6 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="bg-zinc-950 border border-zinc-900 p-4 sm:p-8 rounded-xl w-full max-w-4xl space-y-4 sm:space-y-6 relative my-auto max-h-[92vh] sm:max-h-[90vh] flex flex-col shadow-2xl"
            >
              <button
                type="button"
                onClick={() => setSelectedRental(null)}
                className="absolute top-3 right-3 sm:top-6 sm:right-6 p-2.5 bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-800 rounded-full text-zinc-400 hover:text-white transition-all shadow-lg z-30 focus:outline-none active:scale-95"
                aria-label="Close booking modal"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              <div className="space-y-1 pr-10 flex-shrink-0">
                <span className="text-[9px] font-mono tracking-widest text-zinc-500 uppercase">
                  {selectedRental.id === "r4"
                    ? "Photo Printing Request Form"
                    : "Lease Request Form"}
                </span>
                <h4 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                  {selectedRental.name}
                </h4>
                <p className="text-[11px] sm:text-xs text-zinc-400">
                  {selectedRental.id === "r4"
                    ? "Premium Photo Prints · Pro Grade Quality"
                    : `${selectedRental.rate} · Minimal cinematic footprint`}
                </p>
              </div>

              {rentalSuccess ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="py-8 sm:py-12 flex flex-col items-center justify-center space-y-4 text-center"
                >
                  <CheckCircle className="w-10 h-10 sm:w-12 sm:h-12 text-emerald-400" />
                  <div className="space-y-1">
                    <p className="text-xs sm:text-sm font-semibold text-white uppercase tracking-wider">
                      Request Received
                    </p>
                    <p className="text-[11px] sm:text-xs text-zinc-500 max-w-xs">
                      {selectedRental.id === "r4"
                        ? "We have received your printing request. Pengesahan tempahan telah dihantar melalui Emel."
                        : "We have reserved your gear block. Access your lease metrics directly inside your client portal dashboard."}
                    </p>
                  </div>
                </motion.div>
              ) : (
                <form
                  onSubmit={handleRentalSubmit}
                  className="space-y-4 sm:space-y-6 overflow-y-auto pr-1 flex-1"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8 items-start">
                    {/* Left Panel: Contact Inputs & Interactive Receipt */}
                    <div className="space-y-4">
                      <div className="space-y-1">
                        <label className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest block">
                          Full Name
                        </label>
                        <input
                          type="text"
                          required
                          value={rentalForm.name}
                          onChange={(e) =>
                            setRentalForm({
                              ...rentalForm,
                              name: e.target.value,
                            })
                          }
                          placeholder="e.g. Mirul Studio"
                          className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:border-zinc-500 placeholder-zinc-600 transition-colors"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest block">
                          Email Address
                        </label>
                        <input
                          type="email"
                          required
                          value={rentalForm.email}
                          onChange={(e) =>
                            setRentalForm({
                              ...rentalForm,
                              email: e.target.value,
                            })
                          }
                          placeholder="e.g. mirulstudio@gmail.com"
                          className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:border-zinc-500 placeholder-zinc-600 transition-colors"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest block">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          required
                          value={rentalForm.phone}
                          onChange={(e) =>
                            setRentalForm({
                              ...rentalForm,
                              phone: e.target.value,
                            })
                          }
                          placeholder="e.g. 011-21008620"
                          className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:border-zinc-500 placeholder-zinc-600 transition-colors"
                        />
                      </div>

                      {/* Insta360 X4 Air Kit Selection Option */}
                      {selectedRental &&
                        (selectedRental.id === "r3" ||
                          selectedRental.name
                            ?.toLowerCase()
                            .includes("insta360")) && (
                          <div className="space-y-2 pt-2 border-t border-zinc-900">
                            <div className="flex items-center justify-between">
                              <label className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest block">
                                Pilihan Kit Insta360 X4 Air{" "}
                                <span className="text-emerald-400">
                                  * Required
                                </span>
                              </label>
                              <span className="text-[9px] font-mono text-emerald-400 uppercase tracking-wider bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                                {rentalForm.selectedKit || "Standard Kit"}
                              </span>
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                              {[
                                {
                                  id: "Standard Kit",
                                  name: "Standard Kit",
                                  price: "RM 45/day",
                                  desc: "1x Camera, 1x Bateri & Case",
                                },
                                {
                                  id: "Travel Kit",
                                  name: "Travel Kit",
                                  price: "RM 60/day",
                                  desc: "2x Bateri, 80cm Stick & Case",
                                },
                                {
                                  id: "Sport Kit",
                                  name: "Sport Kit",
                                  price: "RM 65/day",
                                  desc: "Action Mount, 2x Bateri & Case",
                                },
                              ].map((kit) => {
                                const isSelected =
                                  (rentalForm.selectedKit || "Standard Kit") ===
                                  kit.id;
                                return (
                                  <button
                                    key={kit.id}
                                    type="button"
                                    onClick={() =>
                                      setRentalForm((prev) => ({
                                        ...prev,
                                        selectedKit: kit.id,
                                      }))
                                    }
                                    className={`p-2.5 rounded-lg border text-left transition-all duration-200 flex flex-col justify-between ${
                                      isSelected
                                        ? "bg-emerald-950/30 border-emerald-500 text-white shadow-lg shadow-emerald-950/40 ring-1 ring-emerald-500/30"
                                        : "bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200"
                                    }`}
                                  >
                                    <div>
                                      <div className="flex items-center justify-between">
                                        <span className="text-[11px] font-bold tracking-tight text-white block">
                                          {kit.name}
                                        </span>
                                        {isSelected && (
                                          <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400/50"></span>
                                        )}
                                      </div>
                                      <span className="text-[9px] text-emerald-400 font-mono font-semibold block mt-0.5">
                                        {kit.price}
                                      </span>
                                      <span className="text-[9px] text-zinc-500 font-mono leading-tight block mt-1">
                                        {kit.desc}
                                      </span>
                                    </div>
                                  </button>
                                );
                              })}
                            </div>
                            <p className="text-[9px] text-zinc-500 italic pt-0.5">
                              * Semua pakej dilengkapi: Charger, Lens Cloth,
                              MicroSD 64GB &amp; Protective Pouch.
                            </p>
                          </div>
                        )}

                      {/* Printing Service Configuration Options */}
                      {selectedRental && selectedRental.id === "r4" && (
                        <div className="space-y-4 pt-2 border-t border-zinc-900">
                          <div className="space-y-2">
                            <label className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest block">
                              Saiz Cetakan{" "}
                              <span className="text-emerald-400">*</span>
                            </label>
                            <div className="grid grid-cols-3 gap-2">
                              {[
                                { label: "4R (RM 2)", value: "4R" },
                                { label: "5R (RM 3)", value: "5R" },
                                { label: "A4 (RM 10)", value: "A4" },
                              ].map((sz) => (
                                <button
                                  key={sz.value}
                                  type="button"
                                  onClick={() =>
                                    setRentalForm((prev) => ({
                                      ...prev,
                                      printSize: sz.value,
                                    }))
                                  }
                                  className={`py-2 px-3 border rounded-lg text-xs font-mono transition-all uppercase ${
                                    rentalForm.printSize === sz.value
                                      ? "bg-white text-black border-white font-bold"
                                      : "bg-zinc-950 text-zinc-400 border-zinc-800 hover:border-zinc-700"
                                  }`}
                                >
                                  {sz.label}
                                </button>
                              ))}
                            </div>
                          </div>

                          <div className="space-y-2">
                            <label className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest block">
                              Kemasan Kertas{" "}
                              <span className="text-emerald-400">*</span>
                            </label>
                            <div className="grid grid-cols-2 gap-2">
                              {["Glossy", "Matte"].map((pf) => (
                                <button
                                  key={pf}
                                  type="button"
                                  onClick={() =>
                                    setRentalForm((prev) => ({
                                      ...prev,
                                      printPaperType: pf,
                                    }))
                                  }
                                  className={`py-2 px-3 border rounded-lg text-xs font-mono transition-all ${
                                    rentalForm.printPaperType === pf
                                      ? "bg-white text-black border-white font-bold"
                                      : "bg-zinc-950 text-zinc-400 border-zinc-800 hover:border-zinc-700"
                                  }`}
                                >
                                  {pf}
                                </button>
                              ))}
                            </div>
                          </div>

                          <div className="space-y-2">
                            <label className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest block">
                              Bilangan Cetakan (Keping){" "}
                              <span className="text-emerald-400">*</span>
                            </label>
                            <div className="flex items-center space-x-3 bg-zinc-900 border border-zinc-800 rounded-lg p-1 max-w-[160px]">
                              <button
                                type="button"
                                onClick={() =>
                                  setRentalForm((prev) => ({
                                    ...prev,
                                    printQuantity: Math.max(
                                      1,
                                      prev.printQuantity - 1,
                                    ),
                                  }))
                                }
                                className="w-8 h-8 rounded bg-zinc-950 text-white font-bold hover:bg-zinc-800 flex items-center justify-center transition-colors text-sm"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="flex-1 text-center text-xs font-bold font-mono text-white">
                                {rentalForm.printQuantity} pcs
                              </span>
                              <button
                                type="button"
                                onClick={() =>
                                  setRentalForm((prev) => ({
                                    ...prev,
                                    printQuantity: prev.printQuantity + 1,
                                  }))
                                }
                                className="w-8 h-8 rounded bg-zinc-950 text-white font-bold hover:bg-zinc-800 flex items-center justify-center transition-colors text-sm"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Dynamic Pricing Estimate Receipt in MYR (RM) */}
                      {(() => {
                        const days = getDurationDays(
                          rentalForm.startDate,
                          rentalForm.endDate,
                        );
                        const { dailyRate, subtotal, isDiscounted } =
                          calculateRentalPricing(
                            selectedRental,
                            days,
                            rentalForm.selectedKit,
                          );
                        const securityDeposit = selectedRental?.deposit || 50.0;
                        const estimatedTotal = subtotal;

                        const formatNiceDate = (d) => {
                          if (!d) return "Select date";
                          return d.toLocaleDateString("en-MY", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          });
                        };

                        return (
                          <div className="bg-[#09090b] border border-zinc-900 rounded-lg p-5 space-y-3 font-mono text-[11px] text-zinc-400">
                            <div className="flex justify-between text-zinc-500 uppercase tracking-widest text-[9px] border-b border-zinc-900 pb-2">
                              <span>Lease Invoice Estimate</span>
                              <span>MYR (RM)</span>
                            </div>
                            <div className="grid grid-cols-2 gap-2 text-[10px]">
                              <div>
                                <span className="block text-[8px] uppercase text-zinc-600">
                                  Start Date
                                </span>
                                <span className="text-zinc-200">
                                  {formatNiceDate(rentalForm.startDate)}
                                </span>
                              </div>
                              <div>
                                <span className="block text-[8px] uppercase text-zinc-600">
                                  End Date
                                </span>
                                <span className="text-zinc-200">
                                  {formatNiceDate(rentalForm.endDate)}
                                </span>
                              </div>
                            </div>
                            <div className="flex justify-between">
                              <span>Calculated Duration</span>
                              <span className="text-zinc-200 font-bold">
                                {days} {days === 1 ? "Day" : "Days"}
                              </span>
                            </div>
                            <div className="border-t border-dashed border-zinc-900 my-1"></div>
                            {selectedRental &&
                              (selectedRental.id === "r3" ||
                                selectedRental.name
                                  ?.toLowerCase()
                                  .includes("insta360")) && (
                                <div className="flex justify-between text-zinc-300">
                                  <span>Selected Kit Package</span>
                                  <span className="text-emerald-400 font-bold">
                                    {rentalForm.selectedKit || "Standard Kit"}{" "}
                                    (RM {dailyRate}/day)
                                  </span>
                                </div>
                              )}
                            <div className="flex justify-between items-start">
                              <div>
                                <span>
                                  Base Rate (RM {dailyRate} × {days}{" "}
                                  {days === 1 ? "day" : "days"})
                                </span>
                                {isDiscounted && (
                                  <span className="block text-[9px] text-emerald-400 font-sans mt-0.5">
                                    ★ Promo Rate Applied (&gt;3 Days Discount)
                                  </span>
                                )}
                              </div>
                              <span className="text-zinc-200">
                                RM {subtotal.toFixed(2)}
                              </span>
                            </div>
                            <div className="flex justify-between text-zinc-500">
                              <span>Refundable Security Deposit</span>
                              <span>RM {securityDeposit.toFixed(2)}</span>
                            </div>
                            <div className="border-t border-dashed border-zinc-800 pt-3 flex justify-between text-xs font-bold text-white">
                              <span className="uppercase tracking-wider">
                                Estimated Total
                              </span>
                              <span className="text-emerald-400 font-mono text-sm">
                                RM {estimatedTotal.toFixed(2)}
                              </span>
                            </div>
                            <p className="text-[9px] text-zinc-500 leading-normal italic pt-1 text-center">
                              * Refundable deposit of RM{" "}
                              {securityDeposit.toFixed(2)} authorized upon
                              pickup verification.
                            </p>
                          </div>
                        );
                      })()}
                    </div>

                    {/* Right Panel: Custom Premium Glassmorphic Calendar Picker */}
                    <div className="space-y-3">
                      <label className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest block text-center md:text-left">
                        Select Lease Range (Tap Start &amp; End Dates)
                      </label>
                      <CustomGlassCalendar
                        startDate={rentalForm.startDate}
                        endDate={rentalForm.endDate}
                        onChange={updateSelectedDates}
                      />
                    </div>
                  </div>

                  {/* Terms & Conditions Agreement Checkbox */}
                  <div className="pt-3 border-t border-zinc-900 space-y-2">
                    <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-lg p-3">
                      <label className="flex items-start space-x-3 cursor-pointer group">
                        <input
                          type="checkbox"
                          required
                          checked={rentalForm.agreedToTerms}
                          onChange={(e) =>
                            setRentalForm((prev) => ({
                              ...prev,
                              agreedToTerms: e.target.checked,
                            }))
                          }
                          className="mt-0.5 w-4 h-4 rounded border-zinc-700 bg-zinc-950 text-emerald-500 focus:ring-emerald-500/30 accent-emerald-500 cursor-pointer"
                        />
                        <span className="text-[11px] text-zinc-300 group-hover:text-white transition-colors leading-relaxed">
                          Saya telah membaca, memahami &amp; bersetuju dengan{" "}
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              setShowTermsModal(true);
                            }}
                            className="text-emerald-400 underline hover:text-emerald-300 font-semibold inline-flex items-center gap-0.5"
                          >
                            Terma &amp; Syarat Sewaan Peralatan (Terms &amp;
                            Conditions)
                            <ArrowUpRight className="w-3 h-3 inline" />
                          </button>
                        </span>
                      </label>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-[9px] text-zinc-600 font-mono text-center sm:text-left">
                      NO IMMEDIATE CHARGES · SECURITY DEPOSIT CONFIRMED UPON
                      LEASE HANDOVER
                    </p>
                    <button
                      type="submit"
                      disabled={
                        !rentalForm.startDate ||
                        !rentalForm.endDate ||
                        !rentalForm.name ||
                        !rentalForm.email ||
                        !rentalForm.phone ||
                        !rentalForm.agreedToTerms
                      }
                      className="w-full sm:w-auto px-8 py-3 bg-white text-black hover:bg-zinc-200 disabled:bg-zinc-800 disabled:text-zinc-600 rounded-lg text-xs uppercase tracking-widest font-bold transition-all duration-300 cursor-pointer disabled:cursor-not-allowed"
                    >
                      Submit Lease Request
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Printing modal drawer has been removed in favor of the inline configurator card */}

      {/* ========================================================
          TERMS AND CONDITIONS FULL MODAL POPUP
          ======================================================== */}
      <AnimatePresence>
        {showTermsModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
            onClick={() => setShowTermsModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.4 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-zinc-950 border border-zinc-800 p-6 sm:p-8 rounded-2xl w-full max-w-2xl max-h-[85vh] flex flex-col shadow-2xl space-y-5"
            >
              <div className="flex justify-between items-start border-b border-zinc-900 pb-4">
                <div>
                  <span className="text-[9px] font-mono tracking-widest text-emerald-400 uppercase">
                    Polisi &amp; Peraturan Sewaan Studio
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-white mt-1">
                    Terma &amp; Syarat Sewaan Peralatan (Terms &amp; Conditions)
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setShowTermsModal(false)}
                  className="p-2 bg-zinc-900 hover:bg-zinc-800 rounded-full text-zinc-400 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="overflow-y-auto pr-2 space-y-4 text-xs text-zinc-300 leading-relaxed font-sans">
                <div className="bg-emerald-950/20 border border-emerald-500/20 p-3.5 rounded-lg flex items-center space-x-3">
                  <ShieldCheck className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                  <p className="text-[11px] text-emerald-200">
                    Sila baca terma berikut dengan teliti sebelum melengkapkan
                    pesanan sewaan anda.
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="p-3 bg-zinc-900/50 border border-zinc-900 rounded-lg space-y-1">
                    <h4 className="font-bold text-white flex items-center gap-2">
                      <span className="text-emerald-400 font-mono">1.</span>{" "}
                      Dokumen Wajib Semasa Pickup (IC, Alamat &amp; Media
                      Sosial)
                    </h4>
                    <p className="text-zinc-400 text-[11px]">
                      Penyewa{" "}
                      <strong className="text-white">
                        WAJIB menyediakan &amp; membawa dokumen berikut semasa
                        pengambilan (*pickup*) peralatan
                      </strong>
                      :<br />
                      • Salinan MyKad / IC (Depan &amp; Belakang)
                      <br />
                      • Alamat Kediaman Terkini (Cth: Bil Utiliti / Lesen /
                      Dokumen Alamat)
                      <br />
                      • Akaun Media Sosial Yang Aktif (Instagram / TikTok /
                      Facebook dll.)
                      <br />
                      <span className="text-emerald-400/90 italic">
                        * Penyerahan peralatan tidak akan diproses sekiranya
                        dokumen di atas gagal disediakan.
                      </span>
                    </p>
                  </div>

                  <div className="p-3 bg-zinc-900/50 border border-zinc-900 rounded-lg space-y-1">
                    <h4 className="font-bold text-white flex items-center gap-2">
                      <span className="text-emerald-400 font-mono">2.</span>{" "}
                      Waktu Pickup &amp; Pemulangan (9:00 AM - 5:00 PM)
                    </h4>
                    <p className="text-zinc-400 text-[11px]">
                      Waktu urusan penyerahan (*pickup*) dan pemulangan
                      (*return*) peralatan adalah dari{" "}
                      <strong className="text-white">
                        9:00 AM hingga 5:00 PM sahaja
                      </strong>{" "}
                      pada tarikh sewaan. Pemulangan melebihi jam 5:00 PM tanpa
                      kelulusan awal akan dikira sebagai sewaan hari berikutnya
                      dan dikenakan caj harian penuh.
                    </p>
                  </div>

                  <div className="p-3 bg-zinc-900/50 border border-zinc-900 rounded-lg space-y-1">
                    <h4 className="font-bold text-white flex items-center gap-2">
                      <span className="text-emerald-400 font-mono">3.</span>{" "}
                      Bayaran Penuh Sebelum Pickup (Payment Required)
                    </h4>
                    <p className="text-zinc-400 text-[11px]">
                      Bayaran sewaan penuh (*Rental Fee*) berserta deposit
                      keselamatan (*Security Deposit*){" "}
                      <strong className="text-white">
                        mesti dijelaskan sepenuhnya SEBELUM atau SEMASA waktu
                        pengambilan peralatan
                      </strong>
                      . Peralatan tidak akan diserahkan jika bayaran belum
                      dijelaskan.
                    </p>
                  </div>

                  <div className="p-3 bg-zinc-900/50 border border-zinc-900 rounded-lg space-y-1">
                    <h4 className="font-bold text-white flex items-center gap-2">
                      <span className="text-emerald-400 font-mono">4.</span>{" "}
                      Ganti Rugi Kerosakan &amp; Kehilangan (Harga Barang Penuh)
                    </h4>
                    <p className="text-zinc-400 text-[11px]">
                      Penyewa bertanggungjawab sepenuhnya ke atas keselamatan
                      peralatan. Sekiranya berlaku kerosakan teruk, kerosakan
                      cecair/sensor, kecurian, atau kehilangan
                      peralatan/aksesori, penyewa wajib menggantikan mengikut{" "}
                      <strong className="text-white">
                        HARGA BARANG PENUH (Full Retail Market Price)
                      </strong>{" "}
                      atau menggantikan dengan unit baharu yang bersesuaian.
                    </p>
                  </div>

                  <div className="p-3 bg-zinc-900/50 border border-zinc-900 rounded-lg space-y-1">
                    <h4 className="font-bold text-white flex items-center gap-2">
                      <span className="text-emerald-400 font-mono">5.</span>{" "}
                      Polisi Pembatalan Tempahan (Cancellation Policy)
                    </h4>
                    <p className="text-zinc-400 text-[11px]">
                      • Pembatalan{" "}
                      <strong className="text-white">lebih 24 jam</strong>{" "}
                      sebelum tarikh pickup: Pemulangan deposit diproses
                      sepenuhnya.
                      <br />• Pembatalan{" "}
                      <strong className="text-white">
                        kurang dari 24 jam
                      </strong>{" "}
                      dari waktu pickup: Deposit keselamatan (RM50) tidak akan
                      dipulangkan (*forfeited*) sebagai caj fi pembatalan.
                    </p>
                  </div>

                  <div className="p-3 bg-zinc-900/50 border border-zinc-900 rounded-lg space-y-1">
                    <h4 className="font-bold text-white flex items-center gap-2">
                      <span className="text-emerald-400 font-mono">6.</span>{" "}
                      Deposit Keselamatan &amp; Larangan Sub-Lease
                    </h4>
                    <p className="text-zinc-400 text-[11px]">
                      Deposit keselamatan (RM50) akan dipulangkan sepenuhnya
                      dalam 24 jam selepas peralatan dipulangkan dalam keadaan
                      asal. Peralatan hanya untuk kegunaan penyewa yang
                      mendaftar dan DILARANG sama sekali disewakan semula
                      (*sub-lease*) kepada pihak ketiga.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-zinc-900 flex justify-between items-center">
                <span className="text-[10px] text-zinc-500 font-mono">
                  Mirul Studio Rental Terms v2.5
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setRentalForm((prev) => ({ ...prev, agreedToTerms: true }));
                    setShowTermsModal(false);
                  }}
                  className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-bold uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
                >
                  Faham &amp; Bersetuju (Setuju)
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========================================================
          BOOKING CONFIRMATION & FINAL T&C RECAP POPUP SCREEN
          ======================================================== */}
      <AnimatePresence>
        {showConfirmModal && selectedRental && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
            onClick={() => setShowConfirmModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.4 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-zinc-950 border border-emerald-500/40 p-6 sm:p-8 rounded-2xl w-full max-w-xl flex flex-col shadow-2xl shadow-emerald-950/30 space-y-5 relative"
            >
              <button
                type="button"
                onClick={() => setShowConfirmModal(false)}
                className="absolute top-4 right-4 p-2 bg-zinc-900 hover:bg-zinc-800 rounded-full text-zinc-400 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="space-y-1 pr-8">
                <span className="text-[9px] font-mono tracking-widest text-emerald-400 uppercase">
                  Pengesahan Akhir &amp; Ringkasan Syarat
                </span>
                <h3 className="text-xl font-bold text-white tracking-tight">
                  Pengesahan Tempahan Sewaan
                </h3>
                <p className="text-xs text-zinc-400">
                  Sila semak maklumat tempahan &amp; terma utama sebelum
                  pengesahan dihantar.
                </p>
              </div>

              {/* Order Summary Box */}
              <div className="bg-zinc-900/70 border border-zinc-800 rounded-xl p-4 space-y-2 text-xs font-mono">
                <div className="flex justify-between items-center text-white font-bold border-b border-zinc-800 pb-2">
                  <span>{selectedRental.name}</span>
                  <span className="text-emerald-400">
                    RM{" "}
                    {calculateRentalPricing(
                      selectedRental,
                      getDurationDays(rentalForm.startDate, rentalForm.endDate),
                      rentalForm.selectedKit,
                    ).subtotal.toFixed(2)}
                  </span>
                </div>
                {(selectedRental.id === "r3" ||
                  selectedRental.name?.toLowerCase().includes("insta360")) && (
                  <div className="flex justify-between text-zinc-400 text-[11px]">
                    <span>Pakej Kit:</span>
                    <span className="text-zinc-200">
                      {rentalForm.selectedKit || "Standard Kit"}
                    </span>
                  </div>
                )}
                <div className="flex justify-between text-zinc-400 text-[11px]">
                  <span>Penyewa:</span>
                  <span className="text-zinc-200">
                    {rentalForm.name} ({rentalForm.phone})
                  </span>
                </div>
                <div className="flex justify-between text-zinc-400 text-[11px]">
                  <span>Tempoh:</span>
                  <span className="text-zinc-200">
                    {getDurationDays(rentalForm.startDate, rentalForm.endDate)}{" "}
                    Hari
                  </span>
                </div>
              </div>

              {/* Important T&C Checklist Highlights */}
              <div className="space-y-2">
                <p className="text-[10px] font-mono uppercase text-zinc-400 tracking-wider">
                  ⚠️ Peringatan Syarat Utama Sewaan:
                </p>
                <div className="space-y-2 text-[11px] text-zinc-300">
                  <div className="flex items-start space-x-2 bg-zinc-900/40 p-2.5 rounded-lg border border-zinc-900">
                    <User className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>
                      <strong>Syarat Dokumen Pickup:</strong> Wajib sediakan
                      Salinan IC (Depan &amp; Belakang), Alamat Terkini &amp;
                      Media Sosial Aktif semasa pickup.
                    </span>
                  </div>
                  <div className="flex items-start space-x-2 bg-zinc-900/40 p-2.5 rounded-lg border border-zinc-900">
                    <Clock className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>
                      <strong>Pickup &amp; Pulang (9am - 5pm):</strong> Waktu
                      urusan terhad 9:00 AM - 5:00 PM sahaja.
                    </span>
                  </div>
                  <div className="flex items-start space-x-2 bg-zinc-900/40 p-2.5 rounded-lg border border-zinc-900">
                    <Lock className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>
                      <strong>Bayaran Penuh Sebelum Pickup:</strong> Bayaran
                      sewaan &amp; deposit RM50 mesti dijelaskan sebelum
                      penyerahan.
                    </span>
                  </div>
                  <div className="flex items-start space-x-2 bg-zinc-900/40 p-2.5 rounded-lg border border-zinc-900">
                    <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>
                      <strong>Ganti Rugi Harga Barang Penuh:</strong> Sebarang
                      kerosakan teruk/kehilangan wajib diganti mengikut nilai
                      harga pasaran penuh.
                    </span>
                  </div>
                  <div className="flex items-start space-x-2 bg-zinc-900/40 p-2.5 rounded-lg border border-zinc-900">
                    <Calendar className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>
                      <strong>Polisi Pembatalan:</strong> Pembatalan kurang 24
                      jam sebelum pickup menyebabkan deposit RM50 hangus.
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-zinc-900 flex flex-col sm:flex-row gap-3 justify-end">
                <button
                  type="button"
                  onClick={() => setShowConfirmModal(false)}
                  className="w-full sm:w-auto px-5 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-xs font-bold rounded-lg transition-colors cursor-pointer"
                >
                  Batal / Semak Form
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowConfirmModal(false);
                    executeRentalSubmission();
                  }}
                  className="w-full sm:w-auto px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-bold uppercase tracking-wider rounded-lg transition-all shadow-lg shadow-emerald-950/50 cursor-pointer flex items-center justify-center space-x-2"
                >
                  <span>Sahkan &amp; Hantar Tempahan</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========================================================
          IMMERSIVE LIGHTBOX MODAL WITH SPRING PHYSICS
          ======================================================== */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxIndex(null)}
            className="fixed inset-0 z-[100] bg-[#050505]/95 backdrop-blur-xl flex flex-col justify-between p-6 md:p-12 cursor-zoom-out"
          >
            <div className="flex justify-between items-center w-full z-10">
              <div className="flex items-center space-x-3">
                <span className="text-xs uppercase tracking-[0.25em] text-zinc-400 font-mono">
                  {filteredPhotos[lightboxIndex].title}
                </span>
                <span className="text-[10px] font-mono text-zinc-600">
                  [{lightboxIndex + 1} / {filteredPhotos.length}]
                </span>
              </div>

              <button
                onClick={() => setLightboxIndex(null)}
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white border border-white/5 flex items-center justify-center transition-colors duration-300 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative w-full h-[65vh] flex justify-center items-center">
              <button
                onClick={prevPhoto}
                className="absolute left-0 md:left-4 z-10 w-12 h-12 rounded-full bg-black/40 hover:bg-black/80 border border-zinc-800 text-white flex items-center justify-center transition-colors duration-300 pointer-events-auto cursor-pointer"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <motion.img
                key={lightboxIndex}
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ type: "spring", stiffness: 120, damping: 20 }}
                src={filteredPhotos[lightboxIndex].url}
                alt={filteredPhotos[lightboxIndex].title}
                className="max-h-full max-w-[85%] md:max-w-[70%] object-contain rounded border border-zinc-900 select-none shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              />

              <button
                onClick={nextPhoto}
                className="absolute right-0 md:right-4 z-10 w-12 h-12 rounded-full bg-black/40 hover:bg-black/80 border border-zinc-800 text-white flex items-center justify-center transition-colors duration-300 pointer-events-auto cursor-pointer"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-4xl mx-auto bg-zinc-950/80 border border-zinc-900 p-6 rounded-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6 cursor-default pointer-events-auto"
            >
              <div className="space-y-1">
                <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
                  {filteredPhotos[lightboxIndex].location}
                </p>
                <h4 className="text-xl font-bold text-white tracking-wide">
                  {filteredPhotos[lightboxIndex].title}
                </h4>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 md:gap-12 border-t md:border-t-0 md:border-l border-zinc-900 pt-4 md:pt-0 md:pl-12">
                <div>
                  <span className="block text-[9px] font-mono text-zinc-500 uppercase">
                    Camera
                  </span>
                  <span className="text-xs text-zinc-300 font-mono">
                    {filteredPhotos[lightboxIndex].exif.camera}
                  </span>
                </div>
                <div>
                  <span className="block text-[9px] font-mono text-zinc-500 uppercase">
                    Aperture
                  </span>
                  <span className="text-xs text-zinc-300 font-mono">
                    {filteredPhotos[lightboxIndex].exif.aperture}
                  </span>
                </div>
                <div>
                  <span className="block text-[9px] font-mono text-zinc-500 uppercase">
                    Shutter
                  </span>
                  <span className="text-xs text-zinc-300 font-mono">
                    {filteredPhotos[lightboxIndex].exif.shutter}
                  </span>
                </div>
                <div>
                  <span className="block text-[9px] font-mono text-zinc-500 uppercase">
                    ISO
                  </span>
                  <span className="text-xs text-zinc-300 font-mono">
                    {filteredPhotos[lightboxIndex].exif.iso}
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========================================================
          EXCLUSIVE SECURE PATRON PROOF PREVIEW OVERLAY
          ======================================================== */}
      <AnimatePresence>
        {selectedProof && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProof(null)}
            className="fixed inset-0 z-50 bg-black/95 flex flex-col justify-center items-center p-4 cursor-zoom-out"
          >
            <div
              className="w-full max-w-3xl space-y-4 pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center text-zinc-400 font-mono text-xs">
                <span>{selectedProof.title} (UNRELEASED PROOF)</span>
                <button
                  onClick={() => setSelectedProof(null)}
                  className="hover:text-white flex items-center gap-1"
                >
                  <X className="w-4 h-4" /> Close
                </button>
              </div>
              <img
                src={selectedProof.url}
                alt={selectedProof.title}
                className="w-full h-auto object-contain rounded-lg border border-zinc-800"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========================================================
          CONTACT SECTION & MINIMALIST FOOTER
          ======================================================== */}
      <section
        id="contact"
        className="px-6 md:px-16 py-32 bg-[#050505] border-t border-zinc-900 relative z-10"
      >
        <div className="max-w-7xl mx-auto flex flex-col space-y-16">
          <div className="flex flex-col md:flex-row justify-between items-start space-y-12 md:space-y-0">
            <div className="max-w-2xl space-y-6">
              <span className="text-xs font-mono uppercase tracking-[0.4em] text-zinc-500">
                COLLABORATE
              </span>
              <h2 className="text-4xl md:text-7xl font-bold tracking-tighter uppercase leading-none">
                Let's develop <br />
                something timeless.
              </h2>
              <p className="text-zinc-400 text-sm md:text-base font-light tracking-wide leading-relaxed max-w-lg">
                Available globally for editorial shoots, high-concept automotive
                campaigns, visual lookbooks, and select architectural archives.
              </p>
            </div>

            <div className="flex flex-col space-y-4 w-full md:w-auto">
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
                Connect / Inquire
              </span>

              <a
                href="https://tiktok.com/@mirul_visuals"
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-between p-4 bg-zinc-900/30 hover:bg-zinc-900/70 border border-zinc-900 hover:border-zinc-800 rounded-lg transition-all duration-300 md:w-80 interactive-item"
              >
                <div className="flex items-center space-x-3">
                  <Music className="w-4 h-4 text-zinc-400 group-hover:text-white transition-colors" />
                  <span className="text-xs font-mono tracking-wide text-zinc-300">
                    @mirul_visuals
                  </span>
                </div>
                <ArrowUpRight className="w-4 h-4 text-zinc-600 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
              </a>

              <a
                href="mailto:kairuls.hakim@gmail.com"
                className="group flex items-center justify-between p-4 bg-zinc-900/30 hover:bg-zinc-900/70 border border-zinc-900 hover:border-zinc-800 rounded-lg transition-all duration-300 md:w-80 interactive-item"
              >
                <div className="flex items-center space-x-3">
                  <Mail className="w-4 h-4 text-zinc-400 group-hover:text-white transition-colors" />
                  <span className="text-xs font-mono tracking-wide text-zinc-300">
                    kairuls.hakim@gmail.com
                  </span>
                </div>
                <ArrowUpRight className="w-4 h-4 text-zinc-600 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
              </a>
            </div>
          </div>

          <div className="border-t border-zinc-900 pt-12 flex flex-col sm:flex-row justify-between items-center text-center sm:text-left gap-4">
            <span className="text-xs text-zinc-600 tracking-wider">
              © {new Date().getFullYear()} MIRUL STUDIO. ALL RIGHTS RESERVED.
            </span>
            <span className="text-xs text-zinc-600 tracking-wider font-mono">
              CURATED WITH MAXIMUM GRAIN &amp; DEVOTION.
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}

/**
 * BobaSticker 3.0 - All Rights Reserved
 * Copyright (c) 2026 BobaSticker
 * Dilarang keras menyalin atau mendistribusikan kode tanpa izin.
 */
"use client";

import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { ArrowUp, ChevronLeft, ChevronRight } from "lucide-react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import BorderGlow from "./components/BorderGlow";

// Dynamically import 3D component to avoid SSR issues
const Boba3D = dynamic(() => import("./components/Boba3D"), { ssr: false });
const DotField = dynamic(() => import("./components/DotField"), { ssr: false });

// ─── Carousel Card Data ───────────────────────────────────────────────────────
const CARDS = [
  {
    emoji: "💸",
    title: "Gratis, Seikhlas Hati Ini",
    desc: "Gak ada tuh embel-embel premium. Lo berhak dapet yang terbaik tanpa harus ngeluarin duit, karena bahagia lo itu tujuan kita.",
    badge: "Free Forever",
    from: "from-blue-100",
    to: "to-blue-50/50",
    border: "border-blue-200",
    shadow: "shadow-blue-200/40",
    badgeColor: "text-blue-500",
  },
  {
    emoji: "🔒",
    title: "Rahasia Lo, Nyawa Kita",
    desc: "Foto aib lo cuma mampir sekejap buat diproses, abis itu langsung kita hapus tanpa sisa. Kita penjaga rahasia yang paling setia.",
    badge: "100% Private",
    from: "from-purple-100",
    to: "to-purple-50/50",
    border: "border-purple-200",
    shadow: "shadow-purple-200/40",
    badgeColor: "text-purple-500",
  },
  {
    emoji: "⚡",
    title: "Ngebut Tanpa Rem",
    desc: "Kita pake mesin canggih biar lo gak perlu nunggu lama. Kurang dari sedetik, stiker lo langsung jadi dan siap dikirim ke tongkrongan.",
    badge: "Instant Process",
    from: "from-amber-100",
    to: "to-amber-50/50",
    border: "border-amber-200",
    shadow: "shadow-amber-200/40",
    badgeColor: "text-amber-500",
  },
  {
    emoji: "📱",
    title: "Selalu Ada Buat Lo",
    desc: "Tinggal chat di WA atau Tele lo. Gak perlu repot download aplikasi aneh-aneh yang cuma bikin memori HP lo penuh sesak.",
    badge: "Cross Platform",
    from: "from-emerald-100",
    to: "to-emerald-50/50",
    border: "border-emerald-200",
    shadow: "shadow-emerald-200/40",
    badgeColor: "text-emerald-500",
  },
];

export default function Home() {
  const BOT_USERNAME = "BobaSticker_bot";
  const WA_NUMBER = "6283190230065";
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [toasts, setToasts] = useState<{ id: number; message: string; isExiting: boolean }[]>([]);
  const [visitorCount, setVisitorCount] = useState<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Fetch & increment visitor counter on mount
  useEffect(() => {
    fetch("/api/visitor-count", { method: "POST" })
      .then((res) => res.json())
      .then((data) => setVisitorCount(data.count))
      .catch(() => setVisitorCount(200));
  }, []);

  useEffect(() => {
    audioRef.current = new Audio("/sounds/notification_sound.mp3");
  }, []);

  const showToast = (message: string) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, isExiting: false }]);

    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => { });
    }

    setTimeout(() => {
      setToasts((prev) => prev.map((t) => t.id === id ? { ...t, isExiting: true } : t));
    }, 4500);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 5000);
  };

  const handleSupportClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsMenuOpen(false);
    showToast("Gapapa kok, untuk sekarang masih gratis pemakaian (free tier) ^_^");
    setTimeout(() => {
      showToast("Nantikan fitur update baru berikutnya ya, stay tune guys...");
    }, 2500);
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const [carouselIndex, setCarouselIndex] = useState(0);
  const [centerPercentage, setCenterPercentage] = useState(80);
  const carouselRef = useRef<any>(null);

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      if (w < 640) setCenterPercentage(88);
      else if (w < 1024) setCenterPercentage(60);
      else setCenterPercentage(42);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const scrollNext = () => carouselRef.current?.onClickNext();
  const scrollPrev = () => carouselRef.current?.onClickPrev();

  return (
    <div className="bg-transparent text-gray-900 selection:bg-gray-200 relative pb-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "BobaSticker",
            url: "https://bobasticker.vercel.app",
            applicationCategory: "MultimediaApplication",
            operatingSystem: "Web, Android, iOS",
            description:
              "Sihir foto jadi stiker Telegram & WhatsApp dalam hitungan detik. 100% gratis, tanpa login, sat-set langsung jadi.",
            offers: { "@type": "Offer", price: "0", priceCurrency: "IDR" },
            author: { "@type": "Person", name: "Bondan Banuaji" },
          }),
        }}
      />

      {/* Background dot field */}
      <div className="fixed inset-0 z-[0] pointer-events-none">
        <DotField dotRadius={2} dotSpacing={20} bulgeStrength={120} cursorForce={1.2} glowRadius={100} />
      </div>

      {/* ── Navigation ─────────────────────────────────────────────────────── */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isMenuOpen
            ? "bg-transparent"
            : isScrolled
              ? "bg-white/95 backdrop-blur-xl border-b border-gray-100 shadow-sm"
              : "bg-transparent"
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
          <div className="flex justify-between h-20 items-center">
            <div className="flex items-center gap-2 relative z-[60]">
              <span className="font-heading font-black text-2xl sm:text-3xl lg:text-4xl tracking-tighter text-gray-900 uppercase whitespace-nowrap">
                BobaSticker
              </span>
            </div>

            {/* Desktop Menu */}
            <div className={`hidden md:flex space-x-8 transition-opacity duration-500 ${isMenuOpen ? "opacity-0" : ""}`}>
              <a href="#performance" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
                Tentang Kami
              </a>
              <a href="#philosophy" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
                Filosofi
              </a>
              <button
                onClick={handleSupportClick}
                className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors cursor-pointer focus:outline-none"
              >
                Donasi
              </button>
            </div>

            {/* Mobile Burger */}
            <button
              className="md:hidden z-[60] relative w-10 h-10 flex justify-center items-center focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <div className="relative w-9 h-5 mr-2">
                <span
                  className={`absolute left-0 w-full h-[2px] bg-gray-900 transition-all duration-300 ease-in-out ${isMenuOpen ? "top-2 rotate-45" : "top-0"
                    }`}
                />
                <span
                  className={`absolute left-0 w-full h-[2px] bg-gray-900 transition-all duration-300 ease-in-out top-2 ${isMenuOpen ? "opacity-0 -translate-x-2" : "opacity-100"
                    }`}
                />
                <span
                  className={`absolute left-0 w-full h-[2px] bg-gray-900 transition-all duration-300 ease-in-out ${isMenuOpen ? "top-2 -rotate-45" : "top-4"
                    }`}
                />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Full-Screen Menu */}
      <div
        className={`fixed inset-0 z-40 transition-all duration-500 ease-in-out md:hidden flex flex-col items-center justify-center ${isMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full"
          }`}
      >
        <div className="absolute inset-0 z-0">
          <img src="/images/bg_nav.jpg" alt="Background" className="w-full h-full object-cover object-center" />
          <div className="absolute inset-0 bg-white/80 backdrop-blur-xl" />
        </div>
        <div className="flex flex-col items-center gap-7 relative z-10">
          <a
            href="#performance"
            onClick={() => setIsMenuOpen(false)}
            className="font-heading text-4xl font-bold text-gray-900 hover:text-[var(--color-telegram)] transition-all tracking-tight"
          >
            Tentang Kami
          </a>
          <a
            href="#philosophy"
            onClick={() => setIsMenuOpen(false)}
            className="font-heading text-4xl font-bold text-gray-900 hover:text-[var(--color-whatsapp)] transition-all tracking-tight"
          >
            Filosofi
          </a>
          <button
            onClick={handleSupportClick}
            className="font-heading text-4xl font-bold text-gray-900 hover:text-[var(--color-whatsapp)] transition-all tracking-tight focus:outline-none"
          >
            Donasi
          </button>
        </div>
      </div>

      {/* ── Main ───────────────────────────────────────────────────────────── */}
      <main className="pt-20">
        {/* Hero */}
        <section className="relative pt-24 pb-16 sm:pt-32 sm:pb-24 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
            <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
              {/* Text */}
              <div className="flex-1 text-center lg:text-left z-10 animate-fade-in">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-bold uppercase tracking-wider mb-6">
                  Bot stiker Paling Satset No 1. Di Indonesia
                </div>

                {/* Social Proof — Avatar Stack + Visitor Counter */}
                <div className="flex items-center gap-3 sm:gap-4 md:gap-5 mb-6 sm:mb-8 justify-center lg:justify-start">
                  {/* Avatar stack */}
                  <div className="flex -space-x-2.5 sm:-space-x-3 md:-space-x-3.5">
                    {[
                      { src: "/images/header_picture/windah.webp", gradient: "from-[#2AABEE] to-[#25D366]" },
                      { src: "/images/header_picture/mal.webp", gradient: "from-[#f97316] to-[#eab308]" },
                      { src: "/images/header_picture/speed.webp", gradient: "from-[#a855f7] to-[#ec4899]" },
                      { src: "/images/header_picture/kita.webp", gradient: "from-[#ef4444] to-[#f97316]" },
                      { src: "/images/header_picture/imut.webp", gradient: "from-[#06b6d4] to-[#8b5cf6]" },
                      { src: "/images/header_picture/ayanokoji.webp", gradient: "from-[#64748b] to-[#0f172a]" },
                    ].map((avatar, i) => (
                      <div
                        key={i}
                        className={`relative w-8 h-8 sm:w-10 sm:h-10 md:w-11 md:h-11 lg:w-12 lg:h-12 xl:w-13 xl:h-13 2xl:w-14 2xl:h-14 rounded-full p-[2px] sm:p-[2.5px] bg-gradient-to-br ${avatar.gradient} shadow-md transition-transform hover:scale-110 hover:z-10`}
                        style={{ zIndex: 6 - i }}
                      >
                        <img
                          src={avatar.src}
                          alt={`User ${i + 1}`}
                          className="w-full h-full rounded-full object-cover border-[1.5px] sm:border-2 border-white"
                        />
                      </div>
                    ))}
                  </div>

                  {/* Counter text */}
                  <div className="flex flex-col">
                    <span className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-gray-900 leading-tight">
                      {visitorCount !== null ? (
                        <span className="tabular-nums">{visitorCount.toLocaleString("id-ID")}++</span>
                      ) : (
                        <span className="inline-block w-10 sm:w-12 h-4 sm:h-5 bg-gray-200 rounded animate-pulse" />
                      )}
                    </span>
                    <span className="text-[10px] sm:text-xs md:text-sm text-gray-500 font-medium">pengguna sudah mencoba bot ini</span>
                  </div>
                </div>

                <h1 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 mb-8 leading-[1.15]">
                  Sulap Foto Jadi{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-telegram)] to-[var(--color-whatsapp)] text-4xl sm:text-6xl lg:text-7xl 2xl:text-8xl">
                    Stiker
                  </span>
                  <br />
                  Satset Tanpa Nunggu Lama!
                </h1>

                <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                  Bikin stiker sesimpel lo nge-chat doi. Semuanya gratis tanpa pamrih, bebas iklan yang ganggu, dan
                  privasi lo dijaga lebih rapat dari rahasia hati.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                  <a
                    href={`https://t.me/${BOT_USERNAME}`}
                    className="flex items-center gap-3 px-8 py-4 bg-[var(--color-telegram)] text-white rounded-2xl font-bold transition-all hover:scale-105 active:scale-95 shadow-lg shadow-blue-200"
                  >
                    <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                      <path d="M11.944 0C5.352 0 0 5.352 0 11.944c0 6.592 5.352 11.944 11.944 11.944 6.592 0 11.944-5.352 11.944-11.944C23.888 5.352 18.536 0 11.944 0zM17.84 8.112l-2.024 9.536c-.152.672-.552.84-1.12.52l-3.08-2.272-1.488 1.44c-.168.168-.304.304-.624.304l.224-3.16 5.752-5.192c.248-.224-.056-.344-.384-.128l-7.112 4.48-3.064-.96c-.664-.208-.68-.664.136-.984l11.976-4.624c.552-.208 1.04.128.808.88z" />
                    </svg>
                    COBA DI TELE
                  </a>
                  <a
                    href={`https://wa.me/${WA_NUMBER}?text=.help`}
                    className="flex items-center gap-3 px-8 py-4 bg-[var(--color-whatsapp)] text-white rounded-2xl font-bold transition-all hover:scale-105 active:scale-95 shadow-lg shadow-green-200"
                  >
                    <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.246 2.248 3.484 5.232 3.483 8.412-.003 6.557-5.338 11.892-11.893 11.892-1.997-.001-3.951-.5-5.688-1.448l-6.308 1.656zm6.749-3.921l.393.232c1.32.782 2.825 1.195 4.364 1.196 4.904 0 8.895-3.991 8.898-8.897.001-2.377-.924-4.612-2.606-6.294s-3.918-2.607-6.295-2.607c-4.904 0-8.896 3.991-8.898 8.897-.001 1.611.431 3.183 1.251 4.568l.273.457-1.01 3.693 3.73-.978zm11.516-5.836c-.104-.174-.383-.28-.731-.454-.347-.174-2.057-1.015-2.374-1.13-.318-.116-.549-.174-.781.174-.231.347-.893 1.13-1.094 1.361-.202.231-.403.261-.75.087-.348-.174-1.467-.541-2.793-1.724-1.031-.919-1.727-2.054-1.93-2.399-.202-.347-.021-.535.153-.708.156-.156.347-.404.522-.607.174-.202.231-.347.347-.579.117-.231.059-.434-.028-.608-.088-.174-.781-1.882-1.071-2.576-.282-.676-.57-.585-.781-.596-.202-.01-.433-.01-.666-.01-.231 0-.608.087-.927.434-.319.347-1.216 1.187-1.216 2.895 0 1.708 1.246 3.358 1.419 3.59.174.231 2.452 3.743 5.94 5.249.83.358 1.478.572 1.983.732.833.264 1.591.227 2.19.137.669-.101 2.057-.84 2.347-1.65.29-.811.29-1.506.202-1.651z" />
                    </svg>
                    COBA DI WA
                  </a>
                </div>
              </div>

              {/* 3D */}
              <div className="flex-1 w-full h-[400px] sm:h-[500px] lg:h-[550px] relative animate-fade-in delay-200 opacity-0">
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-50/50 to-purple-50/50 rounded-full blur-3xl -z-10" />
                <Boba3D />
              </div>
            </div>
          </div>
        </section>

        {/* Performance */}
        <section id="performance" className="py-20 bg-transparent border-y border-gray-100 relative z-10">
          <div className="max-w-7xl mx-auto px-6 sm:px-8">
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
              <div className="flex-1 animate-fade-in opacity-0">
                <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 lg:max-w-xl">
                  Bukan Sekadar Janji Manis Kayak Mantan.
                </h2>
                <p className="text-lg sm:text-xl text-gray-600 mb-8 leading-relaxed lg:max-w-2xl">
                  Kita buang jauh-jauh yang namanya antrean. Gambar lo langsung diproses pake{" "}
                  <strong className="text-gray-900 font-semibold">sihir teknologi</strong> tanpa mampir ke database.
                  Hasilnya? Stiker lo kelar sebelum lo sempet galauin doi.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-green-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">
                      Balasnya kilat banget, di bawah 1 detik (jauh lebih cepet dari balasan crush lo).
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-green-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">
                      Jejak lo langsung musnah secepat doi ngilang. Privasi lo aman.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-green-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">
                      Gak ada kata ngantri. Lo prioritas utama kita, bukan sekadar opsi.
                    </span>
                  </li>
                </ul>
              </div>

              <BorderGlow
                className="flex-1 w-full p-8 sm:p-10 animate-fade-in delay-200 opacity-0"
                backgroundColor="rgba(255, 255, 255, 0.8)"
                borderRadius={24}
                glowColor="200 80 80"
                colors={["#3b82f6", "#22c55e", "#a855f7"]}
                animated={true}
              >
                <h3 className="font-heading text-xl font-bold text-gray-900 mb-8">Adu Mekanik Kecepatan (Detik)</h3>
                <div className="space-y-8">
                  <div>
                    <div className="flex justify-between text-sm font-medium mb-2">
                      <span className="text-gray-900">BobaSticker</span>
                      <span className="text-gray-900 font-bold">0.8s</span>
                    </div>
                    <div className="h-4 w-full bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[var(--color-telegram)] to-[var(--color-whatsapp)] rounded-full animate-grow-width"
                        style={{ width: "15%" }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm font-medium mb-2">
                      <span className="text-gray-500">Bot Lain (Yang Bikin Emosi)</span>
                      <span className="text-gray-500 font-bold">3.5s</span>
                    </div>
                    <div className="h-4 w-full bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-gray-300 rounded-full animate-grow-width delay-100" style={{ width: "65%" }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm font-medium mb-2">
                      <span className="text-gray-500">Bot Jadul (Sering Ngantri)</span>
                      <span className="text-gray-500 font-bold">5.0s+</span>
                    </div>
                    <div className="h-4 w-full bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-gray-300 rounded-full animate-grow-width delay-200" style={{ width: "95%" }} />
                    </div>
                  </div>
                </div>
                <div className="mt-8 pt-6 border-t border-gray-100 text-xs text-gray-400">
                  *Intinya, makin pendek bar-nya, makin ngebut kita proses gambar lo.
                </div>
              </BorderGlow>
            </div>
          </div>
        </section>

        {/* ── Philosophy Carousel ─────────────────────────────────────────────── */}
        <section id="philosophy" className="py-20 overflow-hidden relative border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
              <div className="animate-fade-in opacity-0">
                <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-4">
                  Dari Hati Paling Dalam
                </h2>
                <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-lg">
                  Sat-set, aman banget, dan tanpa niat terselubung. Dibangun pake cinta dan teknologi yang paling ngertiin lo.
                </p>
              </div>

              {/* Controls */}
              <div className="hidden sm:flex gap-3 animate-fade-in delay-100 opacity-0 shrink-0">
                <button
                  onClick={scrollPrev}
                  className="w-12 h-12 flex items-center justify-center rounded-full border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 transition-colors shadow-sm"
                  aria-label="Previous slide"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={scrollNext}
                  className="w-12 h-12 flex items-center justify-center rounded-full border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 transition-colors shadow-sm"
                  aria-label="Next slide"
                >
                  <ChevronRight size={24} />
                </button>
              </div>
            </div>

            {/* Carousel */}
            <div className="animate-fade-in delay-200 opacity-0 overflow-x-clip py-10 -my-10">
              <Carousel
                ref={carouselRef}
                onChange={(index) => setCarouselIndex(index)}
                showArrows={false}
                showStatus={false}
                showThumbs={false}
                infiniteLoop={true}
                emulateTouch={true}
                swipeable={true}
                centerMode={true}
                centerSlidePercentage={centerPercentage}
                transitionTime={700}
                swipeScrollTolerance={10}
                renderIndicator={() => null}
              >
                {CARDS.map((card, i) => (
                  <div key={i} className="px-3 py-6 sm:px-4 select-none">
                    {/*
                      ── CARD FIX ────────────────────────────────────────────
                      • Buang paddingBottom 100% + absolute trick — ganti flex col natural
                      • min-h buat konsistensi tinggi antar card di desktop
                      • text sizes pakai sm:/lg: tanpa line-clamp supaya ga kepotong
                      • gap antar elemen proporsional via space-y / gap
                    */}
                    <div
                      className={`
                        relative w-full mx-auto
                        bg-gradient-to-br ${card.from} ${card.to}
                        border ${card.border}
                        rounded-[1.75rem]
                        shadow-lg ${card.shadow}
                        flex flex-col justify-between
                        gap-6
                        p-6 sm:p-8
                        min-h-[260px] sm:min-h-[300px] lg:min-h-[320px]
                        text-left
                        transition-transform duration-300
                        hover:scale-[1.02]
                        overflow-hidden
                        group
                      `}
                    >
                      {/* Top: icon + text */}
                      <div className="flex flex-col gap-3">
                        {/* Icon pill */}
                        <div className="w-11 h-11 sm:w-13 sm:h-13 bg-white rounded-2xl flex items-center justify-center text-xl shadow-sm border border-gray-100 shrink-0 self-start">
                          {card.emoji}
                        </div>

                        {/* Title */}
                        <h3 className="font-heading text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 leading-snug">
                          {card.title}
                        </h3>

                        {/* Description */}
                        <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                          {card.desc}
                        </p>
                      </div>

                      {/* Bottom: badge */}
                      <div className={`text-[10px] uppercase tracking-widest font-bold opacity-60 ${card.badgeColor}`}>
                        {card.badge}
                      </div>

                      {/* Subtle decorative blob */}
                      <div
                        className="absolute -bottom-6 -right-6 w-28 h-28 rounded-full opacity-20 blur-2xl pointer-events-none"
                        style={{ background: "currentColor" }}
                      />
                    </div>
                  </div>
                ))}
              </Carousel>
            </div>

            {/* Dot indicators */}
            <div className="flex justify-center gap-2 mt-6">
              {CARDS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => carouselRef.current?.moveTo(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className={`transition-all duration-300 rounded-full ${carouselIndex === i
                      ? "w-6 h-2 bg-gray-800"
                      : "w-2 h-2 bg-gray-300 hover:bg-gray-400"
                    }`}
                />
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* ── Footer ─────────────────────────────────────────────────────────── */}
      <footer className="relative py-20 bg-transparent">
        <div className="absolute inset-0 z-0 opacity-50 pointer-events-none">
          <DotField dotRadius={1.5} dotSpacing={25} cursorForce={0.8} bulgeStrength={80} glowRadius={70} />
        </div>
        <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
            <div className="flex flex-col items-center md:items-start gap-4">
              <span className="font-heading font-black text-2xl sm:text-3xl tracking-tighter text-gray-900 uppercase">
                BobaSticker
              </span>
              <p className="text-sm text-gray-500 max-w-xs leading-relaxed">
                Bot stiker paling satset no 1 di Wakanda. Yuk coba sekarang di WA atau Telegram!
              </p>
            </div>
            <div className="flex flex-col items-center md:items-end gap-2">
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 flex items-center gap-2">
                Developed with
                <a
                  href="https://www.instagram.com/bdn_bnj?igsh=MXdkZmRiejkwYTNjeQ=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block transition-all active:scale-90 group"
                  aria-label="Instagram"
                >
                  <img
                    src="/images/boba.jpg"
                    alt="Boba"
                    className="w-6 h-6 rounded-full object-cover border border-gray-200 shadow-sm transition-all group-hover:ring-2 group-hover:ring-[var(--color-telegram)] group-hover:ring-offset-2"
                  />
                </a>
              </p>
              <p className="text-sm text-gray-600">
                © {new Date().getFullYear()} BobaSticker. Dibuat sepenuh hati bareng kopi dan Mendoan.
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Scroll to Top */}
      {showScrollTop && !isMenuOpen && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 p-4 bg-gray-900 text-white rounded-2xl shadow-2xl hover:scale-110 active:scale-95 transition-all animate-fade-in"
          aria-label="Scroll to top"
        >
          <ArrowUp size={24} />
        </button>
      )}

      {/* Toast Notifications */}
      <div className="fixed top-6 right-6 z-[100] flex flex-col gap-3 pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`flex items-center gap-3 px-6 py-4 bg-white/90 backdrop-blur-xl border border-green-100 shadow-[0_8px_30px_rgb(0,0,0,0.08)] rounded-2xl pointer-events-auto min-w-[300px] max-w-sm transition-all duration-500 ${toast.isExiting ? "animate-toast-out" : "animate-toast-in"
              }`}
          >
            <div className="w-10 h-10 rounded-xl overflow-hidden shrink-0 border border-gray-100">
              <img src="/images/icon.jpg" alt="Logo" className="w-full h-full object-cover" />
            </div>
            <p className="text-sm font-semibold text-gray-800 leading-snug">{toast.message}</p>
          </div>
        ))}
      </div>

      <style jsx global>{`
        @keyframes toast-in {
          from { opacity: 0; transform: translateX(100px) scale(0.9); }
          to   { opacity: 1; transform: translateX(0)     scale(1);   }
        }
        @keyframes toast-out {
          from { opacity: 1; transform: translateX(0)     scale(1);   }
          to   { opacity: 0; transform: translateX(100px) scale(0.9); }
        }
        .animate-toast-in  { animation: toast-in  0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-toast-out { animation: toast-out 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; }

        /* Carousel override — hapus overflow hidden bawaan library */
        .carousel .slide { overflow: visible !important; }
        .carousel-root   { overflow: visible !important; }
        .carousel        { overflow: visible !important; }
        .carousel .slider-wrapper { overflow: visible !important; }
      `}</style>
    </div>
  );
}
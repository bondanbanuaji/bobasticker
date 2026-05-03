/**
 * BobaSticker 3.0 - All Rights Reserved
 * Copyright (c) 2026 BobaSticker
 * Dilarang keras menyalin atau mendistribusikan kode tanpa izin.
 */
"use client";

import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { Menu, X, ArrowUp, ChevronLeft, ChevronRight } from "lucide-react";

// Dynamically import 3D component to avoid SSR issues
const Boba3D = dynamic(() => import("./components/Boba3D"), { ssr: false });

export default function Home() {
  const BOT_USERNAME = "BobaSticker_bot";
  const WA_NUMBER = "6283190230065";
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollNext = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 320, behavior: "smooth" });
    }
  };

  const scrollPrev = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -320, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 overflow-x-hidden selection:bg-gray-200">
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🧋</span>
              <span className="font-heading font-bold text-xl tracking-tight text-gray-900">BobaSticker</span>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              <a href="#performance" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">Keunggulan</a>
              <a href="#philosophy" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">Filosofi</a>
            </div>

            {/* Mobile Burger Icon */}
            <button 
              className="md:hidden z-50 p-2 text-gray-600 hover:text-gray-900"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 flex flex-col items-center justify-center animate-fade-in md:hidden">
          {/* Aesthetic Background */}
          <div className="absolute inset-0 bg-white/90 backdrop-blur-2xl"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-telegram)]/10 via-transparent to-[var(--color-whatsapp)]/10"></div>
          
          <div className="flex flex-col items-center gap-10 scale-in-center relative z-10">
            <a 
              href="#performance" 
              onClick={() => setIsMenuOpen(false)}
              className="font-heading text-4xl sm:text-5xl font-bold text-gray-900 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-[var(--color-telegram)] hover:to-[var(--color-whatsapp)] transition-all tracking-tight"
            >
              Keunggulan
            </a>
            <a 
              href="#philosophy" 
              onClick={() => setIsMenuOpen(false)}
              className="font-heading text-4xl sm:text-5xl font-bold text-gray-900 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-[var(--color-telegram)] hover:to-[var(--color-whatsapp)] transition-all tracking-tight"
            >
              Filosofi
            </a>
          </div>
        </div>
      )}

      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative pt-20 pb-32 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
              
              {/* Text Side */}
              <div className="flex-1 text-center lg:text-left z-10 animate-fade-in">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-bold uppercase tracking-wider mb-6">
                  No.1 Sticker Bot Engine
                </div>
                <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900 mb-8 leading-[1.1]">
                  Ubah Foto Jadi <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-telegram)] to-[var(--color-whatsapp)]">Stiker</span> Secara Instan.
                </h1>
                <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                  Bikin stiker Telegram & WhatsApp semudah kirim pesan. Gratis selamanya, tanpa iklan, dan tanpa simpan data pribadi Anda.
                </p>
                
                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                  <a 
                    href={`https://t.me/${BOT_USERNAME}`}
                    className="flex items-center gap-3 px-8 py-4 bg-[var(--color-telegram)] text-white rounded-2xl font-bold transition-all hover:scale-105 active:scale-95 shadow-lg shadow-blue-200"
                  >
                    <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M11.944 0C5.352 0 0 5.352 0 11.944c0 6.592 5.352 11.944 11.944 11.944 6.592 0 11.944-5.352 11.944-11.944C23.888 5.352 18.536 0 11.944 0zM17.84 8.112l-2.024 9.536c-.152.672-.552.84-1.12.52l-3.08-2.272-1.488 1.44c-.168.168-.304.304-.624.304l.224-3.16 5.752-5.192c.248-.224-.056-.344-.384-.128l-7.112 4.48-3.064-.96c-.664-.208-.68-.664.136-.984l11.976-4.624c.552-.208 1.04.128.808.88z"/></svg>
                    BOT TELEGRAM
                  </a>
                  <a 
                    href={`https://wa.me/${WA_NUMBER}`}
                    className="flex items-center gap-3 px-8 py-4 bg-[var(--color-whatsapp)] text-white rounded-2xl font-bold transition-all hover:scale-105 active:scale-95 shadow-lg shadow-green-200"
                  >
                    <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.246 2.248 3.484 5.232 3.483 8.412-.003 6.557-5.338 11.892-11.893 11.892-1.997-.001-3.951-.5-5.688-1.448l-6.308 1.656zm6.749-3.921l.393.232c1.32.782 2.825 1.195 4.364 1.196 4.904 0 8.895-3.991 8.898-8.897.001-2.377-.924-4.612-2.606-6.294s-3.918-2.607-6.295-2.607c-4.904 0-8.896 3.991-8.898 8.897-.001 1.611.431 3.183 1.251 4.568l.273.457-1.01 3.693 3.73-.978zm11.516-5.836c-.104-.174-.383-.28-.731-.454-.347-.174-2.057-1.015-2.374-1.13-.318-.116-.549-.174-.781.174-.231.347-.893 1.13-1.094 1.361-.202.231-.403.261-.75.087-.348-.174-1.467-.541-2.793-1.724-1.031-.919-1.727-2.054-1.93-2.399-.202-.347-.021-.535.153-.708.156-.156.347-.404.522-.607.174-.202.231-.347.347-.579.117-.231.059-.434-.028-.608-.088-.174-.781-1.882-1.071-2.576-.282-.676-.57-.585-.781-.596-.202-.01-.433-.01-.666-.01-.231 0-.608.087-.927.434-.319.347-1.216 1.187-1.216 2.895 0 1.708 1.246 3.358 1.419 3.59.174.231 2.452 3.743 5.94 5.249.83.358 1.478.572 1.983.732.833.264 1.591.227 2.19.137.669-.101 2.057-.84 2.347-1.65.29-.811.29-1.506.202-1.651z"/></svg>
                    BOT WHATSAPP
                  </a>
                </div>
              </div>

              {/* 3D Side */}
              <div className="flex-1 w-full h-[400px] sm:h-[500px] lg:h-[600px] relative animate-fade-in delay-200 opacity-0">
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-50/50 to-purple-50/50 rounded-full blur-3xl -z-10"></div>
                <Boba3D />
              </div>

            </div>
          </div>
        </section>

        {/* Performance Comparison */}
        <section id="performance" className="py-24 bg-gray-50 border-y border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-16 items-center">
              
              <div className="flex-1 animate-fade-in opacity-0">
                <h2 className="font-heading text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                  Superioritas yang terukur.
                </h2>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  Kami membuang *antrean* (*queue*), melompati *database*, dan merender stiker Anda langsung di dalam memori server menggunakan <strong className="text-gray-900 font-semibold">C++ Sharp Engine</strong>. Hasilnya? Kinerja yang mustahil dikalahkan oleh bot standar.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-green-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    <span className="text-gray-700">Waktu respons di bawah 1 detik.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-green-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    <span className="text-gray-700">Data otomatis terhapus seketika (0 detik retensi).</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-green-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    <span className="text-gray-700">Kapasitas pemrosesan tanpa batas antrean.</span>
                  </li>
                </ul>
              </div>

              <div className="flex-1 w-full bg-white p-8 sm:p-10 rounded-3xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-gray-100 animate-fade-in delay-200 opacity-0">
                <h3 className="font-heading text-xl font-bold text-gray-900 mb-8">Waktu Pemrosesan (Detik)</h3>
                
                <div className="space-y-8">
                  {/* BobaSticker Bar */}
                  <div>
                    <div className="flex justify-between text-sm font-medium mb-2">
                      <span className="text-gray-900">BobaSticker</span>
                      <span className="text-gray-900 font-bold">0.8s</span>
                    </div>
                    <div className="h-4 w-full bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-[var(--color-telegram)] to-[var(--color-whatsapp)] rounded-full animate-grow-width" style={{ width: "15%" }}></div>
                    </div>
                  </div>

                  {/* Competitor A Bar */}
                  <div>
                    <div className="flex justify-between text-sm font-medium mb-2">
                      <span className="text-gray-500">Bot Standar (Python/Node)</span>
                      <span className="text-gray-500 font-bold">3.5s</span>
                    </div>
                    <div className="h-4 w-full bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-gray-300 rounded-full animate-grow-width delay-100" style={{ width: "65%" }}></div>
                    </div>
                  </div>

                  {/* Competitor B Bar */}
                  <div>
                    <div className="flex justify-between text-sm font-medium mb-2">
                      <span className="text-gray-500">Bot dengan Database Queue</span>
                      <span className="text-gray-500 font-bold">5.0s+</span>
                    </div>
                    <div className="h-4 w-full bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-gray-300 rounded-full animate-grow-width delay-200" style={{ width: "95%" }}></div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-100 text-xs text-gray-400">
                  *Berdasarkan tes internal konversi gambar PNG 2MB ke WebP 512x512. Semakin pendek grafik, semakin baik.
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Philosophy Carousel */}
        <section id="philosophy" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden relative">
          <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-6">
            <div className="animate-fade-in opacity-0">
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Filosofi Kami</h2>
              <p className="text-lg text-gray-600 max-w-xl">Cepat, aman, dan tanpa biaya tersembunyi. Dibangun dengan integritas <em className="font-medium text-gray-800">engineering</em> modern.</p>
            </div>
            
            {/* Carousel Controls (Hidden on small mobile for touch focus) */}
            <div className="hidden sm:flex gap-3 animate-fade-in delay-100 opacity-0">
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

          {/* Carousel Track */}
          <div 
            ref={carouselRef}
            className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-6 pb-8 -mx-4 px-4 sm:mx-0 sm:px-0 animate-fade-in delay-200 opacity-0"
          >
            {/* Card 1 */}
            <div className="min-w-[85vw] sm:min-w-[340px] max-w-[340px] shrink-0 snap-center sm:snap-start bg-gradient-to-b from-blue-50 to-white p-8 rounded-[2rem] border border-blue-100/50 shadow-[0_8px_30px_-12px_rgba(59,130,246,0.12)]">
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-2xl shadow-sm border border-gray-100 mb-6">💸</div>
              <h3 className="font-heading text-xl font-bold text-gray-900 mb-3">100% Gratis Selamanya</h3>
              <p className="text-gray-600 leading-relaxed">Tidak ada paket premium, tidak ada batasan kuota harian. Anda berhak mendapatkan layanan terbaik tanpa harus membayar.</p>
            </div>

            {/* Card 2 */}
            <div className="min-w-[85vw] sm:min-w-[340px] max-w-[340px] shrink-0 snap-center sm:snap-start bg-gradient-to-b from-purple-50 to-white p-8 rounded-[2rem] border border-purple-100/50 shadow-[0_8px_30px_-12px_rgba(168,85,247,0.12)]">
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-2xl shadow-sm border border-gray-100 mb-6">🔒</div>
              <h3 className="font-heading text-xl font-bold text-gray-900 mb-3">Privasi Mutlak</h3>
              <p className="text-gray-600 leading-relaxed">Arsitektur <em className="font-medium text-gray-800">stateless</em> kami memproses gambar Anda secara <em className="font-medium text-gray-800">in-memory</em> dan menghapusnya permanen dalam hitungan detik.</p>
            </div>

            {/* Card 3 */}
            <div className="min-w-[85vw] sm:min-w-[340px] max-w-[340px] shrink-0 snap-center sm:snap-start bg-gradient-to-b from-amber-50 to-white p-8 rounded-[2rem] border border-amber-100/50 shadow-[0_8px_30px_-12px_rgba(245,158,11,0.12)]">
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-2xl shadow-sm border border-gray-100 mb-6">⚡</div>
              <h3 className="font-heading text-xl font-bold text-gray-900 mb-3">Kinerja Secepat Kilat</h3>
              <p className="text-gray-600 leading-relaxed">Ditenagai oleh pustaka pemrosesan gambar C++ (Sharp) yang menjamin waktu respon kurang dari 1 detik per operasi.</p>
            </div>

            {/* Card 4 */}
            <div className="min-w-[85vw] sm:min-w-[340px] max-w-[340px] shrink-0 snap-center sm:snap-start bg-gradient-to-b from-emerald-50 to-white p-8 rounded-[2rem] border border-emerald-100/50 shadow-[0_8px_30px_-12px_rgba(16,185,129,0.12)]">
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-2xl shadow-sm border border-gray-100 mb-6">📱</div>
              <h3 className="font-heading text-xl font-bold text-gray-900 mb-3">Multi Platform</h3>
              <p className="text-gray-600 leading-relaxed">Tersedia secara <em className="font-medium text-gray-800">native</em> di chat harian Anda. Tidak perlu mengunduh aplikasi pihak ketiga yang memenuhi memori HP.</p>
            </div>
            
            {/* Padding element for right scroll spacing on desktop */}
            <div className="hidden sm:block min-w-[1px] shrink-0"></div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-100 bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xl">🧋</span>
            <span className="font-heading font-bold text-xl tracking-tight text-gray-900">BobaSticker</span>
          </div>
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} BobaSticker. Crafted with precision.
          </p>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 p-4 bg-gray-900 text-white rounded-2xl shadow-2xl hover:scale-110 active:scale-95 transition-all animate-fade-in"
          aria-label="Scroll to top"
        >
          <ArrowUp size={24} />
        </button>
      )}
    </div>
  );
}

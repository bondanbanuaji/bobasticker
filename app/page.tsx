"use client";

import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { Menu, X, ArrowUp, ChevronLeft, ChevronRight } from "lucide-react";

// Dynamically import 3D component to avoid SSR issues
const Boba3D = dynamic(() => import("./components/Boba3D"), { ssr: false });

export default function Home() {
  const BOT_USERNAME = "BobaSticker_bot";
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
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
      
      {/* Navbar */}
      <nav className="w-full border-b border-gray-100 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2 z-50">
              <span className="text-2xl">🧋</span>
              <span className="font-heading font-bold text-xl tracking-tight text-gray-900">BobaSticker</span>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              <a href="#performance" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">Keunggulan</a>
              <a href="#features" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">Fitur</a>
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
              href="#features" 
              onClick={() => setIsMenuOpen(false)}
              className="font-heading text-4xl sm:text-5xl font-bold text-gray-900 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-[var(--color-telegram)] hover:to-[var(--color-whatsapp)] transition-all tracking-tight"
            >
              Fitur
            </a>
          </div>
        </div>
      )}

      <main>
        {/* Hero Section */}
        <section className="relative pt-16 pb-24 lg:pt-24 lg:pb-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16 2xl:gap-24">
            
            {/* Left Content */}
            <div className="flex-1 text-center lg:text-left z-10 animate-fade-in opacity-0">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-50 border border-gray-200 text-sm font-medium text-gray-700 mb-8">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                Kini hadir di WhatsApp!
              </div>
              
              <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl 2xl:text-8xl font-bold tracking-tight text-gray-900 leading-[1.1] mb-6">
                Ubah fotomu <br className="hidden sm:block" />
                jadi stiker <span className="text-gray-400">instan.</span>
              </h1>
              
              <p className="text-lg sm:text-xl text-gray-600 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Kirim foto apa saja ke bot Telegram atau WhatsApp kami, dan dapatkan stiker <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm text-gray-800 font-mono">.webp</code> transparan berkualitas tinggi. Sepenuhnya gratis.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <a 
                  href={`https://t.me/${BOT_USERNAME}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-[var(--color-telegram)] hover:bg-[var(--color-telegram-hover)] text-white font-semibold text-lg shadow-sm transition-all hover:-translate-y-0.5 active:translate-y-0"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" /></svg>
                  Bot Telegram
                </a>
                <a 
                  href="https://wa.me/6283190230065?text=.help"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-[var(--color-whatsapp)] hover:bg-[var(--color-whatsapp-hover)] text-white font-semibold text-lg shadow-sm transition-all hover:-translate-y-0.5 active:translate-y-0"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg>
                  Bot WhatsApp
                </a>
              </div>
              <p className="mt-6 text-sm text-gray-500 font-medium">Bergabung dengan 10.000+ pengguna lainnya.</p>
            </div>

            {/* Right Content: 3D Canvas */}
            <div className="flex-1 w-full flex justify-center lg:justify-end animate-fade-in delay-200 opacity-0 relative">
              <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-xl h-[350px] sm:h-[450px] lg:h-[600px] relative px-4 sm:px-0">
                <div className="absolute inset-0 bg-gradient-to-tr from-gray-100 to-transparent rounded-full blur-3xl opacity-50 pointer-events-none"></div>
                {/* 3D Canvas Container - Added lateral padding for mobile touch scroll area */}
                <div className="w-full h-full relative z-10">
                   <Boba3D />
                </div>
                <div className="absolute bottom-0 sm:bottom-4 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-sm border border-gray-200 text-gray-600 text-xs px-3 py-1.5 rounded-full shadow-sm pointer-events-none z-20">
                  Seret untuk memutar
                </div>
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
            <span className="font-heading font-bold text-gray-900">BobaSticker</span>
          </div>
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} BobaSticker. Crafted with precision.
          </p>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-6 right-6 p-3 rounded-full bg-gray-900 text-white shadow-lg hover:bg-gray-800 transition-all duration-300 z-50 ${
          showScrollTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
        }`}
        aria-label="Scroll to top"
      >
        <ArrowUp size={20} />
      </button>

    </div>
  );
}

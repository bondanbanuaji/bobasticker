"use client";

import dynamic from "next/dynamic";

// Dynamically import 3D component to avoid SSR issues
const Boba3D = dynamic(() => import("./components/Boba3D"), { ssr: false });

export default function Home() {
  const BOT_USERNAME = "BobaSticker_bot";

  return (
    <div className="min-h-screen bg-base-100 overflow-hidden font-sans">
      
      {/* Navbar */}
      <div className="navbar bg-base-100/80 backdrop-blur-md sticky top-0 z-50 shadow-sm px-6">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl font-bold gap-2">
            <span className="text-3xl">🧋</span> BobaSticker
          </a>
        </div>
        <div className="flex-none gap-2">
          <a href="#features" className="btn btn-ghost hidden sm:flex">Fitur</a>
          <a href="#how-it-works" className="btn btn-ghost hidden sm:flex">Cara Kerja</a>
        </div>
      </div>

      {/* Hero Section */}
      <div className="hero min-h-[85vh] relative">
        {/* Decorative background blobs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-float"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-secondary/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-float-delay"></div>

        <div className="hero-content flex-col lg:flex-row-reverse w-full max-w-6xl z-10 gap-12">
          
          {/* 3D Canvas (Right Side) */}
          <div className="w-full lg:w-1/2 flex justify-center items-center">
            <div className="w-full max-w-md relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary to-secondary opacity-30 blur-2xl rounded-full"></div>
              <Boba3D />
              <div className="absolute bottom-10 left-1/2 -translate-x-1/2 badge badge-neutral animate-bounce">
                👆 Geser & Putar Boba-nya!
              </div>
            </div>
          </div>

          {/* Text Content (Left Side) */}
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <div className="badge badge-secondary badge-lg mb-6 shadow-sm">
              ✨ Update Baru: WhatsApp Bot!
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-extrabold text-base-content leading-tight mb-6">
              Bikin Stiker Instan <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                Lebih Cepat & Asyik!
              </span>
            </h1>
            
            <p className="py-6 text-xl text-base-content/70 font-medium">
              Kirim foto apa aja ke bot Telegram atau WhatsApp kami, dan terima stiker <code className="kbd">.webp</code> berkualitas tinggi dalam hitungan detik. Gratis selamanya!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mt-4">
              <a 
                href={`https://t.me/${BOT_USERNAME}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary btn-lg rounded-full shadow-lg hover:shadow-primary/50 transition-all hover:-translate-y-1"
              >
                <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" /></svg>
                Bot Telegram
              </a>
              <a 
                href="https://wa.me/6283190230065?text=.help"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline btn-accent btn-lg rounded-full hover:-translate-y-1 transition-transform"
              >
                <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg>
                Bot WhatsApp
              </a>
            </div>
            
            <div className="mt-8 flex items-center justify-center lg:justify-start gap-4 text-base-content/60 text-sm">
              <div className="flex -space-x-3">
                <div className="avatar"><div className="w-8 rounded-full border-2 border-base-100"><img src="https://ui-avatars.com/api/?name=User+1&background=random" alt="user"/></div></div>
                <div className="avatar"><div className="w-8 rounded-full border-2 border-base-100"><img src="https://ui-avatars.com/api/?name=User+2&background=random" alt="user"/></div></div>
                <div className="avatar"><div className="w-8 rounded-full border-2 border-base-100"><img src="https://ui-avatars.com/api/?name=User+3&background=random" alt="user"/></div></div>
              </div>
              <p>Telah digunakan oleh <b>10,000+</b> boba lovers!</p>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Accordion / Features Section */}
      <div id="features" className="bg-base-200 py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-base-content mb-4">Kenapa BobaSticker? 🧋</h2>
            <p className="text-lg text-base-content/70">Lebih gampang dari nyeduh teh boba.</p>
          </div>

          <div className="join join-vertical w-full bg-base-100 shadow-xl rounded-2xl">
            <div className="collapse collapse-arrow join-item border-base-300 border-b">
              <input type="radio" name="my-accordion-4" defaultChecked /> 
              <div className="collapse-title text-xl font-bold flex items-center gap-3">
                💸 Gratis Sepenuhnya
              </div>
              <div className="collapse-content text-base-content/80"> 
                <p>Nggak ada langganan, nggak ada watermark. Kamu bisa bikin stiker sebanyak mungkin tanpa batasan sama sekali.</p>
              </div>
            </div>
            <div className="collapse collapse-arrow join-item border-base-300 border-b">
              <input type="radio" name="my-accordion-4" /> 
              <div className="collapse-title text-xl font-bold flex items-center gap-3">
                🔒 Privasi Aman (Stateless)
              </div>
              <div className="collapse-content text-base-content/80"> 
                <p>Foto kamu tidak pernah disimpan di database kami. Semuanya diproses in-memory dan langsung dihapus sedetik setelah stiker terkirim.</p>
              </div>
            </div>
            <div className="collapse collapse-arrow join-item">
              <input type="radio" name="my-accordion-4" /> 
              <div className="collapse-title text-xl font-bold flex items-center gap-3">
                🚀 Multi-Platform & Super Cepat
              </div>
              <div className="collapse-content text-base-content/80"> 
                <p>Dukung Telegram dan WhatsApp. Ditenagai oleh engine Sharp yang bisa meresize gambar ke 512x512 dalam hitungan milidetik.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Cards: How it Works */}
      <div id="how-it-works" className="py-24 px-6 bg-base-100">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-base-content mb-4">Cara Kerja</h2>
            <p className="text-lg text-base-content/70">3 langkah ajaib, semudah 1-2-3!</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card bg-base-100 border border-base-300 shadow-xl hover:-translate-y-2 transition-transform duration-300 group">
              <figure className="px-10 pt-10">
                <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center text-4xl group-hover:scale-110 transition-transform">📸</div>
              </figure>
              <div className="card-body items-center text-center">
                <h2 className="card-title text-2xl mb-2">1. Kirim Gambar</h2>
                <p className="text-base-content/70">Pilih foto lucu temanmu, lalu kirim ke bot di Telegram atau WhatsApp.</p>
              </div>
            </div>

            <div className="card bg-base-100 border border-base-300 shadow-xl hover:-translate-y-2 transition-transform duration-300 group">
              <figure className="px-10 pt-10">
                <div className="w-24 h-24 rounded-full bg-secondary/10 flex items-center justify-center text-4xl group-hover:rotate-12 transition-transform">⚙️</div>
              </figure>
              <div className="card-body items-center text-center">
                <h2 className="card-title text-2xl mb-2">2. Diproses Otomatis</h2>
                <p className="text-base-content/70">Sistem cerdas kami akan crop, resize, dan ubah format gambar jadi WebP.</p>
              </div>
            </div>

            <div className="card bg-base-100 border border-base-300 shadow-xl hover:-translate-y-2 transition-transform duration-300 group">
              <figure className="px-10 pt-10">
                <div className="w-24 h-24 rounded-full bg-accent/10 flex items-center justify-center text-4xl group-hover:scale-110 transition-transform">🎉</div>
              </figure>
              <div className="card-body items-center text-center">
                <h2 className="card-title text-2xl mb-2">3. Nikmati Stiker</h2>
                <p className="text-base-content/70">Terima stiker seketika. Tap "Add to Favorites" dan siap disebar di grup!</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer footer-center p-10 bg-base-200 text-base-content rounded">
        <div className="flex gap-4">
          <span className="text-3xl">🧋</span>
          <p className="font-bold text-xl">BobaSticker Bot</p>
        </div>
        <p className="text-base-content/70">Copyright © {new Date().getFullYear()} - Dibuat dengan 💖 Next.js & DaisyUI</p>
      </footer>

    </div>
  );
}

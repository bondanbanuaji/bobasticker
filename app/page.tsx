export default function Home() {
  const BOT_USERNAME = "BobaSticker_bot"; 

  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Background grid + gradient overlay */}
      <div className="pointer-events-none fixed inset-0 z-0">
        {/* Gradient orbs */}
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-[#6c5ce7]/20 blur-[128px] animate-float" />
        <div
          className="absolute -right-32 top-1/3 h-80 w-80 rounded-full bg-[#00cec9]/15 blur-[128px]"
          style={{ animationDelay: "2s", animation: "float 8s ease-in-out infinite" }}
        />
        <div
          className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-[#fd79a8]/10 blur-[128px]"
          style={{ animationDelay: "4s", animation: "float 7s ease-in-out infinite" }}
        />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
      </div>

      {/* Hero Section */}
      <section className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center">
        {/* Badge */}
        <div className="animate-fade-in-up mb-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-white/70 backdrop-blur-sm">
            <span className="inline-block h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            Bot Telegram & WhatsApp Gratis
          </span>
        </div>

        {/* Sticker emoji floating */}
        <div className="animate-fade-in-up-delay-1 mb-6">
          <div className="animate-sticker-bounce text-7xl sm:text-8xl select-none">
            🖼️
          </div>
        </div>

        {/* Heading */}
        <h1 className="animate-fade-in-up-delay-1 max-w-3xl text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
          <span className="bg-gradient-to-r from-[#6c5ce7] via-[#a29bfe] to-[#00cec9] bg-clip-text text-transparent">
            Foto Jadi Stiker
          </span>
          <br />
          <span className="text-white">Dalam Sekejap</span>
        </h1>

        {/* Subtitle */}
        <p className="animate-fade-in-up-delay-2 mt-6 max-w-xl text-lg text-white/50 sm:text-xl">
          Kirim foto ke bot Telegram atau WhatsApp → terima stiker{" "}
          <code className="rounded bg-white/5 px-1.5 py-0.5 text-sm font-mono text-[#a29bfe]">
            .webp 512×512
          </code>{" "}
          siap pakai. Tanpa login, tanpa bayar. Selamanya gratis.
        </p>

        {/* CTA Button */}
        <div className="animate-fade-in-up-delay-3 mt-10 flex flex-col items-center gap-4 sm:flex-row">
          {/* Telegram Button */}
          <a
            id="start-bot-button"
            href={`https://t.me/${BOT_USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-3 overflow-hidden rounded-xl bg-[#2AABEE] hover:bg-[#229ED9] px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(42,171,238,0.4)]"
          >
            <svg
              className="h-6 w-6 transition-transform group-hover:rotate-12"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
            </svg>
            Telegram
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
          </a>

          {/* WhatsApp Button */}
          <a
            id="start-wa-button"
            href="https://wa.me/6283190230065?text=.help"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-3 overflow-hidden rounded-xl bg-[#25D366] hover:bg-[#128C7E] px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(37,211,102,0.4)]"
          >
            <svg
              className="h-6 w-6 transition-transform group-hover:rotate-12"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
            WhatsApp
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
          </a>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 animate-bounce text-white/20">
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* How It Works */}
      <section className="relative z-10 px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-16 text-center text-3xl font-bold text-white sm:text-4xl">
            Cara Kerja
          </h2>

          <div className="grid gap-8 sm:grid-cols-3">
            {[
              {
                step: "01",
                emoji: "📸",
                title: "Kirim Foto",
                desc: "Buka bot di Telegram atau WhatsApp, kirim foto apa saja dari galeri atau kamera kamu.",
              },
              {
                step: "02",
                emoji: "⚡",
                title: "Proses Otomatis",
                desc: "Bot resize ke 512×512, convert ke .webp, semua in-memory tanpa menyimpan data.",
              },
              {
                step: "03",
                emoji: "⭐",
                title: "Terima Stiker",
                desc: "Stiker dikirim balik dalam hitungan detik. Tap & hold → Add to Favorites!",
              },
            ].map((item) => (
              <div
                key={item.step}
                id={`step-${item.step}`}
                className="group relative rounded-2xl border border-white/5 bg-white/[0.02] p-8 backdrop-blur-sm transition-all duration-300 hover:border-[#6c5ce7]/30 hover:bg-white/[0.04] hover:shadow-[0_0_30px_rgba(108,92,231,0.1)]"
              >
                <span className="absolute -top-3 left-6 rounded-full bg-gradient-to-r from-[#6c5ce7] to-[#00cec9] px-3 py-1 text-xs font-bold text-white">
                  {item.step}
                </span>
                <div className="mb-4 text-5xl transition-transform duration-300 group-hover:scale-110">
                  {item.emoji}
                </div>
                <h3 className="mb-2 text-xl font-semibold text-white">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-white/40">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="relative z-10 px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-16 text-center text-3xl font-bold text-white sm:text-4xl">
            Kenapa BobaSticker?
          </h2>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: "💸",
                title: "Gratis Selamanya",
                desc: "Tanpa biaya, tanpa premium, tanpa batasan.",
              },
              {
                icon: "🔒",
                title: "Privasi Terjaga",
                desc: "Foto tidak disimpan. Proses di memory, langsung dibuang.",
              },
              {
                icon: "🚀",
                title: "Super Cepat",
                desc: "Proses kurang dari 1 detik menggunakan Sharp.",
              },
              {
                icon: "📐",
                title: "Ukuran Sempurna",
                desc: "Otomatis 512×512 dengan padding transparan.",
              },
            ].map((item) => (
              <div
                key={item.title}
                id={`feature-${item.title.toLowerCase().replace(/\s/g, "-")}`}
                className="group rounded-xl border border-white/5 bg-white/[0.02] p-6 text-center transition-all duration-300 hover:border-[#00cec9]/20 hover:bg-white/[0.04]"
              >
                <div className="mb-3 text-4xl transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6">
                  {item.icon}
                </div>
                <h3 className="mb-1 font-semibold text-white">{item.title}</h3>
                <p className="text-sm text-white/40">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 px-6 py-12">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 text-center">
          <p className="text-sm text-white/30">
            Dibuat dengan{" "}
            <span className="text-[#a29bfe]">Next.js</span> +{" "}
            <span className="text-[#00cec9]">Sharp</span> · Deploy di Vercel
          </p>
          <p className="text-xs text-white/15">
            © {new Date().getFullYear()} BobaSticker. Serverless & Stateless.
          </p>
        </div>
      </footer>
    </main>
  );
}

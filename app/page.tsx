export default function Home() {
  const BOT_USERNAME = "BobaSticker_bot"; 

  return (
    <div className="min-h-screen bg-[var(--background)] selection:bg-white/20">
      <main className="mx-auto max-w-5xl px-6 py-24 sm:py-32 lg:px-8">
        
        {/* Hero Section */}
        <section className="animate-slide-up flex flex-col items-start max-w-3xl">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-2 w-2 items-center justify-center rounded-full bg-[var(--foreground)]">
              <div className="h-1.5 w-1.5 rounded-full bg-[var(--background)]"></div>
            </div>
            <span className="text-sm font-medium text-[var(--text-secondary)] tracking-wide uppercase">
              BobaSticker 1.0
            </span>
          </div>
          
          <h1 className="text-5xl font-semibold tracking-tight text-[var(--foreground)] sm:text-7xl mb-8 leading-[1.1]">
            Turn images into stickers. <br className="hidden sm:block" />
            <span className="text-[var(--text-secondary)]">Zero friction.</span>
          </h1>
          
          <p className="text-lg text-[var(--text-secondary)] mb-12 max-w-xl leading-relaxed">
            A relentless bot that takes any image and returns a perfectly cropped 512×512 <code className="text-sm font-mono bg-[var(--surface)] border border-[var(--border)] px-1.5 py-0.5 rounded text-[var(--text-primary)]">.webp</code> sticker. No sign-ups, no apps, no fees. Just pure utility.
          </p>

          <div className="flex flex-col sm:flex-row items-start gap-4 w-full sm:w-auto">
            {/* Telegram Button */}
            <a
              id="start-bot-button"
              href={`https://t.me/${BOT_USERNAME}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 rounded-lg bg-[var(--foreground)] text-[var(--background)] px-6 py-3 font-medium transition-transform duration-200 hover:scale-[0.98] w-full sm:w-auto"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
              </svg>
              Telegram
            </a>

            {/* WhatsApp Button */}
            <a
              id="start-wa-button"
              href="https://wa.me/6283190230065?text=.help"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)] px-6 py-3 font-medium transition-colors duration-200 hover:bg-[var(--surface-hover)] w-full sm:w-auto"
            >
              <svg className="h-5 w-5 text-[var(--text-secondary)]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              WhatsApp
            </a>
          </div>
        </section>

        {/* Architecture & Workflow */}
        <section className="animate-slide-up delay-200 mt-32 border-t border-[var(--border)] pt-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <h2 className="text-sm font-mono text-[var(--text-secondary)] mb-4">01. Source</h2>
              <h3 className="text-xl font-medium text-[var(--foreground)] mb-3">Send payload.</h3>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                Open the chat via Telegram or WhatsApp. Submit any raw image asset from your device gallery or camera directly into the thread.
              </p>
            </div>
            <div>
              <h2 className="text-sm font-mono text-[var(--text-secondary)] mb-4">02. Compute</h2>
              <h3 className="text-xl font-medium text-[var(--foreground)] mb-3">Transform in memory.</h3>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                The image is buffered into a Sharp instance. It is aggressively resized to a 512×512 bound box, padded with alpha transparency, and encoded as WebP.
              </p>
            </div>
            <div>
              <h2 className="text-sm font-mono text-[var(--text-secondary)] mb-4">03. Response</h2>
              <h3 className="text-xl font-medium text-[var(--foreground)] mb-3">Receive output.</h3>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                The stateless runtime dispatches the compiled sticker back to your client in milliseconds. Zero cache. Zero persistence.
              </p>
            </div>
          </div>
        </section>

        {/* Specifications */}
        <section className="animate-slide-up delay-300 mt-32">
          <h2 className="text-lg font-medium text-[var(--foreground)] mb-8">Technical Specifications</h2>
          <div className="border border-[var(--border)] rounded-xl overflow-hidden bg-[var(--surface)]">
            <div className="grid grid-cols-1 sm:grid-cols-2">
              <div className="p-6 border-b sm:border-b-0 sm:border-r border-[var(--border)]">
                <div className="text-sm text-[var(--text-secondary)] mb-1">Architecture</div>
                <div className="text-base text-[var(--foreground)]">Stateless & Serverless</div>
              </div>
              <div className="p-6 border-b border-[var(--border)]">
                <div className="text-sm text-[var(--text-secondary)] mb-1">Output Format</div>
                <div className="text-base font-mono text-[var(--foreground)]">.webp (512x512px)</div>
              </div>
              <div className="p-6 border-b sm:border-b-0 sm:border-r border-[var(--border)]">
                <div className="text-sm text-[var(--text-secondary)] mb-1">Privacy Model</div>
                <div className="text-base text-[var(--foreground)]">Zero Data Retention</div>
              </div>
              <div className="p-6">
                <div className="text-sm text-[var(--text-secondary)] mb-1">Cost</div>
                <div className="text-base text-[var(--foreground)]">$0.00 / forever</div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-32 pt-8 border-t border-[var(--border)] flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-[var(--text-secondary)]">
          <p>© {new Date().getFullYear()} BobaSticker.</p>
          <p>Engineered with Next.js & Sharp.</p>
        </footer>

      </main>
    </div>
  );
}

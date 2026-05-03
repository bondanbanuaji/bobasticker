import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BobaSticker — Foto Jadi Stiker Telegram & WA Instan",
  description:
    "Kirim foto, terima stiker. Bot Telegram & WhatsApp gratis yang mengubah foto kamu jadi stiker .webp 512×512 dalam hitungan detik. Tanpa login, tanpa bayar, selamanya gratis.",
  keywords: ["telegram", "whatsapp", "stiker", "bot", "foto", "webp", "gratis"],
  openGraph: {
    title: "BobaSticker — Foto Jadi Stiker Telegram & WA",
    description: "Kirim foto, terima stiker. Gratis selamanya.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="h-full antialiased scroll-smooth">
      <head>
        <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Google+Sans+Flex:opsz,wght@6..144,1..1000&family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-full flex flex-col font-body bg-white text-gray-900">{children}</body>
    </html>
  );
}

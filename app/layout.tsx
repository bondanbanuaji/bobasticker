import type { Metadata } from "next";
import SmoothScroll from "./components/SmoothScroll";
import "./globals.css";

export const metadata: Metadata = {
  title: "BobaSticker — Sihir Foto Jadi Stiker Instan",
  description:
    "Tinggal kirim foto, abrakadabra jadi stiker. Bot Telegram & WhatsApp yang ngertiin banget, ubah foto lo jadi stiker dalam hitungan detik. 100% gratis, tanpa login, tanpa ribet.",
  keywords: ["telegram", "whatsapp", "stiker", "bot", "foto", "webp", "gratis", "boba sticker", "sticker bot engine"],
  icons: {
    icon: [
      { url: "/icon.png", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: "/icon.png",
  },
  verification: {
    google: "PmEGbJJC6OvnZ2rxFdJdsPEGMMdbvWm-daSfYxs3IsI",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "BobaSticker — Sihir Foto Jadi Stiker Instan",
    description: "Tinggal kirim foto, stiker langsung jadi. Gratis seumur hidup, bebas iklan.",
    type: "website",
    url: "https://bobasticker.vercel.app", // Adjust if domain is different
    siteName: "BobaSticker",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="antialiased">
      <head>
        <link rel="icon" href="/icon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/icon.png" />
        <meta name="theme-color" content="#ffffff" />
        <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Google+Sans+Flex:opsz,wght@6..144,1..1000&family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body bg-white text-gray-900 overflow-x-hidden">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}

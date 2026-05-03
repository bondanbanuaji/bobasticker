import type { Metadata } from "next";
import SmoothScroll from "./components/SmoothScroll";
import "./globals.css";

export const metadata: Metadata = {
  title: "BobaSticker — Foto Jadi Stiker Telegram & WA Instan",
  description:
    "Kirim foto, terima stiker. Bot Telegram & WhatsApp gratis yang mengubah foto kamu jadi stiker .webp 512×512 dalam hitungan detik. Tanpa login, tanpa bayar, selamanya gratis.",
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
    title: "BobaSticker — Foto Jadi Stiker Telegram & WA",
    description: "Kirim foto, terima stiker. Gratis selamanya tanpa iklan.",
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
    <html lang="id" className="h-full antialiased scroll-smooth">
      <head>
        <link rel="icon" href="/icon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/icon.png" />
        <meta name="theme-color" content="#ffffff" />
        <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Google+Sans+Flex:opsz,wght@6..144,1..1000&family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-full flex flex-col font-body bg-white text-gray-900">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}

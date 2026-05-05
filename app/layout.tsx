import type { Metadata } from "next";
import SmoothScroll from "./components/SmoothScroll";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://bobasticker.vercel.app"),
  title: {
    default: "BobaSticker — Sihir Foto Jadi Stiker Instan Gratis",
    template: "%s | BobaSticker"
  },
  description:
    "Ubah foto jadi stiker Telegram & WhatsApp dalam hitungan detik. 100% gratis, tanpa login, sat-set langsung jadi. Bot stiker paling kencang di Wakanda!",
  keywords: [
    "boba sticker", "bobasticker", "bot stiker wa", "bot stiker telegram", 
    "sticker bot engine", "buat stiker wa gratis", "buat stiker telegram", 
    "stiker wa otomatis", "stiker telegram otomatis", "cara buat stiker wa", 
    "wa sticker bot", "telegram sticker bot", "stiker instan", "stiker boba",
    "sticker maker online", "free sticker bot", "whatsapp sticker maker",
    "telegram sticker maker", "stiker gratis", "no ads sticker bot"
  ],
  authors: [{ name: "Bondan Banuaji", url: "https://www.instagram.com/bdn_bnj" }],
  creator: "Bondan Banuaji",
  publisher: "BobaSticker",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/images/icon.jpg", type: "image/jpeg" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: "/images/icon.jpg",
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
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: "BobaSticker — Sihir Foto Jadi Stiker Instan",
    description: "Tinggal kirim foto, stiker langsung jadi. Gratis seumur hidup, bebas iklan, dan privasi terjaga.",
    url: "https://bobasticker.vercel.app",
    siteName: "BobaSticker",
    images: [
      {
        url: "/images/icon.jpg",
        width: 1200,
        height: 630,
        alt: "BobaSticker Preview",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BobaSticker — Sihir Foto Jadi Stiker Instan",
    description: "Ubah foto jadi stiker Telegram & WhatsApp dalam hitungan detik. 100% gratis!",
    images: ["/images/icon.jpg"],
    creator: "@bdn_bnj",
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
        <link rel="icon" href="/images/icon.jpg" type="image/jpeg" />
        <link rel="apple-touch-icon" href="/images/icon.jpg" />
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

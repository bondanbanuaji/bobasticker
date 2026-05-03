import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "StikerKu Bot — Foto Jadi Stiker Telegram Instan",
  description:
    "Kirim foto, terima stiker. Bot Telegram gratis yang mengubah foto kamu jadi stiker .webp 512×512 dalam hitungan detik. Tanpa login, tanpa bayar, selamanya gratis.",
  keywords: ["telegram", "stiker", "bot", "foto", "webp", "gratis"],
  openGraph: {
    title: "StikerKu Bot — Foto Jadi Stiker Telegram",
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
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

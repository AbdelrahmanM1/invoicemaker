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
  title: {
    default: "Invoice Maker",
    template: "%s | Invoice Maker",
  },
  description:
    "Create, customize, and manage professional invoices with Invoice Maker. Perfect for freelancers, small businesses, and agencies.",
  keywords: [
    "invoice generator",
    "invoice maker",
    "billing software",
    "freelancer tools",
    "small business invoices",
  ],
  authors: [{ name: "Abdelrahman Moharram", url: "https://abdelrahmanmoharram.vercel.app" }],
  creator: "Abdelrahman Moharram",
  metadataBase: new URL("https://yourdomain.com"),
  openGraph: {
    title: "Invoice Maker",
    description:
      "Create, customize, and manage professional invoices with ease.",
    url: "https://abdelrahmanmoharraminvoicemaker.vercel.app",
    siteName: "Invoice Maker",
    locale: "en_US",
    type: "website",
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  themeColor: "#f59e0b", // amber-500
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

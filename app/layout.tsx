import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "vietnamese"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "FPT Playbook - Student Portal & Resources",
  description:
    "FPT Playbook (FFYB) - Welcome to the first year student hub with course schedules, learning materials, and comprehensive support.",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/fpt_uni_logo.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/fpt_uni_logo.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "fpt_uni_logo.png",
        type: "image/svg+xml",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={inter.variable}>
      <body className="font-sans antialiased">
        {children}
        <Toaster />
        <Analytics />
      </body>
    </html>
  );
}

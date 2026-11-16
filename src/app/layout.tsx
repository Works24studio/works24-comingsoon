import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-jakarta",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#DCE3F3",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Works24 — A New Experience Awaits | Early Access",
  description:
    "We are building something better. Stay tuned and join the Works24 Early Access list.",
  openGraph: {
    title: "Works24 — A New Experience Awaits",
    description: "We are building something better. Stay Tuned.",
    siteName: "Works24",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${jakarta.variable} ${inter.variable}`}>
      <body className="min-h-dvh text-brand-navy antialiased">
        {children}
      </body>
    </html>
  );
}
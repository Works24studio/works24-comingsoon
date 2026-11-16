"use client";

import { motion, type Variants } from "framer-motion";
import Works24BrandMark from "@/components/Works24BrandMark";
import FloatingElements from "@/components/FloatingElements";
import EarlyAccessForm from "@/components/EarlyAccessForm";

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

const fadeUpItem: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function ComingSoonPage() {
  return (
    <main className="relative flex min-h-dvh items-center justify-center p-3 sm:p-6 md:p-10">
      {/* Main Rounded White Architectural Stage */}
      <div className="works24-stage relative mx-auto flex min-h-[calc(100dvh-1.5rem)] w-full max-w-[1140px] flex-col justify-between rounded-[28px] border-[6px] border-white px-5 py-8 shadow-[0_28px_70px_-18px_rgba(6,27,58,0.16)] sm:min-h-[690px] sm:rounded-[36px] sm:border-[10px] sm:px-10 sm:py-12">
        {/* Floating 3D Shapes & Shadow Accents */}
        <FloatingElements />

        {/* Top Spacer for Vertical Balance */}
        <div className="hidden sm:block" />

        {/* Centered Hero Content + Early Access Form */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="relative z-20 mx-auto my-auto flex w-full max-w-2xl flex-col items-center text-center"
        >
          {/* Main Works24 Logo in Center */}
{/* Rounded-Square Works24 Logo Tile */}
          <motion.div
            variants={fadeUpItem}
            animate={{ y: [-4, 4, -4] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="mb-5 flex items-center justify-center sm:mb-6"
          >
            <Works24BrandMark />
          </motion.div>

          {/* Uppercase Eyebrow Label */}
          <motion.p
            variants={fadeUpItem}
            className="text-[11px] font-bold uppercase tracking-[0.22em] text-brand-navy/60 sm:text-xs"
          >
            Early Access • Coming Soon
          </motion.p>

          {/* Primary Bold Headline */}
          <motion.h1
            variants={fadeUpItem}
            className="mt-2 font-heading text-3xl font-extrabold tracking-tight text-brand-navy sm:text-5xl md:text-[54px] md:leading-[1.12]"
          >
            A New Experience{" "}
            <span className="text-gold-gradient block sm:inline">Awaits</span>
          </motion.h1>

          {/* Secondary Line */}
          <motion.p
            variants={fadeUpItem}
            className="mt-3 max-w-md text-sm font-medium leading-relaxed text-slate-500 sm:mt-4 sm:text-base"
          >
            We are building something better.{" "}
            <span className="font-semibold text-brand-navy">Stay Tuned</span>
          </motion.p>

          {/* Lead Capture Form */}
          <motion.div variants={fadeUpItem} className="mt-7 w-full sm:mt-8">
            <EarlyAccessForm />
          </motion.div>
        </motion.div>

        {/* Minimal Footer */}
<footer className="relative z-20 mt-8 text-center">
          <p className="text-[11px] font-medium text-slate-400">
            © 2026 WORKS24 |{" "}
            <a
              href="https://vamcapital.in"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-brand-navy/75 underline decoration-brand-gold/60 underline-offset-2 transition hover:text-brand-gold-dark"
            >
              VAM CAPITAL ADVISORS PVT LTD.
            </a>{" "}
            All rights reserved.
          </p>
        </footer>
      </div>
    </main>
  );
}
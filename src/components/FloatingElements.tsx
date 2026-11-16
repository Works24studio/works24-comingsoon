"use client";

import { motion } from "framer-motion";

export default function FloatingElements() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-visible">
      {/* Top-Left Peeking 3D Pearl-Gold Sphere on Outer Frame */}
      <motion.div
        animate={{ y: [-5, 7, -5], rotate: [-3, 3, -3] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-6 left-[12%] z-20 hidden sm:block md:left-[16%]"
      >
        <div
          className="relative h-14 w-14 overflow-hidden rounded-full shadow-[0_18px_30px_-6px_rgba(6,27,58,0.22)]"
          style={{
            background:
              "radial-gradient(circle at 32% 26%, #FFFFFF 0%, #F5E6CC 45%, #D5B06A 100%)",
          }}
        >
          {/* Vertical Gold Accent Stripe */}
          <div className="mx-auto h-full w-2.5 bg-gradient-to-b from-brand-gold-light via-brand-gold to-brand-gold-dark opacity-85" />
        </div>
      </motion.div>

      {/* Bottom-Left Floating 3D Soft Sage/Mint Arc */}
      <motion.div
        animate={{ y: [0, -12, 0], rotate: [0, 6, 0] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[14%] left-[4%] z-10 hidden sm:block sm:bottom-[18%] sm:left-[9%] md:left-[12%]"
      >
        <svg
          width="66"
          height="66"
          viewBox="0 0 80 80"
          fill="none"
          className="h-14 w-14 drop-shadow-[0_18px_20px_rgba(70,104,82,0.22)]"
        >
          <defs>
            <linearGradient id="sageArc" x1="12" y1="16" x2="68" y2="64" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#A3C4AE" />
              <stop offset="55%" stopColor="#779E84" />
              <stop offset="100%" stopColor="#4F735B" />
            </linearGradient>
          </defs>
          <path
            d="M22 24C14 36 17 53 30 61C43 69 60 65 67 52"
            stroke="url(#sageArc)"
            strokeWidth="15"
            strokeLinecap="round"
          />
          <path
            d="M21 25C15 35 17 50 28 58"
            stroke="rgba(255,255,255,0.55)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>
      </motion.div>

      {/* Bottom-Right Floating 3D Metallic Gold Ribbon */}
      <motion.div
        animate={{ y: [-8, 10, -8], rotate: [-2, 4, -2] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
        className="absolute bottom-[16%] right-[4%] z-10 hidden sm:block sm:bottom-[20%] sm:right-[9%] md:right-[12%]"
      >
        <svg
          width="74"
          height="74"
          viewBox="0 0 90 90"
          fill="none"
          className="h-16 w-16 drop-shadow-[0_18px_22px_rgba(166,126,46,0.28)]"
        >
          <defs>
            <linearGradient id="goldWave" x1="15" y1="15" x2="75" y2="75" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#F5DDA2" />
              <stop offset="50%" stopColor="#C59B43" />
              <stop offset="100%" stopColor="#8C641C" />
            </linearGradient>
          </defs>
          <path
            d="M18 64C23 52 34 56 38 45C42 34 53 38 57 27C61 16 72 20 76 11"
            stroke="url(#goldWave)"
            strokeWidth="13"
            strokeLinecap="round"
          />
          <path
            d="M19 61C24 51 34 54 38 44C42 34 52 37 56 27"
            stroke="rgba(255,255,255,0.65)"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
        </svg>
      </motion.div>

      {/* Bottom-Right Corner 3D Amber-Gold Hemisphere */}
      <motion.div
        animate={{ y: [0, -8, 0], rotate: [10, 16, 10] }}
        transition={{ duration: 6.8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-5 -right-3 z-20 hidden sm:block sm:-bottom-6 sm:-right-4"
      >
        <div
          className="h-16 w-16 rounded-full shadow-[0_22px_30px_-6px_rgba(139,99,27,0.35)]"
          style={{
            background:
              "radial-gradient(circle at 30% 26%, #FEF08A 0%, #E09F3E 48%, #9A5B13 100%)",
            clipPath: "polygon(0 0, 100% 0, 100% 78%, 16% 100%)",
          }}
        />
      </motion.div>
    </div>
  );
}
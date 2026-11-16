"use client";

import { useState } from "react";

export default function Works24BrandMark() {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="relative flex h-24 w-24 items-center justify-center overflow-hidden rounded-[24px] border border-white bg-white p-3.5 shadow-[0_18px_38px_-10px_rgba(6,27,58,0.16),0_4px_12px_-2px_rgba(197,155,67,0.18)] ring-1 ring-brand-gold/20 sm:h-28 sm:w-28 sm:rounded-[28px] sm:p-4">
      {!imgError ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src="/works24logo.jpeg"
          alt="Works24"
          onError={() => setImgError(true)}
          className="h-full w-full object-contain"
        />
      ) : (
        /* Vector Fallback matching the Works24 Infinity Emblem */
        <div className="flex flex-col items-center justify-center select-none">
          <svg
            viewBox="0 0 220 96"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-auto sm:h-12"
          >
            <defs>
              <linearGradient
                id="w24Gold"
                x1="110"
                y1="15"
                x2="205"
                y2="80"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0%" stopColor="#DFBD69" />
                <stop offset="50%" stopColor="#C59B43" />
                <stop offset="100%" stopColor="#9E7625" />
              </linearGradient>
            </defs>
            <path
              d="M110 48C128 24 146 14 168 14C191 14 208 29 208 48C208 67 191 82 168 82C146 82 128 72 110 48Z"
              stroke="url(#w24Gold)"
              strokeWidth="15"
              strokeLinecap="round"
            />
            <path
              d="M110 48C92 24 74 14 52 14C29 14 12 29 12 48C12 67 29 82 52 82C74 82 92 72 110 48Z"
              stroke="#061B3A"
              strokeWidth="15"
              strokeLinecap="round"
            />
            <text
              x="52"
              y="57"
              textAnchor="middle"
              fill="#061B3A"
              fontSize="26"
              fontWeight="800"
              fontFamily="sans-serif"
            >
              W
            </text>
            <text
              x="167"
              y="57"
              textAnchor="middle"
              fill="#B3872E"
              fontSize="24"
              fontWeight="800"
              fontFamily="sans-serif"
            >
              24
            </text>
          </svg>
          <span className="mt-1 font-heading text-[11px] font-extrabold tracking-[0.14em] text-brand-navy sm:text-xs">
            WORKS<span className="text-brand-gold-dark">24</span>
          </span>
        </div>
      )}
    </div>
  );
}
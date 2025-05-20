"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

interface SBTCYieldVaultLogoProps {
    className?: string;
    iconOnly?: boolean;
    extra_text?: boolean;
}

const SBTCYieldVaultLogo: React.FC<SBTCYieldVaultLogoProps> = ({ className = "", iconOnly, extra_text }) => {
    return (
        <Link href="/" className={`flex items-center ${className}`}>
            <motion.div
                className="relative flex items-center"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
            >
                <svg
                    width="40"
                    height="40"
                    viewBox="0 0 60 60"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-8 h-8 md:w-10 md:h-10"
                >
                    {/* Sophisticated Layered Background */}
                    <defs>
                        <linearGradient id="bitcoinGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#E3A046" />
                            <stop offset="100%" stopColor="#B17A37" />
                        </linearGradient>

                        <linearGradient id="stacksGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#5546FF" stopOpacity="0.6" />
                            <stop offset="100%" stopColor="#211C7A" stopOpacity="0.8" />
                        </linearGradient>

                        <linearGradient id="yieldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#E3A046" stopOpacity="0.3" />
                            <stop offset="100%" stopColor="#5546FF" stopOpacity="0.3" />
                        </linearGradient>

                        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                            <feGaussianBlur stdDeviation="2" result="blur" />
                            <feComposite in="SourceGraphic" in2="blur" operator="over" />
                        </filter>

                        <clipPath id="stacksClip">
                            <path d="M30 10L48.6603 20V40L30 50L11.3397 40V20L30 10Z" />
                        </clipPath>
                    </defs>

                    {/* Base Circle - Dark with subtle gradient */}
                    <circle cx="30" cy="30" r="30" fill="#0A0E1F" />
                    <circle cx="30" cy="30" r="28" fill="url(#yieldGradient)" fillOpacity="0.2" />

                    {/* Stacks Emblem - Sophistication layer */}
                    <g clipPath="url(#stacksClip)">
                        <path
                            d="M30 6L52 18V42L30 54L8 42V18L30 6Z"
                            fill="url(#stacksGradient)"
                            fillOpacity="0.2"
                            stroke="url(#stacksGradient)"
                            strokeWidth="0.5"
                            strokeDasharray="1 1"
                        />

                        {/* Multiple layer effect for depth */}
                        <path
                            d="M30 11L46 20.5V38.5L30 48L14 38.5V20.5L30 11Z"
                            fill="none"
                            stroke="#5546FF"
                            strokeWidth="0.3"
                            strokeOpacity="0.7"
                        />

                        {/* Stacks S mark subtly integrated */}
                        <path
                            d="M30 42C35.5228 42 40 37.5228 40 32C40 26.4772 35.5228 22 30 22"
                            stroke="#5546FF"
                            strokeWidth="0.5"
                            strokeDasharray="1 1"
                            fill="none"
                        />
                    </g>

                    {/* Golden Ratio Spiral - Yield Symbol */}
                    <path
                        d="M30 30C32 30 33.5 28.5 33.5 26.5C33.5 24.5 32 23 30 23C28 23 26.5 24.5 26.5 26.5"
                        stroke="url(#bitcoinGradient)"
                        strokeWidth="0.7"
                        strokeLinecap="round"
                        fill="none"
                        transform="rotate(45, 30, 30)"
                    />
                    <path
                        d="M30 30C33 30 35.5 27.5 35.5 24.5C35.5 21.5 33 19 30 19C27 19 24.5 21.5 24.5 24.5"
                        stroke="url(#bitcoinGradient)"
                        strokeWidth="0.7"
                        strokeLinecap="round"
                        fill="none"
                        transform="rotate(45, 30, 30)"
                    />
                    <path
                        d="M30 30C35 30 39 26 39 21C39 16 35 12 30 12C25 12 21 16 21 21"
                        stroke="url(#bitcoinGradient)"
                        strokeWidth="0.7"
                        strokeLinecap="round"
                        fill="none"
                        transform="rotate(45, 30, 30)"
                    />

                    {/* Central sBTC Element */}
                    <g filter="url(#glow)">
                        {/* Modern hexagonal core for Bitcoin */}
                        <path
                            d="M30 20L37.3205 24V32L30 36L22.6795 32V24L30 20Z"
                            fill="#0A0E1F"
                            stroke="url(#bitcoinGradient)"
                            strokeWidth="0.7"
                        />

                        {/* Bitcoin Symbol - Sophisticated minimal version */}
                        <path
                            d="M32.5 27.75C32.5 26.8 31.7 26 30.75 26H28.5V29.5H30.75C31.7 29.5 32.5 28.7 32.5 27.75Z"
                            fill="url(#bitcoinGradient)"
                        />
                        <path
                            d="M32.5 31.25C32.5 30.3 31.7 29.5 30.75 29.5H28.5V33H30.75C31.7 33 32.5 32.2 32.5 31.25Z"
                            fill="url(#bitcoinGradient)"
                        />

                        {/* Bitcoin connecting lines */}
                        <path
                            d="M29.5 25V26M29.5 33V34M27.5 26V25M27.5 34V33M31.5 26V25M31.5 34V33"
                            stroke="url(#bitcoinGradient)"
                            strokeWidth="0.7"
                            strokeLinecap="round"
                        />
                    </g>

                    {/* Yield Networks - Subtle interconnected lines */}
                    <g opacity="0.7">
                        <circle cx="30" cy="14" r="1" fill="url(#bitcoinGradient)" />
                        <circle cx="43" cy="22" r="1" fill="url(#bitcoinGradient)" />
                        <circle cx="43" cy="38" r="1" fill="url(#bitcoinGradient)" />
                        <circle cx="30" cy="46" r="1" fill="url(#bitcoinGradient)" />
                        <circle cx="17" cy="38" r="1" fill="url(#bitcoinGradient)" />
                        <circle cx="17" cy="22" r="1" fill="url(#bitcoinGradient)" />

                        {/* Stacks nodes */}
                        <circle cx="25" cy="18" r="0.7" fill="#5546FF" />
                        <circle cx="35" cy="18" r="0.7" fill="#5546FF" />
                        <circle cx="41" cy="30" r="0.7" fill="#5546FF" />
                        <circle cx="35" cy="42" r="0.7" fill="#5546FF" />
                        <circle cx="25" cy="42" r="0.7" fill="#5546FF" />
                        <circle cx="19" cy="30" r="0.7" fill="#5546FF" />

                        {/* Subtle connection networks */}
                        <path
                            d="M30 14L25 18M30 14L35 18M43 22L35 18M43 22L41 30M43 38L41 30M43 38L35 42M30 46L35 42M30 46L25 42M17 38L25 42M17 38L19 30M17 22L19 30M17 22L25 18"
                            stroke="#293268"
                            strokeWidth="0.3"
                            strokeDasharray="1 1"
                        />
                    </g>

                    {/* Subtle Yield Pulse Animation Rings */}
                    <circle cx="30" cy="30" r="16" stroke="url(#yieldGradient)" strokeWidth="0.3" strokeDasharray="1 2" className="animate-pulse-slow opacity-40" />
                    <circle cx="30" cy="30" r="20" stroke="url(#yieldGradient)" strokeWidth="0.2" strokeDasharray="1 2" className="animate-pulse-slow opacity-30" style={{ animationDelay: "0.7s" }} />
                </svg>

                {!iconOnly && (
                    <div className="ml-2.5 flex flex-col items-start">
                        <span className="font-bold text-xl md:text-2xl dark:text-white text-gray-900 leading-tight">
                            <span style={{ color: "#E3A046" }}>sBTC</span>
                            <span className="text-slate-700 dark:text-slate-300">Yield</span>
                        </span>
                        {extra_text && (
                            <span className="text-[9px] tracking-wider uppercase text-slate-500 dark:text-slate-400 -mt-1">
                                Stacks Bitcoin Vault
                            </span>
                        )}

                    </div>
                )}
            </motion.div>
        </Link>
    );
};

// Add a CSS class for a slower pulse animation
const styles = `
@keyframes pulse-slow {
  0%, 100% {
    opacity: 0.2;
    transform: scale(1);
  }
  50% {
    opacity: 0.4;
    transform: scale(1.05);
  }
}
.animate-pulse-slow {
  animation: pulse-slow 5s infinite;
}
`;

// Add the styles to the document
if (typeof document !== "undefined") {
    const styleElement = document.createElement("style");
    styleElement.innerHTML = styles;
    document.head.appendChild(styleElement);
}

export default SBTCYieldVaultLogo;

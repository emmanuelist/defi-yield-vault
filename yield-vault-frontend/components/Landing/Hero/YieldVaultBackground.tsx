

"use client";

import React from "react";

const YieldVaultBackground: React.FC = () => {
    return (
        <div className="absolute inset-0 overflow-hidden">
            {/* Abstract blockchain/Bitcoin connection patterns */}
            <div className="absolute inset-0">
                <svg width="100%" height="100%" viewBox="0 0 1440 800" preserveAspectRatio="xMidYMid slice">
                    <defs>
                        {/* Refined gradients with more subtle, mature color palette */}
                        <linearGradient id="bitcoinGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#F7931A" stopOpacity="0.4" />
                            <stop offset="100%" stopColor="#E2761B" stopOpacity="0.2" />
                        </linearGradient>

                        <linearGradient id="secondaryGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.15" />
                            <stop offset="100%" stopColor="#D97706" stopOpacity="0.07" />
                        </linearGradient>

                        {/* Dark mode depth gradient */}
                        <linearGradient id="depthGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#040d36" stopOpacity="0.8" />
                            <stop offset="100%" stopColor="#0A0E1F" stopOpacity="0.9" />
                        </linearGradient>

                        {/* Light mode depth gradient */}
                        <linearGradient id="lightDepthGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#EEF2FF" stopOpacity="0.9" />
                            <stop offset="100%" stopColor="#F8FAFC" stopOpacity="0.95" />
                        </linearGradient>

                        <linearGradient id="nodeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#F7931A" stopOpacity="0.7" />
                            <stop offset="100%" stopColor="#F7931A" stopOpacity="0" />
                        </linearGradient>

                        {/* Subtle glow for important nodes */}
                        <filter id="sophisticatedGlow" x="-50%" y="-50%" width="200%" height="200%">
                            <feGaussianBlur stdDeviation="1.5" result="blur" />
                            <feComposite in="SourceGraphic" in2="blur" operator="over" />
                        </filter>
                    </defs>

                    {/* Base layer - refined depth - responsive to theme */}
                    <rect className="dark:opacity-100 opacity-0" x="0" y="0" width="100%" height="100%" fill="url(#depthGradient)" />
                    <rect className="dark:opacity-0 opacity-100" x="0" y="0" width="100%" height="100%" fill="url(#lightDepthGradient)" />

                    {/* Main Bitcoin structure - more subtle and professional */}
                    {/* <g className="dark:opacity-8 opacity-4">
                        <circle cx="250" cy="400" r="220" fill="none" stroke="#F7931A" strokeWidth="0.4" />
                        <circle cx="250" cy="400" r="160" fill="none" stroke="#F59E0B" strokeWidth="0.3" />
                        <circle cx="250" cy="400" r="100" fill="none" stroke="#F7931A" strokeWidth="0.3" />
                        <circle cx="250" cy="400" r="50" fill="none" stroke="#F59E0B" strokeWidth="0.2" />

                        <path
                            d="M270 370C270 361.716 263.284 355 255 355H240V385H255C263.284 385 270 378.284 270 370Z"
                            fill="none"
                            stroke="#F7931A"
                            strokeWidth="0.4"
                        />
                        <path
                            d="M270 430C270 421.716 263.284 415 255 415H240V445H255C263.284 445 270 438.284 270 430Z"
                            fill="none"
                            stroke="#F7931A"
                            strokeWidth="0.4"
                        />
                        <path
                            d="M240 350V355M240 445V450M230 355V350M230 450V445M260 355V350M260 450V445"
                            stroke="#F7931A"
                            strokeWidth="0.4"
                        />

                        <line x1="30" y1="400" x2="470" y2="400" stroke="#F7931A" strokeWidth="0.3" />
                        <line x1="250" y1="180" x2="250" y2="620" stroke="#F7931A" strokeWidth="0.3" />
                        <line x1="80" y1="230" x2="420" y2="570" stroke="#F7931A" strokeWidth="0.3" />
                        <line x1="80" y1="570" x2="420" y2="230" stroke="#F7931A" strokeWidth="0.3" />
                    </g> */}

                    <g className="dark:opacity-10 opacity-30">
                        <circle cx="250" cy="400" r="220" fill="none" stroke="#F7931A" strokeWidth="0.4" />
                        <circle cx="250" cy="400" r="160" fill="none" stroke="#F59E0B" strokeWidth="0.3" />
                        <circle cx="250" cy="400" r="100" fill="none" stroke="#F7931A" strokeWidth="0.3" />
                        <circle cx="250" cy="400" r="50" fill="none" stroke="#F59E0B" strokeWidth="0.2" />

                        <path
                            d="M270 370C270 361.716 263.284 355 255 355H240V385H255C263.284 385 270 378.284 270 370Z"
                            fill="none"
                            stroke="#F7931A"
                            strokeWidth="0.4"
                        />
                        <path
                            d="M270 430C270 421.716 263.284 415 255 415H240V445H255C263.284 445 270 438.284 270 430Z"
                            fill="none"
                            stroke="#F7931A"
                            strokeWidth="0.4"
                        />
                        <path
                            d="M240 350V355M240 445V450M230 355V350M230 450V445M260 355V350M260 450V445"
                            stroke="#F7931A"
                            strokeWidth="0.4"
                        />

                        <line x1="30" y1="400" x2="470" y2="400" stroke="#F7931A" strokeWidth="0.3" />
                        <line x1="250" y1="180" x2="250" y2="620" stroke="#F7931A" strokeWidth="0.3" />
                        <line x1="80" y1="230" x2="420" y2="570" stroke="#F7931A" strokeWidth="0.3" />
                        <line x1="80" y1="570" x2="420" y2="230" stroke="#F7931A" strokeWidth="0.3" />
                    </g>

                    {/* Right side blockchain structure - more architectural */}
                    <g className="dark:opacity-30 opacity-30" transform="translate(1150, 400)">
                        {/* Blockchain hexagons with cleaner presentation */}
                        <polygon points="0,0 65,-35 130,0 130,65 65,100 0,65" fill="none" stroke="#F59E0B" strokeWidth="0.3" />
                        <polygon points="0,0 -65,-35 -130,0 -130,65 -65,100 0,65" fill="none" stroke="#F59E0B" strokeWidth="0.3" />
                        <polygon points="0,0 0,-65 65,-100 130,-65 130,0 65,-35" fill="none" stroke="#F59E0B" strokeWidth="0.3" />
                        <polygon points="0,0 0,-65 -65,-100 -130,-65 -130,0 -65,-35" fill="none" stroke="#F59E0B" strokeWidth="0.3" />
                        <polygon points="0,65 0,130 65,165 130,130 130,65 65,100" fill="none" stroke="#F59E0B" strokeWidth="0.3" />
                        <polygon points="0,65 0,130 -65,165 -130,130 -130,65 -65,100" fill="none" stroke="#F59E0B" strokeWidth="0.3" />
                    </g>

                    {/* Bitcoin hash elements - refined and subtle */}
                    <g className="dark:opacity-30 opacity-30" transform="translate(700, 200)">
                        <circle cx="0" cy="0" r="80" fill="none" stroke="#F7931A" strokeWidth="0.3" />
                        <circle cx="0" cy="0" r="40" fill="none" stroke="#F7931A" strokeWidth="0.3" />
                        <path
                            d="M20 -20C20 -28.284 13.284 -35 5 -35H-10V-5H5C13.284 -5 20 -11.716 20 -20Z"
                            fill="none"
                            stroke="#F7931A"
                            strokeWidth="0.3"
                        />
                        <path
                            d="M20 20C20 11.716 13.284 5 5 5H-10V35H5C13.284 35 20 28.284 20 20Z"
                            fill="none"
                            stroke="#F7931A"
                            strokeWidth="0.3"
                        />
                    </g>

                    {/* Yield representation - cleaner arrows */}
                    <g className="dark:opacity-30 opacity-30" transform="translate(900, 600)">
                        <circle cx="0" cy="0" r="60" fill="none" stroke="#F59E0B" strokeWidth="0.3" />
                        <circle cx="0" cy="0" r="30" fill="none" stroke="#F59E0B" strokeWidth="0.3" />
                        <path
                            d="M-30 0L0 -30L30 0"
                            fill="none"
                            stroke="#F59E0B"
                            strokeWidth="0.3"
                        />
                        <path
                            d="M-15 15L0 0L15 15"
                            fill="none"
                            stroke="#F59E0B"
                            strokeWidth="0.3"
                        />
                        <line x1="0" y1="-30" x2="0" y2="30" stroke="#F59E0B" strokeWidth="0.3" strokeDasharray="1,4" />
                    </g>

                    {/* Data connection lines - more sophisticated pattern */}
                    <g className="dark:opacity-15 opacity-8">
                        {/* Connection from left circle structure to center */}
                        <path
                            d="M 450,400 C 550,420 650,380 750,400"
                            fill="none"
                            stroke="#F7931A"
                            strokeWidth="0.7"
                            strokeDasharray="1,10"
                        />

                        {/* Connection from right hex structure to center */}
                        <path
                            d="M 1030,400 C 930,420 830,380 750,400"
                            fill="none"
                            stroke="#F59E0B"
                            strokeWidth="0.7"
                            strokeDasharray="1,10"
                        />

                        {/* Bitcoin connections with cleaner paths */}
                        <path
                            d="M 700,280 C 720,320 735,350 750,400"
                            fill="none"
                            stroke="#F7931A"
                            strokeWidth="0.7"
                            strokeDasharray="1,10"
                            className="dark:opacity-15 opacity-10"
                        />

                        <path
                            d="M 900,540 C 850,500 800,450 750,400"
                            fill="none"
                            stroke="#F59E0B"
                            strokeWidth="0.7"
                            strokeDasharray="1,10"
                            className="dark:opacity-15 opacity-10"
                        />
                    </g>

                    {/* Data nodes with subtle, sophisticated glow */}
                    <g filter="url(#sophisticatedGlow)">
                        {/* Strategic nodes with deliberate placement */}
                        <circle cx="250" cy="400" r="2" fill="#F7931A" />
                        <circle cx="350" cy="400" r="1.5" fill="#F7931A" />
                        <circle cx="250" cy="300" r="1.5" fill="#F7931A" />
                        <circle cx="250" cy="500" r="1.5" fill="#F7931A" />
                        <circle cx="150" cy="400" r="1.5" fill="#F7931A" />
                        <circle cx="320" cy="330" r="1.5" fill="#F7931A" />
                        <circle cx="320" cy="470" r="1.5" fill="#F7931A" />
                        <circle cx="180" cy="330" r="1.5" fill="#F7931A" />
                        <circle cx="180" cy="470" r="1.5" fill="#F7931A" />

                        {/* Nodes along connection paths */}
                        <circle cx="450" cy="400" r="2" fill="#F7931A" />
                        <circle cx="550" cy="410" r="1.5" fill="#F7931A" />
                        <circle cx="650" cy="390" r="1.5" fill="#F7931A" />
                        <circle cx="750" cy="400" r="3" fill="#F59E0B" />
                        <circle cx="850" cy="390" r="1.5" fill="#F59E0B" />
                        <circle cx="950" cy="410" r="1.5" fill="#F59E0B" />
                        <circle cx="1030" cy="400" r="2" fill="#F59E0B" />

                        {/* Blockchain structure nodes - Right */}
                        <circle cx="1150" cy="400" r="2" fill="#F59E0B" />
                        <circle cx="1150" cy="340" r="1.5" fill="#F59E0B" />
                        <circle cx="1150" cy="460" r="1.5" fill="#F59E0B" />
                        <circle cx="1210" cy="370" r="1.5" fill="#F59E0B" />
                        <circle cx="1210" cy="430" r="1.5" fill="#F59E0B" />
                        <circle cx="1090" cy="370" r="1.5" fill="#F59E0B" />
                        <circle cx="1090" cy="430" r="1.5" fill="#F59E0B" />

                        {/* Bitcoin/Yield nodes */}
                        <circle cx="700" cy="200" r="2" fill="#F7931A" />
                        <circle cx="700" cy="280" r="1.5" fill="#F7931A" />
                        <circle cx="900" cy="600" r="2" fill="#F59E0B" />
                        <circle cx="900" cy="540" r="1.5" fill="#F59E0B" />
                    </g>

                    {/* Minimal pulse rings (more subtle animation) */}
                    <circle cx="750" cy="400" r="20" fill="none" stroke="#F7931A" strokeWidth="0.3" className="dark:opacity-30 opacity-20 pulse-ring" />
                    <circle cx="750" cy="400" r="35" fill="none" stroke="#F7931A" strokeWidth="0.2" className="dark:opacity-20 opacity-15 pulse-ring delay-1" />
                    <circle cx="750" cy="400" r="50" fill="none" stroke="#F7931A" strokeWidth="0.1" className="dark:opacity-10 opacity-10 pulse-ring delay-2" />

                    {/* Subtle Bitcoin pulse rings */}
                    <circle cx="700" cy="200" r="12" fill="none" stroke="#F7931A" strokeWidth="0.2" className="dark:opacity-20 opacity-15 pulse-ring delay-3" />
                    <circle cx="900" cy="600" r="12" fill="none" stroke="#F59E0B" strokeWidth="0.2" className="dark:opacity-20 opacity-15 pulse-ring delay-4" />
                </svg>
            </div>

            {/* Refined bottom technology wave - more structured with theme support */}
            <div className="absolute bottom-0 left-0 right-0 h-64 dark:opacity-10 opacity-8">
                <svg width="100%" height="100%" viewBox="0 0 1440 200" preserveAspectRatio="none">
                    <defs>
                        {/* Enhanced gradients for waves */}
                        <linearGradient id="enhancedBitcoinGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#F7931A" stopOpacity="0.5" />
                            <stop offset="50%" stopColor="#F59E0B" stopOpacity="0.3" />
                            <stop offset="100%" stopColor="#E2761B" stopOpacity="0.2" />
                        </linearGradient>

                        <linearGradient id="enhancedSecondaryGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.18" />
                            <stop offset="50%" stopColor="#FBBF24" stopOpacity="0.12" />
                            <stop offset="100%" stopColor="#D97706" stopOpacity="0.09" />
                        </linearGradient>

                        {/* Light mode gradient variants */}
                        <linearGradient id="lightBitcoinGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#F7931A" stopOpacity="0.3" />
                            <stop offset="50%" stopColor="#F59E0B" stopOpacity="0.2" />
                            <stop offset="100%" stopColor="#E2761B" stopOpacity="0.1" />
                        </linearGradient>

                        <linearGradient id="lightSecondaryGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.12" />
                            <stop offset="50%" stopColor="#FBBF24" stopOpacity="0.08" />
                            <stop offset="100%" stopColor="#D97706" stopOpacity="0.05" />
                        </linearGradient>

                        {/* Sophisticated glow filter for data points */}
                        <filter id="glowEffect" x="-50%" y="-50%" width="200%" height="200%">
                            <feGaussianBlur stdDeviation="1.5" result="blur" />
                            <feComposite in="SourceGraphic" in2="blur" operator="over" />
                        </filter>

                        {/* Animated pattern for the wave */}
                        <pattern id="dataPattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                            <rect width="20" height="20" fill="none" />
                            <circle cx="10" cy="10" r="1" fill="#F7931A" opacity="0.3" className="data-point-pulse" />
                        </pattern>

                        {/* Animated line pattern */}
                        <pattern id="gridPattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                            <rect width="40" height="40" fill="none" />
                            <path d="M 0 0 L 40 40" stroke="#F7931A" strokeWidth="0.2" opacity="0.15" />
                            <path d="M 40 0 L 0 40" stroke="#F7931A" strokeWidth="0.2" opacity="0.15" />
                        </pattern>

                        {/* Animation paths for particles */}
                        <path id="wavePath1" d="M0,140 C320,110 640,150 960,120 C1120,105 1280,125 1440,140" fill="none" />
                        <path id="wavePath2" d="M0,100 C240,160 480,180 720,130 C960,80 1200,140 1440,160" fill="none" />
                    </defs>

                    {/* Main wave backgrounds with enhanced gradients - dark mode */}
                    <path
                        className="wave-animation-slow dark:opacity-100 opacity-0"
                        d="M0,100 C240,160 480,180 720,130 C960,80 1200,140 1440,160 L1440,200 L0,200 Z"
                        fill="url(#enhancedBitcoinGradient)"
                    />

                    <path
                        className="wave-animation-medium dark:opacity-40 opacity-0"
                        d="M0,140 C320,110 640,150 960,120 C1120,105 1280,125 1440,140 L1440,200 L0,200 Z"
                        fill="url(#enhancedSecondaryGradient)"
                    />

                    {/* Main wave backgrounds with enhanced gradients - light mode */}
                    <path
                        className="wave-animation-slow dark:opacity-0 opacity-100"
                        d="M0,100 C240,160 480,180 720,130 C960,80 1200,140 1440,160 L1440,200 L0,200 Z"
                        fill="url(#lightBitcoinGradient)"
                    />

                    <path
                        className="wave-animation-medium dark:opacity-0 opacity-40"
                        d="M0,140 C320,110 640,150 960,120 C1120,105 1280,125 1440,140 L1440,200 L0,200 Z"
                        fill="url(#lightSecondaryGradient)"
                    />

                    {/* Sophisticated grid overlay */}
                    <rect x="0" y="80" width="100%" height="120" fill="url(#gridPattern)" opacity="0.05" className="grid-animation" />

                    {/* Enhanced data points with animation */}
                    {Array.from({ length: 24 }).map((_, i) => (
                        <circle
                            key={`wave-dot-${i}`}
                            cx={60 + (i * 60)}
                            cy={130 + (Math.sin(i * 0.5) * 20)}
                            r={0.8 + (i % 4) * 0.4}
                            fill="#FFF"
                            className={`dark:opacity-30 opacity-20 data-point-pulse delay-${i % 7}`}
                            filter="url(#glowEffect)"
                        />
                    ))}

                    {/* Illuminated path lines */}
                    <path
                        d="M0,135 C240,115 480,155 720,125 C960,95 1200,130 1440,140"
                        fill="none"
                        stroke="#F7931A"
                        strokeWidth="0.3"
                        strokeDasharray="2,8"
                        className="dark:opacity-20 opacity-15 path-animation"
                    />

                    <path
                        d="M0,120 C360,140 720,110 1080,130 C1260,140 1350,135 1440,125"
                        fill="none"
                        stroke="#F59E0B"
                        strokeWidth="0.3"
                        strokeDasharray="2,8"
                        className="dark:opacity-15 opacity-10 path-animation-reverse"
                    />

                    {/* Animated particles flowing along paths */}
                    {Array.from({ length: 10 }).map((_, i) => (
                        <circle
                            key={`particle-1-${i}`}
                            r="1.2"
                            fill="#F7931A"
                            className="dark:opacity-40 opacity-30 particle-animation"
                            filter="url(#glowEffect)"
                        >
                            <animateMotion
                                dur={`${8 + i * 2}s`}
                                repeatCount="indefinite"
                                path="M0,100 C240,160 480,180 720,130 C960,80 1200,140 1440,160"
                                begin={`${i * 0.8}s`}
                            />
                        </circle>
                    ))}

                    {Array.from({ length: 8 }).map((_, i) => (
                        <circle
                            key={`particle-2-${i}`}
                            r="0.9"
                            fill="#F59E0B"
                            className="dark:opacity-30 opacity-20 particle-animation"
                            filter="url(#glowEffect)"
                        >
                            <animateMotion
                                dur={`${10 + i * 2}s`}
                                repeatCount="indefinite"
                                path="M0,140 C320,110 640,150 960,120 C1120,105 1280,125 1440,140"
                                begin={`${i * 1.2}s`}
                            />
                        </circle>
                    ))}

                    {/* Digital data binary representation */}
                    {Array.from({ length: 15 }).map((_, i) => (
                        <text
                            key={`binary-${i}`}
                            x={100 + (i * 90)}
                            y={160 + (Math.sin(i * 0.7) * 10)}
                            fontSize="3"
                            fill="#F7931A"
                            className={`dark:opacity-13 opacity-8 binary-fade delay-${i % 5}`}
                        >
                            {i % 2 === 0 ? "10" : "01"}
                        </text>
                    ))}

                    {/* Hexagon data nodes */}
                    {Array.from({ length: 6 }).map((_, i) => (
                        <g key={`hex-${i}`} className={`hex-pulse delay-${i % 4}`}>
                            <polygon
                                points={`${240 + (i * 200)},150 ${250 + (i * 200)},145 ${260 + (i * 200)},150 ${260 + (i * 200)},155 ${250 + (i * 200)},160 ${240 + (i * 200)},155`}
                                fill="none"
                                stroke="#F7931A"
                                strokeWidth="0.4"
                                className="dark:opacity-15 opacity-10"
                            />
                        </g>
                    ))}
                </svg>
            </div>

            {/* Refined CSS for more subtle animations */}
            <style jsx>{`
                .pulse-ring {
                    animation: sophisticatedPulse 6s infinite;
                    transform-origin: center;
                }
                
                .delay-1 {
                    animation-delay: 1.5s;
                }
                
                .delay-2 {
                    animation-delay: 3s;
                }
                
                .delay-3 {
                    animation-delay: 0.8s;
                }
                
                .delay-4 {
                    animation-delay: 2.2s;
                }
                
                @keyframes sophisticatedPulse {
                    0% { transform: scale(0.97); opacity: 0.15; }
                    50% { transform: scale(1.03); opacity: 0.08; }
                    100% { transform: scale(0.97); opacity: 0.15; }
                }

                .wave-animation-slow {
                    animation: waveMove 25s infinite alternate ease-in-out;
                }
                
                .wave-animation-medium {
                    animation: waveMove 20s infinite alternate-reverse ease-in-out;
                }
                
                .grid-animation {
                    animation: gridDrift 40s infinite linear;
                }
                
                .data-point-pulse {
                    animation: dataPulse 4s infinite;
                    transform-origin: center;
                }
                
                .path-animation {
                    animation: pathGlow 8s infinite;
                }
                
                .path-animation-reverse {
                    animation: pathGlow 8s infinite reverse;
                }
                
                .particle-animation {
                    animation: particleBrightness 4s infinite;
                }
                
                .binary-fade {
                    animation: binaryFade 5s infinite;
                }
                
                .hex-pulse {
                    animation: hexPulse 5s infinite;
                }
                
                .delay-0 { animation-delay: 0s; }
                .delay-1 { animation-delay: 0.5s; }
                .delay-2 { animation-delay: 1s; }
                .delay-3 { animation-delay: 1.5s; }
                .delay-4 { animation-delay: 2s; }
                .delay-5 { animation-delay: 2.5s; }
                .delay-6 { animation-delay: 3s; }
                
                @keyframes waveMove {
                    0% { transform: translateX(-10px); }
                    100% { transform: translateX(10px); }
                }
                
                @keyframes gridDrift {
                    0% { transform: translateX(0) translateY(0); }
                    100% { transform: translateX(40px) translateY(40px); }
                }
                
                @keyframes dataPulse {
                    0% { transform: scale(0.7); opacity: 0.2; }
                    50% { transform: scale(1.4); opacity: 0.3; }
                    100% { transform: scale(0.7); opacity: 0.2; }
                }
                
                @keyframes pathGlow {
                    0% { opacity: 0.05; stroke-width: 0.2; }
                    50% { opacity: 0.2; stroke-width: 0.4; }
                    100% { opacity: 0.05; stroke-width: 0.2; }
                }
                
                @keyframes particleBrightness {
                    0% { opacity: 0.2; }
                    50% { opacity: 0.5; }
                    100% { opacity: 0.2; }
                }
                
                @keyframes binaryFade {
                    0% { opacity: 0.05; }
                    50% { opacity: 0.15; }
                    100% { opacity: 0.05; }
                }
                
                @keyframes hexPulse {
                    0% { transform: scale(0.95); opacity: 0.1; }
                    50% { transform: scale(1.05); opacity: 0.2; }
                    100% { transform: scale(0.95); opacity: 0.1; }
                }
            `}</style>
        </div>
    );
};

export default YieldVaultBackground;
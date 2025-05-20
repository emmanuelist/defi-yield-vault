"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bitcoin, ArrowRight, ShieldCheck, TrendingUp, Wallet } from 'lucide-react';
import WalletConnectButton from '../Shared/wallet/WalletConnectButton';
import GetItNowButton from './Hero/GetItNowButton';

const ElegantCtaSection: React.FC = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [scrollY, setScrollY] = useState(0);
    const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
    const [isMounted, setIsMounted] = useState(false);

    // Initialize component mount state
    useEffect(() => {
        setIsMounted(true);
        setWindowSize({ 
            width: window.innerWidth, 
            height: window.innerHeight 
        });
    }, []);

    // Track mouse position for subtle hover effects
    useEffect(() => {
        if (!isMounted) return;
        
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        const handleScroll = () => {
            setScrollY(window.scrollY);
        };
        
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleResize);
        };
    }, [isMounted]);

    // Metrics for visual display
    const metrics = [
        {
            icon: <TrendingUp className="w-5 h-5" />,
            value: "$143.7M",
            label: "Total Value Locked",
            change: "+12.4% this month"
        },
        {
            icon: <Bitcoin className="w-5 h-5" />,
            value: "8.2%",
            label: "Average APY",
            change: "Outperforming market by 3.1x"
        },
        {
            icon: <ShieldCheck className="w-5 h-5" />,
            value: "100%",
            label: "Sovereign Custody",
            change: "Your keys, your Bitcoin"
        }
    ];

    // Calculate mouse transform values safely
    const getMouseTransform = (factor: number) => {
        if (!isMounted) return "translate(0px, 0px)";
        const x = (mousePosition.x - windowSize.width / 2) * factor;
        const y = (mousePosition.y - windowSize.height / 2) * factor;
        return `translate(${x}px, ${y}px)`;
    };

    return (
        <section className="relative py-20 overflow-hidden">
            {/* Sophisticated Background Elements */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute inset-0 dark:bg-gradient-to-b dark:from-[#060f38]/95 dark:to-[#0A0E1F] dark:opacity-95 bg-gradient-to-b from-slate-50 to-slate-100"></div>

                {/* Premium Pattern Overlay */}
                <div className="absolute inset-0 dark:bg-grid-slate-700/[0.03] bg-grid-slate-300/[0.07] bg-[size:20px_20px] opacity-30"></div>

                {/* Subtle gradient blobs */}
                <div
                    className="absolute left-1/4 top-0 w-96 h-96 rounded-full dark:bg-[#F7931A]/5 bg-[#F7931A]/3 blur-3xl"
                    style={{
                        transform: isMounted ? `translate(${Math.sin(scrollY * 0.005) * 20}px, ${Math.cos(scrollY * 0.005) * 20}px)` : "translate(0px, 0px)"
                    }}
                ></div>

                <div
                    className="absolute right-1/4 bottom-0 w-80 h-80 rounded-full dark:bg-indigo-600/5 bg-indigo-600/3 blur-3xl"
                    style={{
                        transform: isMounted ? `translate(${Math.cos(scrollY * 0.005) * 20}px, ${Math.sin(scrollY * 0.005) * 20}px)` : "translate(0px, 0px)"
                    }}
                ></div>
            </div>

            {/* Top Curved Border */}
            <div className="absolute top-0 inset-x-0 h-4 overflow-hidden">
                <svg viewBox="0 0 1440 24" fill="none" preserveAspectRatio="none" className="absolute w-full h-24 translate-y-[-83%]">
                    <path
                        d="M0,0 C480,40 960,40 1440,0 L1440,24 L0,24 Z"
                        className="dark:fill-[#040d36] fill-slate-100"
                    />
                </svg>
                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#F7931A]/20 to-transparent"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10 max-w-6xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left Column - Content + Form */}
                    <div className="relative">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7 }}
                            className="relative z-10"
                        >
                            <h2 className="text-3xl md:text-4xl font-bold dark:text-white text-slate-800 mb-6 leading-tight">
                                Ready to Start Earning Yield on
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#F7931A] to-amber-500 ml-2">Your Bitcoin?</span>
                            </h2>

                            <p className="dark:text-slate-300 text-slate-600 text-lg max-w-lg mb-8">
                                Connect your wallet now and start benefiting from institutional-grade DeFi strategies with full custody of your Bitcoin.
                            </p>

                            <div className="mb-12 space-y-3">
                                {metrics.map((metric, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: 0.2 + (index * 0.1) }}
                                        className="flex items-center space-x-4 group"
                                    >
                                        <div className="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center dark:bg-slate-800/70 bg-white dark:border-slate-700/30 border-slate-200 border shadow-sm">
                                            <span className="text-[#F7931A]">{metric.icon}</span>
                                        </div>
                                        <div>
                                            <div className="flex items-baseline">
                                                <span className="text-xl font-bold dark:text-white text-slate-800">{metric.value}</span>
                                                <span className="ml-2 text-sm dark:text-[#F7931A]/80 text-[#F7931A] font-medium">{metric.change}</span>
                                            </div>
                                            <span className="text-sm dark:text-slate-400 text-slate-500">{metric.label}</span>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            <div className="flex flex-row gap-4">
                                <WalletConnectButton />
                                <GetItNowButton />
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Column - Visual Element */}
                    <div className="flex justify-center">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, delay: 0.2 }}
                            className="relative"
                        >
                            {/* Decorative circles */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] rounded-full border dark:border-[#F7931A]/10 border-[#F7931A]/5"></div>
                            <div
                                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] rounded-full border dark:border-slate-700/20 border-slate-300/20"
                                style={{
                                    transform: isMounted ? `translate(-50%, -50%) rotate(${scrollY * 0.03}deg)` : "translate(-50%, -50%) rotate(0deg)",
                                    transition: 'transform 0.3s ease-out'
                                }}
                            ></div>

                            {/* Bitcoin showcase element */}
                            <div
                                className="relative w-80 h-80 rounded-full flex items-center justify-center"
                                style={{
                                    background: `radial-gradient(circle, rgba(247, 147, 26, 0.08) 0%, rgba(0, 0, 0, 0) 70%)`
                                }}
                            >
                                <div className="relative">
                                    {/* Glow effect */}
                                    <div
                                        className="absolute -inset-10 rounded-full bg-[#F7931A]/5 blur-2xl z-0"
                                        style={{
                                            transform: getMouseTransform(0.02)
                                        }}
                                    ></div>

                                    {/* Bitcoin logo */}
                                    <div
                                        className="relative w-56 h-56 rounded-full bg-gradient-to-br dark:from-[#040d36] dark:to-[#081342] from-slate-50 to-white dark:shadow-xl shadow-lg border dark:border-slate-700/50 border-slate-200/70 flex items-center justify-center z-10 overflow-hidden"
                                        style={{
                                            transform: getMouseTransform(0.01)
                                        }}
                                    >
                                        <div className="absolute inset-0 overflow-hidden">
                                            <div className="absolute top-0 -right-20 w-40 h-40 bg-[#F7931A]/10 blur-3xl rounded-full"></div>
                                            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-[#F7931A]/10 blur-3xl rounded-full"></div>
                                        </div>

                                        <motion.div
                                            initial={{ rotateY: 0 }}
                                            animate={{ rotateY: 360 }}
                                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                            style={{ transformStyle: "preserve-3d" }}
                                            className="relative w-32 h-32 flex items-center justify-center"
                                        >
                                            <svg viewBox="0 0 64 64" className="w-32 h-32">
                                                <g transform="translate(0, 0)">
                                                    <path d="M63.04,39.74C58.76,56.08,41.94,66,25.58,61.64C9.28,57.32,-0.68,40.52,3.64,24.18C7.96,7.88,24.76,-2.08,41.1,2.24C57.42,6.6,67.36,23.4,63.04,39.74Z" className="dark:fill-[#040f32] fill-slate-100" />
                                                    <path d="M46.44,27.78C47.18,23.5,43.94,21.32,39.5,19.9L40.8,15.02L37.76,14.24L36.5,18.94C35.68,18.74,34.82,18.56,33.98,18.38L35.24,13.62L32.2,12.84L30.9,17.72C30.22,17.58,29.56,17.44,28.92,17.28L28.92,17.26L24.78,16.22L23.94,19.48C23.94,19.48,26.16,19.98,26.12,20.02C27.54,20.36,27.78,21.28,27.74,22C27.74,22.42,27.14,24.32,27.14,24.32C27.3,24.36,27.5,24.42,27.72,24.5C27.56,24.46,27.38,24.42,27.2,24.38C26.94,25.3,25.52,27.58,24.58,27.34C24.62,27.3,22.38,26.8,22.38,26.8L20.82,30.32L24.7,31.3C25.46,31.48,26.2,31.68,26.92,31.86L25.6,36.8L28.64,37.58L29.94,32.7C30.8,32.92,31.62,33.12,32.42,33.32L31.12,38.16L34.16,38.94L35.48,34.02C41.42,35.14,45.88,34.68,47.62,29.28C49,24.88,47.04,22.38,43.4,20.84C46.04,20.22,48,18.58,46.44,27.78ZM40.6,27.92C39.58,32.32,32.94,30.06,30.7,29.52L32.22,23.76C34.46,24.3,41.66,23.34,40.6,27.92ZM41.62,19.76C40.68,23.78,35.1,21.88,33.24,21.42L34.62,16.24C36.48,16.7,42.6,15.58,41.62,19.76Z" className="fill-[#F7931A]" />
                                                </g>
                                            </svg>
                                        </motion.div>
                                    </div>
                                </div>

                                {/* Animated benefits */}
                                {[
                                    { text: "Secure", angle: -45, distance: 130 },
                                    { text: "Non-custodial", angle: 45, distance: 130 },
                                    { text: "8.2% APY", angle: 135, distance: 130 },
                                    { text: "Instant access", angle: 225, distance: 130 }
                                ].map((item, idx) => {
                                    const x = Math.cos(item.angle * Math.PI / 180) * item.distance;
                                    const y = Math.sin(item.angle * Math.PI / 180) * item.distance;

                                    return (
                                        <motion.div
                                            key={idx}
                                            initial={{ x, y, opacity: 0 }}
                                            animate={{
                                                x,
                                                y,
                                                opacity: 1,
                                                scale: [1, 1.05, 1]
                                            }}
                                            transition={{
                                                opacity: { delay: 0.5 + (idx * 0.1), duration: 0.5 },
                                                scale: {
                                                    repeat: Infinity,
                                                    repeatType: "reverse",
                                                    duration: 3,
                                                    delay: idx * 0.5
                                                }
                                            }}
                                            className="absolute px-3 py-1 text-xs font-medium rounded-full dark:bg-slate-800/80 bg-white/80 dark:text-[#F7931A] text-[#F7931A] dark:border-slate-700/30 border-slate-200/70 border shadow-sm"
                                        >
                                            {item.text}
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Bottom Curved Border */}
            <div className="absolute bottom-0 inset-x-0 h-4 overflow-hidden">
                <svg viewBox="0 0 1440 24" fill="none" preserveAspectRatio="none" className="absolute w-full h-24 translate-y-[30%]">
                    <path
                        d="M0,24 C480,0 960,0 1440,24 L1440,0 L0,0 Z"
                        className="dark:fill-[#040d36] fill-slate-100"
                    />
                </svg>
                <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#F7931A]/20 to-transparent"></div>
            </div>
        </section>
    );
};

export default ElegantCtaSection;
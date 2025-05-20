"use client"

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wallet, Bitcoin, ShieldCheck, TrendingUp, Coins, Sparkles, ArrowRight } from 'lucide-react';
import { BackgroundElements } from '../Shared/Backgrounds/BackgroundElements';

// Define TypeScript interfaces
interface Feature {
    id: string;
    title: string;
    icon: React.ReactNode;
    description: string;
    benefits: string[];
    color: string;
    gradient: string;
    accentColor: string;
}

const YieldVaultFeatures: React.FC = () => {
    const [activeTab, setActiveTab] = useState<string>('security');
    const [userInteracted, setUserInteracted] = useState<boolean>(false);
    const [animationProgress, setAnimationProgress] = useState<number>(0);
    const autoRotateTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const animationRef = useRef<number>(0);
    const autoRotateDelayMs = 1000; // 15 seconds

    const features: Feature[] = [
        {
            id: 'security',
            title: 'Premium Security',
            icon: <ShieldCheck size={24} />,
            description: 'Your Bitcoin remains sovereign with our non-custodial architecture and multi-layer protection.',
            benefits: [
                'Non-custodial architecture protects your Bitcoin',
                'Multi-signature security for all vault operations',
                'Real-time monitoring of vault health and status',
                'Independent security audits with transparent results'
            ],
            color: '#6366F1',
            gradient: 'from-indigo-500/20 to-indigo-700/10',
            accentColor: 'border-indigo-500/30'
        },
        {
            id: 'yield',
            title: 'Optimized Yield',
            icon: <TrendingUp size={24} />,
            description: 'Earn up to 8.2% APY on your Bitcoin through diversified DeFi yield strategies.',
            benefits: [
                'Diversified yield sources across top DeFi protocols',
                'Automatic optimization to maximize returns',
                'Real-time APY updates based on market conditions',
                'Transparent breakdown of yield sources'
            ],
            color: '#F7931A',
            gradient: 'from-[#F7931A]/20 to-amber-700/10',
            accentColor: 'border-[#F7931A]/30'
        },
        {
            id: 'liquidity',
            title: 'Instant Access',
            icon: <Wallet size={24} />,
            description: 'Withdraw your Bitcoin anytime with no lock periods and full control over your assets.',
            benefits: [
                'No lock periods or withdrawal restrictions',
                'Withdraw with accrued yield at any time',
                'Instant processing of withdrawal requests',
                'No minimum deposit or withdrawal amounts'
            ],
            color: '#10B981',
            gradient: 'from-emerald-500/20 to-emerald-700/10',
            accentColor: 'border-emerald-500/30'
        },
        {
            id: 'analytics',
            title: 'Advanced Analytics',
            icon: <Sparkles size={24} />,
            description: 'Track performance with sophisticated real-time analytics and projections.',
            benefits: [
                'Real-time portfolio performance tracking',
                'Historical yield visualization and analysis',
                'Custom reward projections based on your strategy',
                'Protocol health metrics and status indicators'
            ],
            color: '#8B5CF6',
            gradient: 'from-purple-500/20 to-purple-700/10',
            accentColor: 'border-purple-500/30'
        },
        {
            id: 'compound',
            title: 'Auto-Compounding',
            icon: <Coins size={24} />,
            description: 'Maximize returns with automatic reinvestment of earned yield to accelerate growth.',
            benefits: [
                'Set-and-forget compounding of all earned yields',
                'Gas-optimized reinvestment timing',
                'Customizable compounding frequency',
                'Visual growth tracking of compound effects'
            ],
            color: '#EC4899',
            gradient: 'from-pink-500/20 to-pink-700/10',
            accentColor: 'border-pink-500/30'
        }
    ];

    // Start animation loop
    useEffect(() => {
        const animate = () => {
            setAnimationProgress((prev) => {
                if (prev >= 100) return 0;
                // Adjust speed for smoother animation
                return prev + 100 / ((autoRotateDelayMs / 1000) * 60);
            });
            animationRef.current = requestAnimationFrame(animate);
        };

        animationRef.current = requestAnimationFrame(animate);

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [autoRotateDelayMs]);

    // Setup auto-rotation with console log for debug
    useEffect(() => {
        // Simple interval that runs continuously
        const autoRotateInterval = setInterval(() => {
            // Skip auto-rotation if user just interacted
            if (userInteracted) {
                return;
            }

            // Find next tab and rotate to it
            const currentIndex = features.findIndex(f => f.id === activeTab);
            const nextIndex = (currentIndex + 1) % features.length;
            setActiveTab(features[nextIndex].id);
            setAnimationProgress(0);
        }, autoRotateDelayMs);

        // Clean up on unmount
        return () => clearInterval(autoRotateInterval);
    }, [activeTab, features, autoRotateDelayMs, userInteracted]);


    const handleTabChange = (tabId: string) => {
        setUserInteracted(true);
        setActiveTab(tabId);
        setAnimationProgress(0);

        // Reset userInteracted after delay to resume auto-rotation
        setTimeout(() => {
            setUserInteracted(false);
        }, autoRotateDelayMs * 2);
    };

    const activeFeature = features.find(f => f.id === activeTab) || features[0];

    // Animated background elements


    return (
        <section id="features" className="py-12 relative overflow-hidden bg-gradient-to-br dark:from-slate-900 dark:to-[#0A0E1F] from-slate-50 to-slate-100 border-y dark:border-slate-800/50 border-slate-200/70">
            <BackgroundElements animationProgress={animationProgress} />

            <div className="container mx-auto px-4 relative z-10 max-w-6xl">
                {/* Section Header */}
                <div className="text-center max-w-2xl mx-auto mb-8">
                    <h2 className="text-2xl md:text-3xl font-bold mb-3 text-slate-800 dark:text-white group">
                        Why Choose <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#F7931A] to-amber-500">sBTC</span> Yield Vault
                        <span className="inline-block w-12 h-1 ml-1 bg-gradient-to-r from-[#F7931A] to-[#5546FF] rounded-full transform translate-y-1"></span>
                    </h2>
                    <p className="text-slate-600 dark:text-slate-300 text-sm md:text-base">
                        Generate optimized yield on your Bitcoin through sophisticated DeFi strategies—with
                        institutional-grade security and complete sovereignty over your assets.
                    </p>
                </div>

                {/* Features Tabs */}
                <div className="flex flex-wrap justify-center gap-1.5 mb-8">
                    {features.map((feature) => (
                        <motion.button
                            key={feature.id}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleTabChange(feature.id)}
                            className={`flex items-center px-3 py-2 rounded-lg border transition-all ${activeTab === feature.id
                                ? `bg-gradient-to-r ${feature.gradient} ${feature.accentColor} shadow-md`
                                : 'dark:bg-slate-800/40 dark:border-slate-700/50 dark:hover:bg-slate-800 dark:hover:border-slate-600 bg-white/70 border-slate-200 hover:bg-white hover:border-slate-300'
                                }`}
                        >
                            <span
                                className={`${activeTab === feature.id ? `text-[${feature.color}]` : 'dark:text-slate-400 text-slate-500'}`}
                                style={{ color: activeTab === feature.id ? feature.color : '' }}
                            >
                                {feature.icon}
                            </span>
                            <span className={`ml-2 font-medium text-sm ${activeTab === feature.id ? 'dark:text-white text-slate-800' : 'dark:text-slate-300 text-slate-600'
                                }`}>
                                {feature.title}
                            </span>
                        </motion.button>
                    ))}
                </div>

                {/* Feature Content with AnimatePresence */}
                <div className="relative min-h-[320px] md:min-h-[280px]">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10, position: 'absolute', width: '100%' }}
                            transition={{ duration: 0.3 }}
                            className="grid grid-cols-1 md:grid-cols-12 gap-4"
                        >
                            {/* Feature Illustration Card */}
                            <div className="md:col-span-4 flex justify-center">
                                <div
                                    style={{
                                        boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 20px, rgba(0, 0, 0, 0.05) 0px 1px 5px'
                                    }}
                                    className="relative w-full h-56 md:h-full rounded-xl overflow-hidden backdrop-blur-sm">
                                    {/* Card border glow effect */}
                                    <div
                                        className="absolute inset-px rounded-xl z-0 bg-gradient-to-br dark:from-slate-700/40 dark:via-slate-700/10 dark:to-slate-700/40 from-slate-300/50 via-white/20 to-slate-300/50 opacity-70"
                                        style={{
                                            boxShadow: `0 0 30px 0px rgba(247, 147, 26, 0.08)`,
                                            border: '1px solid rgba(255, 255, 255, 0.05)'
                                        }}
                                    ></div>

                                    {/* Card main background */}
                                    <div className="absolute inset-0 bg-gradient-to-br dark:from-slate-800/80 dark:to-slate-900/80 from-white/80 to-slate-100/80 backdrop-blur-sm"></div>

                                    {/* Icon animation */}
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        {/* Radiating circles */}
                                        <div className="absolute w-40 h-40">
                                            <div
                                                className="absolute inset-0 rounded-full"
                                                style={{
                                                    background: `radial-gradient(circle, ${activeFeature.color}10 0%, transparent 70%)`,
                                                    animation: 'pulse 4s infinite',
                                                    transform: `scale(${1 + Math.sin(animationProgress / 100 * Math.PI) * 0.1})`
                                                }}
                                            ></div>
                                            <div
                                                className="absolute inset-4 rounded-full"
                                                style={{
                                                    background: `radial-gradient(circle, ${activeFeature.color}15 0%, transparent 70%)`,
                                                    animation: 'pulse 4s infinite 0.5s',
                                                    transform: `scale(${1 + Math.cos(animationProgress / 100 * Math.PI) * 0.15})`
                                                }}
                                            ></div>
                                            <div
                                                className="absolute inset-8 rounded-full"
                                                style={{
                                                    background: `radial-gradient(circle, ${activeFeature.color}20 0%, transparent 70%)`,
                                                    animation: 'pulse 4s infinite 1s',
                                                    transform: `scale(${1 + Math.sin(animationProgress / 100 * Math.PI + 1) * 0.2})`
                                                }}
                                            ></div>
                                        </div>

                                        {/* Floating icon */}
                                        <motion.div
                                            initial={{ scale: 0.8, opacity: 0 }}
                                            animate={{
                                                scale: [1, 1.05, 1],
                                                opacity: 1,
                                                y: [0, -3, 0, 3, 0],
                                                rotate: [0, -2, 0, 2, 0],
                                            }}
                                            transition={{
                                                duration: 5,
                                                repeat: Infinity,
                                                repeatType: "mirror"
                                            }}
                                            className="relative z-10"
                                        >
                                            <div
                                                className="h-16 w-16 flex items-center justify-center rounded-full"
                                                style={{
                                                    background: `linear-gradient(135deg, ${activeFeature.color}30, ${activeFeature.color}10)`,
                                                    boxShadow: `0 0 20px 0px ${activeFeature.color}20`,
                                                    border: `1px solid ${activeFeature.color}30`
                                                }}
                                            >
                                                <span className="text-3xl" style={{ color: activeFeature.color }}>
                                                    {activeFeature.icon}
                                                </span>
                                            </div>
                                        </motion.div>

                                        {/* Orbiting Bitcoin */}
                                        <motion.div
                                            className="absolute h-8 w-8 z-10"
                                            animate={{
                                                rotate: 360,
                                            }}
                                            transition={{
                                                duration: 8,
                                                repeat: Infinity,
                                                ease: "linear"
                                            }}
                                            style={{
                                                transformOrigin: "40px 40px"
                                            }}
                                        >
                                            <div className="h-8 w-8 flex items-center justify-center rounded-full bg-[#F7931A]/20">
                                                <Bitcoin size={16} className="text-[#F7931A]" />
                                            </div>
                                        </motion.div>
                                    </div>

                                    {/* Light beam effects */}
                                    <div
                                        className="absolute h-40 w-1 bg-gradient-to-b from-transparent dark:via-[#F7931A]/10 via-[#F7931A]/5 to-transparent blur-sm"
                                        style={{
                                            top: '50%',
                                            left: '50%',
                                            transform: `translate(-50%, -50%) rotate(${animationProgress * 3.6}deg)`,
                                        }}
                                    ></div>
                                    <div
                                        className="absolute h-40 w-1 bg-gradient-to-b from-transparent dark:via-[#F7931A]/10 via-[#F7931A]/5 to-transparent blur-sm"
                                        style={{
                                            top: '50%',
                                            left: '50%',
                                            transform: `translate(-50%, -50%) rotate(${(animationProgress * 3.6) + 90}deg)`,
                                        }}
                                    ></div>
                                </div>
                            </div>

                            {/* Feature Details */}
                            <div className="md:col-span-8">
                                <div
                                    className="h-full rounded-xl p-5 bg-gradient-to-br dark:from-slate-800/60 dark:to-slate-900/60 from-white/60 to-slate-50/60 backdrop-blur-sm border dark:border-slate-700/30 border-slate-200/60"
                                    style={{
                                        boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 20px, rgba(0, 0, 0, 0.05) 0px 1px 5px'
                                    }}
                                >
                                    <h3
                                        className="text-lg font-bold mb-2.5 flex items-center"
                                        style={{ color: activeFeature.color }}
                                    >
                                        {activeFeature.icon}
                                        <span className="ml-2 dark:text-white text-slate-800">{activeFeature.title}</span>
                                    </h3>

                                    <p className="dark:text-slate-300 text-slate-600 text-sm mb-4 leading-relaxed">
                                        {activeFeature.description}
                                    </p>

                                    <div className="space-y-2">
                                        {activeFeature.benefits.map((benefit, index) => (
                                            <motion.div
                                                key={index}
                                                initial={{ opacity: 0, x: -5 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.1 + (index * 0.05) }}
                                                className="flex items-start"
                                            >
                                                <div className="flex-shrink-0 mt-1">
                                                    <div
                                                        className="w-3 h-3 rounded-full flex items-center justify-center"
                                                        style={{
                                                            background: `linear-gradient(135deg, ${activeFeature.color}, ${activeFeature.color}80)`,
                                                            boxShadow: `0 0 5px 0px ${activeFeature.color}40`
                                                        }}
                                                    >
                                                        <svg className="w-2 h-2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                                                        </svg>
                                                    </div>
                                                </div>
                                                <p className="ml-2.5 dark:text-slate-300 text-slate-600 text-sm">{benefit}</p>
                                            </motion.div>
                                        ))}
                                    </div>

                                    <div className="mt-5 pt-4 border-t dark:border-slate-700/30 border-slate-200/60">
                                        <a
                                            href="#deposit"
                                            className="inline-flex items-center text-xs font-medium hover:opacity-80 transition-opacity"
                                            style={{ color: activeFeature.color }}
                                        >
                                            Learn more about {activeFeature.title.toLowerCase()}
                                            <ArrowRight className="w-3 h-3 ml-1.5" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Progress indicator */}
                <div className="mt-6 flex justify-center">
                    <div className="flex space-x-1.5">
                        {features.map((feature, index) => (
                            <button
                                key={index}
                                onClick={() => handleTabChange(feature.id)}
                                className="focus:outline-none"
                                aria-label={`Switch to ${feature.title}`}
                            >
                                <div className="h-1 rounded-full overflow-hidden transition-all duration-300" style={{ width: activeTab === feature.id ? '28px' : '12px' }}>
                                    <div
                                        className={activeTab === feature.id ? 'h-full' : 'h-full dark:bg-slate-600 bg-slate-300'}
                                        style={{
                                            background: activeTab === feature.id ? `linear-gradient(90deg, ${feature.color}, ${feature.color}80)` : '',
                                        }}
                                    >
                                        {activeTab === feature.id && (
                                            <motion.div
                                                className="h-full bg-white/0"
                                                style={{
                                                    width: `${100 - animationProgress}%`,
                                                    background: 'linear-gradient(90deg, rgba(255,255,255,0.1), rgba(255,255,255,0.4))'
                                                }}
                                            />
                                        )}
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Call to Action */}
                <div className="mt-8 text-center">
                    <motion.a
                        href="#deposit"
                        whileHover={{ scale: 1.03, boxShadow: '0 10px 25px -5px rgba(247, 147, 26, 0.3)' }}
                        whileTap={{ scale: 0.98 }}
                        className="inline-flex items-center px-6 py-2.5 rounded-lg bg-gradient-to-r from-[#F7931A] to-amber-600 text-white font-medium shadow-lg shadow-[#F7931A]/20 transition-all text-sm"
                    >
                        <Bitcoin className="mr-2 h-4 w-4" />
                        Start Earning Yield Now
                    </motion.a>
                </div>
            </div>
        </section>
    );
};

export default YieldVaultFeatures;


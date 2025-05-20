"use client";

import React from "react";
import { motion } from "framer-motion";
import YieldVaultBackground from "./YieldVaultBackground";
import YieldVaultDemo from "./YieldVaultDemo";
import GetItNowButton from "./GetItNowButton";
import WalletConnectButton from "@/components/Shared/wallet/WalletConnectButton";

const GlassHero: React.FC = () => {
    // Subtle animated gradient for depth
    const AnimatedGradient = () => (
        <div className="absolute top-0 -right-[40%] w-full h-full z-0 opacity-20 overflow-hidden pointer-events-none">
            <div
                className="absolute top-[10%] right-[10%] w-[70%] h-[80%] rounded-full dark:bg-gradient-to-br dark:from-[#F7931A]/20 dark:to-amber-600/5 bg-gradient-to-br from-[#F7931A]/10 to-amber-600/5 blur-3xl"
                style={{
                    animation: "pulse-slow 15s ease-in-out infinite alternate",
                    transformOrigin: "center"
                }}
            />
        </div>
    );

    return (
        <div className="relative min-h-screen pt-8 md:pt-0 overflow-hidden dark:bg-gradient-to-br dark:from-[#040d36] dark:to-[#0A0E1F] bg-gradient-to-br from-slate-50 to-slate-100">
            {/* Background */}
            <YieldVaultBackground />

            {/* Refined gradient overlay */}
            <AnimatedGradient />

            {/* Subtle grid overlay */}
            <div className="absolute inset-0 dark:bg-grid-slate-900/[0.02] bg-grid-slate-700/[0.02] bg-[size:40px_40px] mix-blend-overlay opacity-20"></div>
            
            {/* Light-mode decorative elements */}
            <div className="absolute inset-0 dark:opacity-0 opacity-100 pointer-events-none">
                <div className="absolute top-[15%] left-[10%] w-64 h-64 rounded-full bg-[#F7931A]/5 blur-3xl"></div>
                <div className="absolute bottom-[20%] right-[5%] w-80 h-80 rounded-full bg-amber-500/5 blur-3xl"></div>
            </div>

            {/* Main Content */}
            <div className="container relative z-10 mx-auto px-4 py-16 md:py-24 lg:py-28 min-h-screen flex flex-col justify-center">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-6 items-center">
                    {/* Left Column - Text Content */}
                    <div className="flex flex-col gap-5 md:justify-start justify-center lg:col-span-6 pr-0 lg:pr-6">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8 }}
                        >
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight dark:text-white text-slate-800 leading-[1.1]">
                                Grow <span className="font-serif italic text-[#F7931A]">Your</span>
                                <br />
                                <span className="font-serif italic dark:text-white text-slate-800">Bitcoin.</span> <span>Without</span>
                                <br />
                                <span>Compromise.</span>
                            </h1>
                        </motion.div>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-lg dark:text-gray-300 text-slate-600 max-w-xl leading-relaxed"
                        >
                            Generate optimized yield on your Bitcoin through sophisticated DeFi strategies—with
                            institutional-grade security and complete sovereignty over your assets.
                        </motion.p>

                        <div className="flex flex-row mt-3 flex-auto gap-4 md:gap-8">
                            <WalletConnectButton buttonClass="py-2" />
                            <GetItNowButton />
                        </div>
                    </div>

                    {/* Right Column - Demo */}
                    <div className="lg:col-span-6 relative">
                        {/* Subtle ring element */}
                        <div className="absolute inset-0 -m-10 pointer-events-none">
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[110%] w-[110%] rounded-full dark:border-orange-50/10 dark:border-[#F7931A]/7 border-[#F7931A]/10"
                                style={{ animation: 'pulse-subtle 7s ease-in-out infinite' }} />
                        </div>

                        {/* Demo Container */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{
                                duration: 1,
                                delay: 0.3,
                                type: "spring",
                                stiffness: 100,
                                damping: 20
                            }}
                            className="relative transform transition-all duration-500 z-10"
                        >
                            {/* Enhanced Demo Component */}
                            <div className="relative">
                                <YieldVaultDemo />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Custom animations */}
            <style jsx global>{`
                @keyframes pulse-slow {
                    0%, 100% {
                        opacity: 0.2;
                        transform: scale(1);
                    }
                    50% {
                        opacity: 0.3;
                        transform: scale(1.02);
                    }
                }
                
                @keyframes pulse-subtle {
                    0%, 100% {
                        opacity: 0.4;
                        transform: translate(-50%, -50%) scale(1);
                    }
                    50% {
                        opacity: 0.2;
                        transform: translate(-50%, -50%) scale(1.02);
                    }
                }
            `}</style>
        </div>
    );
};

export default GlassHero;



// "use client";

// import React from "react";
// import { motion } from "framer-motion";
// import YieldVaultBackground from "./YieldVaultBackground";
// import YieldVaultDemo from "./YieldVaultDemo";
// import GetItNowButton from "./GetItNowButton";
// import WalletConnectButton from "@/components/Shared/wallet/WalletConnectButton";

// const GlassHero: React.FC = () => {
//     // Subtle animated gradient for depth
//     const AnimatedGradient = () => (
//         <div className="absolute top-0 -right-[40%] w-full h-full z-0 opacity-20 overflow-hidden pointer-events-none">
//             <div
//                 className="absolute top-[10%] right-[10%] w-[70%] h-[80%] rounded-full bg-gradient-to-br from-[#F7931A]/20 to-amber-600/5 blur-3xl"
//                 style={{
//                     animation: "pulse-slow 15s ease-in-out infinite alternate",
//                     transformOrigin: "center"
//                 }}
//             />
//         </div>
//     );

//     return (
//         <div className="relative min-h-screen pt-8 md:pt-0 overflow-hidden bg-gradient-to-br from-[#040d36] to-[#0A0E1F]">
//             {/* Background */}
//             <YieldVaultBackground />

//             {/* Refined gradient overlay */}
//             <AnimatedGradient />

//             {/* Subtle grid overlay */}
//             <div className="absolute inset-0 bg-grid-slate-900/[0.02] bg-[size:40px_40px] mix-blend-overlay opacity-20"></div>

//             {/* Main Content */}
//             <div className="container relative z-10 mx-auto px-4 py-16 md:py-24 lg:py-28 min-h-screen flex flex-col justify-center">
//                 <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-6 items-center">
//                     {/* Left Column - Text Content */}
//                     <div className="flex flex-col gap-5 md:justify-start justify-center lg:col-span-6 pr-0 lg:pr-6">
//                         <motion.div
//                             initial={{ opacity: 0 }}
//                             animate={{ opacity: 1 }}
//                             transition={{ duration: 0.8 }}
//                         >
//                             <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1]">
//                                 Grow <span className="font-serif italic text-[#F7931A]">Your</span>
//                                 <br />
//                                 <span className="font-serif italic">Bitcoin.</span> <span>Without</span>
//                                 <br />
//                                 <span>Compromise.</span>
//                             </h1>
//                         </motion.div>

//                         <motion.p
//                             initial={{ opacity: 0, y: 20 }}
//                             animate={{ opacity: 1, y: 0 }}
//                             transition={{ duration: 0.8, delay: 0.2 }}
//                             className="text-lg text-gray-300 max-w-xl leading-relaxed"
//                         >
//                             Generate optimized yield on your Bitcoin through sophisticated DeFi strategies—with
//                             institutional-grade security and complete sovereignty over your assets.
//                         </motion.p>

//                         <div className="flex flex-row mt-3 flex-auto gap-4 md:gap-8">
//                             <WalletConnectButton buttonClass="py-2" />
//                             <GetItNowButton />
//                         </div>

//                     </div>

//                     {/* Right Column - Demo */}
//                     <div className="lg:col-span-6 relative">
//                         {/* Subtle ring element */}
//                         <div className="absolute inset-0 -m-10 pointer-events-none">
//                             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[110%] w-[110%] rounded-full border border-orange-50/10 dark:border-[#F7931A]/7"
//                                 style={{ animation: 'pulse-subtle 7s ease-in-out infinite' }} />
//                         </div>

//                         {/* Demo Container */}
//                         <motion.div
//                             initial={{ opacity: 0, scale: 0.95 }}
//                             animate={{ opacity: 1, scale: 1 }}
//                             transition={{
//                                 duration: 1,
//                                 delay: 0.3,
//                                 type: "spring",
//                                 stiffness: 100,
//                                 damping: 20
//                             }}
//                             className="relative transform transition-all duration-500 z-10"
//                         >
//                             {/* Enhanced Demo Component */}
//                             <div className="relative">
//                                 <YieldVaultDemo />
//                             </div>
//                         </motion.div>
//                     </div>
//                 </div>
//             </div>

//             {/* Custom animations */}
//             <style jsx global>{`
//                 @keyframes pulse-slow {
//                     0%, 100% {
//                         opacity: 0.2;
//                         transform: scale(1);
//                     }
//                     50% {
//                         opacity: 0.3;
//                         transform: scale(1.02);
//                     }
//                 }
                
//                 @keyframes pulse-subtle {
//                     0%, 100% {
//                         opacity: 0.4;
//                         transform: translate(-50%, -50%) scale(1);
//                     }
//                     50% {
//                         opacity: 0.2;
//                         transform: translate(-50%, -50%) scale(1.02);
//                     }
//                 }
//             `}</style>
//         </div>
//     );
// };

// export default GlassHero;


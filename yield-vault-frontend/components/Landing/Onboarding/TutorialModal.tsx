"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    ArrowRight,
    Bitcoin,
    Lock,
    TrendingUp,
    X,
    ChevronRight,
    ChevronLeft,
    Sparkles,
    ShieldCheck,
    Layers,
    Check
} from "lucide-react";
import SBTCYieldVaultLogo from "@/components/Shared/SBTCYieldVaultLogo";

interface TutorialModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConnectWallet: () => void;
}

const TutorialModal: React.FC<TutorialModalProps> = ({ isOpen, onClose, onConnectWallet }) => {
    const [currentStep, setCurrentStep] = useState(0);

    // Reset step when modal opens
    useEffect(() => {
        if (isOpen) {
            setCurrentStep(0);
        }
    }, [isOpen]);

    const tutorialSteps = [
        {
            title: "Understanding sBTC",
            content: (
                <div className="space-y-4">
                    <div className="flex flex-col items-center mb-6">
                        <div className="h-16 w-16 rounded-full bg-gradient-to-r from-[#E3A046]/20 to-amber-600/20 flex items-center justify-center mb-2">
                            <Bitcoin className="h-8 w-8 text-[#E3A046]" />
                        </div>
                        <h3 className="text-lg font-semibold text-white text-center">Bitcoin on Stacks</h3>
                    </div>

                    <p className="text-slate-300 text-sm leading-relaxed">
                        sBTC is Bitcoin that's been wrapped for use on the Stacks blockchain, enabling
                        programmability while maintaining Bitcoin's security. Every sBTC is backed 1:1
                        by Bitcoin held in a decentralized protocol.
                    </p>

                    <div className="bg-indigo-950/20 rounded-lg p-4 border border-indigo-800/20">
                        <h4 className="text-indigo-300 text-sm font-semibold mb-3">Key Characteristics:</h4>
                        <ul className="space-y-2">
                            <li className="flex items-start">
                                <div className="h-5 w-5 rounded-full bg-indigo-900/50 flex items-center justify-center text-xs text-indigo-400 mr-2 mt-0.5 shrink-0">1</div>
                                <p className="text-xs text-slate-300">100% backed by BTC with cryptographic verification</p>
                            </li>
                            <li className="flex items-start">
                                <div className="h-5 w-5 rounded-full bg-indigo-900/50 flex items-center justify-center text-xs text-indigo-400 mr-2 mt-0.5 shrink-0">2</div>
                                <p className="text-xs text-slate-300">Redeemable for BTC at any time</p>
                            </li>
                            <li className="flex items-start">
                                <div className="h-5 w-5 rounded-full bg-indigo-900/50 flex items-center justify-center text-xs text-indigo-400 mr-2 mt-0.5 shrink-0">3</div>
                                <p className="text-xs text-slate-300">Enables advanced financial operations through smart contracts</p>
                            </li>
                        </ul>
                    </div>

                    <div className="bg-blue-950/20 rounded-lg p-4 border border-blue-800/20">
                        <div className="flex items-center mb-2">
                            <Sparkles className="h-4 w-4 text-blue-400 mr-2" />
                            <h4 className="text-blue-300 text-sm font-semibold">The Best of Both Worlds</h4>
                        </div>
                        <p className="text-xs text-slate-300">
                            sBTC combines Bitcoin's stability and security with the programmability of Stacks,
                            enabling sophisticated applications like our Yield Vault to generate returns without
                            compromising on security.
                        </p>
                    </div>
                </div>
            )
        },
        {
            title: "How Our Yield Vault Works",
            content: (
                <div className="space-y-4">
                    <div className="flex flex-col items-center mb-6">
                        <div className="h-16 w-16 rounded-full bg-gradient-to-r from-teal-600/20 to-blue-600/20 flex items-center justify-center mb-2">
                            <TrendingUp className="h-8 w-8 text-teal-400" />
                        </div>
                        <h3 className="text-lg font-semibold text-white text-center">Generating Yield Safely</h3>
                    </div>

                    <p className="text-slate-300 text-sm leading-relaxed">
                        The sBTC Yield Vault employs sophisticated DeFi strategies to generate returns while
                        maintaining the highest security standards for your assets.
                    </p>

                    <div className="relative overflow-hidden rounded-lg border border-slate-700/50">
                        <div className="absolute top-0 right-0 w-40 h-40 bg-teal-600/5 rounded-bl-full"></div>

                        <div className="relative z-10 p-4">
                            <h4 className="text-white text-sm font-semibold mb-4">Yield Generation Process</h4>

                            <div className="space-y-1">
                                <div className="flex items-center py-3 border-b border-slate-700/30">
                                    <div className="w-8 h-8 rounded-full bg-indigo-900/30 flex items-center justify-center text-indigo-400 shrink-0 mr-3">1</div>
                                    <div>
                                        <h5 className="text-indigo-300 text-sm font-medium">Deposit sBTC</h5>
                                        <p className="text-xs text-slate-400">Your sBTC is deposited into a secure, non-custodial smart contract</p>
                                    </div>
                                </div>

                                <div className="flex items-center py-3 border-b border-slate-700/30">
                                    <div className="w-8 h-8 rounded-full bg-blue-900/30 flex items-center justify-center text-blue-400 shrink-0 mr-3">2</div>
                                    <div>
                                        <h5 className="text-blue-300 text-sm font-medium">Multi-Strategy Allocation</h5>
                                        <p className="text-xs text-slate-400">Assets are algorithmically allocated across diversified yield strategies</p>
                                    </div>
                                </div>

                                <div className="flex items-center py-3 border-b border-slate-700/30">
                                    <div className="w-8 h-8 rounded-full bg-teal-900/30 flex items-center justify-center text-teal-400 shrink-0 mr-3">3</div>
                                    <div>
                                        <h5 className="text-teal-300 text-sm font-medium">Continuous Optimization</h5>
                                        <p className="text-xs text-slate-400">Strategies are monitored and rebalanced to maximize returns</p>
                                    </div>
                                </div>

                                <div className="flex items-center py-3">
                                    <div className="w-8 h-8 rounded-full bg-green-900/30 flex items-center justify-center text-green-400 shrink-0 mr-3">4</div>
                                    <div>
                                        <h5 className="text-green-300 text-sm font-medium">Yield Distribution</h5>
                                        <p className="text-xs text-slate-400">Generated yield is distributed to your account or auto-compounded</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-r from-blue-950/20 to-indigo-950/20 rounded-lg p-4 border border-blue-800/20">
                        <div className="flex items-center mb-2">
                            <ShieldCheck className="h-4 w-4 text-blue-400 mr-2" />
                            <h4 className="text-blue-300 text-sm font-semibold">Advanced Security Architecture</h4>
                        </div>
                        <p className="text-xs text-slate-300">
                            Our vault uses multiple security layers including threshold signatures,
                            formal verification, and real-time monitoring to ensure your Bitcoin
                            remains protected throughout the yield generation process.
                        </p>
                    </div>
                </div>
            )
        },
        {
            title: "Security & Transparency",
            content: (
                <div className="space-y-4">
                    <div className="flex flex-col items-center mb-6">
                        <div className="h-16 w-16 rounded-full bg-gradient-to-r from-green-600/20 to-blue-600/20 flex items-center justify-center mb-2">
                            <Lock className="h-8 w-8 text-green-400" />
                        </div>
                        <h3 className="text-lg font-semibold text-white text-center">Enterprise-Grade Security</h3>
                    </div>

                    <p className="text-slate-300 text-sm leading-relaxed">
                        Security is our top priority. We've implemented multiple layers of protection
                        to ensure your assets remain safe at all times while still generating competitive yields.
                    </p>

                    <div className="grid grid-cols-1 gap-3 mb-2">
                        <div className="bg-slate-800/30 rounded-lg p-3 border border-slate-700/30">
                            <div className="flex items-start">
                                <div className="p-2 bg-blue-900/30 rounded-lg mr-3 shrink-0">
                                    <ShieldCheck className="h-5 w-5 text-blue-400" />
                                </div>
                                <div>
                                    <h5 className="text-white text-sm font-medium mb-1">Non-Custodial Design</h5>
                                    <p className="text-xs text-slate-400">
                                        Your assets always remain under your control through cryptographic signatures.
                                        No centralized entity has access to your funds.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-slate-800/30 rounded-lg p-3 border border-slate-700/30">
                            <div className="flex items-start">
                                <div className="p-2 bg-green-900/30 rounded-lg mr-3 shrink-0">
                                    <Layers className="h-5 w-5 text-green-400" />
                                </div>
                                <div>
                                    <h5 className="text-white text-sm font-medium mb-1">Audited Smart Contracts</h5>
                                    <p className="text-xs text-slate-400">
                                        All vault contracts have undergone rigorous audits by leading security firms
                                        with public audit reports available.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-slate-800/30 rounded-lg p-3 border border-slate-700/30">
                            <div className="flex items-start">
                                <div className="p-2 bg-indigo-900/30 rounded-lg mr-3 shrink-0">
                                    <Sparkles className="h-5 w-5 text-indigo-400" />
                                </div>
                                <div>
                                    <h5 className="text-white text-sm font-medium mb-1">Full Transparency</h5>
                                    <p className="text-xs text-slate-400">
                                        All operations are verifiable on-chain with real-time monitoring
                                        and comprehensive analytics available to all users.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-r from-indigo-950/20 via-blue-950/20 to-green-950/20 rounded-lg p-4 border border-indigo-800/20">
                        <h4 className="text-blue-300 text-sm font-semibold mb-3">Our Security Commitment</h4>
                        <div className="space-y-2">
                            <div className="flex items-start">
                                <Check className="h-4 w-4 text-green-400 mr-2 mt-0.5 shrink-0" />
                                <p className="text-xs text-slate-300">Regular third-party security audits and penetration testing</p>
                            </div>
                            <div className="flex items-start">
                                <Check className="h-4 w-4 text-green-400 mr-2 mt-0.5 shrink-0" />
                                <p className="text-xs text-slate-300">Multi-sig governance for protocol updates and emergency controls</p>
                            </div>
                            <div className="flex items-start">
                                <Check className="h-4 w-4 text-green-400 mr-2 mt-0.5 shrink-0" />
                                <p className="text-xs text-slate-300">Sophisticated monitoring for real-time threat detection</p>
                            </div>
                        </div>
                    </div>
                </div>
            )
        },
        {
            title: "Getting Started",
            content: (
                <div className="space-y-4">
                    <div className="flex flex-col items-center mb-6">
                        <div className="h-16 w-16 rounded-full bg-gradient-to-r from-blue-600/20 to-indigo-600/20 flex items-center justify-center mb-2 relative">
                            <ArrowRight className="h-8 w-8 text-blue-400" />
                            <div className="absolute inset-0 rounded-full border-2 border-blue-400/30 animate-ping"></div>
                        </div>
                        <h3 className="text-lg font-semibold text-white text-center">Ready to Begin</h3>
                    </div>

                    <p className="text-slate-300 text-sm leading-relaxed">
                        Follow these simple steps to start earning yield on your Bitcoin with our sBTC Yield Vault.
                    </p>

                    <div className="bg-gradient-to-br from-slate-900 to-[#0A0E1F] rounded-lg border border-slate-700/30 overflow-hidden">
                        <div className="p-4 border-b border-slate-700/30 bg-gradient-to-r from-indigo-950/30 to-[#0A0E1F]">
                            <div className="flex items-center">
                                <div className="w-7 h-7 rounded-full bg-indigo-900/40 flex items-center justify-center text-indigo-400 shrink-0 mr-3 text-xs">1</div>
                                <h5 className="text-indigo-200 font-medium">Connect Your Wallet</h5>
                            </div>
                        </div>
                        <div className="p-4 text-xs text-slate-400 space-y-4">
                            <p>
                                Connect your Stacks-compatible wallet to interact with the sBTC Yield Vault.
                                We support multiple wallet providers for your convenience.
                            </p>
                            <div className="flex justify-center">
                                <motion.button
                                    onClick={onConnectWallet}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white px-5 py-2.5 rounded-lg font-medium text-sm flex items-center"
                                >
                                    <ArrowRight className="mr-2 h-4 w-4" />
                                    Connect Wallet
                                </motion.button>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="bg-slate-800/20 rounded-lg p-3 border border-slate-700/30">
                            <div className="flex items-center mb-2">
                                <div className="w-6 h-6 rounded-full bg-blue-900/30 flex items-center justify-center text-blue-400 shrink-0 mr-2 text-xs">2</div>
                                <h5 className="text-blue-300 text-sm font-medium">Get sBTC</h5>
                            </div>
                            <p className="text-xs text-slate-400">
                                Convert your Bitcoin to sBTC through the Stacks bridge or acquire it from supported exchanges.
                            </p>
                        </div>

                        <div className="bg-slate-800/20 rounded-lg p-3 border border-slate-700/30">
                            <div className="flex items-center mb-2">
                                <div className="w-6 h-6 rounded-full bg-green-900/30 flex items-center justify-center text-green-400 shrink-0 mr-2 text-xs">3</div>
                                <h5 className="text-green-300 text-sm font-medium">Deposit & Earn</h5>
                            </div>
                            <p className="text-xs text-slate-400">
                                Deposit your sBTC into the vault and start earning yield immediately. No lock-up periods required.
                            </p>
                        </div>
                    </div>
                </div>
            )
        }
    ];

    if (!isOpen) return null;

    return (
        <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <motion.div
                className="relative w-full max-w-2xl bg-[#0A0E1F] rounded-xl overflow-hidden shadow-xl"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
                {/* Modal Header */}
                <div className="border-b border-slate-700/40 p-4 flex justify-between items-center bg-gradient-to-r from-[#0A0E1F] to-slate-900">
                    <div className="flex items-center">
                        <SBTCYieldVaultLogo iconOnly className="mr-2" />
                        <h2 className="text-white text-lg font-medium">Learn About sBTC Yield Vault</h2>
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={onClose}
                        className="h-8 w-8 rounded-full flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700/30 transition-colors"
                    >
                        <X className="h-4 w-4" />
                    </motion.button>
                </div>

                {/* Step Progress Indicator */}
                <div className="p-4 border-b border-slate-700/40 bg-slate-900/30">
                    <div className="flex items-center justify-between">
                        {tutorialSteps.map((step, index) => (
                            <div
                                key={index}
                                className="flex flex-col items-center relative"
                                style={{ width: `${100 / tutorialSteps.length}%` }}
                            >
                                <div
                                    className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors cursor-pointer ${currentStep >= index
                                            ? 'bg-gradient-to-br from-[#E3A046] to-amber-600 text-white'
                                            : 'bg-slate-800 text-slate-400 border border-slate-700'
                                        }`}
                                    onClick={() => setCurrentStep(index)}
                                >
                                    {index + 1}
                                </div>

                                {index < tutorialSteps.length - 1 && (
                                    <div className="absolute h-0.5 w-full top-3.5 left-1/2 -z-10">
                                        <div
                                            className="h-full bg-slate-700 transition-all"
                                            style={{
                                                width: currentStep > index ? '100%' : '0%',
                                                transition: 'width 0.5s ease-in-out',
                                            }}
                                        />
                                    </div>
                                )}

                                <span className={`mt-2 text-xs transition-colors text-center ${currentStep === index ? 'text-[#E3A046]' : 'text-slate-500'
                                    }`}>
                                    {step.title}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Content Area */}
                <div className="p-6 max-h-[60vh] overflow-y-auto">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={`content-${currentStep}`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            {tutorialSteps[currentStep].content}
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Navigation Footer */}
                <div className="border-t border-slate-700/40 p-4 flex justify-between items-center bg-gradient-to-r from-slate-900 to-[#0A0E1F]">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                        className={`flex items-center px-4 py-2 rounded-lg text-sm ${currentStep === 0
                                ? 'text-slate-500 cursor-not-allowed'
                                : 'text-white hover:bg-slate-800/40'
                            }`}
                        disabled={currentStep === 0}
                    >
                        <ChevronLeft className="h-4 w-4 mr-1" />
                        Previous
                    </motion.button>

                    {currentStep < tutorialSteps.length - 1 ? (
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setCurrentStep(Math.min(tutorialSteps.length - 1, currentStep + 1))}
                            className="flex items-center px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-sm"
                        >
                            Next
                            <ChevronRight className="h-4 w-4 ml-1" />
                        </motion.button>
                    ) : (
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={onConnectWallet}
                            className="flex items-center px-5 py-2 rounded-lg bg-gradient-to-r from-[#E3A046] to-amber-600 hover:from-[#E3A046] hover:to-amber-700 text-white text-sm font-medium"
                        >
                            Connect Wallet
                            <ArrowRight className="h-4 w-4 ml-2" />
                        </motion.button>
                    )}
                </div>
            </motion.div>
        </motion.div>
    );
};

export default TutorialModal;
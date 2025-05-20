"use client";

import React, { ReactNode, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    ArrowRight,
    Shield,
    TrendingUp,
    Wallet,
    AlertCircle,
    CheckCircle2,
    X,
    ChevronRight,
    Bitcoin,
    Lock,
    RefreshCw,
    Layers,
} from "lucide-react";

import SBTCYieldVaultLogo from "@/components/Shared/SBTCYieldVaultLogo";
import TutorialModal from "./TutorialModal";
import WalletConnectModal from "@/components/Shared/wallet/WalletConnectModal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";

// Animated background component
const AnimatedBackground = () => {
    return (
        <div className="fixed inset-0 z-0 overflow-hidden">
            <div className="absolute inset-0 bg-[#040d36]"></div>
            <div className="absolute inset-0 opacity-20">
                <div className="absolute top-0 -left-40 w-96 h-96 bg-indigo-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
                <div className="absolute top-0 -right-40 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
                <div className="absolute bottom-0 left-20 w-96 h-96 bg-amber-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
            </div>
            <div className="absolute inset-0 bg-grid-slate-900/[0.03] bg-[size:30px_30px] opacity-30"></div>
        </div>
    );
};

// Feature card with hover effect
interface FeatureCardProps {
    icon: ReactNode;
    title: string;
    children: ReactNode;
    color: string;
    delay: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, children, color, delay }) => {
    return (
        <motion.div
            initial={{ x: color.includes("indigo") ? -30 : 30, opacity: 0, y: 10 }}
            animate={{ x: 0, opacity: 1, y: 0 }}
            transition={{ delay, duration: 0.7, type: "spring", stiffness: 100 }}
            whileHover={{ y: -5 }}
            className={`bg-[#0A0E1F]/60 backdrop-blur-sm border border-${color}-900/20 rounded-xl p-5 transition-all duration-300`}
        >
            <div className={`h-12 w-12 bg-${color}-900/30 rounded-lg flex items-center justify-center mb-4`}>
                {icon}
            </div>
            <h2 className="text-xl font-bold text-white mb-2">{title}</h2>
            <ul className="space-y-2">
                {children}
            </ul>
        </motion.div>
    );
};

interface FeatureItemProps {
    children: ReactNode;
}

const FeatureItem: React.FC<FeatureItemProps> = ({ children }) => {
    return (
        <li className="flex items-start">
            <div className="mt-0.5 mr-2 flex-shrink-0 rounded-full border-2 border-green-500/20 bg-green-500/10 p-1">
                <CheckCircle2 className="h-3.5 w-3.5 text-green-500" />
            </div>
            <span className="text-slate-300 text-sm leading-relaxed">{children}</span>
        </li>
    );
};


// Wallet Status Check Component with enhanced styling
interface WalletStatusCheckProps {
    hasSBTC: boolean;
    onGetSBTC: () => void;
    onContinue: () => void;
}

const WalletStatusCheck: React.FC<WalletStatusCheckProps> = ({ hasSBTC, onGetSBTC, onContinue }) => {
    return (
        <motion.div
            className="bg-[#0A0E1F] border border-slate-700/40 rounded-xl overflow-hidden shadow-xl max-w-md w-full"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
            <div className="border-b border-slate-700/40 p-4 flex justify-between items-center bg-gradient-to-r from-[#0A0E1F] to-slate-900/70">
                <h2 className="text-white text-lg font-medium">Wallet Status</h2>
                <Badge variant="outline" className="border-green-500 text-green-400 bg-green-500/10 flex items-center space-x-1">
                    <span className="h-2 w-2 rounded-full bg-green-500 mr-1"></span>
                    Connected
                </Badge>
            </div>

            <div className="p-6">
                {hasSBTC ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center"
                    >
                        <motion.div
                            className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-green-900/20 mb-4 relative"
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        >
                            <div className="absolute inset-0 rounded-full border-4 border-green-500/20 animate-ping opacity-20"></div>
                            <CheckCircle2 className="h-10 w-10 text-green-500" />
                        </motion.div>
                        <h3 className="text-2xl font-semibold text-white mb-2">Ready to Start!</h3>
                        <p className="text-slate-300 text-sm mb-6 max-w-xs mx-auto">
                            Your wallet is connected and has sBTC. You're ready to start earning yield on your Bitcoin.
                        </p>
                        <motion.div
                            initial={{ y: 10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                        >
                            <Button
                                onClick={onContinue}
                                size="lg"
                                className="bg-gradient-to-r from-[#E3A046] to-amber-600 hover:from-[#E3A046]/90 hover:to-amber-600/90 text-white font-medium px-8 py-6 rounded-lg h-auto"
                            >
                                Continue to Dashboard
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </motion.div>
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center"
                    >
                        <motion.div
                            className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-amber-900/20 mb-4 relative"
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        >
                            <div className="absolute inset-0 rounded-full border-4 border-amber-500/20 animate-pulse"></div>
                            <AlertCircle className="h-10 w-10 text-amber-500" />
                        </motion.div>
                        <h3 className="text-2xl font-semibold text-white mb-2">No sBTC Found</h3>
                        <p className="text-slate-300 text-sm mb-6 max-w-xs mx-auto">
                            Your wallet is connected, but you don't have any sBTC yet. You'll need to acquire sBTC before you can use the vault.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-3">
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button
                                            onClick={onGetSBTC}
                                            size="lg"
                                            className="bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-600/90 hover:to-blue-600/90 text-white font-medium"
                                        >
                                            <Bitcoin className="mr-2 h-4 w-4" />
                                            Get sBTC
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent className="bg-slate-900 border-slate-700 text-slate-200">
                                        <p>Opens the sBTC Bridge in a new tab</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>

                            <Button
                                onClick={onContinue}
                                variant="outline"
                                size="lg"
                                className="border-slate-600 text-white hover:bg-slate-800/40"
                            >
                                Continue Anyway
                            </Button>
                        </div>
                    </motion.div>
                )}
            </div>
        </motion.div>
    );
};

// Guided Tour Component with enhanced animations and styling
interface GuidedTourProps {
    activeStep: number;
    onNext: () => void;
    onSkip: () => void;
}

const GuidedTour: React.FC<GuidedTourProps> = ({ activeStep, onNext, onSkip }) => {
    // Tour steps with positioning and content
    const tourSteps = [
        {
            title: "Welcome to sBTC Yield Vault",
            description: "This guided tour will help you understand the key features of the dashboard and how to get started.",
            position: { top: "50%", left: "50%", transform: "translate(-50%, -50%)" },
            highlight: null
        },
        {
            title: "Your Portfolio Overview",
            description: "Here you can track your deposits, earnings, and overall performance in real-time.",
            position: { top: "100px", left: "50%", transform: "translate(-50%, 0)" },
            highlight: { selector: ".portfolio-section", position: "top" }
        },
        {
            title: "Deposit & Withdraw",
            description: "Easily deposit sBTC to start earning yield or withdraw your funds and earnings at any time.",
            position: { top: "50%", right: "20px", transform: "translateY(-50%)" },
            highlight: { selector: ".actions-section", position: "right" }
        },
        {
            title: "Security Features",
            description: "We've implemented multiple security measures to protect your assets, including non-custodial architecture and real-time monitoring.",
            position: { bottom: "100px", left: "50%", transform: "translate(-50%, 0)" },
            highlight: { selector: ".security-section", position: "bottom" }
        }
    ];

    const currentStep = tourSteps[activeStep];

    return (
        <div className="fixed inset-0 z-50 pointer-events-none">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.7 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black pointer-events-auto"
                onClick={onSkip}
            />

            <motion.div
                className="absolute pointer-events-auto bg-[#0A0E1F]/95 backdrop-blur-sm border border-slate-700/50 rounded-xl shadow-xl max-w-md"
                style={currentStep.position as any}
                initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
                <div className="absolute -top-2 -right-2 z-10">
                    <Button
                        size="icon"
                        variant="outline"
                        className="h-6 w-6 rounded-full bg-slate-800 border-slate-700 hover:bg-slate-700"
                        onClick={onSkip}
                    >
                        <X className="h-3 w-3 text-slate-400" />
                    </Button>
                </div>

                <div className="px-6 pt-6 pb-2">
                    <div className="flex items-center mb-3">
                        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center text-white font-medium mr-3">
                            {activeStep + 1}
                        </div>
                        <h3 className="text-lg font-semibold text-white">{currentStep.title}</h3>
                    </div>

                    <p className="text-slate-300 text-sm leading-relaxed mb-5">
                        {currentStep.description}
                    </p>

                    <div className="flex space-x-1 mb-4">
                        {tourSteps.map((_, index) => (
                            <div
                                key={index}
                                className={`h-1.5 rounded-full transition-all ${index === activeStep
                                        ? 'w-6 bg-gradient-to-r from-indigo-500 to-blue-500'
                                        : 'w-1.5 bg-slate-600'
                                    }`}
                            />
                        ))}
                    </div>
                </div>

                <div className="p-3 border-t border-slate-700/40 bg-slate-800/30">
                    <div className="flex justify-between items-center">
                        <Button
                            variant="ghost"
                            size="sm"
                            className="text-slate-400 hover:text-white"
                            onClick={onSkip}
                        >
                            Skip tour
                        </Button>

                        <Button
                            onClick={onNext}
                            size="sm"
                            className="bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white"
                        >
                            {activeStep < tourSteps.length - 1 ? 'Next' : 'Get Started'}
                            <ChevronRight className="ml-1 h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </motion.div>

            {/* Highlight effect for the current section being explained */}
            {currentStep.highlight && (
                <motion.div
                    className="absolute pointer-events-none border-2 border-blue-500 rounded-lg"
                    style={{
                        top: '200px',
                        left: '100px',
                        width: '400px',
                        height: '300px'
                    }}
                    initial={{ opacity: 0, boxShadow: "0 0 0 rgba(59, 130, 246, 0)" }}
                    animate={{
                        opacity: 1,
                        boxShadow: ["0 0 0 rgba(59, 130, 246, 0)", "0 0 20px rgba(59, 130, 246, 0.3)", "0 0 0 rgba(59, 130, 246, 0)"]
                    }}
                    transition={{
                        boxShadow: {
                            repeat: Infinity,
                            duration: 2,
                        }
                    }}
                />
            )}
        </div>
    );
};

// Main Onboarding Container Component
interface NewUserOnboardingProps {
    onOnboardingComplete: () => void;
}

const NewUserOnboarding: React.FC<NewUserOnboardingProps> = ({ onOnboardingComplete }) => {
    const [onboardingStep, setOnboardingStep] = useState<
        "landing" | "learnMore" | "connectWallet" | "walletCheck" | "tour" | "complete"
    >("landing");

    const [userWalletData, setUserWalletData] = useState({
        isConnected: false,
        hasSBTC: false,
        address: ''
    });

    // For the progress indicator
    const progressSteps = [
        { id: "landing", label: "Welcome" },
        { id: "connectWallet", label: "Connect" },
        { id: "walletCheck", label: "Verify" },
        { id: "tour", label: "Learn" },
        { id: "complete", label: "Start" }
    ];

    const currentStepIndex = progressSteps.findIndex(step => step.id === onboardingStep);
    const progressPercent = currentStepIndex >= 0
        ? (currentStepIndex / (progressSteps.length - 1)) * 100
        : 0;

    const handleConnectWallet = () => {
        setOnboardingStep("connectWallet");
    };

    const handleLearnMore = () => {
        setOnboardingStep("learnMore");
    };

    const handleWalletConnected = (walletAddress: string, hasSBTC: boolean) => {
        setUserWalletData({
            isConnected: true,
            hasSBTC,
            address: walletAddress
        });
        setOnboardingStep("walletCheck");
    };

    const handleStartTour = () => {
        setOnboardingStep("tour");
    };

    const handleCompleteTour = () => {
        setOnboardingStep("complete");
        onOnboardingComplete();
    };

    return (
        <div className="min-h-screen relative">
            {/* Animated background */}
            <AnimatedBackground />

            {/* Progress indicator */}
            <div className="fixed top-0 left-0 right-0 z-50 mt-20 px-4 py-2"> {/* Added mt-20 to avoid navbar */}
                <div className="container mx-auto">
                    <div className="w-full md:w-3/4 lg:w-1/2 mx-auto">
                        <div className="flex items-center justify-between mb-1">
                            <div className="hidden md:flex space-x-2 text-xs text-slate-400">
                                {progressSteps.map((step, index) => (
                                    <div
                                        key={step.id}
                                        className={`transition-colors ${index <= currentStepIndex
                                                ? 'text-white font-medium'
                                                : 'text-slate-500'
                                            }`}
                                    >
                                        {step.label}
                                        {index < progressSteps.length - 1 && <span className="mx-1">•</span>}
                                    </div>
                                ))}
                            </div>
                            <span className="text-xs text-slate-400">{Math.round(progressPercent)}%</span>
                        </div>
                        <Progress value={progressPercent} className="h-1 bg-slate-800">
                            <div
                                className="h-full bg-gradient-to-r from-indigo-500 via-blue-500 to-[#E3A046] rounded-full transition-all duration-500 ease-in-out"
                                style={{ width: `${progressPercent}%` }}
                            />
                        </Progress>
                    </div>
                </div>
            </div>

            <AnimatePresence mode="wait">
                {onboardingStep === "landing" && (
                    <motion.div
                        key="landing"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="container mx-auto px-4 py-12 pt-32 relative z-10"
                    >
                        <header className="mb-12">
                            <motion.div
                                initial={{ y: -20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                className="flex justify-center mb-6"
                            >
                                <SBTCYieldVaultLogo className="h-14" />
                            </motion.div>

                            <motion.h1
                                initial={{ y: -20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.3 }}
                                className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 text-center"
                            >
                                Earn <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#E3A046] to-amber-500">Bitcoin</span> Yield with <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-blue-400">Uncompromised</span> <span className="text-blue-300">Security</span>
                            </motion.h1>

                            <motion.p
                                initial={{ y: -20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.4 }}
                                className="text-slate-300 max-w-2xl mx-auto text-center"
                            >
                                The sBTC Yield Vault generates automated, decentralized yield on your Bitcoin through sophisticated DeFi strategies
                                while maintaining complete security and transparency.
                            </motion.p>

                            {/* APY Display */}
                            <motion.div
                                initial={{ y: 20, opacity: 0, scale: 0.9 }}
                                animate={{ y: 0, opacity: 1, scale: 1 }}
                                transition={{ delay: 0.5, type: "spring" }}
                                className="flex justify-center mt-6 mb-12"
                            >
                                <Badge variant="outline" className="px-4 py-2 rounded-full border-amber-500/50 text-amber-400 bg-amber-500/5 text-lg font-bold flex items-center gap-2">
                                    <span className="text-xs uppercase tracking-wider text-amber-300 font-normal">Current APY:</span> 8.2%
                                </Badge>
                            </motion.div>
                        </header>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-10">
                            {/* Security Features */}
                            <FeatureCard
                                icon={<Shield className="h-6 w-6 text-indigo-400" />}
                                title="Bank-Grade Security"
                                color="indigo"
                                delay={0.5}
                            >
                                <FeatureItem>
                                    Non-custodial architecture preserves your sovereignty
                                </FeatureItem>
                                <FeatureItem>
                                    Multi-layer protection with Bitcoin and Stacks security
                                </FeatureItem>
                                <FeatureItem>
                                    All smart contracts audited by leading security firms
                                </FeatureItem>
                            </FeatureCard>

                            {/* Yield Benefits */}
                            <FeatureCard
                                icon={<TrendingUp className="h-6 w-6 text-blue-400" />}
                                title="Optimized Returns"
                                color="blue"
                                delay={0.6}
                            >
                                <FeatureItem>
                                    Earn up to 8.2% APY on your Bitcoin
                                </FeatureItem>
                                <FeatureItem>
                                    Diversified strategies minimize risk while maximizing yield
                                </FeatureItem>
                                <FeatureItem>
                                    No lock-up periods - withdraw anytime with accrued yield
                                </FeatureItem>
                            </FeatureCard>
                        </div>

                        <motion.div
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.7 }}
                            className="flex flex-col md:flex-row justify-center items-center gap-4 max-w-md mx-auto"
                        >
                            <motion.div
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                className="w-full"
                            >
                                <Button
                                    onClick={handleConnectWallet}
                                    size="lg"
                                    className="w-full bg-gradient-to-r from-[#E3A046] to-amber-600 hover:from-[#E3A046]/90 hover:to-amber-700 text-white py-6 text-lg h-auto"
                                >
                                    <Wallet className="mr-2 h-5 w-5" />
                                    Connect Wallet
                                </Button>
                            </motion.div>

                            <motion.div
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                className="w-full"
                            >
                                <Button
                                    onClick={handleLearnMore}
                                    variant="outline"
                                    size="lg"
                                    className="w-full border-slate-700 text-white hover:bg-slate-800/40 py-6 text-lg h-auto"
                                >
                                    Learn More
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Button>
                            </motion.div>
                        </motion.div>

                        {/* Trust indicators */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.9 }}
                            className="mt-12 max-w-4xl mx-auto"
                        >
                            <Separator className="mb-6 bg-slate-700/50" />
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                                <div className="flex flex-col items-center p-3">
                                    <div className="h-10 w-10 rounded-full bg-blue-900/20 border border-blue-700/20 flex items-center justify-center mb-2">
                                        <Lock className="h-5 w-5 text-blue-400" />
                                    </div>
                                    <h4 className="text-white text-sm font-medium mb-1">Audited</h4>
                                    <p className="text-slate-400 text-xs">by Certik</p>
                                </div>
                                <div className="flex flex-col items-center p-3">
                                    <div className="h-10 w-10 rounded-full bg-indigo-900/20 border border-indigo-700/20 flex items-center justify-center mb-2">
                                        <Layers className="h-5 w-5 text-indigo-400" />
                                    </div>
                                    <h4 className="text-white text-sm font-medium mb-1">Multi-sig</h4>
                                    <p className="text-slate-400 text-xs">7/10 threshold</p>
                                </div>
                                <div className="flex flex-col items-center p-3">
                                    <div className="h-10 w-10 rounded-full bg-green-900/20 border border-green-700/20 flex items-center justify-center mb-2">
                                        <RefreshCw className="h-5 w-5 text-green-400" />
                                    </div>
                                    <h4 className="text-white text-sm font-medium mb-1">Uptime</h4>
                                    <p className="text-slate-400 text-xs">99.9% reliability</p>
                                </div>
                                <div className="flex flex-col items-center p-3">
                                    <div className="h-10 w-10 rounded-full bg-amber-900/20 border border-amber-700/20 flex items-center justify-center mb-2">
                                        <Bitcoin className="h-5 w-5 text-amber-400" />
                                    </div>
                                    <h4 className="text-white text-sm font-medium mb-1">sBTC</h4>
                                    <p className="text-slate-400 text-xs">Official integration</p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}

                {onboardingStep === "learnMore" && (
                    <motion.div
                        key="learn-more"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="container mx-auto px-4 py-12 pt-32"
                    >
                        <TutorialModal
                            isOpen={onboardingStep === "learnMore"}
                            onClose={() => setOnboardingStep("landing")}
                            onConnectWallet={handleConnectWallet}
                        />
                    </motion.div>
                )}

                {onboardingStep === "connectWallet" && (
                    <motion.div
                        key="connect-wallet"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 flex items-center justify-center bg-black/70 p-4 z-50"
                    >
                        <WalletConnectModal
                            isOpen={onboardingStep === "connectWallet"}
                            onClose={() => setOnboardingStep("landing")}
                            onWalletConnected={(address, hasSBTC) => handleWalletConnected(address, hasSBTC)}
                        />
                    </motion.div>
                )}

                {onboardingStep === "walletCheck" && (
                    <motion.div
                        key="wallet-check"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="container mx-auto px-4 py-24 pt-36 flex justify-center items-center min-h-screen"
                    >
                        <WalletStatusCheck
                            hasSBTC={userWalletData.hasSBTC}
                            onGetSBTC={() => window.open("https://www.stacks.co/sbtc", "_blank")}
                            onContinue={handleStartTour}
                        />
                    </motion.div>
                )}

                {onboardingStep === "tour" && (
                    <motion.div
                        key="tour"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="min-h-screen pt-24" // Added padding-top
                    >
                        {/* Mock Dashboard Content for Tour */}
                        <div className="container mx-auto px-4 py-12">
                            <div className="portfolio-section mb-8 bg-[#0A0E1F]/60 border border-slate-700/30 rounded-xl p-6">
                                <h2 className="text-xl font-bold text-white mb-4">Portfolio Overview</h2>
                                <div className="bg-slate-800/50 h-64 rounded-lg"></div>
                            </div>

                            <div className="actions-section mb-8 bg-[#0A0E1F]/60 border border-slate-700/30 rounded-xl p-6">
                                <h2 className="text-xl font-bold text-white mb-4">Deposit & Withdraw</h2>
                                <div className="bg-slate-800/50 h-64 rounded-lg"></div>
                            </div>

                            <div className="security-section mb-8 bg-[#0A0E1F]/60 border border-slate-700/30 rounded-xl p-6">
                                <h2 className="text-xl font-bold text-white mb-4">Security Settings</h2>
                                <div className="bg-slate-800/50 h-64 rounded-lg"></div>
                            </div>
                        </div>

                        {/* The Guided Tour UI */}
                        <GuidedTour
                            activeStep={0}
                            onNext={handleCompleteTour}
                            onSkip={handleCompleteTour}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default NewUserOnboarding;




// "use client";

// import React, { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//     ArrowRight,
//     Shield,
//     TrendingUp,
//     Wallet,
//     AlertCircle,
//     CheckCircle2,
//     X
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import SBTCYieldVaultLogo from "@/components/Shared/SBTCYieldVaultLogo";
// import TutorialModal from "./TutorialModal";
// import WalletConnectModal from "@/components/Shared/wallet/WalletConnectModal";

// // Wallet Status Check Component
// interface WalletStatusCheckProps {
//     hasSBTC: boolean;
//     onGetSBTC: () => void;
//     onContinue: () => void;
// }

// const WalletStatusCheck: React.FC<WalletStatusCheckProps> = ({ hasSBTC, onGetSBTC, onContinue }) => {
//     return (
//         <motion.div
//             className="bg-[#0A0E1F] border border-slate-700/40 rounded-xl overflow-hidden shadow-xl"
//             initial={{ y: 20, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             transition={{ type: "spring", stiffness: 300, damping: 30 }}
//         >
//             <div className="border-b border-slate-700/40 p-4 flex justify-between items-center">
//                 <h2 className="text-white text-lg font-medium">Wallet Connected</h2>
//                 <div className="h-2 w-2 rounded-full bg-green-500"></div>
//             </div>

//             <div className="p-6">
//                 {hasSBTC ? (
//                     <motion.div
//                         initial={{ opacity: 0 }}
//                         animate={{ opacity: 1 }}
//                         className="text-center"
//                     >
//                         <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-900/20 mb-4">
//                             <CheckCircle2 className="h-8 w-8 text-green-500" />
//                         </div>
//                         <h3 className="text-xl font-semibold text-white mb-2">Ready to Start!</h3>
//                         <p className="text-slate-300 text-sm mb-6">
//                             Your wallet is connected and has sBTC. You're ready to start earning yield on your Bitcoin.
//                         </p>
//                         <motion.button
//                             whileHover={{ scale: 1.05 }}
//                             whileTap={{ scale: 0.95 }}
//                             onClick={onContinue}
//                             className="px-8 py-3 rounded-lg bg-gradient-to-r from-[#E3A046] to-amber-600 text-white font-medium"
//                         >
//                             Continue to Dashboard
//                         </motion.button>
//                     </motion.div>
//                 ) : (
//                     <motion.div
//                         initial={{ opacity: 0 }}
//                         animate={{ opacity: 1 }}
//                         className="text-center"
//                     >
//                         <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-amber-900/20 mb-4">
//                             <AlertCircle className="h-8 w-8 text-amber-500" />
//                         </div>
//                         <h3 className="text-xl font-semibold text-white mb-2">No sBTC Found</h3>
//                         <p className="text-slate-300 text-sm mb-6">
//                             Your wallet is connected, but you don't have any sBTC yet. You'll need to acquire sBTC before you can use the vault.
//                         </p>
//                         <div className="flex flex-col sm:flex-row justify-center gap-3">
//                             <motion.button
//                                 whileHover={{ scale: 1.05 }}
//                                 whileTap={{ scale: 0.95 }}
//                                 onClick={onGetSBTC}
//                                 className="px-6 py-3 rounded-lg bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-medium"
//                             >
//                                 Get sBTC
//                             </motion.button>
//                             <motion.button
//                                 whileHover={{ scale: 1.05 }}
//                                 whileTap={{ scale: 0.95 }}
//                                 onClick={onContinue}
//                                 className="px-6 py-3 rounded-lg border border-slate-600 text-white hover:bg-slate-800/40"
//                             >
//                                 Continue Anyway
//                             </motion.button>
//                         </div>
//                     </motion.div>
//                 )}
//             </div>
//         </motion.div>
//     );
// };

// // Guided Tour Component
// interface GuidedTourProps {
//     activeStep: number;
//     onNext: () => void;
//     onSkip: () => void;
// }

// const GuidedTour: React.FC<GuidedTourProps> = ({ activeStep, onNext, onSkip }) => {
//     // Tour steps with positioning and content
//     const tourSteps = [
//         {
//             title: "Welcome to sBTC Yield Vault",
//             description: "This guided tour will help you understand the key features of the dashboard and how to get started.",
//             position: { top: "50%", left: "50%", transform: "translate(-50%, -50%)" },
//             highlight: null
//         },
//         {
//             title: "Your Portfolio Overview",
//             description: "Here you can track your deposits, earnings, and overall performance in real-time.",
//             position: { top: "100px", left: "50%", transform: "translate(-50%, 0)" },
//             highlight: { selector: ".portfolio-section", position: "top" }
//         },
//         {
//             title: "Deposit & Withdraw",
//             description: "Easily deposit sBTC to start earning yield or withdraw your funds and earnings at any time.",
//             position: { top: "50%", right: "20px", transform: "translateY(-50%)" },
//             highlight: { selector: ".actions-section", position: "right" }
//         },
//         {
//             title: "Security Features",
//             description: "We've implemented multiple security measures to protect your assets, including non-custodial architecture and real-time monitoring.",
//             position: { bottom: "100px", left: "50%", transform: "translate(-50%, 0)" },
//             highlight: { selector: ".security-section", position: "bottom" }
//         }
//     ];

//     const currentStep = tourSteps[activeStep];

//     return (
//         <div className="fixed inset-0 z-50 pointer-events-none">
//             <motion.div
//                 className="absolute pointer-events-auto bg-[#0A0E1F]/95 backdrop-blur-sm border border-slate-700/50 rounded-xl p-5 shadow-xl max-w-md"
//                 style={currentStep.position as any}
//                 initial={{ opacity: 0, scale: 0.9 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 transition={{ type: "spring", stiffness: 300, damping: 30 }}
//             >
//                 <div className="absolute top-3 right-3">
//                     <motion.button
//                         whileHover={{ scale: 1.1 }}
//                         whileTap={{ scale: 0.9 }}
//                         onClick={onSkip}
//                         className="text-slate-400 hover:text-white"
//                     >
//                         <X className="h-4 w-4" />
//                     </motion.button>
//                 </div>

//                 <div className="flex items-center mb-3">
//                     <div className="h-8 w-8 rounded-full bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center text-white font-medium mr-3">
//                         {activeStep + 1}
//                     </div>
//                     <h3 className="text-lg font-semibold text-white">{currentStep.title}</h3>
//                 </div>

//                 <p className="text-slate-300 text-sm mb-6">
//                     {currentStep.description}
//                 </p>

//                 <div className="flex justify-between items-center">
//                     <div className="flex space-x-1">
//                         {tourSteps.map((_, index) => (
//                             <div
//                                 key={index}
//                                 className={`h-1.5 rounded-full transition-all ${index === activeStep
//                                     ? 'w-6 bg-blue-500'
//                                     : 'w-1.5 bg-slate-600'
//                                     }`}
//                             />
//                         ))}
//                     </div>

//                     <motion.button
//                         whileHover={{ scale: 1.05 }}
//                         whileTap={{ scale: 0.95 }}
//                         onClick={onNext}
//                         className="px-5 py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-blue-600 text-white text-sm"
//                     >
//                         {activeStep < tourSteps.length - 1 ? 'Next' : 'Get Started'}
//                     </motion.button>
//                 </div>
//             </motion.div>

//             {/* Highlight effect for the current section being explained */}
//             {currentStep.highlight && (
//                 <div
//                     className="absolute pointer-events-none border-2 border-blue-500 rounded-lg animate-pulse"
//                     style={{
//                         // This would be calculated based on the actual element position
//                         top: '200px',
//                         left: '100px',
//                         width: '400px',
//                         height: '300px'
//                     }}
//                 />
//             )}
//         </div>
//     );
// };

// // Main Onboarding Container Component
// interface NewUserOnboardingProps {
//     onOnboardingComplete: () => void;
// }

// const NewUserOnboarding: React.FC<NewUserOnboardingProps> = ({ onOnboardingComplete }) => {
//     const [onboardingStep, setOnboardingStep] = useState<
//         "landing" | "learnMore" | "connectWallet" | "walletCheck" | "tour" | "complete"
//     >("landing");

//     const [userWalletData, setUserWalletData] = useState({
//         isConnected: false,
//         hasSBTC: false,
//         address: ''
//     });

//     const handleConnectWallet = () => {
//         setOnboardingStep("connectWallet");
//     };

//     const handleLearnMore = () => {
//         setOnboardingStep("learnMore");
//     };

//     const handleWalletConnected = (walletAddress: string, hasSBTC: boolean) => {
//         setUserWalletData({
//             isConnected: true,
//             hasSBTC,
//             address: walletAddress
//         });
//         setOnboardingStep("walletCheck");
//     };

//     const handleStartTour = () => {
//         setOnboardingStep("tour");
//     };

//     const handleCompleteTour = () => {
//         setOnboardingStep("complete");
//         onOnboardingComplete();
//     };

//     return (
//         <div className="min-h-screen bg-gradient-to-b from-[#040d36] to-[#071336]">
//             <AnimatePresence mode="wait">
//                 {onboardingStep === "landing" && (
//                     <motion.div
//                         key="landing"
//                         initial={{ opacity: 0 }}
//                         animate={{ opacity: 1 }}
//                         exit={{ opacity: 0 }}
//                         className="container mx-auto px-4 py-12"
//                     >
//                         <header className="mb-16 text-center">
//                             <motion.div
//                                 initial={{ y: -20, opacity: 0 }}
//                                 animate={{ y: 0, opacity: 1 }}
//                                 transition={{ delay: 0.2 }}
//                                 className="flex justify-center mb-6"
//                             >
//                                 <SBTCYieldVaultLogo className="h-14" />
//                             </motion.div>

//                             <motion.h1
//                                 initial={{ y: -20, opacity: 0 }}
//                                 animate={{ y: 0, opacity: 1 }}
//                                 transition={{ delay: 0.3 }}
//                                 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4"
//                             >
//                                 Earn <span style={{ color: "#E3A046" }}>Bitcoin</span> Yield with <span className="text-indigo-300">Uncompromised</span> <span className="text-blue-300">Security</span>
//                             </motion.h1>

//                             <motion.p
//                                 initial={{ y: -20, opacity: 0 }}
//                                 animate={{ y: 0, opacity: 1 }}
//                                 transition={{ delay: 0.4 }}
//                                 className="text-slate-300 max-w-2xl mx-auto"
//                             >
//                                 The sBTC Yield Vault generates automated, decentralized yield on your Bitcoin through sophisticated DeFi strategies
//                                 while maintaining complete security and transparency.
//                             </motion.p>
//                         </header>

//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12">
//                             {/* Security Features */}
//                             <motion.div
//                                 initial={{ x: -30, opacity: 0 }}
//                                 animate={{ x: 0, opacity: 1 }}
//                                 transition={{ delay: 0.5 }}
//                                 className="bg-[#0A0E1F]/60 backdrop-blur-sm border border-indigo-900/20 rounded-xl p-6"
//                             >
//                                 <div className="h-12 w-12 bg-indigo-900/30 rounded-lg flex items-center justify-center mb-6">
//                                     <Shield className="h-6 w-6 text-indigo-400" />
//                                 </div>
//                                 <h2 className="text-xl font-bold text-white mb-3">Bank-Grade Security</h2>
//                                 <ul className="space-y-3">
//                                     <li className="flex items-start">
//                                         <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
//                                         <span className="text-slate-300">Non-custodial architecture preserves your sovereignty</span>
//                                     </li>
//                                     <li className="flex items-start">
//                                         <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
//                                         <span className="text-slate-300">Multi-layer protection with Bitcoin and Stacks security</span>
//                                     </li>
//                                     <li className="flex items-start">
//                                         <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
//                                         <span className="text-slate-300">All smart contracts audited by leading security firms</span>
//                                     </li>
//                                 </ul>
//                             </motion.div>

//                             {/* Yield Benefits */}
//                             <motion.div
//                                 initial={{ x: 30, opacity: 0 }}
//                                 animate={{ x: 0, opacity: 1 }}
//                                 transition={{ delay: 0.6 }}
//                                 className="bg-[#0A0E1F]/60 backdrop-blur-sm border border-blue-900/20 rounded-xl p-6"
//                             >
//                                 <div className="h-12 w-12 bg-blue-900/30 rounded-lg flex items-center justify-center mb-6">
//                                     <TrendingUp className="h-6 w-6 text-blue-400" />
//                                 </div>
//                                 <h2 className="text-xl font-bold text-white mb-3">Optimized Returns</h2>
//                                 <ul className="space-y-3">
//                                     <li className="flex items-start">
//                                         <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
//                                         <span className="text-slate-300">Earn up to 8.2% APY on your Bitcoin</span>
//                                     </li>
//                                     <li className="flex items-start">
//                                         <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
//                                         <span className="text-slate-300">Diversified strategies minimize risk while maximizing yield</span>
//                                     </li>
//                                     <li className="flex items-start">
//                                         <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
//                                         <span className="text-slate-300">No lock-up periods - withdraw anytime with accrued yield</span>
//                                     </li>
//                                 </ul>
//                             </motion.div>
//                         </div>

//                         <motion.div
//                             initial={{ y: 30, opacity: 0 }}
//                             animate={{ y: 0, opacity: 1 }}
//                             transition={{ delay: 0.7 }}
//                             className="flex flex-col md:flex-row justify-center items-center gap-4 max-w-md mx-auto"
//                         >
//                             <motion.div
//                                 whileHover={{ scale: 1.05 }}
//                                 whileTap={{ scale: 0.95 }}
//                                 className="w-full"
//                             >
//                                 <Button
//                                     onClick={handleConnectWallet}
//                                     className="w-full bg-gradient-to-r from-[#E3A046] to-amber-600 hover:from-[#E3A046] hover:to-amber-700 text-white py-6 text-lg"
//                                 >
//                                     <Wallet className="mr-2 h-5 w-5" />
//                                     Connect Wallet
//                                 </Button>
//                             </motion.div>

//                             <motion.div
//                                 whileHover={{ scale: 1.05 }}
//                                 whileTap={{ scale: 0.95 }}
//                                 className="w-full"
//                             >
//                                 <Button
//                                     onClick={handleLearnMore}
//                                     variant="outline"
//                                     className="w-full border-slate-700 text-white hover:bg-slate-800/40 py-6 text-lg"
//                                 >
//                                     Learn More
//                                     <ArrowRight className="ml-2 h-5 w-5" />
//                                 </Button>
//                             </motion.div>
//                         </motion.div>
//                     </motion.div>
//                 )}

//                 {onboardingStep === "learnMore" && (
//                     <motion.div
//                         key="learn-more"
//                         initial={{ opacity: 0 }}
//                         animate={{ opacity: 1 }}
//                         exit={{ opacity: 0 }}
//                         className="container mx-auto px-4 py-12"
//                     >
//                         <TutorialModal
//                             isOpen={onboardingStep === "learnMore"}
//                             onClose={() => setOnboardingStep("landing")}
//                             onConnectWallet={handleConnectWallet}
//                         />
//                     </motion.div>
//                 )}

//                 {onboardingStep === "connectWallet" && (
//                     <motion.div
//                         key="connect-wallet"
//                         initial={{ opacity: 0 }}
//                         animate={{ opacity: 1 }}
//                         exit={{ opacity: 0 }}
//                         className="fixed inset-0 flex items-center justify-center bg-black/70 p-4 z-50"
//                     >
//                         <WalletConnectModal
//                             isOpen={onboardingStep === "connectWallet"}
//                             onClose={() => setOnboardingStep("landing")}
//                             onWalletConnected={(address, hasSBTC) => handleWalletConnected(address, hasSBTC)}
//                         />
//                     </motion.div>
//                 )}

//                 {onboardingStep === "walletCheck" && (
//                     <motion.div
//                         key="wallet-check"
//                         initial={{ opacity: 0 }}
//                         animate={{ opacity: 1 }}
//                         exit={{ opacity: 0 }}
//                         className="container mx-auto px-4 py-24 flex justify-center items-center min-h-screen"
//                     >
//                         <WalletStatusCheck
//                             hasSBTC={userWalletData.hasSBTC}
//                             onGetSBTC={() => window.open("https://www.stacks.co/sbtc", "_blank")}
//                             onContinue={handleStartTour}
//                         />
//                     </motion.div>
//                 )}

//                 {onboardingStep === "tour" && (
//                     <motion.div
//                         key="tour"
//                         initial={{ opacity: 0 }}
//                         animate={{ opacity: 1 }}
//                         exit={{ opacity: 0 }}
//                         className="min-h-screen"
//                     >
//                         {/* Mock Dashboard Content for Tour */}
//                         <div className="container mx-auto px-4 py-12">
//                             <div className="portfolio-section mb-8 bg-[#0A0E1F]/60 border border-slate-700/30 rounded-xl p-6">
//                                 <h2 className="text-xl font-bold text-white mb-4">Portfolio Overview</h2>
//                                 <div className="bg-slate-800/50 h-64 rounded-lg"></div>
//                             </div>

//                             <div className="actions-section mb-8 bg-[#0A0E1F]/60 border border-slate-700/30 rounded-xl p-6">
//                                 <h2 className="text-xl font-bold text-white mb-4">Deposit & Withdraw</h2>
//                                 <div className="bg-slate-800/50 h-64 rounded-lg"></div>
//                             </div>

//                             <div className="security-section mb-8 bg-[#0A0E1F]/60 border border-slate-700/30 rounded-xl p-6">
//                                 <h2 className="text-xl font-bold text-white mb-4">Security Settings</h2>
//                                 <div className="bg-slate-800/50 h-64 rounded-lg"></div>
//                             </div>
//                         </div>

//                         {/* The Guided Tour UI */}
//                         <GuidedTour
//                             activeStep={0}
//                             onNext={handleCompleteTour}
//                             onSkip={handleCompleteTour}
//                         />
//                     </motion.div>
//                 )}
//             </AnimatePresence>
//         </div>
//     );
// };

// export default NewUserOnboarding;
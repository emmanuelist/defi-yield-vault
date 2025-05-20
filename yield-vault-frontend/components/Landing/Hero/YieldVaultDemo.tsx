"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Check,
    Bitcoin,
    TrendingUp,
    RefreshCw,
    Hourglass,
    ShieldCheck,
    Clock,
    ArrowRight,
    Wallet,
    Coins
} from "lucide-react";
import {
    Card,
    CardContent,
    CardHeader
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type YieldAction = "deposit" | "withdraw" | "rewards";

interface YieldConfig {
    id: YieldAction;
    icon: React.ReactNode;
    name: string;
    title: string;
    description: string;
    primaryColor: string;
    secondaryColor: string;
    action: string;
    configs: Array<{ label: string; value: string; }>;
    success: string;
    gradient: string;
}

const YieldVaultDemo: React.FC = () => {
    const [currentAction, setCurrentAction] = useState<number>(0);
    const [demoState, setDemoState] = useState<"idle" | "processing" | "success">("idle");
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const yieldActions: YieldConfig[] = [
        {
            id: "deposit",
            icon: <Bitcoin className="h-5 w-5" />,
            name: "Deposit sBTC",
            title: "Deposit 0.5 BTC to sBTC Yield Vault",
            description: "Earn automated DeFi yield on your Bitcoin",
            primaryColor: "text-[#F7931A]",
            secondaryColor: "text-amber-500",
            action: "Converting and depositing 0.5 BTC",
            configs: [
                { label: "Current APY", value: "8.2%" },
                { label: "Lock period", value: "None (flexible)" },
                { label: "Protocol fee", value: "0.5%" },
                { label: "Estimated rewards", value: "0.041 BTC/year" }
            ],
            success: "Successfully deposited 0.5 BTC into vault",
            gradient: "from-[#F7931A] to-amber-600"
        },
        {
            id: "withdraw",
            icon: <Wallet className="h-5 w-5" />,
            name: "Withdraw",
            title: "Withdraw 0.2 BTC from Yield Vault",
            description: "Flexible withdrawals with accrued yield",
            primaryColor: "text-amber-400",
            secondaryColor: "text-amber-500",
            action: "Processing 0.2 BTC withdrawal + rewards",
            configs: [
                { label: "Principal", value: "0.2 BTC" },
                { label: "Accrued yield", value: "0.0082 BTC" },
                { label: "Total", value: "0.2082 BTC" },
                { label: "Exit fee", value: "0.0" }
            ],
            success: "Successfully withdrew 0.2082 BTC to wallet",
            gradient: "from-amber-500 to-amber-600"
        },
        {
            id: "rewards",
            icon: <Coins className="h-5 w-5" />,
            name: "Yield Stats",
            title: "Your Bitcoin Yield Performance",
            description: "Track your rewards and yield statistics",
            primaryColor: "text-orange-400",
            secondaryColor: "text-orange-500",
            action: "Calculating real-time yield metrics",
            configs: [
                { label: "Total earned", value: "0.0341 BTC" },
                { label: "Current APY", value: "8.2%" },
                { label: "Yield strategy", value: "Multi-protocol" },
                { label: "Health factor", value: "Excellent" }
            ],
            success: "Yield statistics updated successfully",
            gradient: "from-orange-500 to-orange-600"
        }
    ];

    // Auto-cycling demo
    useEffect(() => {
        const startDemo = () => {
            setDemoState("processing");

            timeoutRef.current = setTimeout(() => {
                setDemoState("success");

                timeoutRef.current = setTimeout(() => {
                    setDemoState("idle");
                    setCurrentAction((prev) => (prev + 1) % yieldActions.length);

                    timeoutRef.current = setTimeout(startDemo, 1500);
                }, 3000);
            }, 3000);
        };

        // Start the demo cycle with a longer initial delay
        timeoutRef.current = setTimeout(startDemo, 2000);

        // Clean up on unmount
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [currentAction, yieldActions.length]);

    const action = yieldActions[currentAction];

    return (
        <Card className="backdrop-blur-sm dark:bg-[#060f38]/80 bg-white/80 dark:border-slate-800/50 border-slate-200/70 shadow-xl overflow-hidden rounded-xl">
            {/* Header */}
            <CardHeader className="px-5 py-4 border-b dark:border-slate-700/30 border-slate-200/70 dark:bg-gradient-to-r dark:from-[#081342]/80 dark:to-[#060f38]/80 bg-gradient-to-r from-slate-50/80 to-white/80 flex flex-row items-center justify-between space-y-0">
                <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full dark:bg-[#0c1d5e]/50 bg-slate-100 flex items-center justify-center mr-3 text-[#F7931A]">
                        <Bitcoin className="h-4 w-4" />
                    </div>
                    <h3 className="text-lg font-medium dark:text-white text-slate-800">sBTC Yield Vault</h3>
                </div>
                <Badge variant="outline" className="dark:bg-green-950/30 bg-green-50 dark:text-green-400 text-green-600 dark:border-green-800/30 border-green-200/70 flex items-center gap-1 px-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                    <span className="text-xs">Live</span>
                </Badge>
            </CardHeader>

            <CardContent className="p-4">
                {/* Action type selector */}
                <div className="flex justify-around mb-5 pb-4 border-b dark:border-slate-700/30 border-slate-200/70">
                    {yieldActions.map((a, idx) => (
                        <div
                            key={a.id}
                            className={`relative flex flex-col items-center px-3 py-1.5 rounded-lg transition-all duration-200 ${idx === currentAction
                                ? `${a.primaryColor} dark:bg-slate-800/40 bg-slate-100/70`
                                : 'dark:text-slate-400 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                                }`}
                        >
                            <div className="mb-1">
                                {a.icon}
                            </div>
                            <span className="text-xs font-medium">{a.name}</span>
                            {idx === currentAction && (
                                <motion.div
                                    layoutId="activeIndicator"
                                    className={`absolute -bottom-4 w-8 h-0.5 rounded-full bg-gradient-to-r ${a.gradient}`}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.3 }}
                                />
                            )}
                        </div>
                    ))}
                </div>

                <AnimatePresence mode="wait">
                    {demoState === "idle" && (
                        <motion.div
                            key="idle"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                            className="rounded-lg border dark:border-slate-700/30 border-slate-200/70 dark:bg-slate-800/20 bg-slate-50/50 p-4"
                        >
                            <div className="flex items-start">
                                <div className={`w-10 h-10 rounded-full dark:bg-slate-800/80 bg-white flex items-center justify-center mr-3 ${action.primaryColor}`}>
                                    {action.icon}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className={`font-medium ${action.primaryColor} mb-0.5 text-base`}>
                                        {action.title}
                                    </h4>
                                    <p className="text-xs dark:text-slate-300 text-slate-600 mb-3">
                                        {action.description}
                                    </p>

                                    <div className="grid grid-cols-2 gap-x-3 gap-y-2 p-3 mb-3 rounded-lg dark:bg-slate-800/50 bg-white/70 dark:border-slate-700/20 border-slate-200/70">
                                        {action.configs.map((config, i) => (
                                            <div key={i} className="flex flex-col">
                                                <span className="text-xs dark:text-slate-400 text-slate-500">{config.label}</span>
                                                <span className="text-xs dark:text-white text-slate-800 font-medium truncate">{config.value}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-between text-xs dark:text-slate-400 text-slate-500 mb-2 px-1">
                                <span>Vault Status</span>
                                <span className={action.secondaryColor}>Ready for {action.id}</span>
                            </div>

                            <div className="w-full h-1 rounded-full dark:bg-slate-700/40 bg-slate-200/70 overflow-hidden mb-4">
                                <motion.div
                                    className={`h-full bg-gradient-to-r ${action.gradient}`}
                                    initial={{ width: 0 }}
                                    animate={{ width: "100%" }}
                                    transition={{ duration: 1.2 }}
                                />
                            </div>

                            <motion.button
                                className={`w-full py-2 flex justify-center items-center rounded-lg border dark:border-slate-700/40 border-slate-200/70 dark:bg-slate-800/40 bg-white/70 text-xs ${action.primaryColor} transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/80`}
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.99 }}
                            >
                                <ArrowRight className="h-3.5 w-3.5 mr-1.5" />
                                <span>Connect wallet to {action.id}</span>
                            </motion.button>
                        </motion.div>
                    )}

                    {demoState === "processing" && (
                        <motion.div
                            key="processing"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                            className="rounded-lg border dark:border-slate-700/30 border-slate-200/70 dark:bg-slate-800/20 bg-slate-50/50 p-4"
                        >
                            <div className="flex items-start mb-4">
                                <div className="relative w-10 h-10 rounded-full dark:bg-slate-800/80 bg-white flex items-center justify-center mr-3">
                                    <motion.div
                                        className="absolute inset-0 rounded-full border border-transparent"
                                        style={{
                                            borderTopColor: action.id === "deposit" ? "#F7931A" : action.id === "withdraw" ? "#FBBF24" : "#FB923C",
                                            borderRightColor: "transparent",
                                            borderBottomColor: "transparent",
                                            borderLeftColor: "transparent"
                                        }}
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                                    />
                                    <Hourglass className={`h-4 w-4 ${action.primaryColor}`} />
                                </div>
                                <div>
                                    <h4 className={`font-medium ${action.primaryColor} mb-0.5 text-base`}>
                                        Processing {action.id}
                                    </h4>
                                    <p className="text-xs dark:text-slate-300 text-slate-600">
                                        {action.action}
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-2 p-3 rounded-lg dark:bg-slate-800/50 bg-white/70 dark:border-slate-700/20 border-slate-200/70 mb-4">
                                <div className="flex justify-between items-center mb-1.5">
                                    <span className="text-xs dark:text-slate-400 text-slate-500">Transaction Status:</span>
                                    <div className="flex items-center">
                                        <div className="h-1.5 w-1.5 rounded-full bg-amber-400 mr-1.5"></div>
                                        <span className="text-xs text-amber-500">Pending</span>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-2 py-1.5 px-3 rounded-md dark:bg-slate-800/60 bg-slate-100/60 dark:border-slate-700/30 border-slate-200/70">
                                    <RefreshCw className={`h-4 w-4 ${action.primaryColor}`} style={{ animation: 'spin 2s linear infinite' }} />
                                    <span className="text-xs dark:text-slate-300 text-slate-600">sBTC Vault is processing your {action.id}...</span>
                                </div>
                            </div>

                            <div className="flex items-center justify-between mb-2 text-xs dark:text-slate-400 text-slate-500">
                                <div className="flex items-center space-x-1">
                                    <ShieldCheck className="h-3 w-3" />
                                    <span>Secure contract operation</span>
                                </div>

                                <div className="flex items-center space-x-1">
                                    <Clock className="h-3 w-3" />
                                    <span>Estimated time: 15s</span>
                                </div>
                            </div>

                            <div className="relative w-full h-1 rounded-full dark:bg-slate-700/40 bg-slate-200/70 overflow-hidden">
                                <motion.div
                                    className={`h-full bg-gradient-to-r ${action.gradient}`}
                                    initial={{ width: "20%" }}
                                    animate={{ width: "70%" }}
                                    transition={{ duration: 2.5, ease: "easeInOut" }}
                                />

                                {/* Subtle glow effect */}
                                <motion.div
                                    className="absolute top-0 h-full w-10 bg-white opacity-10"
                                    animate={{
                                        left: ["-10%", "100%"]
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                />
                            </div>
                        </motion.div>
                    )}

                    {demoState === "success" && (
                        <motion.div
                            key="success"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                            className="rounded-lg border dark:border-slate-700/30 border-slate-200/70 dark:bg-slate-800/20 bg-slate-50/50 p-4"
                        >
                            <div className="flex items-start mb-4">
                                <motion.div
                                    className="w-10 h-10 rounded-full dark:bg-green-900/20 bg-green-50 dark:border-green-800/30 border-green-200/50 flex items-center justify-center mr-3 text-green-500"
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <Check className="h-5 w-5" />
                                </motion.div>
                                <div>
                                    <motion.h4
                                        className="font-medium text-green-500 mb-0.5 text-base"
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.3, delay: 0.1 }}
                                    >
                                        {action.id.charAt(0).toUpperCase() + action.id.slice(1)} Successful
                                    </motion.h4>
                                    <motion.p
                                        className="text-xs dark:text-slate-300 text-slate-600"
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.3, delay: 0.2 }}
                                    >
                                        {action.success}
                                    </motion.p>
                                </div>
                            </div>

                            <motion.div
                                className="space-y-2 p-3 rounded-lg dark:bg-slate-800/50 bg-white/70 dark:border-slate-700/20 border-slate-200/70 mb-3"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: 0.3 }}
                            >
                                <div className="flex flex-wrap justify-between">
                                    <div className="flex items-center mb-2 w-full sm:w-auto">
                                        <div className="w-6 h-6 rounded-full dark:bg-slate-800/80 bg-slate-100 flex items-center justify-center mr-2">
                                            <Bitcoin className="h-3 w-3 text-[#F7931A]" />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-[10px] dark:text-slate-400 text-slate-500">Transaction</span>
                                            <span className="text-xs font-mono dark:text-slate-300 text-slate-600">0x74f...8a2c</span>
                                        </div>
                                    </div>

                                    <div className="flex space-x-4">
                                        <div className="flex items-center">
                                            <div className="w-6 h-6 rounded-full dark:bg-slate-800/80 bg-slate-100 flex items-center justify-center mr-2">
                                                <Clock className="h-3 w-3 text-green-500" />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-[10px] dark:text-slate-400 text-slate-500">Completed in</span>
                                                <span className="text-xs dark:text-slate-300 text-slate-600">15 seconds</span>
                                            </div>
                                        </div>

                                        <div className="flex items-center">
                                            <div className="w-6 h-6 rounded-full dark:bg-slate-800/80 bg-slate-100 flex items-center justify-center mr-2">
                                                <TrendingUp className="h-3 w-3 text-[#F7931A]" />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-[10px] dark:text-slate-400 text-slate-500">Fee</span>
                                                <span className="text-xs dark:text-slate-300 text-slate-600">0.0003 BTC</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                className="w-full h-1 rounded-full overflow-hidden bg-gradient-to-r from-green-500 to-green-400"
                                initial={{ width: 0 }}
                                animate={{ width: "100%" }}
                                transition={{ duration: 0.5, delay: 0.4 }}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
            </CardContent>

            <style jsx global>{`
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </Card>
    );
};

export default YieldVaultDemo;
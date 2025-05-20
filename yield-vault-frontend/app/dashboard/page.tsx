"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
    Bitcoin,
    TrendingUp,
    Clock,
    Zap,
    RefreshCw,
    Plus
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import WelcomeBanner from "@/components/Dashboard/Overview/WelcomeBanner";
import VaultPerformanceChart from "@/components/Dashboard/Overview/VaultPerformanceChart";
import StatisticCard from "@/components/Dashboard/Overview/StatisticCard";
import PortfolioOverviewCard from "@/components/Dashboard/Overview/PortfolioOverviewCard";
import TransactionsHistoryCard from "@/components/Dashboard/Overview/TransactionsHistoryCard";
import QuickActionsCard from "@/components/Dashboard/Overview/QuickActionsCard";
import SecurityStatusCard from "@/components/Dashboard/Overview/SecurityStatusCard";
import MarketInfoCard from "@/components/Dashboard/Overview/MarketInfoCard";
import { useToast } from "@/hooks/use-toast";

// Animation variants
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.1
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1]
        }
    }
};

// Main Dashboard Overview component
const page: React.FC = () => {
    const [isRefreshing, setIsRefreshing] = useState(false);
    const { toast } = useToast();

    // Mock data for dashboard
    const portfolioStats = {
        totalDeposited: 0.3542,
        currentValue: 0.3621,
        pendingRewards: 0.0079,
        apy: 8.2,
    };

    const strategies = [
        {
            id: 1,
            name: "Balanced Yield",
            apy: 8.2,
            risk: "Medium" as const,
            allocation: 65,
        },
        {
            id: 2,
            name: "Stable Returns",
            apy: 5.8,
            risk: "Low" as const,
            allocation: 25,
        },
        {
            id: 3,
            name: "High Yield",
            apy: 12.4,
            risk: "High" as const,
            allocation: 10,
        },
    ];

    const recentTransactions = [
        {
            id: 1,
            type: "Deposit" as const,
            amount: 0.125,
            timestamp: "2 days ago",
            status: "Confirmed",
        },
        {
            id: 2,
            type: "Reward Claim" as const,
            amount: 0.0045,
            timestamp: "5 days ago",
            status: "Confirmed",
        },
        {
            id: 3,
            type: "Compound" as const,
            amount: 0.0021,
            timestamp: "1 week ago",
            status: "Confirmed",
        },
    ];

    // Handlers for various actions
    const handleRefresh = () => {
        setIsRefreshing(true);

        // Simulate API call
        setTimeout(() => {
            setIsRefreshing(false);
            toast({
                title: "Dashboard refreshed",
                description: "Your dashboard data has been updated.",
            });
        }, 1500);
    };

    const handleDeposit = () => {
        // Would open deposit modal in real implementation
        toast({
            title: "Deposit sBTC",
            description: "The deposit feature would open in a modal.",
        });
    };

    const handleWithdraw = () => {
        // Would open withdraw modal in real implementation
        toast({
            title: "Withdraw sBTC",
            description: "The withdraw feature would open in a modal.",
        });
    };

    const handleClaimRewards = () => {
        // Would handle claiming rewards in real implementation
        toast({
            title: "Claim Rewards",
            description: "The reward claiming process would start.",
        });
    };

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
        >
            {/* Dashboard Header with Welcome Banner */}
            <motion.div variants={itemVariants}>
                <WelcomeBanner />
            </motion.div>

            {/* Portfolio Performance Chart */}
            <motion.div variants={itemVariants}>
                <VaultPerformanceChart />
            </motion.div>

            {/* Action Bar */}
            <motion.div
                variants={itemVariants}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2"
            >
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white flex items-center">
                    <span className="mr-2">Portfolio Overview</span>
                    <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-medium rounded-full bg-[#F7931A]/10 text-[#F7931A] border border-[#F7931A]/20">
                        Live
                    </span>
                </h2>
                <div className="flex items-center gap-3">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handleRefresh}
                        disabled={isRefreshing}
                        className="h-9 bg-gradient-to-r from-[#05102f]/95 to-[#0d1431]/95 hover:from-[#0d1431]/95 hover:to-[#05102f]/95 text-white border-none"
                    >
                        <RefreshCw className={cn(
                            "h-4 w-4 mr-2",
                            isRefreshing && "animate-spin"
                        )} />
                        <span>Refresh</span>
                    </Button>
                    <Button
                        size="sm"
                        onClick={handleDeposit}
                        className="h-9 bg-gradient-to-r from-[#F7931A] to-amber-600 hover:from-[#F7931A]/90 hover:to-amber-700 text-white border-none"
                    >
                        <Plus className="h-4 w-4 mr-2" />
                        <span>Deposit sBTC</span>
                    </Button>
                </div>
            </motion.div>

            {/* Stats Cards */}
            <motion.div
                variants={itemVariants}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5"
            >
                <StatisticCard
                    title="Total Deposited"
                    value={`${portfolioStats.totalDeposited} sBTC`}
                    icon={<Bitcoin className="text-[#F7931A]" />}
                    trend={{
                        value: "+0.125",
                        label: "since last month",
                        positive: true,
                    }}
                    bgGradient="from-[#05102f]/95 to-[#0d1431]/95"
                    iconBg="bg-[#F7931A]/10"
                />
                <StatisticCard
                    title="Current Value"
                    value={`${portfolioStats.currentValue} sBTC`}
                    icon={<TrendingUp className="text-green-500" />}
                    trend={{
                        value: "+2.23%",
                        label: "growth rate",
                        positive: true,
                    }}
                    bgGradient="from-[#05102f]/95 to-[#0d1431]/95"
                    iconBg="bg-green-500/10"
                />
                <StatisticCard
                    title="Pending Rewards"
                    value={`${portfolioStats.pendingRewards} sBTC`}
                    icon={<Clock className="text-blue-500" />}
                    trend={{
                        value: "Next reward in 2 days",
                        label: "",
                        positive: true,
                    }}
                    bgGradient="from-[#05102f]/95 to-[#0d1431]/95"
                    iconBg="bg-blue-500/10"
                />
                <StatisticCard
                    title="Current APY"
                    value={`${portfolioStats.apy}%`}
                    icon={<Zap className="text-purple-500" />}
                    trend={{
                        value: "+0.7%",
                        label: "since last week",
                        positive: true,
                    }}
                    bgGradient="from-[#05102f]/95 to-[#0d1431]/95"
                    iconBg="bg-purple-500/10"
                />
            </motion.div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column: Portfolio Summary + Transaction History */}
                <motion.div
                    variants={itemVariants}
                    className="lg:col-span-2 space-y-6"
                >
                    {/* Portfolio Overview */}
                    <PortfolioOverviewCard strategies={strategies} />

                    {/* Transactions History */}
                    <TransactionsHistoryCard transactions={recentTransactions} />
                </motion.div>

                {/* Right Column: Quick Actions + Security Status + Market Info */}
                <motion.div
                    variants={itemVariants}
                    className="space-y-6"
                >
                    {/* Quick Actions */}
                    <QuickActionsCard
                        onDeposit={handleDeposit}
                        onWithdraw={handleWithdraw}
                        onClaimRewards={handleClaimRewards}
                    />

                    {/* Security Status */}
                    <SecurityStatusCard />

                    {/* Market Info */}
                    <MarketInfoCard />
                </motion.div>
            </div>
        </motion.div>
    );
};

export default page;




// "use client";

// import React from "react";
// import {
//     Bitcoin,
//     TrendingUp,
//     Clock,
//     ShieldCheck,
//     Zap,
//     ArrowRight,
//     BarChart3,
//     PieChart,
//     Wallet,
//     Plus,
//     ArrowDown
// } from "lucide-react";
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { cn } from "@/lib/utils";

// // This is a mock dashboard page that would be wrapped by YieldVaultDashboardLayout
// // in a real implementation

// const DashboardPage = () => {
//     // Mock data for dashboard
//     const portfolioStats = {
//         totalDeposited: 0.3542,
//         currentValue: 0.3621,
//         pendingRewards: 0.0079,
//         apy: 8.2,
//     };

//     const strategies = [
//         {
//             id: 1,
//             name: "Balanced Yield",
//             apy: 8.2,
//             risk: "Medium",
//             allocation: 65,
//         },
//         {
//             id: 2,
//             name: "Stable Returns",
//             apy: 5.8,
//             risk: "Low",
//             allocation: 25,
//         },
//         {
//             id: 3,
//             name: "High Yield",
//             apy: 12.4,
//             risk: "High",
//             allocation: 10,
//         },
//     ];

//     const recentTransactions = [
//         {
//             id: 1,
//             type: "Deposit",
//             amount: 0.125,
//             timestamp: "2 days ago",
//             status: "Confirmed",
//         },
//         {
//             id: 2,
//             type: "Reward Claim",
//             amount: 0.0045,
//             timestamp: "5 days ago",
//             status: "Confirmed",
//         },
//         {
//             id: 3,
//             type: "Compound",
//             amount: 0.0021,
//             timestamp: "1 week ago",
//             status: "Confirmed",
//         },
//     ];

//     return (
//         <div className="space-y-6">
//             {/* Welcome Section */}
//             <div className="flex flex-col space-y-2">
//                 <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
//                     Welcome to sBTC Yield Vault
//                 </h1>
//                 <p className="text-slate-600 dark:text-slate-300">
//                     Your secure, non-custodial Bitcoin yield generation platform
//                 </p>
//             </div>

//             {/* Stats Cards */}
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//                 <StatsCard
//                     title="Total Deposited"
//                     value={`${portfolioStats.totalDeposited} sBTC`}
//                     icon={<Bitcoin className="text-[#F7931A]" />}
//                     trend={{
//                         value: "+0.125",
//                         label: "since last month",
//                         positive: true,
//                     }}
//                 />
//                 <StatsCard
//                     title="Current Value"
//                     value={`${portfolioStats.currentValue} sBTC`}
//                     icon={<TrendingUp className="text-green-500" />}
//                     trend={{
//                         value: "+2.23%",
//                         label: "growth rate",
//                         positive: true,
//                     }}
//                 />
//                 <StatsCard
//                     title="Pending Rewards"
//                     value={`${portfolioStats.pendingRewards} sBTC`}
//                     icon={<Clock className="text-blue-500" />}
//                     trend={{
//                         value: "Next reward in 2 days",
//                         label: "",
//                         positive: true,
//                     }}
//                 />
//                 <StatsCard
//                     title="Current APY"
//                     value={`${portfolioStats.apy}%`}
//                     icon={<Zap className="text-purple-500" />}
//                     trend={{
//                         value: "+0.7%",
//                         label: "since last week",
//                         positive: true,
//                     }}
//                 />
//             </div>

//             {/* Main Content */}
//             <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//                 {/* Left Column: Portfolio Summary */}
//                 <div className="lg:col-span-2 space-y-6">
//                     {/* Portfolio Overview Card */}
//                     <Card className="overflow-hidden border border-slate-200 dark:border-slate-800">
//                         <CardHeader className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
//                             <div className="flex items-center justify-between">
//                                 <CardTitle className="text-lg">Portfolio Overview</CardTitle>
//                                 <Button variant="outline" size="sm" className="h-8 text-xs">
//                                     <PieChart className="h-3.5 w-3.5 mr-1.5" />
//                                     View Details
//                                 </Button>
//                             </div>
//                             <CardDescription>
//                                 Your active Bitcoin yield strategies
//                             </CardDescription>
//                         </CardHeader>
//                         <CardContent className="p-0">
//                             <div className="divide-y divide-slate-200 dark:divide-slate-800">
//                                 {strategies.map((strategy) => (
//                                     <div
//                                         key={strategy.id}
//                                         className="flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
//                                     >
//                                         <div className="flex items-center">
//                                             <div className="mr-3 h-10 w-10 rounded-full flex items-center justify-center bg-[#F7931A]/10 dark:bg-[#F7931A]/20 text-[#F7931A]">
//                                                 <Bitcoin className="h-5 w-5" />
//                                             </div>
//                                             <div>
//                                                 <h3 className="font-medium text-slate-900 dark:text-slate-100">
//                                                     {strategy.name}
//                                                 </h3>
//                                                 <div className="flex items-center mt-1">
//                                                     <Badge
//                                                         variant="outline"
//                                                         className={cn(
//                                                             "text-xs mr-2",
//                                                             strategy.risk === "Low"
//                                                                 ? "border-green-200 dark:border-green-800 text-green-600 dark:text-green-400"
//                                                                 : strategy.risk === "Medium"
//                                                                     ? "border-amber-200 dark:border-amber-800 text-amber-600 dark:text-amber-400"
//                                                                     : "border-red-200 dark:border-red-800 text-red-600 dark:text-red-400"
//                                                         )}
//                                                     >
//                                                         {strategy.risk} Risk
//                                                     </Badge>
//                                                     <span className="text-xs text-slate-500 dark:text-slate-400">
//                                                         {strategy.allocation}% allocation
//                                                     </span>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                         <div className="text-right">
//                                             <div className="text-lg font-bold text-[#F7931A]">
//                                                 {strategy.apy}%
//                                             </div>
//                                             <div className="text-xs text-slate-500 dark:text-slate-400">
//                                                 Current APY
//                                             </div>
//                                         </div>
//                                     </div>
//                                 ))}
//                             </div>
//                         </CardContent>
//                         <CardFooter className="bg-slate-50 dark:bg-slate-800/50 border-t border-slate-200 dark:border-slate-800 py-3 flex justify-between items-center">
//                             <div className="text-sm text-slate-500 dark:text-slate-400">
//                                 Combined APY: <span className="font-bold text-[#F7931A]">8.2%</span>
//                             </div>
//                             <Button variant="link" className="text-[#F7931A] p-0 h-auto text-sm">
//                                 Adjust Allocations
//                                 <ArrowRight className="h-3.5 w-3.5 ml-1" />
//                             </Button>
//                         </CardFooter>
//                     </Card>

//                     {/* Recent Transactions Card */}
//                     <Card className="overflow-hidden border border-slate-200 dark:border-slate-800">
//                         <CardHeader className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
//                             <div className="flex items-center justify-between">
//                                 <CardTitle className="text-lg">Recent Transactions</CardTitle>
//                                 <Button variant="outline" size="sm" className="h-8 text-xs">
//                                     <BarChart3 className="h-3.5 w-3.5 mr-1.5" />
//                                     View All
//                                 </Button>
//                             </div>
//                             <CardDescription>
//                                 Your latest deposit and yield activities
//                             </CardDescription>
//                         </CardHeader>
//                         <CardContent className="p-0">
//                             <div className="divide-y divide-slate-200 dark:divide-slate-800">
//                                 {recentTransactions.map((tx) => (
//                                     <div
//                                         key={tx.id}
//                                         className="flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
//                                     >
//                                         <div className="flex items-center">
//                                             <div className={cn(
//                                                 "mr-3 h-10 w-10 rounded-full flex items-center justify-center",
//                                                 tx.type === "Deposit"
//                                                     ? "bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400"
//                                                     : tx.type === "Reward Claim"
//                                                         ? "bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
//                                                         : "bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400"
//                                             )}>
//                                                 {tx.type === "Deposit" ? (
//                                                     <ArrowDown className="h-5 w-5" />
//                                                 ) : tx.type === "Reward Claim" ? (
//                                                     <Wallet className="h-5 w-5" />
//                                                 ) : (
//                                                     <Zap className="h-5 w-5" />
//                                                 )}
//                                             </div>
//                                             <div>
//                                                 <h3 className="font-medium text-slate-900 dark:text-slate-100">
//                                                     {tx.type}
//                                                 </h3>
//                                                 <div className="flex items-center mt-1">
//                                                     <Badge
//                                                         variant="outline"
//                                                         className="text-xs mr-2 border-green-200 dark:border-green-800 text-green-600 dark:text-green-400"
//                                                     >
//                                                         {tx.status}
//                                                     </Badge>
//                                                     <span className="text-xs text-slate-500 dark:text-slate-400">
//                                                         {tx.timestamp}
//                                                     </span>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                         <div className="text-right">
//                                             <div className="text-lg font-bold text-slate-900 dark:text-white">
//                                                 {tx.amount} sBTC
//                                             </div>
//                                             <div className="text-xs text-slate-500 dark:text-slate-400">
//                                                 ≈ ${(tx.amount * 35240.61).toLocaleString(undefined, { maximumFractionDigits: 2 })}
//                                             </div>
//                                         </div>
//                                     </div>
//                                 ))}
//                             </div>
//                         </CardContent>
//                         <CardFooter className="bg-slate-50 dark:bg-slate-800/50 border-t border-slate-200 dark:border-slate-800 py-3 flex justify-center">
//                             <Button variant="link" className="text-[#F7931A] p-0 h-auto text-sm">
//                                 View All Transactions
//                                 <ArrowRight className="h-3.5 w-3.5 ml-1" />
//                             </Button>
//                         </CardFooter>
//                     </Card>
//                 </div>

//                 {/* Right Column: Actions and Security */}
//                 <div className="space-y-6">
//                     {/* Quick Actions Card */}
//                     <Card className="border border-slate-200 dark:border-slate-800">
//                         <CardHeader className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
//                             <CardTitle className="text-lg">Quick Actions</CardTitle>
//                             <CardDescription>
//                                 Manage your sBTC deposits and rewards
//                             </CardDescription>
//                         </CardHeader>
//                         <CardContent className="p-4 space-y-3">
//                             <Button className="w-full bg-gradient-to-r from-[#F7931A] to-amber-600 hover:from-[#F7931A] hover:to-amber-700 text-white">
//                                 <Plus className="h-4 w-4 mr-2" />
//                                 Deposit sBTC
//                             </Button>

//                             <Button variant="outline" className="w-full border-[#F7931A]/20 text-[#F7931A] hover:bg-[#F7931A]/10">
//                                 <Wallet className="h-4 w-4 mr-2" />
//                                 Withdraw
//                             </Button>

//                             <Button variant="outline" className="w-full border-slate-200 dark:border-slate-700">
//                                 <Zap className="h-4 w-4 mr-2 text-purple-500" />
//                                 Claim Rewards
//                             </Button>
//                         </CardContent>
//                     </Card>

//                     {/* Security Status Card */}
//                     <Card className="border border-slate-200 dark:border-slate-800">
//                         <CardHeader className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
//                             <div className="flex items-center justify-between">
//                                 <CardTitle className="text-lg">Security Status</CardTitle>
//                                 <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 hover:bg-green-100">
//                                     Secure
//                                 </Badge>
//                             </div>
//                             <CardDescription>
//                                 Your vault security and status
//                             </CardDescription>
//                         </CardHeader>
//                         <CardContent className="p-4">
//                             <div className="space-y-4">
//                                 <div className="flex items-center justify-between">
//                                     <div className="flex items-center">
//                                         <ShieldCheck className="h-5 w-5 mr-2 text-green-500" />
//                                         <span className="text-sm font-medium">Non-custodial</span>
//                                     </div>
//                                     <Badge variant="outline" className="bg-green-50 dark:bg-green-900/10 text-green-600 dark:text-green-400 border-green-200 dark:border-green-800">
//                                         Active
//                                     </Badge>
//                                 </div>

//                                 <div className="flex items-center justify-between">
//                                     <div className="flex items-center">
//                                         <ShieldCheck className="h-5 w-5 mr-2 text-green-500" />
//                                         <span className="text-sm font-medium">Multi-signature</span>
//                                     </div>
//                                     <Badge variant="outline" className="bg-green-50 dark:bg-green-900/10 text-green-600 dark:text-green-400 border-green-200 dark:border-green-800">
//                                         2/3
//                                     </Badge>
//                                 </div>

//                                 <div className="flex items-center justify-between">
//                                     <div className="flex items-center">
//                                         <ShieldCheck className="h-5 w-5 mr-2 text-green-500" />
//                                         <span className="text-sm font-medium">Last Audit</span>
//                                     </div>
//                                     <span className="text-xs text-slate-500 dark:text-slate-400">
//                                         14 days ago
//                                     </span>
//                                 </div>

//                                 <div className="flex items-center justify-between">
//                                     <div className="flex items-center">
//                                         <ShieldCheck className="h-5 w-5 mr-2 text-green-500" />
//                                         <span className="text-sm font-medium">Vault Status</span>
//                                     </div>
//                                     <Badge variant="outline" className="bg-green-50 dark:bg-green-900/10 text-green-600 dark:text-green-400 border-green-200 dark:border-green-800">
//                                         Healthy
//                                     </Badge>
//                                 </div>
//                             </div>
//                         </CardContent>
//                         <CardFooter className="bg-slate-50 dark:bg-slate-800/50 border-t border-slate-200 dark:border-slate-800 py-3 flex justify-center">
//                             <Button variant="link" className="text-[#F7931A] p-0 h-auto text-sm">
//                                 View Security Details
//                                 <ArrowRight className="h-3.5 w-3.5 ml-1" />
//                             </Button>
//                         </CardFooter>
//                     </Card>

//                     {/* Market Info Card */}
//                     <Card className="border border-slate-200 dark:border-slate-800">
//                         <CardHeader className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
//                             <CardTitle className="text-lg">Bitcoin Market</CardTitle>
//                             <CardDescription>
//                                 Current BTC market information
//                             </CardDescription>
//                         </CardHeader>
//                         <CardContent className="p-4">
//                             <div className="space-y-4">
//                                 <div className="flex items-center justify-between">
//                                     <span className="text-sm font-medium">BTC Price</span>
//                                     <div className="text-right">
//                                         <div className="font-bold text-slate-900 dark:text-white">$35,240.61</div>
//                                         <div className="text-xs text-green-600">+5.23%</div>
//                                     </div>
//                                 </div>

//                                 <div className="flex items-center justify-between">
//                                     <span className="text-sm font-medium">24h Volume</span>
//                                     <div className="font-medium text-slate-900 dark:text-white">$42.3B</div>
//                                 </div>

//                                 <div className="flex items-center justify-between">
//                                     <span className="text-sm font-medium">Market Cap</span>
//                                     <div className="font-medium text-slate-900 dark:text-white">$689.5B</div>
//                                 </div>

//                                 <div className="flex items-center justify-between">
//                                     <span className="text-sm font-medium">Dominance</span>
//                                     <div className="font-medium text-slate-900 dark:text-white">52.1%</div>
//                                 </div>
//                             </div>
//                         </CardContent>
//                     </Card>
//                 </div>
//             </div>
//         </div>
//     );
// };

// // Stats Card Component
// interface StatsCardProps {
//     title: string;
//     value: string;
//     icon: React.ReactNode;
//     trend: {
//         value: string;
//         label: string;
//         positive: boolean;
//     };
// }

// const StatsCard: React.FC<StatsCardProps> = ({ title, value, icon, trend }) => {
//     return (
//         <Card className="border border-slate-200 dark:border-slate-800">
//             <CardContent className="p-6">
//                 <div className="flex items-center justify-between mb-4">
//                     <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">{title}</h3>
//                     <div className="h-9 w-9 rounded-full flex items-center justify-center bg-slate-100 dark:bg-slate-800">
//                         {icon}
//                     </div>
//                 </div>
//                 <div className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
//                     {value}
//                 </div>
//                 <div className={cn(
//                     "text-xs",
//                     trend.positive
//                         ? "text-green-600 dark:text-green-400"
//                         : "text-red-600 dark:text-red-400"
//                 )}>
//                     {trend.value} {trend.label && <span className="text-slate-500 dark:text-slate-400">{trend.label}</span>}
//                 </div>
//             </CardContent>
//         </Card>
//     );
// };

// export default DashboardPage;
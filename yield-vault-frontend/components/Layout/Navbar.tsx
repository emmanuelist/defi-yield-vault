"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown, ArrowRight, LineChart, Wallet, Home, Settings, Trophy } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import SBTCYieldVaultLogo from "../Shared/SBTCYieldVaultLogo";
import ThemeToggle from "../Shared/ThemeToggle";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import WalletConnectButton from "../Shared/wallet/WalletConnectButton";
import { useUser } from "@/context/UserContext";

interface NavLink {
    name: string;
    href: string;
    icon?: React.ReactNode;
    subItems?: Array<{ title: string; href: string; icon?: React.ReactNode }>;
}

const Navbar: React.FC = () => {
    const [scrolled, setScrolled] = useState<boolean>(false);
    const [activeLink, setActiveLink] = useState<string | null>(null);
    const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
    const [dropdownOpen, setDropdownOpen] = useState<number | null>(null);

    const { userState, connectWallet, disconnectWallet } = useUser();

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = (): void => {
            const isScrolled = window.scrollY > 10;
            if (isScrolled !== scrolled) {
                setScrolled(isScrolled);
            }
        };

        // Set active link based on scroll position
        const updateActiveLink = () => {
            const sections = document.querySelectorAll('section[id]');
            let found = false;

            sections.forEach((section) => {
                const sectionTop = section.getBoundingClientRect().top;
                const sectionId = section.getAttribute('id');

                if (sectionTop < 100 && sectionTop > -100 && !found && sectionId) {
                    setActiveLink(`#${sectionId}`);
                    found = true;
                }
            });

            if (!found && window.scrollY <= 10) {
                setActiveLink(null);
            }
        };

        window.addEventListener("scroll", handleScroll);
        window.addEventListener('scroll', updateActiveLink);

        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener('scroll', updateActiveLink);
        };
    }, [scrolled]);

    // Close mobile menu when screen size changes to desktop
    useEffect(() => {
        const handleResize = (): void => {
            if (window.innerWidth >= 768 && mobileMenuOpen) {
                setMobileMenuOpen(false);
            }
        };

        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [mobileMenuOpen]);

    const navLinks: NavLink[] = [
        { name: "Home", href: "/", icon: <Home className="w-4 h-4 mr-2" /> },
        { name: "Dashboard", href: "/dashboard", icon: <LineChart className="w-4 h-4 mr-2" /> },
        {
            name: "Vault",
            href: "#vault",
            icon: <Trophy className="w-4 h-4 mr-2" />,
            subItems: [
                { title: "Deposit", href: "/vault/deposit", icon: <ArrowRight className="w-4 h-4 mr-2" /> },
                { title: "Withdraw", href: "/vault/withdraw", icon: <ArrowRight className="w-4 h-4 mr-2" /> },
                { title: "Rewards", href: "/vault/rewards", icon: <ArrowRight className="w-4 h-4 mr-2" /> },
            ]
        },
        { name: "Analytics", href: "/analytics", icon: <LineChart className="w-4 h-4 mr-2" /> },
    ];

    // Animation variants
    const navVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] }
        }
    };

    const linkVariants = {
        hidden: { opacity: 0, y: -10 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.05,
                duration: 0.3,
                ease: [0.22, 1, 0.36, 1]
            }
        })
    };

    const dropdownVariants = {
        hidden: { opacity: 0, y: -5, scale: 0.95 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 400,
                damping: 25
            }
        },
        exit: {
            opacity: 0,
            y: -5,
            scale: 0.95,
            transition: {
                duration: 0.2
            }
        }
    };

    return (
        <motion.header
            initial="hidden"
            animate="visible"
            variants={navVariants}
            className={cn(
                "fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300",
                scrolled
                    ? "bg-white/90 dark:bg-[#040d36]/90 backdrop-blur-md border-b border-slate-200/50 dark:border-slate-800/50 shadow-sm"
                    : "dark:bg-transparent bg-white/90"
            )}
        >
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex items-center justify-between h-16 md:h-20">
                    {/* Logo */}
                    <SBTCYieldVaultLogo extra_text />

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-1">
                        {navLinks.map((link, i) => (
                            link.subItems ? (
                                <div key={i} className="relative">
                                    <DropdownMenu
                                        open={dropdownOpen === i}
                                        onOpenChange={(open) => setDropdownOpen(open ? i : null)}
                                    >
                                        <motion.div custom={i} variants={linkVariants}>
                                            <DropdownMenuTrigger asChild>
                                                <Button
                                                    variant="ghost"
                                                    className={cn(
                                                        "inline-flex items-center font-medium h-10 rounded-md text-base transition-colors",
                                                        activeLink?.startsWith(link.href) || dropdownOpen === i
                                                            ? "text-[#F7931A] dark:text-[#F7931A]"
                                                            : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60"
                                                    )}
                                                >
                                                    {link.icon}
                                                    {link.name}
                                                    <motion.div
                                                        animate={{ rotate: dropdownOpen === i ? 180 : 0 }}
                                                        transition={{ duration: 0.2 }}
                                                    >
                                                        <ChevronDown className="ml-1 w-4 h-4" />
                                                    </motion.div>
                                                </Button>
                                            </DropdownMenuTrigger>
                                        </motion.div>
                                        <AnimatePresence>
                                            {dropdownOpen === i && (
                                                <DropdownMenuContent
                                                    align="center"
                                                    className="w-64 p-2 mt-1 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/95 dark:bg-slate-800/95 backdrop-blur-md shadow-xl"
                                                    forceMount
                                                    asChild
                                                >
                                                    <motion.div
                                                        variants={dropdownVariants}
                                                        initial="hidden"
                                                        animate="visible"
                                                        exit="exit"
                                                    >
                                                        <div className="grid gap-1 p-1">
                                                            {link.subItems.map((subItem, j) => (
                                                                <DropdownMenuItem key={j} asChild className="px-0 py-0 focus:bg-transparent">
                                                                    <Link
                                                                        href={subItem.href}
                                                                        className={cn(
                                                                            "flex items-center px-3 py-2.5 rounded-md cursor-pointer text-sm font-medium w-full transition-colors group",
                                                                            activeLink === subItem.href
                                                                                ? "bg-gradient-to-r from-orange-50/50 via-amber-50/50 to-yellow-50/50 dark:from-orange-900/20 dark:via-amber-900/20 dark:to-yellow-900/20 text-[#F7931A] dark:text-[#F7931A]"
                                                                                : "hover:bg-slate-100 dark:hover:bg-slate-700/50 text-slate-700 dark:text-slate-300"
                                                                        )}
                                                                        onClick={() => setDropdownOpen(null)}
                                                                    >
                                                                        {subItem.icon}
                                                                        <span className="mr-6">{subItem.title}</span>
                                                                        <ArrowRight className={cn(
                                                                            "w-4 h-4 ml-auto opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all",
                                                                            activeLink === subItem.href && "opacity-100 translate-x-0"
                                                                        )} />
                                                                    </Link>
                                                                </DropdownMenuItem>
                                                            ))}
                                                        </div>
                                                    </motion.div>
                                                </DropdownMenuContent>
                                            )}
                                        </AnimatePresence>
                                    </DropdownMenu>
                                </div>
                            ) : (
                                <motion.div
                                    key={i}
                                    custom={i}
                                    variants={linkVariants}
                                    className="relative"
                                >
                                    <Link
                                        href={link.href}
                                        className={cn(
                                            "inline-flex items-center px-4 py-2 font-medium text-base relative duration-200 transition-colors",
                                            activeLink === link.href
                                                ? "text-[#F7931A] dark:text-[#F7931A]"
                                                : "text-slate-700 dark:text-slate-300 hover:bg-transparent",
                                            "after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#F7931A] hover:after:w-full after:transition-all after:duration-300"
                                        )}
                                    >
                                        {link.icon}
                                        {link.name}
                                        {activeLink === link.href && (
                                            <motion.div
                                                className="absolute -bottom-1 left-4 right-4 h-0.5 bg-gradient-to-r from-[#F7931A] via-amber-500 to-yellow-500 rounded-full"
                                                layoutId="activeNavIndicator"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ duration: 0.2 }}
                                            />
                                        )}
                                    </Link>
                                </motion.div>
                            )
                        ))}
                    </nav>

                    {/* Right Side - Actions */}
                    <div className="flex items-center space-x-3">
                        <ThemeToggle />

                        {/* Connect Wallet Button - Desktop */}
                        <div className="hidden md:block">
                            <WalletConnectButton
                                className="ml-2"
                                buttonClass="px-5 py-2 text-sm"
                            />
                        </div>

                        {/* Mobile Menu */}
                        <div className="md:hidden">
                            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                                <SheetTrigger asChild>
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        className="border-none hover:bg-slate-100 dark:hover:bg-slate-800 bg-transparent"
                                    >
                                        <Menu className="h-5 w-5" />
                                        <span className="sr-only">Open menu</span>
                                    </Button>
                                </SheetTrigger>
                                <SheetContent
                                    side="right"
                                    className="p-0 border-slate-200 dark:border-slate-700 bg-white/95 dark:bg-[#040d36]/95 backdrop-blur-sm w-4/5 max-w-xs"
                                >
                                    <motion.div
                                        className="flex flex-col h-full"
                                        initial={{ opacity: 0, x: 50 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                                    >
                                        {/* Mobile menu header */}
                                        <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700">
                                            <SBTCYieldVaultLogo className="w-32" />
                                        </div>

                                        {/* Mobile menu links */}
                                        <div className="px-4 py-6 flex-1 overflow-auto">
                                            <nav className="flex flex-col space-y-5">
                                                {navLinks.map((link, i) => (
                                                    <motion.div
                                                        key={i}
                                                        initial={{ opacity: 0, x: -10 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ delay: i * 0.05 + 0.1 }}
                                                    >
                                                        {link.subItems ? (
                                                            <div className="space-y-3">
                                                                <div className="font-medium text-lg text-slate-800 dark:text-slate-200 flex items-center">
                                                                    {link.icon}
                                                                    {link.name}
                                                                </div>
                                                                <div className="pl-4 flex flex-col space-y-3 border-l-2 border-gradient-to-b from-[#F7931A] via-amber-500 to-yellow-500 dark:border-gradient-to-b dark:from-[#F7931A] dark:via-amber-500 dark:to-yellow-500">
                                                                    {link.subItems.map((subItem, j) => (
                                                                        <Link
                                                                            key={j}
                                                                            href={subItem.href}
                                                                            className={cn(
                                                                                "group flex items-center justify-between text-slate-600 dark:text-slate-400 hover:text-[#F7931A] dark:hover:text-[#F7931A] transition-colors",
                                                                                activeLink === subItem.href && "text-[#F7931A] dark:text-[#F7931A] font-medium"
                                                                            )}
                                                                            onClick={() => setMobileMenuOpen(false)}
                                                                        >
                                                                            <span className="flex items-center">
                                                                                {subItem.icon}
                                                                                {subItem.title}
                                                                            </span>
                                                                            <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                                                                        </Link>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            <Link
                                                                href={link.href}
                                                                className={cn(
                                                                    "font-medium text-lg flex items-center justify-between group",
                                                                    activeLink === link.href
                                                                        ? "text-[#F7931A] dark:text-[#F7931A]"
                                                                        : "text-slate-800 dark:text-slate-200 hover:text-[#F7931A] dark:hover:text-[#F7931A]"
                                                                )}
                                                                onClick={() => setMobileMenuOpen(false)}
                                                            >
                                                                <span className="flex items-center">
                                                                    {link.icon}
                                                                    {link.name}
                                                                </span>
                                                                <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                                                            </Link>
                                                        )}
                                                    </motion.div>
                                                ))}
                                            </nav>
                                        </div>

                                        {/* Mobile WalletConnect */}
                                        <div className="px-4 py-2 border-t border-slate-200 dark:border-slate-700">
                                            <WalletConnectButton
                                                className="w-full"
                                                buttonClass="w-full px-4 py-2.5 text-sm"
                                            />
                                        </div>

                                        {/* Mobile menu footer */}
                                        <div className="p-4 border-t border-slate-200 dark:border-slate-700 mt-auto">
                                            {/* Theme toggle in mobile menu */}
                                            <div className="flex justify-between items-center mb-4">
                                                <span className="font-medium text-slate-700 dark:text-slate-300">Theme</span>
                                                <ThemeToggle />
                                            </div>
                                        </div>
                                    </motion.div>
                                </SheetContent>
                            </Sheet>
                        </div>
                    </div>
                </div>
            </div>
        </motion.header>
    );
};

export default Navbar;
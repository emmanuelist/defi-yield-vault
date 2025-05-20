import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const GetItNowButton = () => {
    return (
        <motion.div
            className="relative"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
        >
            <button className="relative group overflow-hidden flex items-center justify-between bg-slate-800/90 hover:bg-slate-700/90 rounded-full pl-4 pr-2 py-2 text-white font-medium tracking-wide shadow-xl">
                <span className="text-xs md:text-sm uppercase mr-3">LEARN MORE</span>

                {/* Circle with arrow */}
                <div className="flex items-center justify-center bg-white rounded-full h-7 w-7 shadow-inner">
                    <motion.div
                        initial={{ x: 0 }}
                        whileHover={{ x: 2 }}
                        className="group-hover:translate-x-0.5 transition-transform duration-300"
                    >
                        <ArrowRight className="h-3.5 w-3.5 text-black" />
                    </motion.div>
                </div>

                {/* Subtle gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/10 to-purple-900/20 opacity-40 rounded-full pointer-events-none"></div>

                {/* Inner glow effect */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 rounded-full blur-sm transition-opacity duration-300 pointer-events-none"></div>
            </button>
        </motion.div>
    );
};

export default GetItNowButton;
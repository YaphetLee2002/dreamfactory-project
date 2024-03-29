"use client";
import React from "react";
import {motion} from "framer-motion";

export function GalleryDemo() {
    return (
        <motion.h1
            initial={{opacity: 0, y: 250}}
            whileInView={{opacity: 1, y: 0}}
            transition={{
                delay: 0.3,
                duration: 0.8,
                ease: "easeInOut",
            }}
            className="mt-8 bg-gradient-to-br from-slate-50 to-slate-50 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
        >
            Gallery
        </motion.h1>
    )
}

export default GalleryDemo;

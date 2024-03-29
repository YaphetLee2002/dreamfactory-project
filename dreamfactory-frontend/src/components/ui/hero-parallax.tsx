"use client";
import React from "react";
import {
    motion,
    useScroll,
    useTransform,
    useSpring,
    MotionValue,
} from "framer-motion";
import Image from "next/image";
import {TypewriterEffectSmooth} from "@/components/ui/typewriter-effect";
import {Button} from "@/components/ui/button";
import { MoveUpRight, Github } from 'lucide-react';
import Link from "next/link";

export const HeroParallax = ({
                                 products,
                             }: {
    products: {
        title: string;
        thumbnail: string;
    }[];
}) => {
    const firstRow = products.slice(0, 5);
    const secondRow = products.slice(5, 10);
    const thirdRow = products.slice(10, 15);
    const ref = React.useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });

    const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

    const translateX = useSpring(
        useTransform(scrollYProgress, [0, 1], [0, 1000]),
        springConfig
    );
    const translateXReverse = useSpring(
        useTransform(scrollYProgress, [0, 1], [0, -1000]),
        springConfig
    );
    const rotateX = useSpring(
        useTransform(scrollYProgress, [0, 0.2], [15, 0]),
        springConfig
    );
    const opacity = useSpring(
        useTransform(scrollYProgress, [0, 0.2], [0.2, 1]),
        springConfig
    );
    const rotateZ = useSpring(
        useTransform(scrollYProgress, [0, 0.2], [20, 0]),
        springConfig
    );
    const translateY = useSpring(
        useTransform(scrollYProgress, [0, 0.2], [-700, 500]),
        springConfig
    );
    return (
        <div
            ref={ref}
            className="h-[280vh] bg-slate-950 py-40 overflow-hidden antialiased relative flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d]"
        >
            <Header />
            <motion.div
                style={{
                    rotateX,
                    rotateZ,
                    translateY,
                    opacity,
                }}
                className=""
            >
                <motion.div className="flex flex-row-reverse space-x-reverse space-x-20 mb-20">
                    {firstRow.map((product) => (
                        <ProductCard
                            product={product}
                            translate={translateX}
                            key={product.title}
                        />
                    ))}
                </motion.div>
                <motion.div className="flex flex-row mb-20 space-x-20 ">
                    {secondRow.map((product) => (
                        <ProductCard
                            product={product}
                            translate={translateXReverse}
                            key={product.title}
                        />
                    ))}
                </motion.div>
                <motion.div className="flex flex-row-reverse space-x-reverse space-x-20">
                    {thirdRow.map((product) => (
                        <ProductCard
                            product={product}
                            translate={translateX}
                            key={product.title}
                        />
                    ))}
                </motion.div>
            </motion.div>
        </div>
    );
};

export const Header = () => {

    const words = [
        {
            text: "Generate",
            className: "text-white"
        },
        {
            text: "Multi-Scene",
            className: "text-white",
        },
        {
            text: "Long",
            className: "text-blue-500",
        },
        {
            text: "Video.",
            className: "text-blue-500",
        },
    ];

    return (
        <div className="select-none pointer-events-none text-white relative mx-auto py-20 md:py-40 px-4 w-full left-24 top-0 z-50">
            <h1 className="text-2xl md:text-7xl font-bold dark:text-white">
                <div className="tracking-tighter">
                    DreamFactory
                </div>

                <TypewriterEffectSmooth words={words} />
            </h1>

            <p className="max-w-2xl font-extralight text-white md:text-xl mt-6">
                Dream Factory is an automatic framework for multi-scene long video synthesis.
                It is also a framework which are based on Collaborative LLM GPTs-based Agents so Customize Your Own Art Company Now.
            </p>
            <div className="flex mt-8 pointer-events-auto select-auto">
                <Button
                    className="border-blue-500 border-[3px]  bg-blue-500 hover:bg-blue-50 font-medium text-white hover:text-blue-500 text-sm"
                    asChild
                >
                    <Link href="/about">
                        About Us
                        <MoveUpRight className="scale-75" style={{marginRight: "-0.6rem"}}/>
                    </Link>
                </Button>
                <Button
                    className="border-[3px] border-zinc-900 hover:bg-zinc-50 bg-zinc-900 font-medium hover:text-zinc-900 text-white ml-8 text-sm"
                    asChild
                >
                    <Link href="https://github.com/dreamfactory24/DreamFactory/">
                        See in Github
                        <Github className="scale-75 ml-0.5" style={{marginRight: "-0.6rem"}}/>
                    </Link>
                </Button>
            </div>
        </div>
    );
};

export const ProductCard = ({
                                product,
                                translate,
                            }: {
    product: {
        title: string;
        thumbnail: string;
    };
    translate: MotionValue<number>;
}) => {
    return (
        <motion.div
            style={{
                x: translate,
            }}
            whileHover={{
                y: -20,
            }}
            key={product.title}
            className="group/product h-96 w-[30rem] relative flex-shrink-0"
        >
            <Image
                src={product.thumbnail}
                height="600"
                width="600"
                className="object-cover rounded-lg object-left-top absolute h-full w-full inset-0"
                alt={product.title}
            />
            <div className="absolute inset-0 h-full w-full opacity-0 group-hover/product:opacity-30 bg-black pointer-events-none"></div>
            <h2 className="absolute bottom-4 left-4 opacity-0 group-hover/product:opacity-100 text-white">
                {product.title}
            </h2>
        </motion.div>
    );
};

import React from "react";
import { MacbookScroll } from "@/components/ui/macbook-scroll";
import Link from "next/link";
import { motion } from "framer-motion";

export function MacbookScrollDemo() {
    return (
        <div className="overflow-hidden bg-slate-950 w-full">
            <MacbookScroll
                title={
                    <span className="mb-6 select-none pointer-events-none py-4">
                        <div className="text-blue-500 mb-10 text-6xl">
                            Amazing Film
                        </div>
                        produced by DreamFactory,<br/>
                        also directed by DreamFactory
                    </span>
                }
                showGradient={false}
            />
        </div>
    );
}


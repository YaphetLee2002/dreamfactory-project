"use client";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";

const words = `Our framework called DreamFactory can automatically generate multi-scene, long-duration videos. We introduce multiple large language models to play different roles in the video generation process, and use the "Chain of Thought" method to solve the problem of multi-agent cooperation, which makes it possible to generate high-quality, coherent, and consistent video work.
`;

export function TextGenerateEffectDemo() {
    return <TextGenerateEffect words={words} />;
}

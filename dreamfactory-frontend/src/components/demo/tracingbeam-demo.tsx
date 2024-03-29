"use client";
import React from "react";
import Image from "next/image";
import { twMerge } from "tailwind-merge";
import { TracingBeam } from "@/components/ui/tracing-beam";

export function TracingBeamDemo() {
    return (
        <TracingBeam className="px-6">
            <div className="text-white max-w-3xl mx-auto antialiased pt-4 relative">
                {dummyContent.map((item, index) => (
                    <div key={`content-${index}`} className="mb-10">
                        <div>
                            {item.header && (
                                <div>
                                    <h1 className="text-white font-bold font-serif text-5xl mb-2 px-2 py-6">
                                        DreamFactory: Collaborative GPTs-based Agents for Multi-scene Long Video
                                        Synthesis
                                    </h1>
                                    <div className="mb-12 text-center font-serif">
                                        <div className=" font-bold text-xl">
                                            Zhifei Xie
                                        </div>
                                        <div>
                                            Tsinghua University
                                        </div>
                                        <div className="font-mono">
                                            xiezhifei@bit.edu.cn
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                        <p className="text-xl font-bold mt-12 mb-4 w-fit  py-1">
                            {item.title}
                        </p>

                        <div className="text-base  prose prose-sm dark:prose-invert">
                            {item?.image && (
                                <div>
                                    <Image
                                        src={item.image}
                                        alt="blog thumbnail"
                                        height="1000"
                                        width="1000"
                                        className="rounded-lg mb-4 object-cover"
                                    />
                                    <h2 className="bg-white text-black rounded-full text-sm w-fit px-4 py-1 mb-4">
                                        {item.badge}
                                    </h2>
                                </div>
                            )}
                            {item.description}
                        </div>
                    </div>
                ))}
            </div>
        </TracingBeam>
    );
}

const dummyContent = [
    {
        header: true,
        title: "Abstract",
        description: (
            <>
                <p>
                    Since the advent of large models, generative models have undeniably
                    achieved significant breakthroughs. From the GPT series of large language
                    models(LLMs) to large Vision-language models(LVMs) like Dalle, the field
                    has now advanced to the era of large models for video synthesis. Existing
                    video generation models have shown promising results under parameter
                    expansion, capable of producing short, dynamic videos. However, these
                    models face two major challenges: their inability to synthesize longer
                    videos due to the stochastic nature of large predictive models and the
                    complexity of real-world scenarios, and difficulties in maintaining consis-
                    tency across multiple videos. Moreover, they have not been effectively
                    prompted. In this paper, we enhance the current video synthesis models by
                    introducing Film- Factory, a GPT-powered multi-agent video synthesis
                    framework. Utilizing GPT as an overseer to preserve the memory of video
                    synthesis, and by integrating a multi- agent cooperation process, we are
                    able to generate extended-length videos. This approach addresses the
                    aforementioned issues by facilitating longer, consistent video creation
                    and offering a refined prompting mechanism, thereby advancing the capabilities
                    of video generation models. Additionally, the universal framework proposed in
                    this paper does not rely on any specific model but can incorporate any model
                    as a foundational tool.To demonstrate the effectiveness of CodeAgent, we have
                    employed a series of state-of-the-art video generation models, testing video
                    quality (FVD) scores across various lengths. Our findings demonstrate
                    significant improvements, especially with the extension of duration. Human
                    evaluations fur- ther reveal a preference for the output generated by FilmFactory
                    framework over that of the orginal model.
                </p>
            </>
        ),
        // image:
        //     "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=3540&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        title: "1 Introduction",
        description: (
            <>
                <p>
                    Video synthesis is an advanced computational technique aimed at generating
                    or altering video se- quences to create new content or modify existing footage.
                    This technology leverages a combination of artificial intelligence, computer
                    graphics, and digital signal processing methodologies to produce videos that
                    can be either entirely synthetic or blends of real and artificial elements. The
                    key to effective video synthesis lies in its ability to produce high-quality,
                    realistic video content that is often indistinguishable from actual footage,
                    maintaining consistency in visual elements across frames, and ensuring the seamless
                    integration of synthetic elements with real-world contexts. Nowadays, the field
                    of video synthesis has garnered extensive attention due to significant advancements
                    in artificial intelligence, augmented computational power, and the expansion of
                    models and datasets. These developments have collectively enhanced the capabilities
                    of video synthesis technologies, enabling the creation of highly realistic and complex
                    video sequences with unprecedented efficiency and fidelity, even trick the human eye
                    into approaching reality.
                </p>
                <p>
                    In dolore veniam excepteur eu est et sunt velit. Ipsum sint esse
                    veniam fugiat esse qui sint ad sunt reprehenderit do qui proident
                    reprehenderit. Laborum exercitation aliqua reprehenderit ea sint
                    cillum ut mollit.
                </p>
            </>
        ),
        badge: "Changelog",
        image:
            "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&q=80&w=3540&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        title: "Lorem Ipsum Dolor Sit Amet",
        description: (
            <>
                <p>
                    Ex irure dolore veniam ex velit non aute nisi labore ipsum occaecat
                    deserunt cupidatat aute. Enim cillum dolor et nulla sunt exercitation
                    non voluptate qui aliquip esse tempor. Ullamco ut sunt consectetur
                    sint qui qui do do qui do. Labore laborum culpa magna reprehenderit ea
                    velit id esse adipisicing deserunt amet dolore. Ipsum occaecat veniam
                    commodo proident aliqua id ad deserunt dolor aliquip duis veniam sunt.
                </p>
            </>
        ),
        badge: "Launch Week",
        image:
            "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&q=80&w=3506&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
];

import {HeroparallaxDemo} from "@/components/demo/heroparallax-demo";
import {ParallaxScrollDemo} from "@/components/demo/parallax-scroll-demo";
import TopBar from "@/components/demo/topBar-demo";
import {LampDemo} from "@/components/demo/lamp-demo";
import {SparklesPreview} from "@/components/demo/sparkles-demo";
import {MacbookScrollDemo} from "@/components/demo/macbook-demo";

export default function Home() {
    return (
        <main className="bg-slate-950">
            <TopBar/>
            <HeroparallaxDemo/>
            <LampDemo/>
            <MacbookScrollDemo/>
            <SparklesPreview/>
            <ParallaxScrollDemo/>
        </main>
    );
}

import TopBar from "@/components/demo/topBar-demo";
import {TracingBeamDemo} from "@/components/demo/tracingbeam-demo";
import {SparklesPreview} from "@/components/demo/sparkles-demo";

export default function Paper() {
    return (
        <div className="bg-slate-950">

            <TopBar/>
            <div className="py-32">
                <TracingBeamDemo/>
            </div>
        </div>

    )
}

import FeaturesContent from "./components/FeaturesContent";
import FeaturesNav from "./components/FeaturesNav";
import useSetPageTitle from "@hooks/useSetPageTitle";

function Features() {
    useSetPageTitle("Documentation");

    return (
        <>
            <div
                className="flex  overflow-hidden rounded-lg  bg-base-100"
                style={{ height: "82vh" }}
            >
                <div className="flex-none p-4">
                    <FeaturesNav activeIndex={1} />
                </div>

                <div className="grow overflow-y-scroll  pt-16">
                    <FeaturesContent />
                </div>
            </div>
        </>
    );
}

export default Features;

import GettingStartedContent from "./components/GettingStartedContent";
import GettingStartedNav from "./components/GettingStartedNav";
import useSetPageTitle from "@hooks/useSetPageTitle";

function GettingStarted() {
    useSetPageTitle("Documentation");

    return (
        <>
            <div
                className="flex  overflow-hidden rounded-lg  bg-base-100"
                style={{ height: "82vh" }}
            >
                <div className="flex-none p-4">
                    <GettingStartedNav activeIndex={1} />
                </div>

                <div className="grow overflow-y-scroll  pt-16">
                    <GettingStartedContent />
                </div>
            </div>
        </>
    );
}

export default GettingStarted;

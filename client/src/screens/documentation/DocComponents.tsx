import DocComponentsContent from "./components/DocComponentsContent";
import DocComponentsNav from "./components/DocComponentsNav";
import useSetPageTitle from "@hooks/useSetPageTitle";

function DocComponents() {
    useSetPageTitle("Documentation");

    return (
        <>
            <div
                className="flex  overflow-hidden rounded-lg  bg-base-100"
                style={{ height: "82vh" }}
            >
                <div className="flex-none p-4">
                    <DocComponentsNav activeIndex={1} />
                </div>

                <div className="grow overflow-y-scroll  pt-16">
                    <DocComponentsContent />
                </div>
            </div>
        </>
    );
}

export default DocComponents;

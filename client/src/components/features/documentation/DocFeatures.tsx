import { useAppDispatch } from "@app/hooks";
import { useEffect } from "react";
import { setPageTitle } from "@states/app/headerSlice";
import FeaturesContent from "./components/FeaturesContent";
import FeaturesNav from "./components/FeaturesNav";

function Features() {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(setPageTitle({ title: "Documentation" }));
    }, []);

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

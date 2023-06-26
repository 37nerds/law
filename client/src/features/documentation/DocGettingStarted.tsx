import { useAppDispatch } from "@app/hooks";
import { useEffect } from "react";
import { setPageTitle } from "../common/headerSlice";
import GettingStartedContent from "./components/GettingStartedContent";
import GettingStartedNav from "./components/GettingStartedNav";

function GettingStarted() {
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

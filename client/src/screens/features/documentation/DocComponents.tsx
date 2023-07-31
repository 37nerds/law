import { useAppDispatch } from "@app/hooks";
import { useEffect } from "react";
import { setPageTitle } from "../common/headerSlice";
import DocComponentsContent from "./components/DocComponentsContent";
import DocComponentsNav from "./components/DocComponentsNav";

function DocComponents() {
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

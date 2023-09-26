import { ReactNode, useEffect, useRef } from "react";

import Header from "../Header/Header";

import useGeneralStore from "@states/generalStore";

const Content = ({ children }: { children: ReactNode }) => {
    const { pageTitle } = useGeneralStore();

    const mainContentRef = useRef<HTMLDivElement>(null);

    // Scroll back to top on new page load
    useEffect(() => {
        mainContentRef.current?.scroll({
            top: 0,
            behavior: "smooth",
        });
    }, [pageTitle]);

    return (
        <div className="drawer-content flex flex-col " style={{ zIndex: 50 }}>
            <Header />
            <main className="flex-1 overflow-y-auto bg-base-200 p-3" ref={mainContentRef}>
                {children}
                <div className="h-16"></div>
            </main>
        </div>
    );
};

export default Content;

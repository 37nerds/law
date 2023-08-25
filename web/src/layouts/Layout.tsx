import { ReactNode } from "react";

import LeftSidebar from "./LeftSidebar";
import ModalLayout from "@components/containers/ModalLayout";
import PageContent from "./PageContent";
import RightSidebar from "./RightSidebar";

const Layout = ({ children }: { children: ReactNode }) => {
    return (
        <>
            {/* Left drawer - containing page content and sidebar (always open) */}
            <div className="drawer-mobile drawer">
                <input id="left-sidebar-drawer" type="checkbox" className="drawer-toggle" />
                <PageContent>{children}</PageContent>
                <LeftSidebar />
            </div>

            {/* Right drawer - containing secondary content like notification list etc. */}
            <RightSidebar />

            {/** NotificationButton layout container */}
            {/* todo */}

            {/* Modal layout container */}
            <ModalLayout />
        </>
    );
};

export default Layout;

import { ReactNode } from "react";

import Sidebar from "./Sidebar/Sidebar";
import ModalLayout from "@components/ModalLayout";
import Content from "./Content/Content";
import Notification from "./Notification/Notification";

const Layout = ({ children }: { children: ReactNode }) => {
    return (
        <>
            {/* Left drawer - containing page Content and Sidebar (always open) */}
            <div className="drawer-mobile drawer">
                <input id="left-sidebar-drawer" type="checkbox" className="drawer-toggle" />
                <Content>{children}</Content>
                <Sidebar />
            </div>

            {/* Right drawer - containing secondary Content like NotificationBody list etc. */}
            <Notification />

            {/* Modal layout container */}
            <ModalLayout />
        </>
    );
};

export default Layout;

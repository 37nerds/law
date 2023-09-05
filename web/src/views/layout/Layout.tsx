import { ReactNode } from "react";

import Content from "@layout/Content/Content";
import Sidebar from "@layout/Sidebar/Sidebar";
import Notification from "@layout/Notification/Notification";

const Layout = ({ children }: { children: ReactNode }) => {
    return (
        <>
            {/* Left drawer - containing page Content and Sidebar (always open) */}
            <div className="drawer lg:drawer-open">
                <input id="left-sidebar-drawer" type="checkbox" className="drawer-toggle" />
                <Content>{children}</Content>
                <Sidebar />
            </div>

            {/* Right drawer - containing secondary Content like NotificationBody list etc. */}
            <Notification />
        </>
    );
};

export default Layout;

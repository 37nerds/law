import { ReactNode } from "react";

import Content from "./Content/Content";
import Sidebar from "./Sidebar/Sidebar";
import Notification from "./Notification/Notification";

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

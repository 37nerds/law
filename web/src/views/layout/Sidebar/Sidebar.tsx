import { Link } from "react-router-dom";

import SidebarLinks from "./SidebarLinks";

const Sidebar = () => {
    return (
        <div className="drawer-side">
            <label htmlFor="left-sidebar-drawer" className="drawer-overlay"></label>
            <ul className="menu w-80 bg-base-100 pt-2 text-base-content">
                <li className="mb-2 text-xl font-semibold">
                    <Link to={"/app/welcome"}>
                        <img className="mask mask-squircle w-10" src="/logo192.png" alt="DashWind Logo" />
                        DashWind
                    </Link>{" "}
                </li>
                <SidebarLinks />
            </ul>
        </div>
    );
};

export default Sidebar;

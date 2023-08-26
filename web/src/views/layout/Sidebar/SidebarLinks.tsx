import Submenu from "./Submenu";
import Menu from "./Menu";

import sidebarLinks from "@config/sidebar";

const SidebarLinks = () => {
    return (
        <>
            {sidebarLinks.map((route, index) => {
                return (
                    <li key={index}>
                        {route.submenus ? <Submenu submenus={route.submenus} {...route} /> : <Menu {...route} />}
                    </li>
                );
            })}
        </>
    );
};

export default SidebarLinks;

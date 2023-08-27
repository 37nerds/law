import { sidebar_links } from "@config/sidebar";

import Submenu from "./Submenu";
import Menu from "./Menu";

const SidebarLinks = () => {
    return (
        <>
            {sidebar_links.map((route, index) => {
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

import { NavLink, useLocation } from "react-router-dom";

import type { TIcon } from "@kinds/general";

const Menu = ({ path, icon: Icon, name }: { path: string; icon: TIcon; name: string }) => {
    const location = useLocation();

    return (
        <NavLink
            end
            to={path}
            className={({ isActive }) => `${isActive ? "bg-layouts-200  font-semibold " : "font-normal"}`}
        >
            <Icon className="h-6 w-6" /> {name}
            {location.pathname === path ? (
                <span
                    className="absolute inset-y-0 left-0 w-1 rounded-br-md rounded-tr-md bg-primary "
                    aria-hidden="true"
                ></span>
            ) : null}
        </NavLink>
    );
};

export default Menu;

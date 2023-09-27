import type { TIcon } from "src/types";

import { NavLink, useLocation } from "react-router-dom";

const Menu = ({ path, name, icon: Icon }: { path: string; name: string; icon: TIcon }) => {
    const location = useLocation();

    return (
        <li>
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
        </li>
    );
};

export default Menu;

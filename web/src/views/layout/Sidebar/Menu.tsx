import type { TIcon } from "../../../types";
import { NavLink, useLocation } from "react-router-dom";
import { usePrepareUrlForSidebarLink } from "@helpers/unknown";

const Menu = ({
    path,
    icon: Icon,
    name,
    defaults,
}: {
    path: string;
    icon: TIcon;
    name: string;
    defaults?: Record<string, any>;
}) => {
    const location = useLocation();

    const prepareUrlForSidebarLink = usePrepareUrlForSidebarLink();

    return (
        <li>
            <NavLink
                end
                to={path}
                className={({ isActive }) => `${isActive ? "bg-layouts-200  font-semibold " : "font-normal"}`}
            >
                <Icon className="h-6 w-6" /> {name}
                {location.pathname === prepareUrlForSidebarLink(path, defaults) ? (
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

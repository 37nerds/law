import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import type { TIcon, TSidebarLink } from "@kinds/general";
import DynamicChevronIcon from "@components/icons/DynamicChevronIcon";

const Submenu = ({ submenus, name, icon: Icon }: { name: string; icon: TIcon; submenus: TSidebarLink[] }) => {
    const location = useLocation();
    const [isExpanded, setIsExpanded] = useState(false);

    /** Open Submenu list if path found in routes, this is for directly loading submenu routes  first time */
    useEffect(() => {
        if (
            submenus.filter(m => {
                return m.path === location.pathname;
            })[0]
        )
            setIsExpanded(true);
    }, []);

    return (
        <div className="flex-col pb-0 pt-0">
            {/** Route Header */}
            <div className="flex w-full justify-between pb-3 pt-3" onClick={() => setIsExpanded(!isExpanded)}>
                <div className="flex gap-3">
                    <Icon className="h-6 w-6" />
                    {name}
                </div>
                <DynamicChevronIcon className="mt-1 h-5 w-5" isExpanded={isExpanded} />
            </div>

            {/** Submenu list */}
            <div className={` w-full ` + (isExpanded ? "" : "hidden")}>
                <ul className={`menu menu-compact`}>
                    {submenus.map(({ icon: Icon2, path: path2, name: name2, submenus: submenus2 }, index) => (
                        <li key={index}>
                            {submenus2 ? (
                                <Submenu icon={Icon2} name={name2} submenus={submenus2} />
                            ) : (
                                <Link to={path2}>
                                    <Icon2 className="h-5 w-5" /> {name2}
                                    {location.pathname == path2 ? (
                                        <span
                                            className="absolute inset-y-0 left-0 mb-1 mt-1 w-1 rounded-br-md rounded-tr-md bg-primary "
                                            aria-hidden="true"
                                        ></span>
                                    ) : null}
                                </Link>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Submenu;

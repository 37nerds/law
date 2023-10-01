import type { TIcon, TSidebarLink } from "@helpers/types";

import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { getPathname } from "@helpers/location";
import { useAuthStore } from "@states/auth_store";

import ChevronIcon from "@components/icons/ChevronIcon";

const Submenu = ({
    submenus,
    name,
    group,
    icon: Icon,
}: {
    name: string;
    group?: string;
    icon: TIcon;
    omit?: boolean;
    submenus: TSidebarLink[];
}) => {
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

    const { loggedUser } = useAuthStore();

    const permissions = loggedUser?.permissions || [];

    let isPermitted = !!submenus.find(submenu => submenu?.omit);
    isPermitted = isPermitted ? true : !!permissions.find(p => p?.resource?.group === group);

    return isPermitted ? (
        <li>
            <div className="mb-0 flex flex-col gap-0 pb-0 pt-0">
                {/** Route Header */}
                <div className="flex w-full justify-between pb-3 pt-3" onClick={() => setIsExpanded(!isExpanded)}>
                    <div className="flex gap-3">
                        <Icon className="h-6 w-6" />
                        {name}
                    </div>
                    <ChevronIcon className="mt-1 h-5 w-5" isExpanded={isExpanded} />
                </div>

                {/** Submenu list */}
                <div className={` w-full ` + (isExpanded ? "" : "hidden")}>
                    <ul className={`menu p-0`}>
                        {submenus.map(
                            (
                                {
                                    icon: Icon2,
                                    path: path2,
                                    name: name2,
                                    submenus: submenus2,
                                    group: group2,
                                    omit: omit2,
                                },
                                index
                            ) => {
                                const fPath = path2;
                                if (submenus2) {
                                    return (
                                        <li key={index}>
                                            <Submenu icon={Icon2} name={name2} submenus={submenus2} group={group2} />
                                        </li>
                                    );
                                }
                                const isPermitted = omit2
                                    ? true
                                    : !!permissions.find(p => p?.resource?.web.find(p2 => fPath === p2));

                                return (
                                    <div key={index}>
                                        {isPermitted ? (
                                            <li className="rounded">
                                                {isPermitted ? (
                                                    <Link to={fPath}>
                                                        <Icon2 className="h-5 w-5" /> {name2}
                                                        {getPathname() == fPath ? (
                                                            <span
                                                                className="absolute inset-y-0 left-0 mb-1 mt-1 w-1 rounded-br-md rounded-tr-md bg-primary "
                                                                aria-hidden="true"
                                                            ></span>
                                                        ) : null}
                                                    </Link>
                                                ) : (
                                                    <></>
                                                )}
                                            </li>
                                        ) : (
                                            <></>
                                        )}
                                    </div>
                                );
                            }
                        )}
                    </ul>
                </div>
            </div>
        </li>
    ) : (
        <></>
    );
};

export default Submenu;

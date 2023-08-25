import { ReactNode } from "react";

import BoltIcon from "@heroicons/react/24/outline/BoltIcon";
import ChartBarIcon from "@heroicons/react/24/outline/ChartBarIcon";
import Cog6ToothIcon from "@heroicons/react/24/outline/Cog6ToothIcon";
import InboxArrowDownIcon from "@heroicons/react/24/outline/InboxArrowDownIcon";
import Squares2X2Icon from "@heroicons/react/24/outline/Squares2X2Icon";
import UserIcon from "@heroicons/react/24/outline/UserIcon";
import UsersIcon from "@heroicons/react/24/outline/UsersIcon";
import WalletIcon from "@heroicons/react/24/outline/WalletIcon";
import QueueListIcon from "@heroicons/react/24/outline/QueueListIcon";
import CogIcon from "@heroicons/react/24/outline/CogIcon";

const iconClasses = `h-6 w-6`;
const submenuIconClasses = `h-5 w-5`;

export type TSubmenu = {
    path: string;
    icon: ReactNode;
    name: string;
};

const leftSidebarLinks = [
    {
        path: "/app/dashboard",
        icon: <Squares2X2Icon className={iconClasses} />,
        name: "Dashboard",
    },
    {
        path: "",
        icon: <UserIcon className={`${iconClasses} inline`} />,
        name: "Customers",
        submenu: [
            {
                path: "/app/keys.ts/list",
                icon: <QueueListIcon className={submenuIconClasses} />,
                name: "Customers List",
            },
            {
                path: "/app/keys.ts/setup",
                icon: <CogIcon className={submenuIconClasses} />,
                name: "Customers Setup",
            },
        ],
    },
    {
        path: "/app/leads", // url
        icon: <InboxArrowDownIcon className={iconClasses} />, // icon component
        name: "Leads", // name that appear in Sidebar
    },
    {
        path: "/app/charts", // url
        icon: <ChartBarIcon className={iconClasses} />, // icon component
        name: "Charts", // name that appear in Sidebar
    },
    {
        path: "/app/integration", // url
        icon: <BoltIcon className={iconClasses} />, // icon component
        name: "Integration", // name that appear in Sidebar
    },
    {
        path: "", //no url needed as this has submenu
        icon: <Cog6ToothIcon className={`${iconClasses} inline`} />, // icon component
        name: "Settings", // name that appear in Sidebar
        submenu: [
            {
                path: "/app/settings-profile", //url
                icon: <UserIcon className={submenuIconClasses} />, // icon component
                name: "Profile", // name that appear in Sidebar
            },
            {
                path: "/app/settings-billing",
                icon: <WalletIcon className={submenuIconClasses} />,
                name: "Billing",
            },
            {
                path: "/app/settings-team", // url
                icon: <UsersIcon className={submenuIconClasses} />, // icon component
                name: "Team Members", // name that appear in Sidebar
            },
        ],
    },
];

export default leftSidebarLinks;

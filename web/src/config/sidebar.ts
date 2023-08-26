/**
 * Config file for setting the left Sidebar links with title, icon
 */

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

import { TSidebarLink } from "@kinds/general";

const sidebarLinks: TSidebarLink[] = [
    {
        path: "/app/dashboard",
        icon: Squares2X2Icon,
        name: "Dashboard",
    },
    {
        path: "",
        icon: UserIcon,
        name: "Customers",
        submenus: [
            {
                path: "/app/keys.ts/list",
                icon: QueueListIcon,
                name: "Customers List",
            },
            {
                path: "/app/keys.ts/setup",
                icon: CogIcon,
                name: "Customers Setup",
            },
        ],
    },
    {
        path: "/app/leads",
        icon: InboxArrowDownIcon,
        name: "Leads",
    },
    {
        path: "/app/charts",
        icon: ChartBarIcon,
        name: "Charts",
    },
    {
        path: "/app/integration",
        icon: BoltIcon,
        name: "Integration",
    },
    {
        path: "",
        icon: Cog6ToothIcon,
        name: "Settings",
        submenus: [
            {
                path: "/app/settings/profile",
                icon: UserIcon,
                name: "Profile Settings",
            },
            {
                path: "/app/settings-billing",
                icon: WalletIcon,
                name: "Billing",
            },
            {
                path: "/app/settings-team",
                icon: UsersIcon,
                name: "Team Members",
            },
        ],
    },
];

export default sidebarLinks;

import { TSidebarLink } from "@kinds/general";

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

/**
 * Configuration for setting the left Sidebar links with title, icon
 */
export const sidebar_links: TSidebarLink[] = [
    {
        path: "/_/dashboard",
        icon: Squares2X2Icon,
        name: "Dashboard",
    },
    {
        path: "",
        icon: UserIcon,
        name: "Customers",
        submenus: [
            {
                path: "/_/keys.ts/list",
                icon: QueueListIcon,
                name: "Customers List",
            },
            {
                path: "/_/keys.ts/setup",
                icon: CogIcon,
                name: "Customers Setup",
            },
        ],
    },
    {
        path: "/_/leads",
        icon: InboxArrowDownIcon,
        name: "Leads",
    },
    {
        path: "/_/charts",
        icon: ChartBarIcon,
        name: "Charts",
    },
    {
        path: "/_/integration",
        icon: BoltIcon,
        name: "Integration",
    },
    {
        path: "",
        icon: Cog6ToothIcon,
        name: "Settings",
        submenus: [
            {
                path: "/_/profile",
                icon: UserIcon,
                name: "Profile",
            },
            {
                path: "/_/settings-billing",
                icon: WalletIcon,
                name: "Billing",
            },
            {
                path: "/_/settings-team",
                icon: UsersIcon,
                name: "Team Members",
            },
        ],
    },
];
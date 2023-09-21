import { TSidebarLink } from "@kinds/general";

import BoltIcon from "@heroicons/react/24/outline/BoltIcon";
import ChartBarIcon from "@heroicons/react/24/outline/ChartBarIcon";
import Cog6ToothIcon from "@heroicons/react/24/outline/Cog6ToothIcon";
import CogIcon from "@heroicons/react/24/outline/CogIcon";
import QueueListIcon from "@heroicons/react/24/outline/QueueListIcon";
import Squares2X2Icon from "@heroicons/react/24/outline/Squares2X2Icon";
import UserIcon from "@heroicons/react/24/outline/UserIcon";
import UsersIcon from "@heroicons/react/24/outline/UsersIcon";
import WalletIcon from "@heroicons/react/24/outline/WalletIcon";

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
                path: "/_/customers/:page",
                icon: QueueListIcon,
                name: "Customers List",
                defaults: {
                    page: 1,
                },
            },
            {
                path: "/_/customers/setup",
                icon: CogIcon,
                name: "Customers Setup",
            },
        ],
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
                path: "/_/settings-users/:page",
                icon: UsersIcon,
                name: "Users",
                defaults: {
                    page: 1,
                },
            },
        ],
    },
];

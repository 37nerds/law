import type { TSidebarLink } from "@helpers/types";

import BoltIcon from "@heroicons/react/24/outline/BoltIcon";
import ChartBarIcon from "@heroicons/react/24/outline/ChartBarIcon";
import checkBadgeIcon from "@heroicons/react/24/outline/CheckBadgeIcon";
import Cog6ToothIcon from "@heroicons/react/24/outline/Cog6ToothIcon";
import CogIcon from "@heroicons/react/24/outline/CogIcon";
import QueueListIcon from "@heroicons/react/24/outline/QueueListIcon";
import Squares2X2Icon from "@heroicons/react/24/outline/Squares2X2Icon";
import UserIcon from "@heroicons/react/24/outline/UserIcon";
import UsersIcon from "@heroicons/react/24/outline/UsersIcon";

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
        group: "customers",
        submenus: [
            {
                path: "/_/customers",
                icon: QueueListIcon,
                name: "Customers List",
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
        path: "/rbac",
        icon: Cog6ToothIcon,
        name: "Users",
        group: "users",
        submenus: [
            {
                path: "/_/rbac/users",
                icon: UsersIcon,
                name: "All Users",
            },
            {
                path: "/_/rbac/roles",
                icon: checkBadgeIcon,
                name: "All Roles",
            },
        ],
    },
    {
        path: "",
        icon: Cog6ToothIcon,
        name: "Settings",
        group: "settings",
        submenus: [
            {
                path: "/_/settings/profile",
                icon: UserIcon,
                name: "Profile",
                omit: true,
            },
        ],
    },
];

import type { TSidebarLink } from "@helpers/types";

import BoltIcon from "@heroicons/react/24/outline/BoltIcon";
import ChartBarIcon from "@heroicons/react/24/outline/ChartBarIcon";
import CheckBadgeIcon from "@heroicons/react/24/outline/CheckBadgeIcon";
import Cog6ToothIcon from "@heroicons/react/24/outline/Cog6ToothIcon";
import CogIcon from "@heroicons/react/24/outline/CogIcon";
import QueueListIcon from "@heroicons/react/24/outline/QueueListIcon";
import Squares2X2Icon from "@heroicons/react/24/outline/Squares2X2Icon";
import UserIcon from "@heroicons/react/24/outline/UserIcon";
import UsersIcon from "@heroicons/react/24/outline/UsersIcon";
import ArrowLeftOnRectangleIcon from "@heroicons/react/24/outline/ArrowLeftOnRectangleIcon";
import PuzzlePieceIcon from "@heroicons/react/24/outline/PuzzlePieceIcon";
import ArrowsPointingInIcon from "@heroicons/react/24/outline/ArrowsPointingInIcon";
import DocumentChartBarIcon from "@heroicons/react/24/outline/DocumentChartBarIcon";
import { PaperClipIcon } from "@heroicons/react/24/outline";

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
        icon: DocumentChartBarIcon,
        name: "Reports",
        group: "reports",
        submenus: [
            {
                path: "/_/charts",
                icon: ChartBarIcon,
                name: "Charts",
                omit: true,
            },
            {
                path: "/_/integration",
                icon: BoltIcon,
                name: "Integration",
                omit: true,
            },
        ],
    },
    {
        path: "",
        icon: ArrowsPointingInIcon,
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
        path: "/rbac",
        icon: ArrowLeftOnRectangleIcon,
        name: "Users",
        group: "users",
        submenus: [
            {
                path: "/_/rbac/users",
                icon: UsersIcon,
                name: "Users List",
            },
            {
                path: "/_/rbac/roles",
                icon: CheckBadgeIcon,
                name: "Roles",
            },
            {
                path: "/_/rbac/permissions",
                icon: PuzzlePieceIcon,
                name: "Permissions",
            },
            {
                path: "/_/rbac/resources",
                icon: PaperClipIcon,
                name: "Resources",
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

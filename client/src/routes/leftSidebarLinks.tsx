/** Icons are imported separately to reduce build time */
import ArrowRightOnRectangleIcon from "@heroicons/react/24/outline/ArrowRightOnRectangleIcon";
import BoltIcon from "@heroicons/react/24/outline/BoltIcon";
import ChartBarIcon from "@heroicons/react/24/outline/ChartBarIcon";
import CodeBracketSquareIcon from "@heroicons/react/24/outline/CodeBracketSquareIcon";
import Cog6ToothIcon from "@heroicons/react/24/outline/Cog6ToothIcon";
import DocumentDuplicateIcon from "@heroicons/react/24/outline/DocumentDuplicateIcon";
import DocumentIcon from "@heroicons/react/24/outline/DocumentIcon";
import DocumentTextIcon from "@heroicons/react/24/outline/DocumentTextIcon";
import ExclamationTriangleIcon from "@heroicons/react/24/outline/ExclamationTriangleIcon";
import InboxArrowDownIcon from "@heroicons/react/24/outline/InboxArrowDownIcon";
import KeyIcon from "@heroicons/react/24/outline/KeyIcon";
import Squares2X2Icon from "@heroicons/react/24/outline/Squares2X2Icon";
import TableCellsIcon from "@heroicons/react/24/outline/TableCellsIcon";
import UserIcon from "@heroicons/react/24/outline/UserIcon";
import UsersIcon from "@heroicons/react/24/outline/UsersIcon";
import WalletIcon from "@heroicons/react/24/outline/WalletIcon";
import { ReactNode } from "react";
import { CogIcon, QueueListIcon } from "@heroicons/react/24/outline";

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
                path: "/app/customers/list",
                icon: <QueueListIcon className={submenuIconClasses} />,
                name: "Customers List",
            },
            {
                path: "/app/customers/setup",
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
        icon: <DocumentDuplicateIcon className={`${iconClasses} inline`} />, // icon component
        name: "Pages", // name that appear in Sidebar
        submenu: [
            {
                path: "/login",
                icon: (
                    <ArrowRightOnRectangleIcon className={submenuIconClasses} />
                ),
                name: "Login",
            },
            {
                path: "/register", //url
                icon: <UserIcon className={submenuIconClasses} />, // icon component
                name: "Register", // name that appear in Sidebar
            },
            {
                path: "/forgot-password",
                icon: <KeyIcon className={submenuIconClasses} />,
                name: "Forgot Password",
            },
            {
                path: "/app/blank",
                icon: <DocumentIcon className={submenuIconClasses} />,
                name: "Blank Page",
            },
            {
                path: "/app/404",
                icon: (
                    <ExclamationTriangleIcon className={submenuIconClasses} />
                ),
                name: "404",
            },
        ],
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
    {
        path: "", //no url needed as this has submenu
        icon: <DocumentTextIcon className={`${iconClasses} inline`} />, // icon component
        name: "Documentation", // name that appear in Sidebar
        submenu: [
            {
                path: "/app/getting-started", // url
                icon: <DocumentTextIcon className={submenuIconClasses} />, // icon component
                name: "Getting Started", // name that appear in Sidebar
            },
            {
                path: "/app/features",
                icon: <TableCellsIcon className={submenuIconClasses} />,
                name: "Features",
            },
            {
                path: "/app/components",
                icon: <CodeBracketSquareIcon className={submenuIconClasses} />,
                name: "Components",
            },
        ],
    },
];

export default leftSidebarLinks;

import { lazy } from "react";

const Dashboard = lazy(() => import("@pages/protected/Dashboard"));
const Welcome = lazy(() => import("@pages/protected/Welcome"));
const Page404 = lazy(() => import("@pages/protected/404"));
const Blank = lazy(() => import("@pages/protected/Blank"));
const Charts = lazy(() => import("@pages/protected/Charts"));
const Leads = lazy(() => import("@pages/protected/Leads"));
const Integration = lazy(() => import("@pages/protected/Integration"));
const Team = lazy(() => import("@pages/protected/Team"));
const Bills = lazy(() => import("@pages/protected/Bills"));
const ProfileSettings = lazy(() => import("@pages/protected/ProfileSettings"));
const GettingStarted = lazy(() => import("@pages/public/GettingStarted"));
const DocFeatures = lazy(() => import("@pages/public/DocFeatures"));
const DocComponents = lazy(() => import("@pages/public/DocComponents"));
const CustomerSetup = lazy(() => import("@pages/protected/CustomerSetup"));
const CustomerList = lazy(() => import("@pages/protected/CustomerList"));

const protectedRoutes = [
    {
        path: "/dashboard", // the url
        component: Dashboard, // view rendered
    },
    {
        path: "/customers.ts/setup",
        component: CustomerSetup,
    },
    {
        path: "/customers.ts/list",
        component: CustomerList,
    },
    {
        path: "/welcome", // the url
        component: Welcome, // view rendered
    },
    {
        path: "/leads",
        component: Leads,
    },
    {
        path: "/settings-team",
        component: Team,
    },
    {
        path: "/settings-profile",
        component: ProfileSettings,
    },
    {
        path: "/settings-billing",
        component: Bills,
    },
    {
        path: "/getting-started",
        component: GettingStarted,
    },
    {
        path: "/features",
        component: DocFeatures,
    },
    {
        path: "/components",
        component: DocComponents,
    },
    {
        path: "/integration",
        component: Integration,
    },
    {
        path: "/charts",
        component: Charts,
    },
    {
        path: "/404",
        component: Page404,
    },
    {
        path: "/blank",
        component: Blank,
    },
];

export default protectedRoutes;

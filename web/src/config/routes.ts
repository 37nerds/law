import { lazy } from "react";

import type { TRoute } from "@kinds/general";

const Login = lazy(() => import("@pages/guest/Login"));
const Register = lazy(() => import("@pages/guest/Register"));
const ForgotPassword = lazy(() => import("@pages/guest/ForgotPassword"));

/**
 * Configure routes for logout users
 */
export const guestRoutes: TRoute[] = [
    {
        path: "/login",
        component: Login,
    },
    {
        path: "/register",
        component: Register,
    },
    {
        path: "/forgot-password",
        component: ForgotPassword,
    },
];

const Dashboard = lazy(() => import("@pages/protected/Dashboard"));
const Welcome = lazy(() => import("@pages/protected/Welcome"));
const Charts = lazy(() => import("@pages/protected/Charts"));
const Leads = lazy(() => import("@pages/protected/Leads"));
const Integration = lazy(() => import("@pages/protected/Integration"));
const Team = lazy(() => import("@pages/protected/Team"));
const Bills = lazy(() => import("@pages/protected/Bills"));
const ProfileSettings = lazy(() => import("@pages/protected/Profile"));
const CustomerSetup = lazy(() => import("@pages/protected/CustomerSetup"));
const CustomerList = lazy(() => import("@pages/protected/CustomerList"));

/**
 * Configure protected routes for logged user
 *
 * The prefix of all protected routes is "/app/*"
 */
export const protectedRoutes: TRoute[] = [
    {
        path: "/welcome",
        component: Welcome,
    },
    {
        path: "/dashboard",
        component: Dashboard,
    },
    {
        path: "/keys.ts/setup",
        component: CustomerSetup,
    },
    {
        path: "/keys.ts/list",
        component: CustomerList,
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
        path: "/profile",
        component: ProfileSettings,
    },
    {
        path: "/settings-billing",
        component: Bills,
    },
    {
        path: "/integration",
        component: Integration,
    },
    {
        path: "/charts",
        component: Charts,
    },
];

/**
 * Configure public routes that can access anyone (logged user or logout user)
 */
export const publicRoutes: TRoute[] = [];

import { lazy } from "react";
import type { TRoute } from "@kinds/general";

/**
 * Configure routes for logout users
 */
export const guest_routes: TRoute[] = [
    {
        path: "/login",
        component: lazy(() => import("@pages/guest/Login")),
    },
    {
        path: "/register",
        component: lazy(() => import("@pages/guest/Register")),
    },
    {
        path: "/forgot-password",
        component: lazy(() => import("@pages/guest/ForgotPassword")),
    },
    {
        path: "/rest-password",
        component: lazy(() => import("@pages/guest/ResetPassword")),
    },
];

/**
 * Configure protected routes for logged user
 *
 * The prefix of all protected routes is "/_/*"
 */
export const protected_routes: TRoute[] = [
    {
        path: "/welcome",
        component: lazy(() => import("@pages/protected/Welcome")),
    },
    {
        path: "/dashboard",
        component: lazy(() => import("@pages/protected/Dashboard")),
    },
    {
        path: "/keys.ts/setup",
        component: lazy(() => import("@pages/protected/CustomerSetup")),
    },
    {
        path: "/keys.ts/list",
        component: lazy(() => import("@pages/protected/CustomerList")),
    },
    {
        path: "/leads",
        component: lazy(() => import("@pages/protected/Leads")),
    },
    {
        path: "/settings-team",
        component: lazy(() => import("@pages/protected/Team")),
    },
    {
        path: "/profile",
        component: lazy(() => import("@pages/protected/Profile")),
    },
    {
        path: "/settings-billing",
        component: lazy(() => import("@pages/protected/Bills")),
    },
    {
        path: "/integration",
        component: lazy(() => import("@pages/protected/Integration")),
    },
    {
        path: "/charts",
        component: lazy(() => import("@pages/protected/Charts")),
    },
];

/**
 * Configure public routes that can access anyone (logged user or logout user)
 */
export const public_routes: TRoute[] = [];
import { lazy } from "react";

import type { TGuestRoute } from "@kinds/general";

const Login = lazy(() => import("@pages/guest/Login"));
const Register = lazy(() => import("@pages/guest/Register"));
const ForgotPassword = lazy(() => import("@pages/guest/ForgotPassword"));

const guestRoutes: TGuestRoute[] = [
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

export default guestRoutes;

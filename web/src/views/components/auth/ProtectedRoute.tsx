import { lazy, ReactNode } from "react";
import { Navigate } from "react-router-dom";

import { isUserLoggedIn } from "@states/authStore";
import { guest_routes } from "@config/routes";
import { get_pathname } from "@helpers/location";

const Layout = lazy(() => import("@layout/Layout"));

/**
 * Logged user visit this route
 */
const ProtectedRoute = ({ children }: { children: ReactNode }) => {
    const pathname = get_pathname();
    const isGuest = guest_routes.find(route => route.path == pathname);

    return (
        <>{isUserLoggedIn() ? <Layout>{children}</Layout> : <Navigate to={isGuest ? "/_/xx" : pathname} replace />}</>
    );
};

export default ProtectedRoute;

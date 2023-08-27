import { lazy, ReactNode } from "react";
import { Navigate } from "react-router-dom";

import { isUserLoggedIn } from "@states/authStore";
import { guestRoutes } from "@config/routes";
import { getPathname } from "@helpers/location";

const Layout = lazy(() => import("@layout/Layout"));

/**
 * Logged user visit this route
 */
const ProtectedRoute = ({ children }: { children: ReactNode }) => {
    const pathname = getPathname();
    const isGuest = guestRoutes.find(route => route.path == pathname);

    return (
        <>{isUserLoggedIn() ? <Layout>{children}</Layout> : <Navigate to={isGuest ? "/app/xx" : pathname} replace />}</>
    );
};

export default ProtectedRoute;

import { lazy, ReactNode } from "react";
import { Navigate } from "react-router-dom";

import { isUserLoggedIn } from "@states/auth_store";

const Layout = lazy(() => import("../../layout/Layout"));

/**
 * Logged user visit this route
 */
const ProtectedRoute = ({ children }: { children: ReactNode }) => {
    return <>{isUserLoggedIn() ? <Layout>{children}</Layout> : <Navigate to="/login" replace />}</>;
};

export default ProtectedRoute;

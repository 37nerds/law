import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { isUserLoggedIn } from "@states/authStore";

/**
 * Logged user can't visit this route
 */
const GuestRoute = ({ children }: { children: ReactNode }) => {
    return <>{isUserLoggedIn() ? <Navigate to="/_/welcome" replace /> : children}</>;
};

export default GuestRoute;

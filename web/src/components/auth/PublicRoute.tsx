import type { ReactNode } from "react";

/**
 * Logged user or non logged user any one can visit this route
 */
const PublicRoute = ({ children }: { children: ReactNode }) => {
    return <>{children}</>;
};

export default PublicRoute;

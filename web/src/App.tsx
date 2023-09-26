import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { guest_routes, protected_routes, public_routes } from "@config/routes";
import { useLoggedUserFetch } from "@fetches/auth/auth";
import { getPathname, isGuestRoute, isPublicRoute, redirect } from "@helpers/location";

import Loading from "./components/pure/Loading";
import GuestRoute from "./components/auth/GuestRoute";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Page404 from "./pages/protected/Page404";

const App = () => {
    const pathname = getPathname();

    // if (!isValidRoute(pathname)) {
    //     redirect("/login");
    //     return <></>;
    // }

    const [isLoading, setIsLoading] = useState(true);

    const loggerUserFetch = useLoggedUserFetch();

    useEffect(() => {
        if (loggerUserFetch.isError) {
            setIsLoading(false);
        }
        if (loggerUserFetch.isError && !isGuestRoute(pathname) && !isPublicRoute(pathname)) {
            redirect("/login");
            return;
        }
    }, [loggerUserFetch.isError]);

    useEffect(() => {
        if (loggerUserFetch.isSuccess) {
            setIsLoading(false);
        }
    }, [loggerUserFetch.isSuccess]);

    return isLoading ? (
        <Loading />
    ) : (
        <BrowserRouter>
            <Routes>
                {guest_routes.map(({ path, component: Component }, index) => (
                    <Route
                        key={index}
                        path={path}
                        element={
                            <GuestRoute>
                                <Component />
                            </GuestRoute>
                        }
                    />
                ))}

                {public_routes.map(({ path, component: Component }, index) => (
                    <Route
                        key={index}
                        path={path}
                        element={
                            <GuestRoute>
                                <Component />
                            </GuestRoute>
                        }
                    />
                ))}

                {protected_routes.map(({ path, component: Component }, index) => (
                    <Route
                        key={index}
                        path={`/_${path}`}
                        element={
                            <ProtectedRoute>
                                <Component />
                            </ProtectedRoute>
                        }
                    />
                ))}

                <Route
                    path="*"
                    element={
                        <ProtectedRoute>
                            <Page404 />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
};

export default App;

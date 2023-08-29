import { BrowserRouter, Route, Routes } from "react-router-dom";
import { guest_routes, protected_routes, public_routes } from "@config/routes";
import { useLoggedUserFetch } from "@external/auth";
import { get_pathname, is_guest_route, is_public_route, is_valid_route, redirect } from "@helpers/location";

import Loading from "@components/pure/Loading";
import GuestRoute from "@components/auth/GuestRoute";
import ProtectedRoute from "@components/auth/ProtectedRoute";
import Page404 from "@pages/protected/Page404";
import { useEffect } from "react";

const App = () => {
    const loggerUserQuery = useLoggedUserFetch();
    const pathname = get_pathname();

    if (!is_valid_route(pathname)) {
        redirect("/login");
        return <></>;
    }

    useEffect(() => {
        if (loggerUserQuery.isError && !is_guest_route(pathname) && !is_public_route(pathname)) {
            redirect("/login");
            return;
        }
    }, [loggerUserQuery.isError]);

    if (loggerUserQuery.isLoading) {
        return <Loading />;
    }

    return (
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

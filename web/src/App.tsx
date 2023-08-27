import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { guestRoutes, protectedRoutes, publicRoutes } from "@config/routes";
import { useLoggedUserFetch } from "@external/auth";
import { getPathname, redirect } from "@helpers/location";

import Loading from "@components/pure/Loading";
import GuestRoute from "@components/auth/GuestRoute";
import ProtectedRoute from "@components/auth/ProtectedRoute";
import Page404 from "@pages/protected/Page404";

const App = () => {
    const loggerUserQuery = useLoggedUserFetch();
    const pathname = getPathname();
    const isGuestRoute = !!guestRoutes.find(route => pathname !== route.path);

    useEffect(() => {
        if (loggerUserQuery.isError && !isGuestRoute) {
            redirect("/login");
        }
    }, [loggerUserQuery.isError]);

    if (loggerUserQuery.isLoading) {
        return <Loading />;
    }

    return (
        <BrowserRouter>
            <Routes>
                {guestRoutes.map(({ path, component: Component }, index) => (
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

                {publicRoutes.map(({ path, component: Component }, index) => (
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

                {protectedRoutes.map(({ path, component: Component }, index) => (
                    <Route
                        key={index}
                        path={`/app${path}`}
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

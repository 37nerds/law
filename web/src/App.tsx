import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Loading from "@components/pure/Loading";
import GuestRoute from "@components/auth/GuestRoute";
import ProtectedRoute from "@components/auth/ProtectedRoute";
import Page404 from "@pages/protected/Page404";

import { guestRoutes, protectedRoutes, publicRoutes } from "@config/routes";
import { useFetchLoggedUserQuery } from "@external/auth";
import { getPathname, redirect } from "@helpers/browser";

const App = () => {
    const loggerUserQuery = useFetchLoggedUserQuery();

    useEffect(() => {
        if (loggerUserQuery.isError && getPathname() !== "/login") {
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

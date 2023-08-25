import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { guestRoutes, protectedRoutes, publicRoutes } from "@config/routes";
import log from "@helpers/log";

import Loading from "@components/pure/Loading";
import GuestRoute from "@components/auth/GuestRoute";
import ProtectedRoute from "@components/auth/ProtectedRoute";
import Page404 from "@pages/protected/Page404";
import { getLoggedUser } from "@external/auth";

const App = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    log.info(errorMessage);

    useEffect(() => {
        (async () => {
            setIsLoading(true);
            try {
                await getLoggedUser();
            } catch (e: any) {
                setErrorMessage(e?.message);
            }
            setIsLoading(false);
        })();
    }, []);

    if (isLoading) {
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

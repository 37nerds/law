import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { getLoggedUser } from "@external/auth";
import Log from "@helpers/Log";

import publicRoutes from "@routes/public";
import guestRoutes from "@routes/guest";
import protectedRoutes from "@routes/protected";

import Loading from "@components/pure/Loading";
import GuestRoute from "@components/auth/GuestRoute";
import ProtectedRoute from "@components/auth/ProtectedRoute";
import Page404 from "@pages/public/Page404";

const App = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    Log.info(errorMessage);

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
                {guestRoutes.map(({ path, component: Component }) => (
                    <Route
                        path={path}
                        element={
                            <GuestRoute>
                                <Component />
                            </GuestRoute>
                        }
                    />
                ))}

                {publicRoutes.map(({ path, component: Component }) => (
                    <Route
                        path={path}
                        element={
                            <GuestRoute>
                                <Component />
                            </GuestRoute>
                        }
                    />
                ))}

                {protectedRoutes.map(({ path, component: Component }) => (
                    <Route
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

import { lazy, useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { themeChange } from "theme-change";

import Loading from "@components/Loading";
import { loggedUser } from "@external/auth";

const Layout = lazy(() => import("@components/containers/Layout"));
const Login = lazy(() => import("@pages/public/Login"));
const ForgotPassword = lazy(() => import("@pages/public/ForgotPassword"));
const Register = lazy(() => import("@pages/public/Register"));
const Documentation = lazy(() => import("@pages/public/Documentation"));

function App() {
    useEffect(() => {
        // 👆 daisy UI themes initialization
        themeChange(false);
    }, []);

    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        (async () => {
            setIsLoading(true);
            try {
                await loggedUser();
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
                <Route path="/login" element={<Login />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/register" element={<Register />} />
                <Route path="/documentation" element={<Documentation />} />

                {/* Place new routes over this */}
                <Route path="/app/*" element={<Layout />} />

                <Route path="*" element={<Navigate to={errorMessage !== "" ? "/app/welcome" : "/login"} replace />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;

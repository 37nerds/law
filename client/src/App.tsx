import {lazy, useEffect} from "react";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {themeChange} from "theme-change";
import http from "@helpers/http";

// Importing pages
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

    const token = false;

    useEffect(() => {
        (async () => {
            const response2 = await http.get("/auth/logged-user");
            console.log(await response2.json());
        })();
    }, []);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/register" element={<Register />} />
                <Route path="/documentation" element={<Documentation />} />

                {/* Place new routes over this */}
                <Route path="/app/*" element={<Layout />} />

                <Route path="*" element={<Navigate to={token ? "/app/welcome" : "/login"} replace />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;

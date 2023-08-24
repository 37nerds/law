import { lazy, Suspense, useEffect, useRef } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import protectedRoutes from "@routes/protectedRoutes";
import Header from "./Header";
import SuspenseContent from "./SuspenseContent";
import useAppStore from "@states/useAppStore";
import useAuthStore from "@states/useAuthStore";

const Page404 = lazy(() => import("@pages/protected/404"));

function PageContent() {
    const mainContentRef = useRef<HTMLDivElement>(null);
    const { pageTitle } = useAppStore();

    // Scroll back to top on new page load
    useEffect(() => {
        mainContentRef.current?.scroll({
            top: 0,
            behavior: "smooth",
        });
    }, [pageTitle]);

    const { loggedUser } = useAuthStore();

    return (
        <div className="drawer-content flex flex-col " style={{ zIndex: 50 }}>
            <Header />
            <main className="flex-1 overflow-y-auto bg-base-200 px-4 pt-4" ref={mainContentRef}>
                <Suspense fallback={<SuspenseContent />}>
                    {loggedUser ? (
                        <Routes>
                            {protectedRoutes.map((route, key) => {
                                return <Route key={key} path={`${route.path}`} element={<route.component />} />;
                            })}

                            {/* Redirecting unknown url to 404 page */}
                            <Route path="*" element={<Page404 />} />
                        </Routes>
                    ) : (
                        <Navigate to={"/login"} replace />
                    )}
                </Suspense>
                <div className="h-16"></div>
            </main>
        </div>
    );
}

export default PageContent;

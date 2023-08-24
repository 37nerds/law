import { lazy } from "react";

import type { TPublicRoute } from "@kinds/general";

const Documentation = lazy(() => import("@pages/public/Documentation"));

const publicRoutes: TPublicRoute[] = [
    {
        path: "/documentation",
        component: Documentation,
    },
];
export default publicRoutes;

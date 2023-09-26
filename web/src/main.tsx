import { Suspense } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";

import "./index.css";

import Loading from "./components/pure/Loading";
import App from "./App";

const root = createRoot(document.getElementById("root") as HTMLElement);
const queryClient = new QueryClient();

root.render(
    <QueryClientProvider client={queryClient}>
        <Suspense fallback={<Loading />}>
            <App />
        </Suspense>
    </QueryClientProvider>
);

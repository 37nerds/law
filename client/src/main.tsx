import { Suspense } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";

import store from "./store";
import SuspenseContent from "@components/containers/SuspenseContent";
import App from "./App";
import "./index.css";

const root = createRoot(document.getElementById("root") as HTMLElement);
const queryClient = new QueryClient();

root.render(
    <QueryClientProvider client={queryClient}>
        <Suspense fallback={<SuspenseContent />}>
            <Provider store={store}>
                <App />
            </Provider>
        </Suspense>
    </QueryClientProvider>
);

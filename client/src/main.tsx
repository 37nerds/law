import store from "./store";
import SuspenseContent from "@containers/SuspenseContent";
import { Suspense } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import "./index.css";

const root = createRoot(document.getElementById("root") as HTMLElement);

root.render(
    // <StrictMode>
    <Suspense fallback={<SuspenseContent />}>
        <Provider store={store}>
            <App />
        </Provider>
    </Suspense>
    // </StrictMode>
);

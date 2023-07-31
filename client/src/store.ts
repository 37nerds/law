import { configureStore } from "@reduxjs/toolkit";

import headerSlice from "./screens/features/common/headerSlice";
import modalSlice from "./screens/features/common/modalSlice";
import rightDrawerSlice from "./screens/features/common/rightDrawerSlice";
import leadsSlice from "./screens/features/leads/leadSlice";
import customerSlice from "@states/customers/customerSlice";
import apiSlice from "@states/apiSlice";

const store = configureStore({
    reducer: {
        header: headerSlice,
        rightDrawer: rightDrawerSlice,
        modal: modalSlice,
        lead: leadsSlice,
        customers: customerSlice.reducer,
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(apiSlice.middleware),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

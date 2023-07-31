import { configureStore } from "@reduxjs/toolkit";

import headerSlice from "@states/app/headerSlice";
import modalSlice from "@states/app/modalSlice";
import leadsSlice from "@components/features/leads/leadSlice";
import customerSlice from "@states/customers/customerSlice";
import apiSlice from "@states/app/apiSlice";
import appSlice from "@states/app/appSlice";

const store = configureStore({
    reducer: {
        header: headerSlice,
        modal: modalSlice,
        lead: leadsSlice,
        customers: customerSlice.reducer,
        [apiSlice.reducerPath]: apiSlice.reducer,
        app: appSlice.reducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(apiSlice.middleware),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

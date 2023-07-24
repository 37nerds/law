import { configureStore } from "@reduxjs/toolkit";

import headerSlice from "@features/common/headerSlice";
import modalSlice from "@features/common/modalSlice";
import rightDrawerSlice from "@features/common/rightDrawerSlice";
import leadsSlice from "@features/leads/leadSlice";
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

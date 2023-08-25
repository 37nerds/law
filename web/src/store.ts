import { configureStore } from "@reduxjs/toolkit";

import modalSlice from "@states/app/modalSlice";
import leadsSlice from "@screens/leads/leadSlice";
import customerSlice from "@states/customers/customerSlice";
import apiSlice from "@states/app/apiSlice";

const store = configureStore({
    reducer: {
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

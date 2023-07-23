import { configureStore } from "@reduxjs/toolkit";

import headerSlice from "@features/common/headerSlice";
import modalSlice from "@features/common/modalSlice";
import rightDrawerSlice from "@features/common/rightDrawerSlice";
import leadsSlice from "@features/leads/leadSlice";
import customerSlice from "@states/customers/customerSlice";

const store = configureStore({
    reducer: {
        header: headerSlice,
        rightDrawer: rightDrawerSlice,
        modal: modalSlice,
        lead: leadsSlice,
        customers: customerSlice.reducer,
    },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

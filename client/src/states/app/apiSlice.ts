import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8000/api/v1",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
    }),
    endpoints: () => ({}),
    tagTypes: ["fetchCustomersPopUpData", "fetchCustomersList"],
});

export default apiSlice;

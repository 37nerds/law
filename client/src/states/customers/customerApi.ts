import apiSlice from "../apiSlice";
import { setPopUpData } from "@states/customers/customerSlice";

// noinspection JSUnusedGlobalSymbols
const customerApi = apiSlice.injectEndpoints({
    endpoints: builder => ({
        fetchCustomerList: builder.query({
            query: () => "/customers/list",
            // onQueryStarted: async (_, { queryFulfilled, dispatch }) => {
            //     const { data } = await queryFulfilled;
            //     dispatch(setPopUpData(data?.data));
            // },
            providesTags: ["fetchCustomersList"],
        }),
        fetchPopUpData: builder.query({
            query: () => "/customers/pop-up-data",
            onQueryStarted: async (_, { queryFulfilled, dispatch }) => {
                const { data } = await queryFulfilled;
                dispatch(setPopUpData(data?.data));
            },
            providesTags: ["fetchCustomersPopUpData"],
        }),
        createGroupOfCompany: builder.mutation({
            query: groupOfCompany => ({
                url: "/customers/group-of-companies",
                method: "POST",
                body: groupOfCompany,
            }),
            invalidatesTags: ["fetchCustomersPopUpData"],
        }),
        createCompany: builder.mutation({
            query: company => ({
                url: "/customers/companies",
                method: "POST",
                body: company,
            }),
            invalidatesTags: ["fetchCustomersPopUpData"],
        }),
        createUnit: builder.mutation({
            query: units => ({
                url: "/customers/units",
                method: "POST",
                body: units,
            }),
            invalidatesTags: ["fetchCustomersPopUpData"],
        }),
        createClient: builder.mutation({
            query: units => ({
                url: "/customers/clients",
                method: "POST",
                body: units,
            }),
            invalidatesTags: ["fetchCustomersPopUpData", "fetchCustomersList"],
        }),
    }),
});

export const {
    useFetchCustomerListQuery,
    useFetchPopUpDataQuery,
    useCreateGroupOfCompanyMutation,
    useCreateCompanyMutation,
    useCreateUnitMutation,
    useCreateClientMutation,
} = customerApi;

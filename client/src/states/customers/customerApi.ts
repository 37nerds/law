import apiSlice from "../app/apiSlice";
import { setClientField, setPopUpData } from "@states/customers/customerSlice";

// noinspection JSUnusedGlobalSymbols
const customerApi = apiSlice.injectEndpoints({
    endpoints: builder => ({
        fetchCustomerList: builder.query({
            query: ({ page = 1 }) =>
                `/customers/clients?per_page=6&page=${page}`,
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
            query: unit => ({
                url: "/customers/units",
                method: "POST",
                body: unit,
            }),
            invalidatesTags: ["fetchCustomersPopUpData"],
        }),
        createClient: builder.mutation({
            query: client => ({
                url: "/customers/clients",
                method: "POST",
                body: client,
            }),
            invalidatesTags: ["fetchCustomersPopUpData", "fetchCustomersList"],
        }),
        deleteClient: builder.mutation({
            query: id => ({
                url: `/customers/clients/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["fetchCustomersList"],
        }),
        fetchClient: builder.query({
            query: (id: number) => ({
                url: `/customers/clients/${id}`,
                method: "GET",
            }),
            onQueryStarted: async (_, { queryFulfilled, dispatch }) => {
                const { data } = await queryFulfilled;
                dispatch(setClientField({ key: "data", value: data?.data }));
            },
        }),
        updateClient: builder.mutation({
            query: ({ id, client }) => ({
                url: `/customers/clients/${id}`,
                method: "PATCH",
                body: client,
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
    useDeleteClientMutation,
    useFetchClientQuery,
    useUpdateClientMutation,
} = customerApi;

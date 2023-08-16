import apiSlice from "../app/apiSlice";
import { setClientField, setUnitField } from "@states/customers/customerSlice";

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
        fetchUnit: builder.query({
            query: (id: number) => ({
                url: `/customers/units/${id}`,
                method: "GET",
            }),
            onQueryStarted: async (_, { queryFulfilled, dispatch }) => {
                const { data } = await queryFulfilled;
                dispatch(setUnitField({ key: "data", value: data?.data }));
            },
        }),
        updateUnit: builder.mutation({
            query: ({ id, unit }) => ({
                url: `/customers/clients/${id}`,
                method: "PATCH",
                body: unit,
            }),
            invalidatesTags: ["fetchCustomersPopUpData", "fetchCustomersList"],
        }),
    }),
});

export const {
    useFetchCustomerListQuery,
    useDeleteClientMutation,
    useFetchClientQuery,
    useUpdateClientMutation,
    useFetchUnitQuery,
    useUpdateUnitMutation,
} = customerApi;

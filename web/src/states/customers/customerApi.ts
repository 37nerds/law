import apiSlice from "../app/apiSlice";
import { setClientField, setUnitField } from "@states/customers/customerSlice";

const customerApi = apiSlice.injectEndpoints({
    endpoints: builder => ({
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
    useDeleteClientMutation,
    useFetchClientQuery,
    useUpdateClientMutation,
    useFetchUnitQuery,
    useUpdateUnitMutation,
} = customerApi;

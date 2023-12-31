import type { TClient, TCompany, TGroupOfCompany, TPopOfData, TUnit, TUpdateClient } from "../customers/customers_type";

import type { TError, TPaginate } from "@helpers/types";

import { notify } from "@helpers/notify";
import { useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";

import http from "@helpers/http";
import useCustomerListStore from "@states/customer_list_store";
import useCustomerSetupStore from "@states/customer_setup_store";

export const CUSTOMERS__POP_UP_DATA__GET = "get.customers.pop-up-data";
export const CUSTOMERS__GROUP_OF_COMPANIES__POST = "post.customers.group-of-companies";
export const CUSTOMERS__COMPANIES__POST = "post.customers.companies";
export const CUSTOMERS__UNITS__POST = "post.customers.units";
export const CUSTOMERS__CLIENTS__POST = "post.customers.clients";
export const CUSTOMERS__CLIENTS__GET = "get.customers.clients_xxx";
export const CUSTOMERS__CLIENT__GET = "get.customer.client";
export const CUSTOMERS__CLIENT__PATCH = "patch.customer.client";
export const CUSTOMERS__CLIENT__DELETE = "delete.customer.client";
export const CUSTOMERS__UNIT__GET = "get.customer.unit";
export const CUSTOMERS__UNIT__PATCH = "patch.customer.unit";

export const useFetchPopUpDataQuery = () => {
    const fetchPopUpDataQuery = useQuery<TPopOfData, TError>({
        queryFn: async () => {
            return (await http.get("/customers/pop-up-data", 200)) as TPopOfData;
        },
        queryKey: [CUSTOMERS__POP_UP_DATA__GET],
    });

    const { setPopUpData } = useCustomerSetupStore();

    useEffect(() => {
        if (fetchPopUpDataQuery.isSuccess) {
            setPopUpData(fetchPopUpDataQuery.data);
        }
    }, [fetchPopUpDataQuery]);

    return fetchPopUpDataQuery;
};

export const useSaveGroupOfCompanyMutation = () => {
    const queryClient = useQueryClient();

    return useMutation<TGroupOfCompany, TError, TGroupOfCompany>({
        mutationFn: async (groupOfCompany: TGroupOfCompany) => {
            return (await http.post("/customers/group-of-companies", groupOfCompany, 201)) as TGroupOfCompany;
        },
        mutationKey: [CUSTOMERS__GROUP_OF_COMPANIES__POST],
        onSuccess: () => {
            return queryClient.invalidateQueries(CUSTOMERS__POP_UP_DATA__GET);
        },
    });
};

export const useSaveCompanyMutation = () => {
    const queryClient = useQueryClient();

    return useMutation<TCompany, TError, TCompany>({
        mutationFn: async (company: TCompany) => {
            return (await http.post("/customers/companies", company, 201)) as TCompany;
        },
        mutationKey: [CUSTOMERS__COMPANIES__POST],
        onSuccess: () => {
            return queryClient.invalidateQueries("fetchPopUpData");
        },
    });
};

export const useSaveUnitMutation = () => {
    const queryClient = useQueryClient();

    return useMutation<TUnit, TError, TUnit>({
        mutationFn: async (unit: TUnit) => {
            return (await http.post("/customers/units", unit, 201)) as TUnit;
        },
        mutationKey: [CUSTOMERS__UNITS__POST],
        onSuccess: () => {
            return queryClient.invalidateQueries(CUSTOMERS__POP_UP_DATA__GET);
        },
    });
};

export const useSaveClientMutation = () => {
    const queryClient = useQueryClient();

    return useMutation<TClient, TError, TClient>({
        mutationFn: async (client: TClient) => {
            return (await http.post("/customers/clients", client, 201)) as TClient;
        },
        mutationKey: [CUSTOMERS__CLIENTS__POST],
        onSuccess: () => {
            return queryClient.invalidateQueries([CUSTOMERS__POP_UP_DATA__GET, CUSTOMERS__CLIENTS__GET]);
        },
    });
};

export const useClientsQuery = () => {
    const { clientsFilters } = useCustomerListStore();

    return useQuery<TPaginate<TClient>, TError>({
        queryFn: async () => {
            return await http.get(
                `/customers/clients?per_page=10` + `&page=${clientsFilters.page}` + `&status=${clientsFilters.status}`,
                200
            );
        },
        queryKey: [CUSTOMERS__CLIENTS__GET, clientsFilters.page, clientsFilters.status],
        keepPreviousData: true,
    });
};

export const useClientQuery = (id: number) => {
    const { setClient } = useCustomerListStore();

    const query = useQuery<TClient, TError>({
        queryFn: async () => {
            return await http.get(`/customers/clients/${id}`, 200);
        },
        queryKey: [CUSTOMERS__CLIENT__GET, id],
    });

    useEffect(() => {
        if (query.isError) {
            notify("error", query.error?.message);
        }

        if (query.isSuccess) {
            setClient(query.data);
        }
    }, [query.isError, query.isSuccess]);

    return query;
};

export const useUpdateClientMutation = () => {
    const queryClient = useQueryClient();
    const { setClient } = useCustomerListStore();

    const query = useMutation<TClient, TError, TUpdateClient | TClient>({
        mutationFn: async client => {
            return await http.patch(`/customers/clients/${client.id}`, client, 200);
        },
        mutationKey: [CUSTOMERS__CLIENT__PATCH],
        onSuccess: () => {
            queryClient.invalidateQueries(CUSTOMERS__CLIENTS__GET).then(() => {});
            queryClient.invalidateQueries(CUSTOMERS__POP_UP_DATA__GET).then(() => {});
        },
    });

    useEffect(() => {
        if (query.isError) {
            notify("error", query.error?.message);
        }

        if (query.isSuccess) {
            setClient(query.data);
        }
    }, [query.isError, query.isSuccess]);

    return query;
};

export const useDeleteClientMutation = () => {
    const queryClient = useQueryClient();

    const query = useMutation<any, TError, string>({
        mutationFn: async id => {
            return await http.delete(`/customers/clients/?id=${id}`, 204);
        },
        mutationKey: [CUSTOMERS__CLIENT__DELETE],
        onSuccess: () => {
            queryClient.invalidateQueries(CUSTOMERS__CLIENTS__GET).then(() => {});
            queryClient.invalidateQueries(CUSTOMERS__POP_UP_DATA__GET).then(() => {});
        },
    });

    useEffect(() => {
        if (query.isError) {
            notify("error", query.error?.message);
        }
    }, [query.isError]);

    return query;
};

export const useUnitQuery = (id: number) => {
    const { setUnit } = useCustomerListStore();

    const query = useQuery<TUnit, TError>({
        queryFn: async () => {
            return await http.get(`/customers/units/${id}`, 200);
        },
        queryKey: [CUSTOMERS__UNIT__GET, id],
    });

    useEffect(() => {
        if (query.isError) {
            notify("error", query.error?.message);
        }

        if (query.isSuccess) {
            setUnit(query.data);
        }
    }, [query.isError, query.isSuccess]);

    return query;
};

export const useUpdateUnitMutation = () => {
    const queryClient = useQueryClient();
    const { setUnit } = useCustomerListStore();

    const query = useMutation<TUnit, TError, TUnit>({
        mutationFn: async unit => {
            return await http.patch(`/customers/units/${unit.id}`, unit, 200);
        },
        mutationKey: [CUSTOMERS__UNIT__PATCH],
        onSuccess: () => {
            queryClient.invalidateQueries(CUSTOMERS__CLIENTS__GET).then(() => {});
            queryClient.invalidateQueries(CUSTOMERS__POP_UP_DATA__GET).then(() => {});
        },
    });

    useEffect(() => {
        if (query.isError) {
            notify("error", query.error?.message);
        }

        if (query.isSuccess) {
            setUnit(query.data);
        }
    }, [query.isError, query.isSuccess]);

    return query;
};

import {
    CUSTOMERS__CLIENT__DELETE,
    CUSTOMERS__CLIENT__GET,
    CUSTOMERS__CLIENT__PATCH,
    CUSTOMERS__CLIENTS__GET,
    CUSTOMERS__CLIENTS__POST,
    CUSTOMERS__COMPANIES__POST,
    CUSTOMERS__GROUP_OF_COMPANIES__POST,
    CUSTOMERS__POP_UP_DATA__GET,
    CUSTOMERS__UNIT__GET,
    CUSTOMERS__UNIT__PATCH,
    CUSTOMERS__UNITS__POST,
} from "@constants/keys";

import { TClient, TCompany, TGroupOfCompany, TPopOfData, TUnit, TUpdateClient } from "@kinds/customers";
import { TError } from "@kinds/general";
import { useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { notify } from "@helpers/unknown";

import useCustomerSetupStore from "@states/customerSetupStore";
import useCustomerListStore from "@states/customerListStore";
import http from "@facades/http";

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

    return useQuery<any, TError>({
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
            return await http.delete(`/customers/clients/${id}`, 204);
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

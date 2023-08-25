import { useEffect } from "react";

import http from "@helpers/http";
import useCustomerSetupStore from "@states/customerSetupStore";

import { TClient, TCompany, TGroupOfCompany, TPopOfData, TUnit } from "@kinds/customers";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { TError } from "@kinds/general";

import {
    CUSTOMERS__CLIENTS__POST,
    CUSTOMERS__COMPANIES__POST,
    CUSTOMERS__GROUP_OF_COMPANIES__POST,
    CUSTOMERS__POP_UP_DATA__GET,
    CUSTOMERS__UNITS__POST,
} from "@config/keys";

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
        mutationKey: CUSTOMERS__GROUP_OF_COMPANIES__POST,
        onSuccess: () => {
            return queryClient.invalidateQueries("fetchPopUpData");
        },
    });
};

export const useSaveCompanyMutation = () => {
    const queryClient = useQueryClient();

    return useMutation<TCompany, TError, TCompany>({
        mutationFn: async (company: TCompany) => {
            return (await http.post("/customers/companies", company, 201)) as TCompany;
        },
        mutationKey: CUSTOMERS__COMPANIES__POST,
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
        mutationKey: CUSTOMERS__UNITS__POST,
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
        mutationKey: CUSTOMERS__CLIENTS__POST,
        onSuccess: () => {
            return queryClient.invalidateQueries(CUSTOMERS__POP_UP_DATA__GET);
        },
    });
};

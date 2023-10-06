import http from "@helpers/http";
import { TError } from "@helpers/types";
import useMutationErrorMessage from "@hooks/useMutationErrorMessage";
import useMutationSuccessMessage from "@hooks/useMutationSuccessMessage";
import useQueryErrorMessage from "@hooks/useQueryErrorMessage";
import { useMutation, useQuery, useQueryClient } from "react-query";

export type THost = {
    id: string;

    created_at: string;
    updated_at: string;

    name: string;
    address: string;
    telephone: string;
    mobile: string;
    email: string;
    website: string;
    trade_licence_no: string;
    tin: string;
    bin: string;
    professional_licence_no: string;
    membership_no: string;
    financial_year_start: string;
    currency_symbol: string;
    tds_rate: number;
    vds_rate: number;
    payment_terms: string;
    declaration: string;
    salutation: string;
};

export const SETTINGS_HOST__GET = "get.settings-host";
export const SETTINGS_HOST__PATCH = "patch.settings-host";

export const useHostQuery = () => {
    const q = useQuery<THost, TError>({
        queryFn: () => http.get("/settings/hosts", 200),
        queryKey: [SETTINGS_HOST__GET],
    });
    useQueryErrorMessage(q);
    return q;
};

export const useUpdateHostMutation = () => {
    const c = useQueryClient();
    const m = useMutation<THost, TError, THost>({
        mutationFn: host => http.patch(`/settings/hosts`, host, 200),
        mutationKey: [SETTINGS_HOST__PATCH],
        onSuccess: () => c.invalidateQueries([SETTINGS_HOST__GET]).then(),
    });
    useMutationErrorMessage(m);
    useMutationSuccessMessage(m, `Global settings updated`);
    return m;
};

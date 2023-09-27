import type { TBase } from "@helpers/types";
import { useQuery } from "react-query";
import { TError } from "@helpers/types";
import { useEffect } from "react";
import { notify } from "@helpers/notify";

import http from "@helpers/http";

export type TResource = TBase & {
    api: string;
    web: string[];
    method: string;
    label: string;
    group: string;
};

const RBAC__RESOURCES_GET = "get.rbac-resources";

export const useResourcesQuery = () => {
    const query = useQuery<TResource[], TError>({
        queryFn: async () => {
            return await http.get("/rbac/resources", 200);
        },
        queryKey: [RBAC__RESOURCES_GET],
    });

    useEffect(() => {
        if (query.isError) {
            notify("error", query.error?.message);
        }
    }, [query.isError]);

    return query;
};

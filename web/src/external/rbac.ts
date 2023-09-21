import { notify } from "@helpers/unknown";
import { TError, TPaginate } from "@kinds/general";
import { useEffect } from "react";
import { useQuery } from "react-query";
import { TUser } from "@kinds/users";

import http from "@facades/http";
import useUsersStore from "@states/rbacStore";


export const useUsersQuery = () => {
    const { userFilters } = useUsersStore();

    const query = useQuery<TPaginate<TUser>, TError>({
        queryFn: async () => {
            return await http.get(`/rbac/users?per_page=10` + `&page=${userFilters.page}`, 200);
        },
        queryKey: ["users", userFilters.page],
        keepPreviousData: true,
    });

    useEffect(() => {
        if (query.isError) {
            notify("error", query.error?.message);
        }
    }, [query.isError]);

    return query;
};

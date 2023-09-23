import { notify } from "@helpers/unknown";
import { TError, TPaginate } from "@kinds/general";
import { TRole, TUser } from "@kinds/users";
import { useEffect } from "react";
import { useQuery } from "react-query";

import { RBAC_ROLES_GET, RBAC_USERS_GET } from "@constants/keys";
import http from "@facades/http";
import useUsersStore from "@states/rbacStore";

export const useUsersQuery = () => {
    const { userFilters } = useUsersStore();

    const query = useQuery<TPaginate<TUser>, TError>({
        queryFn: async () => {
            return await http.get(`/rbac/users?per_page=10` + `&page=${userFilters.page}`, 200);
        },
        queryKey: [RBAC_USERS_GET, userFilters.page],
        keepPreviousData: true,
    });

    useEffect(() => {
        if (query.isError) {
            notify("error", query.error?.message);
        }
    }, [query.isError]);

    return query;
};

// Query for roles
export const useRolesQuery = () => {
    const { rolesFilters } = useUsersStore();

    const query = useQuery<TPaginate<TRole>, TError>({
        queryFn: async () => {
            return await http.get(`/rbac/roles?per_page=10` + `&page=${rolesFilters.page}`, 200);
        },
        queryKey: [RBAC_ROLES_GET, rolesFilters.page],
        keepPreviousData: true,
    });

    useEffect(() => {
        if (query.isError) {
            notify("error", query.error?.message);
        }
    }, [query.isError]);

    return query;
};

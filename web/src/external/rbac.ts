import http from "@facades/http";
import { notify } from "@helpers/unknown";
import { TError } from "@kinds/general";
import useUsersStore from "@states/rbacStore";
import { useEffect } from "react";
import { useQuery } from "react-query";

export const useUsersQuery = () => {
    const { userFilters } = useUsersStore();

    const query = useQuery<any, TError>({
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

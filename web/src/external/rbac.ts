import { notify } from "@helpers/unknown";
import { TError, TPaginate } from "@kinds/general";
import { TCreateUser, TRole, TUser } from "@kinds/users";
import { useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { RBAC_ROLES_GET, RBAC_USER_GET, RBAC_USERS_GET, RBAC_USERS_POST } from "@constants/keys";

import http from "@facades/http";
import useRbacStore from "@states/rbacStore";
import useUsersStore from "@states/usersStore";

export const useUsersQuery = () => {
    const {
        filters: { page },
    } = useUsersStore();

    const query = useQuery<TPaginate<TUser>, TError>({
        queryFn: async () => {
            return await http.get(`/rbac/users?per_page=10` + `&page=${page}`, 200);
        },
        queryKey: [RBAC_USERS_GET, page],
        keepPreviousData: true,
    });

    useEffect(() => {
        if (query.isError) {
            notify("error", query.error?.message);
        }
    }, [query.isError]);

    return query;
};

export const useSaveUserMutation = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation<TUser, TError, TCreateUser>({
        mutationFn: async user => {
            return await http.post("/rbac/users", { ...user, password_confirmation: user.password }, 201);
        },
        mutationKey: [RBAC_USERS_POST],
        onSuccess: () => {
            return queryClient.invalidateQueries(RBAC_USERS_GET);
        },
    });

    useEffect(() => {
        if (mutation.isError) {
            notify("error", mutation.error?.message);
        }
    }, [mutation.isError]);

    useEffect(() => {
        if (mutation.isSuccess) {
            notify("success", `New user created: ${mutation?.data?.username}`);
        }
    }, [mutation.isSuccess]);

    return mutation;
};

export const useUserQuery = (userId: string) => {
    const { setEditUser } = useUsersStore();

    const query = useQuery<TUser, TError>({
        queryFn: async () => {
            return await http.get(`/rbac/users?id=${userId}`, 200);
        },
        queryKey: [RBAC_USER_GET, userId],
    });

    useEffect(() => {
        if (query.isError) {
            notify("error", query.error?.message);
        }

        if (query.isSuccess) {
            setEditUser({
                username: query.data.username,
                address: query.data.address,
                email: query.data.email,
                name: query.data.name,
                phone: query.data.phone,
                role_id: query.data.role_id,
            });
        }
    }, [query.isSuccess, query.isError]);

    return query;
};

export const useRolesQuery = () => {
    const { rolesFilters } = useRbacStore();

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

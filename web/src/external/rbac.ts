import {
    RBAC_ROLES_GET,
    RBAC_USERS_GET,
    RBAC_USERS_POST,
    RBAC_USER_DELETE,
    RBAC_USER_GET,
    RBAC_USER_PATCH,
} from "@constants/keys";
import { notify } from "@helpers/unknown";
import { TError, TPaginate } from "@kinds/general";
import { TCreateUser, TEditUser, TRole, TUser } from "@kinds/users";
import { useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";

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

        if (mutation.isSuccess) {
            notify("success", `New user created: ${mutation?.data?.username}`);
        }
    }, [mutation.isError, mutation.isSuccess]);

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

export const useEditUserMutation = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation<TUser, TError, TEditUser>({
        mutationFn: async user => {
            return await http.patch(`/rbac/users?id=${user.id}`, user, 200);
        },
        mutationKey: [RBAC_USER_PATCH],
        onSuccess: () => {
            return queryClient.invalidateQueries(RBAC_USERS_GET);
        },
    });

    useEffect(() => {
        if (mutation.isError) {
            notify("error", mutation.error?.message);
        }

        if (mutation.isSuccess) {
            notify("success", `user updated: ${mutation?.data?.username}`);
        }
    }, [mutation.isError, mutation.isSuccess]);

    return mutation;
};

export const useDeleteUserMutation = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation<TUser, TError, string>({
        mutationFn: async id => {
            return await http.delete(`/rbac/users?id=${id}`, 204);
        },
        mutationKey: [RBAC_USER_DELETE],
        onSuccess: () => {
            return queryClient.invalidateQueries(RBAC_USERS_GET);
        },
    });

    useEffect(() => {
        if (mutation.isError) {
            notify("error", mutation.error?.message);
        }

        if (mutation.isSuccess) {
            notify("success", `User deleted successfully.`);
        }
    }, [mutation.isError, mutation.isSuccess]);

    return mutation;
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

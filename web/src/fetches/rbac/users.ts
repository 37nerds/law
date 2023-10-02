import type { TRole } from "@fetches/rbac/roles";
import type { TBase, TError, TPaginate } from "@helpers/types";

import { notify } from "@helpers/notify";
import { useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";

import http from "@helpers/http";
import useUsersStore from "@states/users_store";

export const RBAC__USERS__GET = "get.users";
export const RBAC__USERS__POST = "post.users";
export const RBAC__USER__GET = "get.user";
export const RBAC_USER_PATCH = "patch.user";
export const RBAC_USER_DELETE = "delete.user";

export type TUser = TBase & {
    name: string;
    email: string;
    username: string;
    avatar: string | null;
    email_verified_at: string | null;
    role_id: string;
    role: TRole;
    address: string;
    phone: string;
};

export type TCreateUser = {
    name: string;
    email: string;
    username: string;
    role_id: string;
    address: string;
    phone: string;
    password: string;
};

export type TEditUser = {
    id?: string;
    name: string;
    email: string;
    username: string;
    role_id: string;
    address: string;
    phone: string;
};

export type TUserColumn = "name" | "email" | "username" | "created_at" | "phone" | "address";

export const useUsersQuery = () => {
    const { searchQuery, page, sortColumn, sortOrder, filterRoleId } = useUsersStore(state => state.filters);

    const query = useQuery<TPaginate<TUser>, TError>({
        queryFn: async () => {
            let url = `/rbac/users?paginated=true&per_page=10&page=${page}&sort_column=${sortColumn}&sort_order=${sortOrder}`;
            if (filterRoleId.trim() !== "") {
                url += `&filter_role_id=${filterRoleId}`;
            }
            if (searchQuery.trim() !== "") {
                url += `&search=${encodeURIComponent(searchQuery.trim())}`;
            }
            return await http.get(url, 200);
        },
        queryKey: [RBAC__USERS__GET, page, searchQuery, sortColumn, sortOrder, filterRoleId],
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
        mutationKey: [RBAC__USERS__POST],
        onSuccess: () => {
            return queryClient.invalidateQueries(RBAC__USERS__GET);
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
            return !userId ? Promise.resolve({}) : await http.get(`/rbac/users?id=${userId}`, 200);
        },
        queryKey: [RBAC__USER__GET, userId],
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
    }, [query.isSuccess, query.isError, query.data]);

    return query;
};

export const useEditUserMutation = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation<TUser, TError, TEditUser>({
        mutationFn: async user => {
            return await http.patch(`/rbac/users?id=${user.id}`, user, 200);
        },
        mutationKey: [RBAC_USER_PATCH],
        onSuccess: user => {
            queryClient.invalidateQueries([RBAC__USER__GET, user.id]).then();
            queryClient.invalidateQueries(RBAC__USERS__GET).then();
        },
    });

    useEffect(() => {
        if (mutation.isError) {
            notify("error", mutation.error?.message);
        }

        if (mutation.isSuccess) {
            notify("success", `User updated: ${mutation?.data?.username}`);
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
            return queryClient.invalidateQueries(RBAC__USERS__GET);
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

import type { TRole } from "@fetches/rbac/roles";
import type { TBase, TError, TPaginate } from "@helpers/types";

import { useMutation, useQuery, useQueryClient } from "react-query";

import http from "@helpers/http";
import useUsersStore from "@states/users_store";
import useQueryErrorMessage from "@hooks/useQueryErrorMessage";
import useMutationErrorMessage from "@hooks/useMutationErrorMessage";
import useMutationSuccessMessage from "@hooks/useMutationSuccessMessage";

export const RBAC_USERS__GET = "get.rbac-users";
export const RBAC_USERS__POST = "post.rbac-users";
export const RBAC_USER__GET = "get.rbac-user";
export const RBAC_USER_PATCH = "patch.rbac-user";
export const RBAC_USER_DELETE = "delete.rbac-user";

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

export const useUsersPaginatedQuery = () => {
    const { searchQuery, page, sortColumn, sortOrder, filterRoleId } = useUsersStore(state => state.filters);
    const q = useQuery<TPaginate<TUser>, TError>({
        queryFn: () => {
            let url =
                `/rbac/users` +
                `?per_page=10&page=${page}` +
                `&sort_column=${sortColumn}` +
                `&sort_order=${sortOrder}` +
                `&paginated=true`;
            if (filterRoleId.trim() !== "") {
                url += `&filter_role_id=${filterRoleId}`;
            }
            if (searchQuery.trim() !== "") {
                url += `&search=${encodeURIComponent(searchQuery.trim())}`;
            }
            return http.get(url, 200);
        },
        queryKey: [RBAC_USERS__GET, page, searchQuery, sortColumn, sortOrder, filterRoleId],
        retry: false,
    });
    useQueryErrorMessage(q);
    return q;
};

export const useUserQuery = (userId: string) => {
    const q = useQuery<TUser, TError>({
        queryFn: () => (!userId ? Promise.resolve({}) : http.get(`/rbac/users?id=${userId}`, 200)),
        queryKey: [RBAC_USER__GET, userId],
    });
    useQueryErrorMessage(q);
    return q;
};

export const useUserSaveMutation = () => {
    const c = useQueryClient();
    const m = useMutation<TUser, TError, TCreateUser>({
        mutationFn: user => http.post("/rbac/users", { ...user, password_confirmation: user.password }, 201),
        mutationKey: [RBAC_USERS__POST],
        onSuccess: () => c.invalidateQueries(RBAC_USERS__GET).then(),
    });
    useMutationErrorMessage(m);
    useMutationSuccessMessage(m, `New user created: ${m?.data?.username}`);
    return m;
};

export const useUserEditMutation = () => {
    const c = useQueryClient();
    const m = useMutation<TUser, TError, TEditUser>({
        mutationFn: async user => {
            return await http.patch(`/rbac/users?id=${user.id}`, user, 200);
        },
        mutationKey: [RBAC_USER_PATCH],
        onSuccess: user => {
            c.invalidateQueries([RBAC_USER__GET, user.id]).then();
            c.invalidateQueries(RBAC_USERS__GET).then();
        },
    });
    useMutationErrorMessage(m);
    useMutationSuccessMessage(m, `User updated: ${m?.data?.username}`);
    return m;
};

export const useUserDeleteMutation = () => {
    const c = useQueryClient();
    const m = useMutation<TUser, TError, string>({
        mutationFn: userId => http.delete(`/rbac/users?id=${userId}`, 204),
        mutationKey: [RBAC_USER_DELETE],
        onSuccess: () => c.invalidateQueries(RBAC_USERS__GET).then(),
    });
    useMutationErrorMessage(m);
    useMutationSuccessMessage(m, `User deleted successfully.`);
    return m;
};

import type { TBase, TError, TPaginate, TQueries } from "@helpers/types";
import type { TRole } from "@queries/rbac/roles";

import { useMutation, useQuery, useQueryClient } from "react-query";

import http from "@helpers/http";
import useMutationErrorMessage from "@hooks/useMutationErrorMessage";
import useMutationSuccessMessage from "@hooks/useMutationSuccessMessage";
import useQueryErrorMessage from "@hooks/useQueryErrorMessage";
import useUsersStore from "@states/users_store";

export const RBAC_USERS__PAGINATED_GET = "get.paginated.rbac-users";
export const RBAC_USERS__POST = "post.rbac-users";
export const RBAC_USER__GET = "get.rbac-user";
export const RBAC_USER__PATCH = "patch.rbac-user";
export const RBAC_USER__DELETE = "delete.rbac-user";
export const RBAC_USERS__DELETE = "delete.rbac-users";

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
            const queries: TQueries = {
                per_page: 11,
                page: page,
                sort_column: sortColumn,
                sort_order: sortOrder,
                paginated: true,
            };
            if (filterRoleId.trim() !== "") {
                queries["filter_role_id"] = filterRoleId;
            }
            if (searchQuery.trim() !== "") {
                queries["search"] = encodeURIComponent(searchQuery.trim());
            }
            return http.get_q("/rbac/users", queries, 200);
        },
        queryKey: [RBAC_USERS__PAGINATED_GET, page, searchQuery, sortColumn, sortOrder, filterRoleId],
        retry: false,
    });
    useQueryErrorMessage(q);
    return q;
};

export const useUserQuery = (userId: string) => {
    const q = useQuery<TUser, TError>({
        queryFn: () => (!userId ? Promise.resolve({}) : http.get_q(`/rbac/users`, { id: userId }, 200)),
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
        onSuccess: () => c.invalidateQueries(RBAC_USERS__PAGINATED_GET).then(),
    });
    useMutationErrorMessage(m);
    useMutationSuccessMessage(m, `New user created: ${m?.data?.username}`);
    return m;
};

export const useUserEditMutation = () => {
    const c = useQueryClient();
    const m = useMutation<TUser, TError, TEditUser>({
        mutationFn: user => http.patch_q(`/rbac/users`, { id: user.id }, user, 200),
        mutationKey: [RBAC_USER__PATCH],
        onSuccess: user => {
            c.invalidateQueries([RBAC_USERS__PAGINATED_GET]).then();
            c.invalidateQueries([RBAC_USER__GET, user.id]).then();
        },
    });
    useMutationErrorMessage(m);
    useMutationSuccessMessage(m, `User updated: ${m?.data?.username}`);
    return m;
};

export const useUserDeleteMutation = () => {
    const c = useQueryClient();
    const m = useMutation<null, TError, string>({
        mutationFn: userId => http.delete_q(`/rbac/users`, { id: userId }, 204),
        mutationKey: [RBAC_USER__DELETE],
        onSuccess: (_, userId) => {
            c.invalidateQueries([RBAC_USERS__PAGINATED_GET]).then();
            c.invalidateQueries([RBAC_USER__GET, userId]).then();
        },
    });
    useMutationErrorMessage(m);
    useMutationSuccessMessage(m, `User deleted successfully.`);
    return m;
};

export const useUsersDeleteMutation = () => {
    const { searchQuery, page, sortColumn, sortOrder, filterRoleId } = useUsersStore(state => state.filters);
    const c = useQueryClient();
    const m = useMutation<null, TError, string[]>({
        mutationFn: userIds => http.delete_b(`/rbac/users`, { ids: userIds }, 204),
        mutationKey: [RBAC_USERS__DELETE],
        onSuccess: () => {
            c.invalidateQueries([
                RBAC_USERS__PAGINATED_GET,
                page,
                searchQuery,
                sortColumn,
                sortOrder,
                filterRoleId,
            ]).then();
        },
    });
    useMutationErrorMessage(m);
    useMutationSuccessMessage(m, `Selected users deleted successfully.`);
    return m;
};

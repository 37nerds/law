import type { TPermission } from "../rbac/permissions";
import type { TBase, TError, TPaginate } from "@helpers/types";

import { useMutation, useQuery, useQueryClient } from "react-query";

import http from "@helpers/http";
import useRolesStore from "@states/roles_store";
import useQueryErrorMessage from "@hooks/useQueryErrorMessage";
import useMutationErrorMessage from "@hooks/useMutationErrorMessage";
import useMutationSuccessMessage from "@hooks/useMutationSuccessMessage";

export type TRole = TBase & {
    name: string;
    disable: boolean;
    permissions: TPermission[];
};

export type TCreateRole = {
    name: string;
};

export type TEditRole = {
    id: string;
    name: string;
    disable: boolean;
};

export type TRoleColumn = "name" | "disable";

export const RBAC_ROLES__GET = "get.rbac-roles";
export const RBAC_ROLES__PAGINATED__GET = "get.paginated.rbac-roles";
export const RBAC_ROLE__GET = "get.rbac-role";
export const RBAC_ROLE__POST = "post.rbac-roles";
export const RBAC_ROLE__DELETE = "delete.rbac-roles";
export const RBAC_ROLE__PATCH = "patch.rbac-roles";

export const useRolesQuery = () => {
    const q = useQuery<TRole[], TError>({
        queryFn: async () => http.get("/rbac/roles", 200),
        queryKey: [RBAC_ROLES__GET],
    });
    useQueryErrorMessage(q);
    return q;
};

export const useRolesPaginatedQuery = () => {
    const { page, searchQuery, sortColumn, sortOrder } = useRolesStore(state => state.filters);
    const q = useQuery<TPaginate<TRole>, TError>({
        queryFn: () => {
            let url =
                `/rbac/roles?foo=bar` +
                `&per_page=10&page=${page}` +
                `&sort_column=${sortColumn}` +
                `&sort_order=${sortOrder}` +
                `&paginated=true`;
            if (searchQuery.trim() !== "") {
                url += `&search=${encodeURIComponent(searchQuery.trim())}`;
            }
            return http.get(url, 200);
        },
        queryKey: [RBAC_ROLES__PAGINATED__GET, page, searchQuery, sortColumn, sortOrder],
        retry: false,
    });
    useQueryErrorMessage(q);
    return q;
};

export const useRoleQuery = (roleId: string) => {
    const q = useQuery<TRole, TError>({
        queryFn: () => (roleId === "" ? Promise.resolve({}) : http.get(`/rbac/roles/?foo=bar&id=${roleId}`, 200)),
        queryKey: [RBAC_ROLE__GET, roleId],
    });
    useQueryErrorMessage(q);
    return q;
};

export const useSaveRoleMutation = () => {
    const c = useQueryClient();
    const m = useMutation<TRole, TError, TCreateRole>({
        mutationFn: roleName => http.post("/rbac/roles", roleName, 201),
        mutationKey: [RBAC_ROLE__POST],
        onSuccess: () => {
            c.invalidateQueries(RBAC_ROLES__GET).then();
            c.invalidateQueries(RBAC_ROLES__PAGINATED__GET).then();
        },
    });
    useMutationErrorMessage(m);
    useMutationSuccessMessage(m, `New role created: ${m?.data?.name}`);
    return m;
};

export const useDeleteRoleMutation = () => {
    const c = useQueryClient();
    const m = useMutation<TRole, TError, string>({
        mutationFn: roleId => http.delete(`/rbac/roles?foo=bar&id=${roleId}`, 204),
        mutationKey: [RBAC_ROLE__DELETE],
        onSuccess: () => {
            c.invalidateQueries(RBAC_ROLES__GET).then();
            c.invalidateQueries(RBAC_ROLES__PAGINATED__GET).then();
        },
    });
    useMutationErrorMessage(m);
    useMutationSuccessMessage(m, `Role deleted successfully.`);
    return m;
};

export const useEditRoleMutation = () => {
    const c = useQueryClient();
    const m = useMutation<TRole, TError, TEditRole>({
        mutationFn: role => http.patch(`/rbac/roles?foo=bar&id=${role.id}`, role, 200),
        mutationKey: [RBAC_ROLE__PATCH],
        onSuccess: role => {
            c.invalidateQueries([RBAC_ROLE__GET, role.id]).then();
            c.invalidateQueries(RBAC_ROLES__GET).then();
            c.invalidateQueries(RBAC_ROLES__PAGINATED__GET).then();
        },
    });
    useMutationErrorMessage(m);
    useMutationSuccessMessage(m, `Role updated: ${m?.data?.name}`);
    return m;
};

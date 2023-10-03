import type { TPermission } from "@fetches/rbac/permissions";
import type { TBase, TError, TPaginate } from "@helpers/types";

import { notify } from "@helpers/notify";
import { useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";

import http from "@helpers/http";
import useRolesStore from "@states/roles_store";

export const RBAC_ROLES__GET = "get.rbac-roles";
export const RBAC_ROLES__PAGINATED__GET = "get.paginated.rbac-roles";
export const RBAC_ROLE__GET = "get.rbac-role";
export const RBAC_ROLE_POST = "post.roles";
export const RBAC_ROLE_DELETE = "delete.roles";
export const RBAC_ROLE_PATCH = "patch.roles";

export type TRole = TBase & {
    name: string;
    disable: boolean;
    permissions: TPermission[];
};

export type TCreateRole = {
    name: string;
};

export type TEditRole = {
    id?: string;
    name: string;
    disable: boolean;
};

export type TRoleColumn = "name" | "disable";

export const useRolesQuery = () => {
    const query = useQuery<TRole[], TError>({
        queryFn: async () => {
            let url = `/rbac/roles`;
            return await http.get(url, 200);
        },
        queryKey: [RBAC_ROLES__GET],
    });

    useEffect(() => {
        if (query.isError) {
            notify("error", query.error?.message);
        }
    }, [query.isError]);

    return query;
};

export const useRolesPaginatedQuery = () => {
    const { page, searchQuery, sortColumn, sortOrder } = useRolesStore(state => state.filters);

    const query = useQuery<TPaginate<TRole>, TError>({
        queryFn: async () => {
            let url = `/rbac/roles?paginated=true&&per_page=10&page=${page}&sort_column=${sortColumn}&sort_order=${sortOrder}`;
            if (searchQuery.trim() !== "") {
                url += `&search=${encodeURIComponent(searchQuery.trim())}`;
            }
            return await http.get(url, 200);
        },
        queryKey: [RBAC_ROLES__PAGINATED__GET, page, searchQuery, sortColumn, sortOrder],
        retry: false,
    });

    useEffect(() => {
        if (query.isError) {
            notify("error", query.error?.message);
        }
    }, [query.isError]);

    return query;
};

export const useSaveRoleMutation = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation<TRole, TError, TCreateRole>({
        mutationFn: async roleName => {
            return await http.post("/rbac/roles", roleName, 201);
        },
        mutationKey: [RBAC_ROLE_POST],
        onSuccess: () => {
            queryClient.invalidateQueries(RBAC_ROLES__GET).then();
            queryClient.invalidateQueries(RBAC_ROLES__PAGINATED__GET).then();
        },
    });

    useEffect(() => {
        if (mutation.isError) {
            notify("error", mutation.error?.message);
        }

        if (mutation.isSuccess) {
            notify("success", `New role created: ${mutation?.data?.name}`);
        }
    }, [mutation.isError, mutation.isSuccess]);

    return mutation;
};

export const useDeleteRoleMutation = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation<TRole, TError, string>({
        mutationFn: async id => {
            return await http.delete(`/rbac/roles?id=${id}`, 204);
        },
        mutationKey: [RBAC_ROLE_DELETE],
        onSuccess: () => {
            queryClient.invalidateQueries(RBAC_ROLES__GET).then();
            queryClient.invalidateQueries(RBAC_ROLES__PAGINATED__GET).then();
        },
    });

    useEffect(() => {
        if (mutation.isError) {
            notify("error", mutation.error?.message);
        }

        if (mutation.isSuccess) {
            notify("success", `Role deleted successfully.`);
        }
    }, [mutation.isError, mutation.isSuccess]);

    return mutation;
};

export const useRoleQuery = (id: string) => {
    const query = useQuery<TRole, TError>({
        queryFn: async () => {
            return id === "" ? Promise.resolve({}) : await http.get(`/rbac/roles?id=${id}`, 200);
        },
        queryKey: [RBAC_ROLE__GET, id],
    });

    useEffect(() => {
        if (query.isError) {
            notify("error", query.error?.message);
        }
    }, [query.isError]);

    return query;
};

export const useEditRoleMutation = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation<TRole, TError, TEditRole>({
        mutationFn: async role => {
            return await http.patch(`/rbac/roles?id=${role.id}`, role, 200);
        },
        mutationKey: [RBAC_ROLE_PATCH],
        onSuccess: role => {
            queryClient.invalidateQueries([RBAC_ROLE__GET, role.id]).then();
            queryClient.invalidateQueries(RBAC_ROLES__GET).then();
            queryClient.invalidateQueries(RBAC_ROLES__PAGINATED__GET).then();
        },
    });

    useEffect(() => {
        if (mutation.isError) {
            notify("error", mutation.error?.message);
        }

        if (mutation.isSuccess) {
            notify("success", `Role updated: ${mutation?.data?.name}`);
        }
    }, [mutation.isError, mutation.isSuccess]);

    return mutation;
};

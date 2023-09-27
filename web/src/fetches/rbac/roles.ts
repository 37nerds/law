import type { TBase, TError, TPaginate } from "src/types";
import type { TPermission } from "@fetches/rbac/permissions";

import { notify } from "@helpers/notify";
import { useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";

import http from "@helpers/http";
import useRolesStore from "@states/rolesStore";

export const RBAC_ROLES_GET = "get.roles";
export const RBAC_ROLE_GET = "get.role";
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

export const useRolesQuery = () => {
    const {
        filters: { page },
    } = useRolesStore();

    const query = useQuery<TPaginate<TRole>, TError>({
        queryFn: async () => {
            return await http.get(`/rbac/roles?per_page=10` + `&page=${page}`, 200);
        },
        queryKey: [RBAC_ROLES_GET, page],
        keepPreviousData: true,
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
            return queryClient.invalidateQueries(RBAC_ROLES_GET);
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
            return queryClient.invalidateQueries(RBAC_ROLES_GET);
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
    const { setEditRole } = useRolesStore();

    const query = useQuery<TRole, TError>({
        queryFn: async () => {
            return await http.get(`/rbac/roles?id=${id}`, 200);
        },
        queryKey: [RBAC_ROLE_GET, id],
    });

    useEffect(() => {
        if (query.isError) {
            notify("error", query.error?.message);
        }

        if (query.isSuccess) {
            setEditRole({
                name: query.data?.name,
                disable: query.data.disable,
            });
        }
    }, [query.isError, query.isSuccess, query.data]);

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
            queryClient.invalidateQueries([RBAC_ROLE_GET, role.id]).then();
            queryClient.invalidateQueries(RBAC_ROLES_GET).then();
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

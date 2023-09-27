import type { TResource } from "@fetches/rbac/resources";
import type { TBase } from "@helpers/types";
import type { TError } from "@helpers/types";

import { useMutation, useQueryClient } from "react-query";
import { RBAC_ROLE_GET } from "@fetches/rbac/roles";
import { useEffect } from "react";
import { notify } from "@helpers/notify";

import http from "@helpers/http";

export type TPermission = TBase & {
    role_id: string;
    resource_id: string;
    resource: TResource;
};

export type TCreatePermission = {
    role_id: string;
    resource_id: string;
};

const RBAC_PERMISSION_POST = "post.rbac-permission";
const RBAC_PERMISSION_DELETE = "delete.rbac-permission";

export const useSavePermissionMutation = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation<TPermission, TError, TCreatePermission>({
        mutationFn: async createPermission => {
            return await http.post("/rbac/permissions", createPermission, 201);
        },
        mutationKey: [RBAC_PERMISSION_POST],
        onSuccess: permission => {
            queryClient.invalidateQueries([RBAC_ROLE_GET, permission.role_id]).then();
        },
    });

    useEffect(() => {
        if (mutation.isError) {
            notify("error", mutation.error?.message);
        }
    }, [mutation.isError]);

    return mutation;
};

export const useDeletePermissionMutation = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation<null, TError, { permissionId: string; roleId: string }>({
        mutationFn: async ({ permissionId }) => {
            return await http.delete(`/rbac/permissions?id=${permissionId}`, 204);
        },
        mutationKey: [RBAC_PERMISSION_DELETE],
        onSuccess: (_, { roleId }) => {
            queryClient.invalidateQueries([RBAC_ROLE_GET, roleId]).then();
        },
    });

    useEffect(() => {
        if (mutation.isError) {
            notify("error", mutation.error?.message);
        }
    }, [mutation.isError]);

    return mutation;
};

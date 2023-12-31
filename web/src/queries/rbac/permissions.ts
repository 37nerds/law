import type { TResource } from "../rbac/resources";
import type { TBase } from "@helpers/types";
import type { TError } from "@helpers/types";

import { useMutation, useQueryClient } from "react-query";
import { RBAC_ROLE__GET } from "../rbac/roles";

import http from "@helpers/http";
import useMutationErrorMessage from "@hooks/useMutationErrorMessage";

export type TPermission = TBase & {
    role_id: string;
    resource_id: string;
    resource: TResource;
};

export type TCreatePermission = {
    role_id: string;
    resource_id: string;
};

export type TDeletePermission = {
    permissionId: string;
    roleId: string;
};

const RBAC_PERMISSION__POST = "post.rbac-permission";
const RBAC_PERMISSION__DELETE = "delete.rbac-permission";
const RBAC_PERMISSION_ALL__POST = "post.rbac-permission-all";
const RBAC_PERMISSION_ALL__DELETE = "delete.rbac-permission-all";

export const useSavePermissionMutation = () => {
    const c = useQueryClient();
    const m = useMutation<TPermission, TError, TCreatePermission>({
        mutationFn: createPermission => http.post("/rbac/permissions", createPermission, 201),
        mutationKey: [RBAC_PERMISSION__POST],
        onSuccess: permission => c.invalidateQueries([RBAC_ROLE__GET, permission.role_id]).then(),
    });
    useMutationErrorMessage(m);
    return m;
};

export const useDeletePermissionMutation = () => {
    const c = useQueryClient();
    const m = useMutation<null, TError, TDeletePermission>({
        mutationFn: d => http.delete(`/rbac/permissions?foo=bar&id=${d.permissionId}&role_id=${d.roleId}`, 204),
        mutationKey: [RBAC_PERMISSION__DELETE],
        onSuccess: (_, { roleId }) => c.invalidateQueries([RBAC_ROLE__GET, roleId]).then(),
    });
    useMutationErrorMessage(m);
    return m;
};

export const useGiveAllPermissionMutation = () => {
    const c = useQueryClient();
    const m = useMutation<null, TError, string>({
        mutationFn: roleId => http.post("/rbac/permissions/all", { role_id: roleId }, 204),
        mutationKey: [RBAC_PERMISSION_ALL__POST],
        onSuccess: (_, roleId) => c.invalidateQueries([RBAC_ROLE__GET, roleId]).then(),
    });
    useMutationErrorMessage(m);
    return m;
};

export const useRemoveAllPermissionMutation = () => {
    const c = useQueryClient();
    const m = useMutation<null, TError, string>({
        mutationFn: roleId => http.delete(`/rbac/permissions/all?foo=bar&role_id=${roleId}`, 204),
        mutationKey: [RBAC_PERMISSION_ALL__DELETE],
        onSuccess: (_, roleId) => c.invalidateQueries([RBAC_ROLE__GET, roleId]).then(),
    });
    useMutationErrorMessage(m);
    return m;
};

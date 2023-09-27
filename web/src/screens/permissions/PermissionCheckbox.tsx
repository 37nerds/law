import type { TResource } from "@fetches/rbac/resources";

import { useRoleQuery } from "@fetches/rbac/roles";
import { useDeletePermissionMutation, useSavePermissionMutation } from "@fetches/rbac/permissions";

import CheckboxInput from "@components/inputs/CheckboxInput";

const PermissionCheckbox = ({ resource, roleId = "" }: { resource?: TResource | null; roleId?: string }) => {
    if (!resource) {
        return <></>;
    }

    const roleQuery = useRoleQuery(roleId);
    const permission = roleQuery.data?.permissions?.find(permission => permission?.resource_id === resource?.id);

    const savePermissionMutation = useSavePermissionMutation();
    const deletePermissionMutation = useDeletePermissionMutation();

    const handlePermissionToggle = () => {
        if (permission) {
            deletePermissionMutation.mutate({ permissionId: permission?.id, roleId: roleId });
        } else {
            savePermissionMutation.mutate({ role_id: roleId, resource_id: resource?.id });
        }
    };

    return (
        <CheckboxInput
            checked={!!permission}
            onChange={handlePermissionToggle}
            disabled={!roleId || deletePermissionMutation.isLoading || savePermissionMutation.isLoading}
        />
    );
};

export default PermissionCheckbox;

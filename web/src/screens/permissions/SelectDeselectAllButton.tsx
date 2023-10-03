import { useResourcesQuery } from "../../queries/rbac/resources";
import { useRoleQuery } from "../../queries/rbac/roles";
import { useGiveAllPermissionMutation, useRemoveAllPermissionMutation } from "../../queries/rbac/permissions";

import CheckboxInput from "@components/inputs/CheckboxInput";

const SelectDeselectAllButton = ({ roleId }: { roleId: string }) => {
    const resourcesQuery = useResourcesQuery();
    const roleQuery = useRoleQuery(roleId);

    const resourcesCount = resourcesQuery.data?.length || null;
    const permissionsCount = roleQuery.data?.permissions?.length || null;

    const giveAllPermissionMutation = useGiveAllPermissionMutation();
    const removeAllPermissionMutation = useRemoveAllPermissionMutation();

    return (
        <div className="flex justify-end gap-5">
            <div>Select/Deselect All</div>
            <CheckboxInput
                disabled={!resourcesCount || !roleId}
                checked={!!(resourcesCount && resourcesCount === permissionsCount)}
                onChange={() => {
                    if (resourcesCount != null) {
                        if (resourcesCount === permissionsCount) {
                            removeAllPermissionMutation.mutate(roleId);
                        } else {
                            giveAllPermissionMutation.mutate(roleId);
                        }
                    }
                }}
                className="checkbox-primary"
            />
        </div>
    );
};

export default SelectDeselectAllButton;

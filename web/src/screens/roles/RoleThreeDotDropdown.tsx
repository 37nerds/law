import { useDeleteRoleMutation } from "@fetches/rbac/roles";

import useRolesStore from "@states/roles_store";

import ThreeDotDropdown from "@components/dropdowns/ThreeDotDropdown";
import { TThreeDropDownOption } from "@helpers/types";
import { isPermitted } from "@states/auth_store";

const RoleThreeDotDropdown = ({ roleId }: { roleId: string }) => {
    const { setFiltersField } = useRolesStore();

    const roleDeleteMutation = useDeleteRoleMutation();

    const options: TThreeDropDownOption[] = [];

    if (isPermitted("api/v1/rbac/roles", "patch")) {
        options.push({
            content: <button className=" btn btn-success btn-sm w-full text-xs text-base-100">Edit</button>,
            handler: () => {
                setFiltersField("editRoleId", roleId);
                setFiltersField("editRoleModalOpen", true);
            },
        });
    }

    if (isPermitted("api/v1/rbac/roles", "delete")) {
        options.push({
            content: <button className=" btn btn-error btn-sm w-full text-xs text-base-100">Delete</button>,
            handler: () => {
                if (confirm("Are you sure you want to delete this role?")) {
                    roleDeleteMutation.mutate(roleId);
                }
            },
        });
    }

    return <ThreeDotDropdown options={options} />;
};

export default RoleThreeDotDropdown;

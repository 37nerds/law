import { useDeleteRoleMutation } from "@fetches/rbac/roles";

import useRolesStore from "@states/rolesStore";

import ThreeDotDropdown from "@components/dropdowns/ThreeDotDropdown";

const RoleThreeDotDropdown = ({ roleId }: { roleId: string }) => {
    const { setFiltersField } = useRolesStore();

    const roleDeleteMutation = useDeleteRoleMutation();

    return (
        <ThreeDotDropdown
            options={[
                {
                    content: <button className=" btn btn-success btn-sm w-full text-xs text-base-100">Edit</button>,
                    handler: () => {
                        setFiltersField("editRoleId", roleId);
                        setFiltersField("editRoleModalOpen", true);
                    },
                },
                {
                    content: <button className=" btn btn-error btn-sm w-full text-xs text-base-100">Delete</button>,
                    handler: () => {
                        roleDeleteMutation.mutate(roleId);
                    },
                },
            ]}
        />
    );
};

export default RoleThreeDotDropdown;

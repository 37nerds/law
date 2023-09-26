import ThreeDotDropdown from "@components/dropdowns/ThreeDotDropdown";
import { useDeleteRoleMutation } from "@external/rbac";
import useRolesStore from "@states/rolesStore";

const RoleThreeDotDropdown = ({ roleId }: { roleId: string }) => {
    const { setFiltersField } = useRolesStore();

    const roleDeleteMutation = useDeleteRoleMutation();

    return (
        <ThreeDotDropdown
            options={[
                {
                    content: <button className=" btn btn-success btn-sm w-full text-xs text-base-100">Edit</button>,
                    handler: () => {
                        // setFiltersField("editUserId", userId);
                        // setFiltersField("editUserModalOpen", true);
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

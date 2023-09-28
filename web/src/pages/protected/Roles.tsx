import useSetPageTitle from "@hooks/useSetPageTitle";
import useRolesStore from "@states/roles_store";

import IsPermitted from "@components/auth/IsPermitted";
import PageCard from "@components/cards/PageCard";
import EditRoleModal from "@screens/roles/EditRoleModal";
import NewRole from "@screens/roles/NewRole";
import { RolesTable } from "@screens/roles/RolesTable";

const Roles = () => {
    useSetPageTitle("Roles");

    const {
        filters: { editRoleModalOpen, editRoleId },
        setFiltersField,
    } = useRolesStore();

    return (
        <PageCard>
            <EditRoleModal
                open={editRoleModalOpen}
                setOpen={value => {
                    setFiltersField("editRoleModalOpen", value);
                }}
                roleId={editRoleId}
            />

            <IsPermitted api={"api/v1/rbac/roles"} method={"post"} element={<NewRole />} />
            <IsPermitted api={"api/v1/rbac/roles"} method={"get"} element={<RolesTable />} />
        </PageCard>
    );
};

export default Roles;

import useSetPageTitle from "@hooks/useSetPageTitle";
import useRolesStore from "@states/roles_store";

import IsPermitted from "@components/auth/IsPermitted";
import PageCard from "@components/cards/PageCard";
import SearchInput from "@components/inputs/SearchInput";
import BarWrapper from "@components/wrappers/BarWrapper";
import EditRoleModal from "@screens/roles/EditRoleModal";
import NewRole from "@screens/roles/NewRole";
import { RolesTable } from "@screens/roles/RolesTable";

const Roles = () => {
    useSetPageTitle("Roles");

    const { editRoleModalOpen, editRoleId, searchQuery } = useRolesStore(state => state.filters);
    const { setFiltersField } = useRolesStore(state => state);

    return (
        <PageCard>
            <EditRoleModal
                open={editRoleModalOpen}
                setOpen={value => {
                    setFiltersField("editRoleModalOpen", value);
                }}
                roleId={editRoleId}
            />

            <BarWrapper>
                <div>
                    <IsPermitted api={"api/v1/rbac/roles"} method={"post"} element={<NewRole />} />
                </div>
                <div>
                    <SearchInput
                        value={searchQuery}
                        placeholder="Search Roles"
                        onSearch={s => setFiltersField("searchQuery", s)}
                    />
                </div>
            </BarWrapper>

            <IsPermitted api={"api/v1/rbac/roles"} method={"get"} element={<RolesTable />} />
        </PageCard>
    );
};

export default Roles;

import { useRolesQuery } from "@queries/rbac/roles";
import { useUsersPaginatedQuery } from "@queries/rbac/users";

import useSetPageTitle from "@hooks/useSetPageTitle";
import useUsersStore from "@states/users_store";

import IsPermitted from "@components/auth/IsPermitted";
import PageCard from "@components/cards/PageCard";
import EditUserModal from "@screens/users/EditUserModal";
import UsersTable from "@screens/users/UsersTable";
import SearchInput from "@components/inputs/SearchInput";
import BarWrapper from "@components/wrappers/BarWrapper";
import NewUser from "@screens/users/NewUser";
import SelectInput from "@components/inputs/SelectInput";
import CheckboxInput from "@components/inputs/CheckboxInput";
import UserCAD from "@screens/users/UserCAD";

const Users = () => {
    useSetPageTitle("Users List");

    const { editUserModalOpen, editUserId, searchQuery, filterRoleId } = useUsersStore(state => state.filters);
    const { setFiltersField, selectionList, setSelectionList } = useUsersStore();

    const rolesQuery = useRolesQuery();
    const usersQuery = useUsersPaginatedQuery();

    return (
        <PageCard>
            <IsPermitted
                api="api/v1/rbac/users"
                method="patch"
                element={
                    <EditUserModal
                        open={editUserModalOpen}
                        setOpen={value => setFiltersField("editUserModalOpen", value)}
                        userId={editUserId}
                    />
                }
            />
            <BarWrapper>
                <div className="flex items-center gap-2">
                    <UserCAD />
                    <IsPermitted api="api/v1/rbac/users" method="post" element={<NewUser />} />
                </div>
                <div className="flex gap-2">
                    <div className="w-[160px]">
                        <SelectInput
                            value={filterRoleId}
                            setValue={value => setFiltersField("filterRoleId", value)}
                            options={[
                                { name: "Filter by role", value: " " },
                                ...(rolesQuery.data?.map(role => ({ name: role.name, value: role.id })) || []),
                            ]}
                        />
                    </div>
                    <SearchInput
                        value={searchQuery}
                        placeholder="Search Users"
                        onSearch={s => setFiltersField("searchQuery", s)}
                    />
                </div>
            </BarWrapper>
            <IsPermitted api={"api/v1/rbac/users"} method={"get"} element={<UsersTable />} />
        </PageCard>
    );
};

export default Users;

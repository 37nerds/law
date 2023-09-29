import useSetPageTitle from "@hooks/useSetPageTitle";
import useUsersStore from "@states/users_store";

import IsPermitted from "@components/auth/IsPermitted";
import PageCard from "@components/cards/PageCard";
import EditUserModal from "@screens/users/EditUserModal";
import UsersTable from "@screens/users/UsersTable";
import SearchInput from "@components/inputs/SearchInput";
import BarWrapper from "@components/wrappers/BarWrapper";
import NewUser from "@screens/users/NewUser";

const Users = () => {
    useSetPageTitle("Users List");

    const { editUserModalOpen, editUserId } = useUsersStore(state => state.filters);
    const { setFiltersField } = useUsersStore();

    return (
        <PageCard>
            <EditUserModal
                open={editUserModalOpen}
                setOpen={value => {
                    setFiltersField("editUserModalOpen", value);
                }}
                userId={editUserId}
            />
            <BarWrapper>
                <IsPermitted api="api/v1/rbac/users" method="post" element={<NewUser />} />
                <SearchInput placeholder="Search Users" onSearch={s => setFiltersField("searchQuery", s)} />
            </BarWrapper>
            <IsPermitted api={"api/v1/rbac/users"} method={"get"} element={<UsersTable />} />
        </PageCard>
    );
};

export default Users;

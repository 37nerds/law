import useUsersStore from "@states/users_store";
import useSetPageTitle from "@hooks/useSetPageTitle";

import PageCard from "@components/cards/PageCard";
import EditUserModal from "@screens/users/EditUserModal";
import NewUser from "@screens/users/NewUser";
import UsersTable from "@screens/users/UsersTable";
import IsPermitted from "@components/auth/IsPermitted";

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

            <IsPermitted api={"api/v1/rbac/users"} method={"post"} element={<NewUser />} />
            <IsPermitted api={"api/v1/rbac/users"} method={"get"} element={<UsersTable />} />
        </PageCard>
    );
};

export default Users;

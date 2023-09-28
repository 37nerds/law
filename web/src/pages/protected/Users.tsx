import useSetPageTitle from "@hooks/useSetPageTitle";
import useUsersStore from "@states/users_store";

import IsPermitted from "@components/auth/IsPermitted";
import PageCard from "@components/cards/PageCard";
import StringInput from "@components/inputs/StringInput";
import EditUserModal from "@screens/users/EditUserModal";
import NewUserModal from "@screens/users/NewUserModal";
import UsersTable from "@screens/users/UsersTable";
import { useState } from "react";

const AddNewButton = () => {
    const { setFiltersField } = useUsersStore();

    return (
        <button
            className="text btn btn-success rounded-md text-base-100"
            onClick={() => setFiltersField("newUserModalOpen", true)}
        >
            Add new user
        </button>
    );
};

const Users = () => {
    useSetPageTitle("Users List");

    const [search, setSearch] = useState("");

    const { newUserModalOpen, editUserModalOpen, editUserId } = useUsersStore(state => state.filters);
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

            <NewUserModal
                open={newUserModalOpen}
                setOpen={value => {
                    setFiltersField("newUserModalOpen", value);
                }}
            />

            <div className="flex justify-between rounded-lg border border-base-300 p-2">
                <form className="flex gap-2" onSubmit={e => e.preventDefault()}>
                    <StringInput placeholder="Search user" value={search} setValue={value => setSearch(value)} />
                    <button
                        className="text btn btn-info rounded-md text-base-100"
                        onClick={() => setFiltersField("searchQuery", search)}
                    >
                        search
                    </button>
                </form>

                <IsPermitted api={"api/v1/rbac/users"} method={"post"} element={<AddNewButton />} />
            </div>

            <IsPermitted api={"api/v1/rbac/users"} method={"get"} element={<UsersTable />} />
        </PageCard>
    );
};

export default Users;

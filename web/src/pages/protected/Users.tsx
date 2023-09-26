import { TUser, useUsersQuery } from "@fetches/rbac/users";
import { convertToLocalTime } from "@helpers/unknown";
import { TPaginate } from "../../types";

import PageLayout from "../../components/layouts/PageLayout";
import QueryLayout from "../../components/layouts/QueryLayout";
import Paginator from "../../components/pure/Paginator";
import useSetPageTitle from "@hooks/useSetPageTitle";
import EditUserModal from "../../screens/users/EditUserModal";
import NewUserModal from "../../screens/users/NewUserModal";
import UserThreeDotDropdown from "../../screens/users/UserThreeDotDropdown";
import useUsersStore from "@states/usersStore";

const headers = ["Name", "Email Id", "Joined On", "Role"];

const Users = () => {
    useSetPageTitle("Users List");

    const usersQuery = useUsersQuery();
    const {
        filters: { newUserModalOpen, editUserModalOpen, page, editUserId },
        setFiltersField,
    } = useUsersStore();

    return (
        <PageLayout>
            <NewUserModal
                open={newUserModalOpen}
                setOpen={value => {
                    setFiltersField("newUserModalOpen", value);
                }}
            />

            <EditUserModal
                open={editUserModalOpen}
                setOpen={value => {
                    setFiltersField("editUserModalOpen", value);
                }}
                userId={editUserId}
            />

            <div className="flex justify-end rounded border border-base-300 p-2">
                <button
                    className="text btn btn-success rounded text-base-100"
                    onClick={() => setFiltersField("newUserModalOpen", true)}
                >
                    Add new user
                </button>
            </div>

            <QueryLayout<TPaginate<TUser>> query={usersQuery}>
                {usersQuery.data ? (
                    <div className="flex flex-col gap-2">
                        <div className="w-full overflow-x-auto rounded border border-base-300">
                            <table className="table w-full">
                                <thead>
                                    <tr>
                                        {headers.map((header, index) => (
                                            <th key={index}>{header}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {usersQuery.data.data?.map((user, index) => {
                                        return (
                                            <tr key={index} className={`${index % 2 === 1 ? "bg-base-200" : ""}`}>
                                                <td>
                                                    <div className="font-bold">{user.name}</div>
                                                </td>
                                                <td>{user.email}</td>
                                                <td>{convertToLocalTime(user.created_at)}</td>
                                                <td>{user?.role?.name}</td>
                                                <td>
                                                    <UserThreeDotDropdown userId={user.id} />
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>

                        <Paginator
                            currentPage={page}
                            totalPages={usersQuery.data.last_page}
                            onSetCurrentPage={page => {
                                setFiltersField("page", page);
                            }}
                        />
                    </div>
                ) : (
                    <></>
                )}
            </QueryLayout>
        </PageLayout>
    );
};

export default Users;

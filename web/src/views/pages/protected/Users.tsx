import { useUsersQuery } from "@external/rbac";
import { TPaginate } from "@kinds/general";
import { TUser } from "@kinds/users";
import { convertToLocalTime } from "@helpers/unknown";

import Paginator from "@components/pure/Paginator";
import QueryLayout from "@components/layouts/QueryLayout";
import useSetPageTitle from "@hooks/useSetPageTitle";
import PageLayout from "@components/layouts/PageLayout";
import NewUserModal from "@screens/userList/NewUserModal";
import useUsersStore from "@states/usersStore";

const headers = ["Name", "Email Id", "Joined On", "Role"];

const Users = () => {
    useSetPageTitle("Users List");

    const usersQuery = useUsersQuery();
    const {
        filters: { newUserModalOpen, page },
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
                                            <tr key={index}>
                                                <td>
                                                    <div className="font-bold">{user.name}</div>
                                                </td>
                                                <td>{user.email}</td>
                                                <td>{convertToLocalTime(user.created_at)}</td>
                                                <td>{user?.role?.name}</td>
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

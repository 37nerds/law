import type { TUser } from "@fetches/rbac/users";
import type { TPaginate } from "@helpers/types";

import { useUsersQuery } from "@fetches/rbac/users";
import { convertToLocalTime } from "@helpers/time";
import { getProfileUrlFromAvatarKey } from "@helpers/location";

import useUsersStore from "@states/users_store";

import QueryLayout from "@components/layouts/QueryLayout";
import Paginator from "@components/pure/Paginator";
import useSetPageTitle from "@hooks/useSetPageTitle";
import UserThreeDotDropdown from "@screens/users/UserThreeDotDropdown";
import Td from "@components/tables/Td";
import UserIcon from "@heroicons/react/24/outline/UserIcon";

const UsersTable = () => {
    useSetPageTitle("Users List");

    const usersQuery = useUsersQuery();
    const {
        filters: { page },
        setFiltersField,
    } = useUsersStore();

    return (
        <QueryLayout<TPaginate<TUser>> query={usersQuery}>
            {usersQuery.data ? (
                <div className="flex flex-col gap-2">
                    <div className="w-full rounded border border-base-300">
                        <table className="table table-sm w-full">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Username</th>
                                    <th>Role</th>
                                    <th>Joined On</th>
                                    <th>Phone</th>
                                    <th>Address</th>
                                </tr>
                            </thead>
                            <tbody>
                                {usersQuery.data.data?.map((user, index) => {
                                    return (
                                        <tr key={index} className={`${index % 2 === 1 ? "bg-base-200" : ""}`}>
                                            <Td>
                                                <div className="avatar">
                                                    <div className="w-8 rounded-full ring ring-success ring-offset-2 ring-offset-base-100">
                                                        {user?.avatar ? (
                                                            <img src={getProfileUrlFromAvatarKey(user.avatar)} alt="" />
                                                        ) : (
                                                            <UserIcon className="bg-base-200 p-1" />
                                                        )}
                                                    </div>
                                                </div>
                                            </Td>

                                            <Td>
                                                <div className="font-bold">{user?.name}</div>
                                            </Td>
                                            <Td>{user?.email}</Td>
                                            <Td>{user?.username}</Td>
                                            <Td>{user?.role?.name}</Td>
                                            <Td>{convertToLocalTime(user?.created_at)}</Td>
                                            <Td>{user?.phone}</Td>
                                            <Td>{user?.address}</Td>
                                            <Td>
                                                <UserThreeDotDropdown userId={user.id} />
                                            </Td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>

                    <Paginator
                        currentPage={page}
                        totalPages={usersQuery.data.last_page}
                        totalItems={usersQuery.data?.total}
                        totalPerPageItems={usersQuery.data?.per_page}
                        onSetCurrentPage={page => {
                            setFiltersField("page", page);
                        }}
                    />
                </div>
            ) : (
                <></>
            )}
        </QueryLayout>
    );
};

export default UsersTable;

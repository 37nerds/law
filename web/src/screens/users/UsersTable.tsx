import type { TUser } from "@fetches/rbac/users";
import type { TPaginate } from "@helpers/types";

import { useUsersQuery } from "@fetches/rbac/users";
import { getProfileUrlFromAvatarKey } from "@helpers/location";
import { convertToLocalTime } from "@helpers/time";

import useUsersStore from "@states/users_store";

import Paginator from "@components/pure/Paginator";
import QueryLayout from "@components/pure/QueryLayout";
import Td from "@components/tables/Td";
import DownArrow from "@heroicons/react/24/outline/ArrowDownIcon";
import UserIcon from "@heroicons/react/24/outline/UserIcon";
import useSetPageTitle from "@hooks/useSetPageTitle";
import UserThreeDotDropdown from "@screens/users/UserThreeDotDropdown";
import { useState } from "react";

const UsersTable = () => {
    useSetPageTitle("Users List");

    const usersQuery = useUsersQuery();
    const [sortColumn, setSortColumn] = useState<string | null>(null);
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

    const {
        filters: { page },
        setFiltersField,
    } = useUsersStore();

    if (usersQuery?.data?.data?.length === 0) {
        return <div className="mt-5 text-center text-error">No data found!</div>;
    }

    const handleSort = (column: string) => {
        if (sortColumn !== column) {
            setSortOrder("asc");
            setSortColumn(column);
            sortOptions(column, "asc");
        } else {
            const nextOrder = sortOrder === "asc" ? "desc" : "asc";
            setSortOrder(nextOrder);
            sortOptions(column, nextOrder);
        }
    };

    const sortOptions = (column: string, order: string) => {
        setFiltersField("sortColumn", column);
        setFiltersField("sortOrder", order);
        setFiltersField("page", 1);
    };

    return (
        <QueryLayout<TPaginate<TUser>> query={usersQuery}>
            {usersQuery.data ? (
                <div className="flex flex-col gap-2">
                    <div className="w-full rounded-lg border border-base-300">
                        <table className="table table-sm w-full">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th className="flex cursor-pointer gap-1" onClick={() => handleSort("name")}>
                                        Name <DownArrow className="w-4" />
                                    </th>
                                    <th onClick={() => handleSort("email")}>
                                        Email <DownArrow className="w-4" />
                                    </th>
                                    <th onClick={() => handleSort("username")}>
                                        Username <DownArrow className="w-4" />
                                    </th>
                                    <th>Role</th>
                                    <th onClick={() => handleSort("created_at")}>
                                        Joined On <DownArrow className="w-4" />
                                    </th>
                                    <th onClick={() => handleSort("phone")}>
                                        Phone <DownArrow className="w-4" />
                                    </th>
                                    <th onClick={() => handleSort("address")}>
                                        Address <DownArrow className="w-4" />
                                    </th>
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

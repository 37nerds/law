import type { TUser, TUserColumn } from "../../queries/rbac/users";
import type { THeader, TThreeDropDownOption } from "@helpers/types";

import { useUserDeleteMutation, useUsersPaginatedQuery } from "../../queries/rbac/users";
import { getProfileUrlFromAvatarKey } from "@helpers/location";
import { convertToLocalTime } from "@helpers/time";
import { isPermitted } from "@states/auth_store";

import useUsersStore from "@states/users_store";

import PaginationWrapper from "@components/wrappers/PaginationWrapper";
import Td from "@components/tables/Td";
import UserIcon from "@heroicons/react/24/outline/UserIcon";
import Th from "@components/tables/Th";
import Table from "@components/tables/Table";
import ThreeDotDropdown from "@components/dropdowns/ThreeDotDropdown";

const UserThreeDotDropdown = ({ userId }: { userId: string }) => {
    const { setFiltersField } = useUsersStore();

    const userDeleteMutation = useUserDeleteMutation();

    const options: TThreeDropDownOption[] = [];

    if (isPermitted("api/v1/rbac/users", "patch")) {
        options.push({
            content: <button className=" btn btn-success btn-sm w-full text-xs text-base-100">Edit</button>,
            handler: () => {
                setFiltersField("editUserId", userId);
                setFiltersField("editUserModalOpen", true);
            },
        });
    }

    if (isPermitted("api/v1/rbac/users", "delete")) {
        options.push({
            content: <button className=" btn btn-error btn-sm w-full text-xs text-base-100">Delete</button>,
            handler: () => {
                if (confirm("Are you sure you want to delete this user?")) {
                    userDeleteMutation.mutate(userId);
                    setFiltersField("editUserId", "");
                }
            },
        });
    }

    return <ThreeDotDropdown options={options} />;
};

const UsersTable = () => {
    const usersQuery = useUsersPaginatedQuery();

    const { page, sortColumn, sortOrder } = useUsersStore(state => state?.filters);
    const { setFiltersField } = useUsersStore(state => state);

    const handleSort = (column: TUserColumn) => {
        setFiltersField("page", 1);
        if (sortColumn !== column) {
            setFiltersField("sortColumn", column);
            setFiltersField("sortOrder", "asc");
        } else {
            const nextOrder = sortOrder === "asc" ? "desc" : "asc";
            setFiltersField("sortOrder", nextOrder);
        }
    };

    const headers: THeader<TUserColumn>[] = [
        { name: "name", label: "Name" },
        { name: "email", label: "Email ID" },
        { name: "username", label: "Username" },
        { name: null, label: "Role" },
        { name: "created_at", label: "Joined On" },
        { name: "phone", label: "Phone" },
        { name: "address", label: "Address" },
    ];

    return (
        <PaginationWrapper<TUser>
            query={usersQuery}
            page={page}
            onSetPage={page => {
                setFiltersField("page", page);
            }}
        >
            <Table>
                <thead>
                    <tr>
                        <th></th>
                        {headers.map((header, index) => (
                            <Th<TUserColumn>
                                key={index}
                                onClick={handleSort}
                                column={sortColumn}
                                order={sortOrder}
                                name={header.name}
                                label={header.label}
                            />
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {usersQuery?.data?.data?.map((user, index) => {
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
            </Table>
        </PaginationWrapper>
    );
};

export default UsersTable;

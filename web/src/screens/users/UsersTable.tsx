import type { TUser, TUserColumn } from "@fetches/rbac/users";

import { useUsersQuery } from "@fetches/rbac/users";
import { getProfileUrlFromAvatarKey } from "@helpers/location";
import { convertToLocalTime } from "@helpers/time";

import useUsersStore from "@states/users_store";

import PaginationWrapper from "@components/wrappers/PaginationWrapper";
import Td from "@components/tables/Td";
import UserIcon from "@heroicons/react/24/outline/UserIcon";
import UserThreeDotDropdown from "@screens/users/UserThreeDotDropdown";
import Th from "@components/tables/Th";
import Table from "@components/tables/Table";

const UsersTable = () => {
    const usersQuery = useUsersQuery();

    const page = useUsersStore(state => state?.filters?.page);
    const sortColumn = useUsersStore(state => state.filters.sortColumn);
    const sortOrder = useUsersStore(state => state.filters.sortOrder);

    const setFiltersField = useUsersStore(state => state?.setFiltersField);

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

    const headers: { name: TUserColumn | null; label: string }[] = [
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
                        {headers.map((header, index) =>
                            header.name === null ? (
                                <th key={index}>Role</th>
                            ) : (
                                <Th<TUserColumn>
                                    key={index}
                                    onClick={handleSort}
                                    column={sortColumn}
                                    order={sortOrder}
                                    name={header.name}
                                    label={header.label}
                                />
                            )
                        )}
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

import { useUsersQuery } from "@external/rbac";
import { TPaginate } from "@kinds/general";
import { TUser, TUserModalOpenFor } from "@kinds/users";

import TitleCard from "@components/cards/TitleCard";
import Paginator from "@components/pure/Paginator";

import QueryLayout from "@components/layouts/QueryLayout";
import ModalOpener from "@components/modals/ModalOpener";
import { convertToLocalTime } from "@helpers/unknown";
import useSetPageTitle from "@hooks/useSetPageTitle";
import UserModal from "@screens/userList/UserModal";
import useUsersStore from "@states/rbacStore";
import { useState } from "react";

const UsersList = () => {
    useSetPageTitle("Users");

    const [modalOpenFor, setModalOpenFor] = useState<TUserModalOpenFor | null>(null);

    const query = useUsersQuery();

    const { userFilters, setUserFiltersField } = useUsersStore();

    const headers = ["Name", "Email Id", "Joined On", "Role"];

    const Button = (
        <ModalOpener
            onClick={() => {
                setModalOpenFor({
                    type: "new_user",
                });
            }}
        >
            <span className="btn btn-success">Add new user</span>
        </ModalOpener>
    );

    return (
        <>
            <UserModal modalOpenFor={modalOpenFor} />
            <QueryLayout<TPaginate<TUser>> query={query}>
                <>
                    {query.data ? (
                        <TitleCard title="All Users" TopSideButtons={Button} topMargin="mt-2">
                            <div className="w-full overflow-x-auto">
                                <table className="table w-full">
                                    <thead>
                                        <tr>
                                            {headers.map((header, index) => (
                                                <th key={index}>{header}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {query.data.data?.map((user, index) => {
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

                            {query.data?.total > 10 && (
                                <Paginator
                                    currentPage={userFilters.page}
                                    totalPages={query.data.last_page}
                                    onSetCurrentPage={page => {
                                        setUserFiltersField("page", page);
                                    }}
                                />
                            )}
                        </TitleCard>
                    ) : (
                        <></>
                    )}
                </>
            </QueryLayout>
        </>
    );
};

export default UsersList;

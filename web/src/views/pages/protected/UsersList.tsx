import { useUsersQuery } from "@external/rbac";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TPaginate } from "@kinds/general";
import { TUser } from "@kinds/users";

import TitleCard from "@components/cards/TitleCard";
import Paginator from "@components/pure/Paginator";

import useUsersStore from "@states/rbacStore";
import useSetPageTitle from "@hooks/useSetPageTitle";
import QueryLayout from "@components/layouts/QueryLayout";

const UsersList = () => {
    useSetPageTitle("Users");

    const query = useUsersQuery();
    const navigate = useNavigate();

    const { page: paramPage } = useParams();

    const { userFilters, setUserFiltersField } = useUsersStore();

    useEffect(() => {
        setUserFiltersField("page", Number(paramPage) || 1);
    }, [paramPage]);

    const headers = ["Name", "Email Id", "Joined On", "Role"];

    return (
        <QueryLayout<TPaginate<TUser>> query={query}>
            <>
                {query.data ? (
                    <TitleCard title="All Users" topMargin="mt-2">
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
                                    {query.data.data.map((user, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>
                                                    <div className="font-bold">{user.name}</div>
                                                </td>
                                                <td>{user.email}</td>
                                                <td>{user.created_at}</td>
                                                <td>{user.role_id}</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>

                        <Paginator
                            currentPage={userFilters.page}
                            totalPages={query.data.last_page}
                            onSetCurrentPage={page => {
                                navigate(`/_/rbac/users/${page}`);
                            }}
                        />
                    </TitleCard>
                ) : (
                    <></>
                )}
            </>
        </QueryLayout>
    );
};

export default UsersList;

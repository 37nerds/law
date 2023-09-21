import TitleCard from "@components/cards/TitleCard";
import ErrorText from "@components/pure/ErrorText";
import Loading from "@components/pure/Loading";
import Paginator from "@components/pure/Paginator";
import { useUsersQuery } from "@external/rbac";
import { notify } from "@helpers/unknown";
import { TUser } from "@kinds/users";
import useUsersStore from "@states/rbacStore";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const TopSideButtons = () => {
    const addNewTeamMember = () => {
        notify("success", "Add New Member clicked");
    };

    return (
        <div className="float-right ml-2 inline-block">
            <button className="btn btn-primary btn-sm px-6 normal-case" onClick={() => addNewTeamMember()}>
                Invite New
            </button>
        </div>
    );
};

function Users() {
    const query = useUsersQuery();
    const navigate = useNavigate();
    const { page: paramPage } = useParams();

    const { userFilters, setUserFiltersField } = useUsersStore();

    useEffect(() => {
        setUserFiltersField("page", Number(paramPage) || 1);
    }, [paramPage]);

    return (
        <>
            {query.isLoading ? (
                <Loading />
            ) : query.isError ? (
                <ErrorText>{query.error?.message || ""}</ErrorText>
            ) : (
                <TitleCard title="Active Users" topMargin="mt-2" TopSideButtons={<TopSideButtons />}>
                    {/* Team Member list in table format loaded constant */}
                    <div className="w-full overflow-x-auto">
                        <table className="table w-full">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email Id</th>
                                    <th>Joined On</th>
                                    <th>Role</th>
                                </tr>
                            </thead>
                            <tbody>
                                {query.data?.data.map((l: TUser, k: number) => {
                                    return (
                                        <tr key={k}>
                                            <td>
                                                <div className="font-bold">{l.name}</div>
                                            </td>
                                            <td>{l.email}</td>
                                            <td>{l.created_at}</td>
                                            <td>{l.role_id}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>

                    <Paginator
                        currentPage={userFilters.page}
                        totalPages={query.data?.last_page}
                        onSetCurrentPage={page => {
                            navigate(`/_/settings-users/${page}`);
                        }}
                    />
                </TitleCard>
            )}
        </>
    );
}

export default Users;

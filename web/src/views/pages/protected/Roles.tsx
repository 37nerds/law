import TitleCard from "@components/cards/TitleCard";
import QueryLayout from "@components/layouts/QueryLayout";
import Paginator from "@components/pure/Paginator";
import { useRolesQuery } from "@external/rbac";
import useSetPageTitle from "@hooks/useSetPageTitle";
import { TPaginate } from "@kinds/general";
import { TRole } from "@kinds/users";
import useUsersStore from "@states/rbacStore";

const Roles = () => {
    useSetPageTitle("Roles");

    const query = useRolesQuery();
    const { rolesFilters, setRolesFiltersField } = useUsersStore();

    return (
        <QueryLayout<TPaginate<TRole>> query={query}>
            <>
                {query.data ? (
                    <TitleCard title="All Roles" topMargin="mt-2">
                        <div className="w-full overflow-x-auto">
                            <table className="table w-full">
                                <thead>
                                    <tr>
                                        <th>Role name</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {query.data.data.map((user, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>
                                                    <div className="font-bold">{user.name}</div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>

                        {query.data?.total > 10 && (
                            <Paginator
                                currentPage={rolesFilters.page}
                                totalPages={query.data.last_page}
                                onSetCurrentPage={page => {
                                    setRolesFiltersField("page", page);
                                }}
                            />
                        )}
                    </TitleCard>
                ) : (
                    <></>
                )}
            </>
        </QueryLayout>
    );
};

export default Roles;

import TitleCard from "@components/cards/TitleCard";
import QueryLayout from "@components/layouts/QueryLayout";
import ModalOpener from "@components/modals/ModalOpener";
import Paginator from "@components/pure/Paginator";
import { useRolesQuery } from "@external/rbac";
import useSetPageTitle from "@hooks/useSetPageTitle";
import { TPaginate } from "@kinds/general";
import { TRole, TRoleModalOpenFor } from "@kinds/users";
import RoleModal from "@screens/roleList/RoleModal";
import useUsersStore from "@states/rbacStore";
import { useState } from "react";

const Roles = () => {
    useSetPageTitle("Roles");

    const [modalOpenFor, setModalOpenFor] = useState<TRoleModalOpenFor | null>(null);

    const query = useRolesQuery();
    const { rolesFilters, setRolesFiltersField } = useUsersStore();

    const Button = (
        <ModalOpener
            onClick={() => {
                setModalOpenFor({
                    type: "new_role",
                });
            }}
        >
            <span className="btn btn-success">Add new Role</span>
        </ModalOpener>
    );

    return (
        <>
            <RoleModal modalOpenFor={modalOpenFor} />
            <QueryLayout<TPaginate<TRole>> query={query}>
                <>
                    {query.data ? (
                        <TitleCard title="All Roles" TopSideButtons={Button} topMargin="mt-2">
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
        </>
    );
};

export default Roles;

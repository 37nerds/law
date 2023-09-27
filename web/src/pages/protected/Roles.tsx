import type { TRole } from "@fetches/rbac/roles";
import type { TPaginate } from "@helpers/types";

import { useRolesQuery } from "@fetches/rbac/roles";

import useRolesStore from "@states/rolesStore";
import useSetPageTitle from "@hooks/useSetPageTitle";

import PageLayout from "@components/layouts/PageLayout";
import QueryLayout from "@components/layouts/QueryLayout";
import Paginator from "@components/pure/Paginator";
import NewRoleModal from "@screens/roles/NewRoleModal";
import RoleThreeDotDropdown from "@screens/roles/RoleThreeDotDropdown";
import EditRoleModal from "@screens/roles/EditRoleModal";

const Roles = () => {
    useSetPageTitle("Roles");

    const rolesQuery = useRolesQuery();

    const {
        filters: { page, newRoleModalOpen, editRoleModalOpen, editRoleId },
        setFiltersField,
    } = useRolesStore();

    return (
        <PageLayout>
            <NewRoleModal
                open={newRoleModalOpen}
                setOpen={value => {
                    setFiltersField("newRoleModalOpen", value);
                }}
            />

            <EditRoleModal
                open={editRoleModalOpen}
                setOpen={value => {
                    setFiltersField("editRoleModalOpen", value);
                }}
                roleId={editRoleId}
            />

            <div className="flex justify-end rounded border border-base-300 p-2">
                <button
                    className="text btn btn-success rounded text-base-100"
                    onClick={() => setFiltersField("newRoleModalOpen", true)}
                >
                    Add new role
                </button>
            </div>

            <QueryLayout<TPaginate<TRole>> query={rolesQuery}>
                {rolesQuery.data ? (
                    <div className="flex flex-col gap-2">
                        <div className="w-full rounded border border-base-300">
                            <table className="table w-full">
                                <thead>
                                    <tr>
                                        <th>Role name</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {rolesQuery.data.data.map((role, index) => {
                                        return (
                                            <tr key={index} className={`${index % 2 === 1 ? "bg-base-200" : ""}`}>
                                                <td>{role.name}</td>
                                                <td>{role.disable ? "Inactive" : "Active"}</td>
                                                <td className="flex justify-end">
                                                    <RoleThreeDotDropdown roleId={role.id} />
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>

                        {rolesQuery.data?.total > rolesQuery.data?.per_page ? (
                            <Paginator
                                currentPage={page}
                                totalPages={rolesQuery.data.last_page}
                                onSetCurrentPage={page => {
                                    setFiltersField("page", page);
                                }}
                            />
                        ) : (
                            <></>
                        )}
                    </div>
                ) : (
                    <></>
                )}
            </QueryLayout>
        </PageLayout>
    );
};

export default Roles;

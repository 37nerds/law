import type { TRole } from "@fetches/rbac/roles";
import type { TPaginate } from "@helpers/types";

import { useRolesQuery } from "@fetches/rbac/roles";

import Paginator from "@components/pure/Paginator";
import QueryWrapper from "@components/wrappers/QueryWrapper";
import useRolesStore from "@states/roles_store";
import RoleThreeDotDropdown from "./RoleThreeDotDropdown";

export const RolesTable = () => {
    const rolesQuery = useRolesQuery();

    const {
        filters: { page },
        setFiltersField,
    } = useRolesStore();

    return (
        <QueryWrapper<TPaginate<TRole>> query={rolesQuery}>
            {rolesQuery.data ? (
                <div className="flex flex-col gap-2">
                    <div className="w-full rounded-lg border border-base-300">
                        <table className="table table-sm w-full">
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

                    <Paginator
                        currentPage={page}
                        totalPages={rolesQuery.data.last_page}
                        totalItems={rolesQuery.data?.total}
                        totalPerPageItems={rolesQuery.data?.per_page}
                        onSetCurrentPage={page => {
                            setFiltersField("page", page);
                        }}
                    />
                </div>
            ) : (
                <></>
            )}
        </QueryWrapper>
    );
};

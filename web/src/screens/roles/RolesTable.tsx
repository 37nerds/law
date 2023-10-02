import { TRoleColumn, useRolesPaginatedQuery } from "@fetches/rbac/roles";

import Table from "@components/tables/Table";
import Th from "@components/tables/Th";
import PaginationWrapper from "@components/wrappers/PaginationWrapper";
import useRolesStore from "@states/roles_store";
import RoleThreeDotDropdown from "./RoleThreeDotDropdown";
import { THeader } from "@helpers/types";

export const RolesTable = () => {
    const rolesQuery = useRolesPaginatedQuery();

    const { page, sortColumn, sortOrder } = useRolesStore(state => state.filters);
    const { setFiltersField } = useRolesStore(state => state);

    const handleSort = (column: TRoleColumn) => {
        setFiltersField("page", 1);
        if (sortColumn !== column) {
            setFiltersField("sortColumn", column);
            setFiltersField("sortOrder", "asc");
        } else {
            const nextOrder = sortOrder === "asc" ? "desc" : "asc";
            setFiltersField("sortOrder", nextOrder);
        }
    };

    const headers: THeader<TRoleColumn>[] = [
        { name: "name", label: "Role name" },
        { name: "disable", label: "Status" },
    ];

    return (
        <PaginationWrapper
            query={rolesQuery}
            page={page}
            onSetPage={page => {
                setFiltersField("page", page);
            }}
        >
            <Table>
                <thead>
                    <tr>
                        {headers.map((header, index) => (
                            <Th<TRoleColumn>
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
                    {rolesQuery?.data?.data.map((role, index) => {
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
            </Table>
        </PaginationWrapper>
    );
};

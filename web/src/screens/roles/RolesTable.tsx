import type { TRoleColumn } from "../../queries/rbac/roles";
import type { THeader, TThreeDropDownOption } from "@helpers/types";

import { useDeleteRoleMutation, useRolesPaginatedQuery } from "../../queries/rbac/roles";
import { isPermitted } from "@states/auth_store";

import useRolesStore from "@states/roles_store";

import Table from "@components/tables/Table";
import Th from "@components/tables/Th";
import PaginationWrapper from "@components/wrappers/PaginationWrapper";
import ThreeDotDropdown from "@components/dropdowns/ThreeDotDropdown";

const RoleThreeDotDropdown = ({ roleId }: { roleId: string }) => {
    const { setFiltersField } = useRolesStore();

    const roleDeleteMutation = useDeleteRoleMutation();

    const options: TThreeDropDownOption[] = [];

    if (isPermitted("api/v1/rbac/roles", "patch")) {
        options.push({
            content: <button className=" btn btn-success btn-sm w-full text-xs text-base-100">Edit</button>,
            handler: () => {
                setFiltersField("editRoleId", roleId);
                setFiltersField("editRoleModalOpen", true);
            },
        });
    }

    if (isPermitted("api/v1/rbac/roles", "delete")) {
        options.push({
            content: <button className=" btn btn-error btn-sm w-full text-xs text-base-100">Delete</button>,
            handler: () => {
                if (confirm("Are you sure you want to delete this role?")) {
                    roleDeleteMutation.mutate(roleId);
                    setFiltersField("editRoleId", "");
                }
            },
        });
    }

    return <ThreeDotDropdown options={options} />;
};

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
                    {rolesQuery.data?.data?.map((role, index) => {
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

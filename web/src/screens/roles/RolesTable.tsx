import { useRolesQuery } from "@fetches/rbac/roles";

import Table from "@components/tables/Table";
import PaginationWrapper from "@components/wrappers/PaginationWrapper";
import useRolesStore from "@states/roles_store";
import RoleThreeDotDropdown from "./RoleThreeDotDropdown";

export const RolesTable = () => {
    const rolesQuery = useRolesQuery();

    const { page } = useRolesStore(state => state.filters);
    const setFiltersField = useRolesStore(state => state.setFiltersField);

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
                        <th>Role name</th>
                        <th>Status</th>
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

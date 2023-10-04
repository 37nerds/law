import CAD from "@components/tables/CAD";
import { useRolesDeleteMutation, useRolesPaginatedQuery } from "@queries/rbac/roles";
import useRolesStore from "@states/roles_store";
import { useEffect } from "react";

const RoleCAD = () => {
    const { selectionList, setSelectionList } = useRolesStore(state => state);

    const rolesQuery = useRolesPaginatedQuery();
    const deleteRolesMutation = useRolesDeleteMutation();

    useEffect(() => {
        if (deleteRolesMutation.isSuccess) {
            setSelectionList([]);
        }
    }, [deleteRolesMutation.isSuccess]);

    return (
        <CAD
            onDeselect={() => setSelectionList([])}
            onSelect={() => setSelectionList(rolesQuery?.data?.data?.map(role => role.id) || [])}
            length={selectionList.length}
            checked={selectionList.length === rolesQuery?.data?.data.length}
            api="api/v1/rbac/roles"
            onClick={() => deleteRolesMutation.mutate(selectionList)}
            disabled={deleteRolesMutation.isLoading}
        />
    );
};

export default RoleCAD;

import { useEffect } from "react";
import { useUsersDeleteMutation, useUsersPaginatedQuery } from "@queries/rbac/users";

import useUsersStore from "@states/users_store";

import CAD from "@components/tables/CAD";

const UserCAD = () => {
    const { selectionList, setSelectionList } = useUsersStore();

    const usersQuery = useUsersPaginatedQuery();
    const deleteUsersMutation = useUsersDeleteMutation();

    useEffect(() => {
        if (deleteUsersMutation.isSuccess) {
            setSelectionList([]);
        }
    }, [deleteUsersMutation.isSuccess]);

    return (
        <CAD
            onDeselect={() => setSelectionList([])}
            onSelect={() => setSelectionList(usersQuery?.data?.data?.map(user => user.id) || [])}
            length={selectionList.length}
            checked={selectionList.length === usersQuery?.data?.data.length}
            api="api/v1/rbac/users"
            onClick={() => deleteUsersMutation.mutate(selectionList)}
            disabled={deleteUsersMutation.isLoading}
        />
    );
};

export default UserCAD;

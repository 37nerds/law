import { useUsersPaginatedQuery } from "@queries/rbac/users";

import useUsersStore from "@states/users_store";

import CheckboxInput from "@components/inputs/CheckboxInput";
import IsPermitted from "@components/auth/IsPermitted";

const SelectButtonAndCheckbox = () => {
    const { selectionList, setSelectionList } = useUsersStore();

    const usersQuery = useUsersPaginatedQuery();

    return (
        <>
            <CheckboxInput
                checked={selectionList.length === usersQuery?.data?.data.length}
                onChange={() => {
                    if (selectionList.length === usersQuery?.data?.data.length) {
                        setSelectionList([]);
                    } else {
                        setSelectionList(usersQuery?.data?.data?.map(user => user.id) || []);
                    }
                }}
                className="checkbox-success"
            />
            {selectionList.length > 0 && (
                <IsPermitted
                    api="api/v1/rbac/users"
                    method="delete"
                    element={
                        <button
                            onClick={() => console.log("clicked")}
                            type="button"
                            className="btn btn-error text-white"
                        >
                            Delete Selected Users
                        </button>
                    }
                />
            )}
        </>
    );
};

export default SelectButtonAndCheckbox;

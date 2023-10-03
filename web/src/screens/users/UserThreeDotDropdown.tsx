import type { TThreeDropDownOption } from "@helpers/types";

import { useUserDeleteMutation } from "@fetches/rbac/users";
import { isPermitted } from "@states/auth_store";

import ThreeDotDropdown from "@components/dropdowns/ThreeDotDropdown";
import useUsersStore from "@states/users_store";

const UserThreeDotDropdown = ({ userId }: { userId: string }) => {
    const { setFiltersField } = useUsersStore();

    const userDeleteMutation = useUserDeleteMutation();

    const options: TThreeDropDownOption[] = [];

    if (isPermitted("api/v1/rbac/users", "patch")) {
        options.push({
            content: <button className=" btn btn-success btn-sm w-full text-xs text-base-100">Edit</button>,
            handler: () => {
                setFiltersField("editUserId", userId);
                setFiltersField("editUserModalOpen", true);
            },
        });
    }

    if (isPermitted("api/v1/rbac/users", "delete")) {
        options.push({
            content: <button className=" btn btn-error btn-sm w-full text-xs text-base-100">Delete</button>,
            handler: () => {
                if (confirm("Are you sure you want to delete this user?")) {
                    userDeleteMutation.mutate(userId);
                }
            },
        });
    }

    return <ThreeDotDropdown options={options} />;
};

export default UserThreeDotDropdown;

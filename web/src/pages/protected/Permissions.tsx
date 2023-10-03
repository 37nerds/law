import { useRolesQuery } from "../../queries/rbac/roles";

import useSetPageTitle from "@hooks/useSetPageTitle";
import usePermissionsStore from "@states/permissions_store";

import SelectInput from "@components/inputs/SelectInput";
import PageCard from "@components/cards/PageCard";
import SingleInputBox from "@components/inputs/SingleInputBox";
import PermissionView from "@screens/permissions/PermissionView";
import SelectDeselectAllButton from "@screens/permissions/SelectDeselectAllButton";

const Permissions = () => {
    useSetPageTitle("Give Permissions");

    const rolesQuery = useRolesQuery();

    const { role_id } = usePermissionsStore(state => state.filters);
    const { setFiltersField } = usePermissionsStore(state => state);

    return (
        <PageCard>
            <div className="flex flex-col gap-5">
                <SingleInputBox
                    label="Role"
                    element={
                        <SelectInput
                            required={true}
                            placeholder={"Select role"}
                            value={role_id}
                            options={
                                rolesQuery?.data?.map((role: any) => ({
                                    name: role.name,
                                    value: role.id,
                                })) || []
                            }
                            setValue={value => setFiltersField("role_id", value)}
                        />
                    }
                />

                <PermissionView />
                <SelectDeselectAllButton roleId={role_id} />
            </div>
        </PageCard>
    );
};

export default Permissions;

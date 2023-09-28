import { useRolesQuery } from "@fetches/rbac/roles";
import { useEffect } from "react";
import { useAuthStore } from "@states/auth_store";

import SelectInput from "@components/inputs/SelectInput";
import PageCard from "@components/cards/PageCard";
import SingleInputBox from "@components/inputs/SingleInputBox";
import usePermissionsStore from "@states/permissions_store";
import CheckboxInput from "@components/inputs/CheckboxInput";
import ResourcesTable from "@screens/permissions/ResourcesTable";

const Permissions = () => {
    const rolesQuery = useRolesQuery();

    const {
        filters: { role_id },
        setFiltersField,
    } = usePermissionsStore();

    const { loggedUser } = useAuthStore();

    useEffect(() => {
        if (loggedUser?.role_id) {
            setFiltersField("role_id", loggedUser?.role_id);
        }
    }, [loggedUser?.role_id]);

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
                                rolesQuery?.data?.data.map((role: any) => ({
                                    name: role.name,
                                    value: role.id,
                                })) || []
                            }
                            setValue={value => setFiltersField("role_id", value)}
                        />
                    }
                />

                <ResourcesTable />

                <div className="flex justify-end gap-5">
                    <div>Select/Deselect All</div>
                    <CheckboxInput checked={false} onChange={() => console.log("clicked")} />
                </div>
            </div>
        </PageCard>
    );
};

export default Permissions;

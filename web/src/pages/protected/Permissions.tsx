import SelectInput from "@components/inputs/SelectInput";
import PageLayout from "@components/layouts/PageLayout";
import SingleInputBox from "@components/layouts/SingleInputBox";
import { useRolesQuery } from "@fetches/rbac/roles";
import usePermissionsStore from "@states/permissions_store";

const Permissions = () => {
    const rolesQuery = useRolesQuery();

    const {
        filters: { role_id },
        setFiltersField,
    } = usePermissionsStore();

    return (
        <PageLayout>
            {/* selection */}
            <div>
                <SingleInputBox
                    required={true}
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
                    // errorMessage={newUserError["role_id"]}
                />

                <SingleInputBox
                    label={"Select/Deselect All"}
                    element={
                        <input
                            type="checkbox"
                            checked={false}
                            className="checkbox"
                            onClick={() => console.log("checkebox")}
                        />
                    }
                />
            </div>

            {/* header */}
            <div></div>
        </PageLayout>
    );
};

export default Permissions;

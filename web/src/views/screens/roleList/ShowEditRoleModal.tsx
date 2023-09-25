import StringInput from "@components/inputs/StringInput";
import { useRolesQuery } from "@external/rbac";
import useRbacStore from "@states/rbacStore";
import RoleModalLayout from "./RoleModalLayout";

const ShowEditRoleModal = () => {
    const rolesQuery = useRolesQuery();

    const { user, setUserField } = useRbacStore();

    return (
        <RoleModalLayout title="Edit Role" isModalForNewRole={false}>
            <StringInput label="Role Name" value="" setValue={() => console.log("object")} />
        </RoleModalLayout>
    );
};

export default ShowEditRoleModal;

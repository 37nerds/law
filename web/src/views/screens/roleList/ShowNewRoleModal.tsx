import StringInput from "@components/inputs/StringInput";
import RoleModalLayout from "./RoleModalLayout";

const ShowNewRoleModal = () => {
    return (
        <RoleModalLayout title="Add Role" isModalForNewRole={true}>
            <StringInput label="Role Name" value="" setValue={value => console.log("object")} />
        </RoleModalLayout>
    );
};

export default ShowNewRoleModal;

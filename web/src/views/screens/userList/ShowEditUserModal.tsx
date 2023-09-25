import StringInput from "@components/inputs/StringInput";
import DoubleInputBox from "@components/layouts/DoubleInputBox";
import { useRolesQuery } from "@external/rbac";
import useRbacStore from "@states/rbacStore";
import { useState } from "react";
import UserModalLayout from "./UserModalLayout";
import LadderSelectInput from "@components/inputs/LadderSelectInput";

const ShowEditUserModal = () => {
    const [isEdit, setIsEdit] = useState(false);

    const rolesQuery = useRolesQuery();

    const { user, setUserField } = useRbacStore();

    return (
        <UserModalLayout title="Add user" isModalForNewUser={true} onEditToggle={() => setIsEdit(!isEdit)}>
            <>
                <DoubleInputBox
                    label1="Email"
                    element1={
                        <StringInput
                            value={user["email"]}
                            disabled={!isEdit}
                            setValue={value => setUserField("email", value)}
                        />
                    }
                    label2="Username"
                    element2={
                        <StringInput
                            value={user["username"]}
                            disabled={!isEdit}
                            setValue={value => setUserField("username", value)}
                        />
                    }
                />

                <DoubleInputBox
                    label1="Name"
                    element1={
                        <StringInput
                            value={user["name"]}
                            disabled={!isEdit}
                            setValue={value => setUserField("name", value)}
                        />
                    }
                    label2="password"
                    element2={
                        <StringInput
                            value={user["password"]}
                            disabled={!isEdit}
                            setValue={value => setUserField("password", value)}
                        />
                    }
                />

                <DoubleInputBox
                    label1="Unit"
                    element1={
                        <LadderSelectInput
                            value={user["role_id"]}
                            options={
                                rolesQuery?.data?.data?.map((unit: any) => ({
                                    value: unit.id,
                                    name: unit.name,
                                })) || []
                            }
                            setValue={value => setUserField("role_id", value)}
                            disabled={!isEdit}
                        />
                    }
                    label2="address"
                    element2={
                        <StringInput
                            value={user["address"]}
                            disabled={!isEdit}
                            setValue={value => setUserField("address", value)}
                        />
                    }
                />
            </>
        </UserModalLayout>
    );
};

export default ShowEditUserModal;

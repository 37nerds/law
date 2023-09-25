import SelectInput from "@components/inputs/SelectInput";
import StringInput from "@components/inputs/StringInput";
import DoubleInputBox from "@components/layouts/DoubleInputBox";
import { useRolesQuery } from "@external/rbac";
import useUsersStore from "@states/rbacStore";
import UserModalLayout from "./UserModalLayout";

const ShowNewUserModal = () => {
    const rolesQuery = useRolesQuery();

    const { user, setUserField } = useUsersStore();

    return (
        <UserModalLayout title="Add user" isModalForNewUser={true}>
            <>
                <DoubleInputBox
                    required1
                    required2
                    label1="Email"
                    element1={<StringInput value={user["email"]} setValue={value => setUserField("email", value)} />}
                    label2="Username"
                    element2={
                        <StringInput value={user["username"]} setValue={value => setUserField("username", value)} />
                    }
                />

                <DoubleInputBox
                    required1
                    required2
                    label1="Name"
                    element1={<StringInput value={user["name"]} setValue={value => setUserField("name", value)} />}
                    label2="phone"
                    element2={<StringInput value={user["phone"]} setValue={value => setUserField("phone", value)} />}
                />

                <DoubleInputBox
                    required1
                    required2
                    label1="Password"
                    element1={
                        <StringInput value={user["password"]} setValue={value => setUserField("password", value)} />
                    }
                    label2="Confirm Password"
                    element2={
                        <StringInput
                            value={user["password_confirmation"]}
                            setValue={value => setUserField("password_confirmation", value)}
                        />
                    }
                />

                <DoubleInputBox
                    required1
                    required2
                    label1="Role"
                    element1={
                        <SelectInput
                            value={user["role_id"]}
                            options={
                                rolesQuery?.data?.data.map((role: any) => ({
                                    name: role.name,
                                    value: role.id,
                                })) || []
                            }
                            setValue={value => setUserField("role_id", value)}
                        />
                    }
                    label2="Address"
                    element2={
                        <StringInput value={user["address"]} setValue={value => setUserField("address", value)} />
                    }
                />
            </>
        </UserModalLayout>
    );
};

export default ShowNewUserModal;
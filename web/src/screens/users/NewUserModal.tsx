import { useEffect } from "react";
import { useRolesQuery } from "@fetches/rbac/roles";
import { useSaveUserMutation } from "@fetches/rbac/users";

import EmailInput from "@components/inputs/EmailInput";
import PasswordInput from "@components/inputs/PasswordInput";
import SelectInput from "@components/inputs/SelectInput";
import StringInput from "@components/inputs/StringInput";
import SingleInputBox from "@components/layouts/SingleInputBox";
import Modal from "@components/modals2/Modal";
import Title from "@components/pure/Title";
import useUsersStore from "@states/usersStore";

const NewUserModal = ({ open, setOpen }: { open: boolean; setOpen: (open: boolean) => void }) => {
    const rolesQuery = useRolesQuery();
    const saveUserMutation = useSaveUserMutation();

    const {
        newUser,
        setNewUserField,
        newUserError,
        setNewUserErrorField,
        setNewUserError,
        setNewUserEmpty,
        setNewUserErrorEmpty,
    } = useUsersStore();

    useEffect(() => {
        if (saveUserMutation.isError && saveUserMutation?.error?.errors) {
            setNewUserError(saveUserMutation?.error?.errors);
        }
    }, [saveUserMutation.isError, saveUserMutation?.error?.errors]);

    useEffect(() => {
        if (saveUserMutation.isSuccess) {
            setOpen(false);
            setNewUserEmpty();
            setNewUserErrorEmpty();
        }
    }, [saveUserMutation.isSuccess]);

    const handleSubmit = () => {
        if (newUser.username.length < 6) {
            setNewUserErrorField("username", ["Must be at least 6 characters"]);
            return;
        }

        saveUserMutation.mutate(newUser);
    };

    return (
        <Modal
            isForm={true}
            open={open}
            setOpen={setOpen}
            onSubmit={handleSubmit}
            buttons={[
                <button type="submit" className="btn btn-success text-base-100">
                    Submit
                </button>,
            ]}
            widthClass="w-[800px]"
        >
            <div className="flex flex-col gap-5">
                <div className="my-3 flex justify-center">
                    <Title>ADD NEW USER</Title>
                </div>
                <div className="flex flex-col gap-5">
                    <SingleInputBox
                        label="Email"
                        required={true}
                        element={
                            <EmailInput
                                required={true}
                                value={newUser["email"]}
                                setValue={value => setNewUserField("email", value)}
                            />
                        }
                        errorMessage={newUserError["email"]}
                    />
                    <SingleInputBox
                        required={true}
                        label="Username"
                        element={
                            <StringInput
                                required={true}
                                value={newUser["username"]}
                                setValue={value => setNewUserField("username", value)}
                            />
                        }
                        errorMessage={newUserError["username"]}
                    />
                    <SingleInputBox
                        required={true}
                        label="Password"
                        element={
                            <PasswordInput
                                required={true}
                                value={newUser["password"]}
                                setValue={value => setNewUserField("password", value)}
                            />
                        }
                        errorMessage={newUserError["password"]}
                    />

                    <SingleInputBox
                        required={true}
                        label="Role"
                        element={
                            <SelectInput
                                required={true}
                                placeholder={"Choose role"}
                                value={newUser["role_id"]}
                                options={
                                    rolesQuery?.data?.data.map((role: any) => ({
                                        name: role.name,
                                        value: role.id,
                                    })) || []
                                }
                                setValue={value => setNewUserField("role_id", value)}
                            />
                        }
                        errorMessage={newUserError["role_id"]}
                    />

                    <SingleInputBox
                        required={true}
                        label="Name"
                        element={
                            <StringInput
                                required={true}
                                value={newUser["name"]}
                                setValue={value => setNewUserField("name", value)}
                            />
                        }
                        errorMessage={newUserError["name"]}
                    />

                    <SingleInputBox
                        label="phone"
                        element={
                            <StringInput value={newUser["phone"]} setValue={value => setNewUserField("phone", value)} />
                        }
                        errorMessage={newUserError["phone"]}
                    />

                    <SingleInputBox
                        label="Address"
                        element={
                            <StringInput
                                value={newUser["address"]}
                                setValue={value => setNewUserField("address", value)}
                            />
                        }
                        errorMessage={newUserError["address"]}
                    />
                </div>
            </div>
        </Modal>
    );
};

export default NewUserModal;

import { useRolesQuery, useUserQuery } from "@external/rbac";

import EmailInput from "@components/inputs/EmailInput";
import SelectInput from "@components/inputs/SelectInput";
import StringInput from "@components/inputs/StringInput";
import SingleInputBox from "@components/layouts/SingleInputBox";
import Modal from "@components/modals2/Modal";
import Title from "@components/pure/Title";
import useUsersStore from "@states/usersStore";
import QueryLayout from "@components/layouts/QueryLayout";

const EditUserModal = ({
    open,
    setOpen,
    userId,
}: {
    open: boolean;
    setOpen: (open: boolean) => void;
    userId: string;
}) => {
    const rolesQuery = useRolesQuery();

    const { editUser, setEditUserField, editUserError } = useUsersStore();

    const userQuery = useUserQuery(userId);

    // useEffect(() => {
    //     if (saveUserMutation.isError && saveUserMutation?.error?.errors) {
    //         setNewUserError(saveUserMutation?.error?.errors);
    //     }
    // }, [saveUserMutation.isError, saveUserMutation?.error?.errors]);

    // useEffect(() => {
    //     if (saveUserMutation.isSuccess) {
    //         setOpen(false);
    //         setNewUserEmpty();
    //     }
    // }, [saveUserMutation.isSuccess]);

    // const handleSubmit = () => {
    //     if (newUser.username.length < 6) {
    //         setNewUserErrorField("username", ["Must be at least 6 characters"]);
    //         return;
    //     }
    // };

    return (
        <Modal
            isForm={true}
            open={open}
            setOpen={setOpen}
            // onSubmit={handleSubmit}
            buttons={[
                <button type="submit" className="btn btn-success text-base-100">
                    Update
                </button>,
            ]}
            widthClass="w-[800px]"
        >
            <div className="flex flex-col gap-5">
                <div className="my-3 flex justify-center">
                    <Title>EDIT USER</Title>
                </div>

                <QueryLayout query={userQuery}>
                    <div className="flex flex-col gap-5">
                        <SingleInputBox
                            label="Email"
                            required={true}
                            element={
                                <EmailInput
                                    required={true}
                                    value={editUser["email"]}
                                    setValue={value => setEditUserField("email", value)}
                                />
                            }
                            errorMessage={editUserError["email"]}
                        />
                        <SingleInputBox
                            required={true}
                            label="Username"
                            element={
                                <StringInput
                                    required={true}
                                    value={editUser["username"]}
                                    setValue={value => setEditUserField("username", value)}
                                />
                            }
                            errorMessage={editUserError["username"]}
                        />

                        <SingleInputBox
                            required={true}
                            label="Role"
                            element={
                                <SelectInput
                                    required={true}
                                    placeholder={"Choose role"}
                                    value={editUser["role_id"]}
                                    options={
                                        rolesQuery?.data?.data.map((role: any) => ({
                                            name: role.name,
                                            value: role.id,
                                        })) || []
                                    }
                                    setValue={value => setEditUserField("role_id", value)}
                                />
                            }
                            errorMessage={editUserError["role_id"]}
                        />

                        <SingleInputBox
                            required={true}
                            label="Name"
                            element={
                                <StringInput
                                    required={true}
                                    value={editUser["name"]}
                                    setValue={value => setEditUserField("name", value)}
                                />
                            }
                            errorMessage={editUserError["name"]}
                        />

                        <SingleInputBox
                            label="phone"
                            element={
                                <StringInput
                                    value={editUser["phone"]}
                                    setValue={value => setEditUserField("phone", value)}
                                />
                            }
                            errorMessage={editUserError["phone"]}
                        />

                        <SingleInputBox
                            label="Address"
                            element={
                                <StringInput
                                    value={editUser["address"]}
                                    setValue={value => setEditUserField("address", value)}
                                />
                            }
                            errorMessage={editUserError["address"]}
                        />
                    </div>
                </QueryLayout>
            </div>
        </Modal>
    );
};

export default EditUserModal;

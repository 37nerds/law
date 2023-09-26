import { useRolesQuery, useUserQuery } from "@external/rbac";

import EmailInput from "@components/inputs/EmailInput";
import SelectInput from "@components/inputs/SelectInput";
import StringInput from "@components/inputs/StringInput";
import QueryLayout from "@components/layouts/QueryLayout";
import SingleInputBox from "@components/layouts/SingleInputBox";
import Modal from "@components/modals2/Modal";
import Title from "@components/pure/Title";
import useUsersStore from "@states/usersStore";

const EditUserModal = ({ open, setOpen }: { open: boolean; setOpen: (open: boolean) => void }) => {
    const rolesQuery = useRolesQuery();

    const { editUser, setEditUserField, newUserError, setNewUserErrorField, setNewUserError, setNewUserEmpty } =
        useUsersStore();

    const userQuery = useUserQuery();

    console.log("single user", userQuery.data);

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
                            errorMessage={newUserError["email"]}
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
                            errorMessage={newUserError["username"]}
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
                            errorMessage={newUserError["role_id"]}
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
                            errorMessage={newUserError["name"]}
                        />

                        <SingleInputBox
                            label="phone"
                            element={
                                <StringInput
                                    value={editUser["phone"]}
                                    setValue={value => setEditUserField("phone", value)}
                                />
                            }
                            errorMessage={newUserError["phone"]}
                        />

                        <SingleInputBox
                            label="Address"
                            element={
                                <StringInput
                                    value={editUser["address"]}
                                    setValue={value => setEditUserField("address", value)}
                                />
                            }
                            errorMessage={newUserError["address"]}
                        />
                    </div>
                </QueryLayout>
            </div>
        </Modal>
    );
};

export default EditUserModal;

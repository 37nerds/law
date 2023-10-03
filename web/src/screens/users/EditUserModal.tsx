import { useEffect } from "react";
import { useRolesQuery } from "@fetches/rbac/roles";
import { useUserEditMutation, useUserQuery } from "@fetches/rbac/users";

import useUsersStore from "@states/users_store";

import EmailInput from "@components/inputs/EmailInput";
import SelectInput from "@components/inputs/SelectInput";
import StringInput from "@components/inputs/StringInput";
import QueryWrapper from "@components/wrappers/QueryWrapper";
import SingleInputBox from "@components/inputs/SingleInputBox";
import Modal from "@components/modals/Modal";
import { notify } from "@helpers/notify";

const EditUserModal = ({
    open,
    setOpen,
    userId,
}: {
    open: boolean;
    setOpen: (open: boolean) => void;
    userId: string;
}) => {
    const {
        editUser,
        setEditUserField,
        editUserError,
        setEditUserError,
        setEditUserErrorField,
        setEditUserErrorEmpty,
        setEditUserEmpty,
        setEditUser,
    } = useUsersStore();

    const rolesQuery = useRolesQuery();

    const userQuery = useUserQuery(userId);

    useEffect(() => {
        if (userQuery.isSuccess) {
            setEditUser({
                username: userQuery.data.username,
                address: userQuery.data.address,
                email: userQuery.data.email,
                name: userQuery.data.name,
                phone: userQuery.data.phone,
                role_id: userQuery.data.role_id,
            });
        }
    }, [userQuery.isSuccess]);

    const userEditMutation = useUserEditMutation();

    useEffect(() => {
        if (userEditMutation.isError && userEditMutation?.error?.errors) {
            setEditUserError(userEditMutation?.error?.errors);
        }
    }, [userEditMutation.isError, userEditMutation?.error?.errors]);

    useEffect(() => {
        if (userEditMutation.isSuccess) {
            setOpen(false);
            setEditUserEmpty();
            setEditUserErrorEmpty();
        }
    }, [userEditMutation.isSuccess]);

    const handleSubmit = () => {
        if (editUser.username.length < 6) {
            setEditUserErrorField("username", ["Must be at least 6 characters"]);
            return;
        }

        userEditMutation.mutate({
            ...editUser,
            id: userId,
        });
    };

    return (
        <Modal
            isForm={true}
            open={open}
            setOpen={setOpen}
            onSubmit={handleSubmit}
            buttons={[
                <button type="submit" className="btn btn-success text-base-100">
                    Update
                </button>,
            ]}
            widthClass="w-[800px]"
            title="EDIT USER"
        >
            <div className="flex flex-col gap-5">
                <QueryWrapper query={userQuery}>
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
                                        rolesQuery?.data?.map((role: any) => ({
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
                </QueryWrapper>
            </div>
        </Modal>
    );
};

export default EditUserModal;

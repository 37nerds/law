import { useEffect } from "react";
import { useEditUserMutation, useRolesQuery, useUserQuery } from "@external/rbac";

import EmailInput from "@components/inputs/EmailInput";
import SelectInput from "@components/inputs/SelectInput";
import StringInput from "@components/inputs/StringInput";
import QueryLayout from "@components/layouts/QueryLayout";
import SingleInputBox from "@components/layouts/SingleInputBox";
import Modal from "@components/modals2/Modal";
import Title from "@components/pure/Title";
import useUsersStore from "@states/usersStore";
import useRolesStore from "@states/rolesStore";

const EditRoleModal = ({
    open,
    setOpen,
    userId,
}: {
    open: boolean;
    setOpen: (open: boolean) => void;
    userId: string;
}) => {
    const rolesQuery = useRolesQuery();

    const {
        editRole,
        editRoleError,
        setEditRoleEmpty,
        setEditRoleError,
        setEditRoleField,
        setEditRoleErrorEmpty,
    } = useRolesStore();

    const userQuery = useUserQuery(userId);
    const userEditMutation = useEditUserMutation();

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
        >
            <div className="flex flex-col gap-5">
                <div className="my-3 flex justify-center">
                    <Title>EDIT Role</Title>
                </div>

                <QueryLayout query={userQuery}>
                <div className="flex flex-col gap-5">
                <div className="my-3 flex justify-center">
                    <Title>EDIT ROLE</Title>
                </div>
                <div className="flex flex-col gap-5">
                    <SingleInputBox
                        label="Role name"
                        required={true}
                        element={
                            <StringInput
                                required={true}
                                value={newRole["name"]}
                                setValue={value => setNewRoleField("name", value)}
                            />
                        }
                        errorMessage={newRoleError["name"]}
                    />
                </div>
            </div>
                </QueryLayout>
            </div>
        </Modal>
    );
};

export default EditRoleModal;

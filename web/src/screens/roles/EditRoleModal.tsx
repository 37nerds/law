import { useEffect } from "react";
import { useEditRoleMutation, useRoleQuery } from "@fetches/rbac/roles";

import useRolesStore from "@states/roles_store";

import StringInput from "@components/inputs/StringInput";
import SingleInputBox from "@components/inputs/SingleInputBox";
import Modal from "@components/modals/Modal";
import Loading from "@components/pure/Loading";
import ErrorText from "@components/pure/ErrorText";
import CheckboxInput from "@components/inputs/CheckboxInput";

const EditRoleModal = ({
    open,
    setOpen,
    roleId,
}: {
    open: boolean;
    setOpen: (open: boolean) => void;
    roleId: string;
}) => {
    const {
        setEditRole,
        editRole,
        editRoleError,
        setEditRoleEmpty,
        setEditRoleError,
        setEditRoleField,
        setEditRoleErrorEmpty,
    } = useRolesStore();

    const roleQuery = useRoleQuery(roleId);

    useEffect(() => {
        if (roleQuery.isSuccess) {
            setEditRole({
                name: roleQuery.data?.name,
                disable: roleQuery.data.disable,
            });
        }
    }, [roleQuery.isSuccess, roleQuery.data]);

    const roleEditMutation = useEditRoleMutation();

    useEffect(() => {
        if (roleEditMutation.isError && roleEditMutation?.error?.errors) {
            setEditRoleError(roleEditMutation?.error?.errors);
        }
    }, [roleEditMutation.isError, roleEditMutation?.error?.errors]);

    useEffect(() => {
        if (roleEditMutation.isSuccess) {
            setOpen(false);
            setEditRoleEmpty();
            setEditRoleErrorEmpty();
        }
    }, [roleEditMutation.isSuccess]);

    const handleSubmit = () => {
        roleEditMutation.mutate({
            ...editRole,
            id: roleId,
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
            title="EDIT ROLE"
        >
            <div className="flex flex-col gap-5">
                {roleQuery.isLoading ? (
                    <Loading />
                ) : roleQuery.isError ? (
                    <ErrorText>{roleQuery.error?.message || ""}</ErrorText>
                ) : !roleQuery.data ? (
                    <ErrorText>{"data is null"}</ErrorText>
                ) : (
                    <div className="flex flex-col gap-5">
                        <SingleInputBox
                            label="Role name"
                            required={true}
                            element={
                                <StringInput
                                    required={true}
                                    value={editRole["name"]}
                                    setValue={value => setEditRoleField("name", value)}
                                />
                            }
                            errorMessage={editRoleError["name"]}
                        />
                        <SingleInputBox
                            label={"Is Enable"}
                            element={
                                <CheckboxInput
                                    checked={!editRole.disable}
                                    onChange={() => setEditRoleField("disable", !editRole.disable)}
                                />
                            }
                        />
                    </div>
                )}
            </div>
        </Modal>
    );
};

export default EditRoleModal;

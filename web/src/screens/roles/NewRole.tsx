import { useSaveRoleMutation } from "@fetches/rbac/roles";
import { useEffect } from "react";

import SingleInputBox from "@components/inputs/SingleInputBox";
import StringInput from "@components/inputs/StringInput";
import Modal from "@components/modals/Modal";
import useRolesStore from "@states/roles_store";

const NewRoleModal = ({ open, setOpen }: { open: boolean; setOpen: (open: boolean) => void }) => {
    const { newRole, setNewRoleField, newRoleError, setNewRoleError, setNewRoleEmpty } = useRolesStore();

    const newRoleMutation = useSaveRoleMutation();

    useEffect(() => {
        if (newRoleMutation.isError && newRoleMutation?.error?.errors) {
            setNewRoleError(newRoleMutation?.error?.errors);
        }
    }, [newRoleMutation.isError, newRoleMutation?.error?.errors]);

    useEffect(() => {
        if (newRoleMutation.isSuccess) {
            setOpen(false);
            setNewRoleEmpty();
        }
    }, [newRoleMutation.isSuccess]);

    return (
        <Modal
            isForm={true}
            open={open}
            setOpen={setOpen}
            onSubmit={() => newRoleMutation.mutate(newRole)}
            buttons={[
                <button type="submit" className="btn btn-success text-base-100">
                    Submit
                </button>,
            ]}
            widthClass="w-[800px]"
            title="ADD NEW ROLE"
        >
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
        </Modal>
    );
};

const NewRole = () => {
    const { newRoleModalOpen } = useRolesStore(state => state.filters);
    const { setFiltersField } = useRolesStore(state => state);

    return (
        <>
            <NewRoleModal
                open={newRoleModalOpen}
                setOpen={value => {
                    setFiltersField("newRoleModalOpen", value);
                }}
            />

            <button
                className="text btn btn-success rounded-md text-base-100"
                onClick={() => setFiltersField("newRoleModalOpen", true)}
            >
                Add new role
            </button>
        </>
    );
};

export default NewRole;

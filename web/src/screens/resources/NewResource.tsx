import { useEffect } from "react";
import { useSaveResourceMutation } from "@fetches/rbac/resources";

import useResourcesStore from "@states/resources_store";

import EmailInput from "@components/inputs/EmailInput";
import SelectInput from "@components/inputs/SelectInput";
import StringInput from "@components/inputs/StringInput";
import SingleInputBox from "@components/inputs/SingleInputBox";
import Modal from "@components/modals/Modal";
import AddButton from "@components/buttons/AddButton";
import SubmitButton from "@components/buttons/SubmitButton";

const NewResourceModal = ({ open, setOpen }: { open: boolean; setOpen: (open: boolean) => void }) => {
    const saveResourceMutation = useSaveResourceMutation();

    const {
        newResource,
        setNewResourceField,
        newResourceError,
        setNewResourceError,
        setNewResourceEmpty,
        setNewResourceErrorEmpty,
    } = useResourcesStore();

    useEffect(() => {
        if (saveResourceMutation.isError && saveResourceMutation?.error?.errors) {
            setNewResourceError(saveResourceMutation?.error?.errors);
        }
    }, [saveResourceMutation.isError, saveResourceMutation?.error?.errors]);

    useEffect(() => {
        if (saveResourceMutation.isSuccess) {
            setOpen(false);
            setNewResourceEmpty();
            setNewResourceErrorEmpty();
        }
    }, [saveResourceMutation.isSuccess]);

    const handleSubmit = () => {
        saveResourceMutation.mutate(newResource);
    };

    return (
        <Modal
            isForm={true}
            open={open}
            setOpen={setOpen}
            onSubmit={handleSubmit}
            buttons={[<SubmitButton />]}
            widthClass="w-[800px]"
            title="ADD NEW RESOURCE"
        >
            <div className="flex flex-col gap-5">
                <SingleInputBox
                    label="API"
                    required={true}
                    element={
                        <EmailInput
                            required={true}
                            value={newResource["api"]}
                            setValue={value => setNewResourceField("api", value)}
                        />
                    }
                    errorMessage={newResourceError["api"]}
                />
                <SingleInputBox
                    required={true}
                    label="Web"
                    element={
                        <StringInput required={true} value={""} setValue={value => setNewResourceField("web", value)} />
                    }
                    errorMessage={newResourceError["web"]}
                />
                <SingleInputBox
                    required={true}
                    label="Method"
                    element={
                        <SelectInput
                            placeholder={"Choose method"}
                            required={true}
                            value={newResource["method"]}
                            setValue={value => setNewResourceField("method", value)}
                            options={[
                                { name: "get", value: "get" },
                                { name: "post", value: "post" },
                                { name: "patch", value: "patch" },
                                { name: "delete", value: "delete" },
                            ]}
                        />
                    }
                    errorMessage={newResourceError["method"]}
                />
                <SingleInputBox
                    required={true}
                    label="Label"
                    element={
                        <StringInput
                            required={true}
                            value={newResource["label"]}
                            setValue={value => setNewResourceField("label", value)}
                        />
                    }
                    errorMessage={newResourceError["label"]}
                />

                <SingleInputBox
                    required={true}
                    label="Group"
                    element={
                        <StringInput
                            required={true}
                            value={newResource["group"]}
                            setValue={value => setNewResourceField("group", value)}
                        />
                    }
                    errorMessage={newResourceError["group"]}
                />

                <SingleInputBox
                    required={true}
                    label="Dependencies"
                    element={
                        <StringInput
                            required={true}
                            value={""}
                            setValue={value => setNewResourceField("dependencies", value)}
                        />
                    }
                    errorMessage={newResourceError["dependencies"]}
                />
            </div>
        </Modal>
    );
};

const NewResource = () => {
    const { newResourceModalOpen } = useResourcesStore(state => state.filters);
    const { setFiltersField } = useResourcesStore(state => state);

    return (
        <>
            <NewResourceModal
                open={newResourceModalOpen}
                setOpen={value => setFiltersField("newResourceModalOpen", value)}
            />
            <AddButton label="Resource" onClick={() => setFiltersField("newResourceModalOpen", true)} />
        </>
    );
};

export default NewResource;

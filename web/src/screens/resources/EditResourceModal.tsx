import type { TResource, TResourceDependency } from "@fetches/rbac/resources";
import type { TMethod } from "@helpers/types";

import { useEffect } from "react";
import { useEditResourceMutation, useResourceQuery, useResourcesQuery } from "@fetches/rbac/resources";

import useResourcesStore from "@states/resources_store";

import SelectInput from "@components/inputs/SelectInput";
import StringInput from "@components/inputs/StringInput";
import QueryWrapper from "@components/wrappers/QueryWrapper";
import SingleInputBox from "@components/inputs/SingleInputBox";
import Modal from "@components/modals/Modal";
import SubmitButton from "@components/buttons/SubmitButton";
import ArrayInput from "@components/inputs/ArrayInput";
import ArraySelectInput from "@components/inputs/ArraySelectInput";

const EditResourceModal = ({
    open,
    setOpen,
    resourceId,
}: {
    open: boolean;
    setOpen: (open: boolean) => void;
    resourceId: string;
}) => {
    if (!open) {
        return <></>;
    }

    const {
        editResource,
        setEditResourceField,
        editResourceError,
        setEditResourceError,
        setEditResourceErrorEmpty,
        setEditResource,
    } = useResourcesStore();

    const resourceQuery = useResourceQuery(resourceId);

    useEffect(() => {
        console.log(resourceQuery.isSuccess);
        if (resourceQuery.isSuccess) {
            setEditResource({
                id: resourceQuery.data.id,
                api: resourceQuery.data.api,
                web: resourceQuery.data.web,
                group: resourceQuery.data.group,
                method: resourceQuery.data.method,
                label: resourceQuery.data.label,
                dependencies: resourceQuery.data.dependencies,
            });
        }
    }, [resourceQuery.isSuccess]);

    const resourceEditMutation = useEditResourceMutation();

    useEffect(() => {
        if (resourceEditMutation.isError && resourceEditMutation?.error?.errors) {
            setEditResourceError(resourceEditMutation?.error?.errors);
        }
    }, [resourceEditMutation.isError, resourceEditMutation?.error?.errors]);

    useEffect(() => {
        if (resourceEditMutation.isSuccess) {
            setOpen(false);
            setEditResource({
                id: resourceEditMutation.data.id,
                api: resourceEditMutation.data.api,
                web: resourceEditMutation.data.web,
                group: resourceEditMutation.data.group,
                method: resourceEditMutation.data.method,
                label: resourceEditMutation.data.label,
                dependencies: resourceEditMutation.data.dependencies,
            });
            setEditResourceErrorEmpty();
        }
    }, [resourceEditMutation.isSuccess]);

    const handleSubmit = () => {
        resourceEditMutation.mutate({
            ...editResource,
            id: resourceId,
        });
    };

    const resourcesQuery = useResourcesQuery();

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
            <QueryWrapper<TResource> query={resourceQuery}>
                <div className="flex flex-col gap-5">
                    <SingleInputBox
                        label="API"
                        required={true}
                        element={
                            <StringInput
                                required={true}
                                value={editResource["api"]}
                                setValue={value => setEditResourceField("api", value)}
                            />
                        }
                        errorMessage={editResourceError["api"]}
                    />
                    <SingleInputBox
                        label="Web"
                        element={
                            <ArrayInput
                                value={editResource["web"]}
                                setValue={value => setEditResourceField("web", value)}
                            />
                        }
                        errorMessage={editResourceError["web"]}
                    />
                    <SingleInputBox
                        required={true}
                        label="Method"
                        element={
                            <SelectInput
                                placeholder={"Choose method"}
                                required={true}
                                value={editResource["method"]}
                                setValue={value => setEditResourceField("method", value)}
                                options={[
                                    { name: "get", value: "get" },
                                    { name: "post", value: "post" },
                                    { name: "patch", value: "patch" },
                                    { name: "delete", value: "delete" },
                                ]}
                            />
                        }
                        errorMessage={editResourceError["method"]}
                    />
                    <SingleInputBox
                        required={true}
                        label="Label"
                        element={
                            <StringInput
                                required={true}
                                value={editResource["label"]}
                                setValue={value => setEditResourceField("label", value)}
                            />
                        }
                        errorMessage={editResourceError["label"]}
                    />

                    <SingleInputBox
                        required={true}
                        label="Group"
                        element={
                            <StringInput
                                required={true}
                                value={editResource["group"]}
                                setValue={value => setEditResourceField("group", value)}
                            />
                        }
                        errorMessage={editResourceError["group"]}
                    />

                    <SingleInputBox
                        label="Dependencies"
                        element={
                            <ArraySelectInput
                                value={editResource["dependencies"]?.map(x => `${x.method} ${x.api}`)}
                                setValue={value =>
                                    setEditResourceField(
                                        "dependencies",
                                        value?.map(x => {
                                            const split = x.split(" ");
                                            const resourceDependency: TResourceDependency = {
                                                api: split[1],
                                                method: split[0] as TMethod,
                                            };
                                            return resourceDependency;
                                        })
                                    )
                                }
                                options={
                                    resourcesQuery?.data?.map(resource => {
                                        const x = `${resource.method} ${resource.api}`;
                                        return { name: x, value: x };
                                    }) || []
                                }
                                placeholder={"Choose dependent api"}
                            />
                        }
                        errorMessage={editResourceError["dependencies"]}
                    />
                </div>
            </QueryWrapper>
        </Modal>
    );
};

export default EditResourceModal;

import type { TResource } from "@fetches/rbac/resources";

import { useResourcesQuery } from "@fetches/rbac/resources";

import usePermissionsStore from "@states/permissions_store";

import QueryWrapper from "@components/wrappers/QueryWrapper";
import PermissionCheckbox from "@screens/permissions/PermissionCheckbox";

type TGroupAPIs = {
    group: string;
    apis: Record<string, TResource[]>;
};

const processResources = (resources: TResource[]): TGroupAPIs[] => {
    const data = resources.reduce((sm: Record<string, TResource[]>, resource) => {
        sm[resource.group] = sm[resource.group] ? [...sm[resource.group], resource] : [resource];
        return sm;
    }, {});

    return [...Object.keys(data)].reduce((p: TGroupAPIs[], group) => {
        p.push({
            group: group,
            apis: data[group].reduce((sm: Record<string, TResource[]>, resource) => {
                sm[resource.api] = sm[resource.api] ? [...sm[resource.api], resource] : [resource];
                return sm;
            }, {}),
        });
        return p;
    }, []);
};

const ResourcesTable = () => {
    const {
        filters: { role_id },
    } = usePermissionsStore();

    const resourcesQuery = useResourcesQuery();

    return (
        <QueryWrapper query={resourcesQuery}>
            <div className="flex flex-col gap-5">
                <div className="flex justify-between text-lg font-semibold">
                    <div>Resource Name</div>
                    <div className="flex w-[400px] gap-5">
                        <div className="w-1/4 text-center">Create</div>
                        <div className="w-1/4 text-center">Read</div>
                        <div className="w-1/4 text-center">Update</div>
                        <div className="w-1/4 text-center">Delete</div>
                    </div>
                </div>
                {resourcesQuery.data ? (
                    <div className="flex h-[500px] flex-col overflow-auto rounded-lg border border-base-300">
                        {processResources(resourcesQuery.data)?.map((x, index) => (
                            <div key={index}>
                                <div className="bg-success px-3 py-3 text-xl text-base-100">
                                    {x.group[0].toUpperCase() + x.group.slice(1)}
                                </div>
                                <div>
                                    {[...Object.keys(x.apis)].map((api, index2) => (
                                        <div
                                            key={index2}
                                            className={`flex justify-between px-3 py-2 ${
                                                index2 % 2 === 1 ? "bg-base-200" : ""
                                            }`}
                                        >
                                            <div>{x.apis[api][0].label}</div>
                                            <div className="flex w-[400px] gap-5">
                                                <div className="w-1/4 text-center">
                                                    <PermissionCheckbox
                                                        resource={x?.apis[api]?.find(x => x?.method === "post")}
                                                        roleId={role_id}
                                                    />
                                                </div>
                                                <div className="w-1/4 text-center">
                                                    <PermissionCheckbox
                                                        resource={x?.apis[api]?.find(x => x?.method === "get")}
                                                        roleId={role_id}
                                                    />
                                                </div>
                                                <div className="w-1/4 text-center">
                                                    <PermissionCheckbox
                                                        resource={x?.apis[api]?.find(x => x?.method === "patch")}
                                                        roleId={role_id}
                                                    />
                                                </div>
                                                <div className="w-1/4 text-center">
                                                    <PermissionCheckbox
                                                        resource={x?.apis[api]?.find(x => x?.method === "delete")}
                                                        roleId={role_id}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <></>
                )}
            </div>
        </QueryWrapper>
    );
};

export default ResourcesTable;

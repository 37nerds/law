import type { TResource, TResourceDependency } from "@fetches/rbac/resources";
import type { TOption, TMethod } from "@helpers/types";

export const prepareDependenciesOptions = (
    resources: TResource[] | undefined,
    dependencies: TResourceDependency[] | undefined
): TOption[] => {
    if (!resources) {
        return [];
    }
    return resources
        .filter(resource => !dependencies?.find(d => d.api === resource.api && d.method === resource.method))
        .map(resource => {
            const x = `${resource.method} ${resource.api}`;
            return { name: x, value: x };
        });
};

export const convertArraySelectInputValueStringArrayIntoResourceDependencyArray = (
    value: string[]
): TResourceDependency[] => {
    return value?.map(x => {
        const split = x.split(" ");
        const resourceDependency: TResourceDependency = {
            api: split[1],
            method: split[0] as TMethod,
        };
        return resourceDependency;
    });
};

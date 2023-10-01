import type { TBase, TMethod, TPaginate } from "@helpers/types";

import { useMutation, useQuery, useQueryClient } from "react-query";
import { TError } from "@helpers/types";
import { useEffect } from "react";
import { notify } from "@helpers/notify";

import http from "@helpers/http";
import useResourcesStore from "@states/resources_store";

export type TResourceDependency = {
    api: string;
    method: TMethod;
};

export type TResource = TBase & {
    api: string;
    web: string[];
    method: TMethod;
    label: string;
    group: string;
    dependencies: TResourceDependency[];
};

export type TCreateResource = {
    api: string;
    web: string[];
    method: TMethod;
    label: string;
    group: string;
    dependencies: TResourceDependency[];
};

export type TEditResource = {
    id: string;
    api: string;
    web: string[];
    method: TMethod;
    label: string;
    group: string;
    dependencies: TResourceDependency[];
};

export type TSortableResourceColumn = "api" | "method" | "label" | "group" | "created_at";

const RBAC__RESOURCES_GET = "get.rbac-resources";
const RBAC__RESOURCE_DELETE = "delete.rbac-resources";
const RBAC__RESOURCE_POST = "post.rbac-resources";
const RBAC__RESOURCE_PATCH = "patch.rbac-resources";
const RBAC__RESOURCES_PAGINATED_GET = "get.paginated.rbac-resources";

export const useResourcesQuery = () => {
    const query = useQuery<TResource[], TError>({
        queryFn: async () => {
            return await http.get("/rbac/resources", 200);
        },
        queryKey: [RBAC__RESOURCES_GET],
    });

    useEffect(() => {
        if (query.isError) {
            notify("error", query.error?.message);
        }
    }, [query.isError]);

    return query;
};

export const usePaginatedResourcesQuery = () => {
    const { page, sortColumn, sortOrder, searchQuery } = useResourcesStore(state => state.filters);

    const query = useQuery<TPaginate<TResource>, TError>({
        queryFn: async () => {
            let url = `/rbac/resources?paginated=true&per_page=10&page=${page}&sort_column=${sortColumn}&sort_order=${sortOrder}`;
            if (searchQuery.trim() !== "") {
                url += `&search=${encodeURIComponent(searchQuery.trim())}`;
            }
            return await http.get(url, 200);
        },
        queryKey: [RBAC__RESOURCES_PAGINATED_GET, page, searchQuery, sortColumn, sortOrder],
    });

    useEffect(() => {
        if (query.isError) {
            notify("error", query.error?.message);
        }
    }, [query.isError]);

    return query;
};

export const useDeleteResourceMutation = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation<null, TError, string>({
        mutationFn: async id => {
            return await http.delete(`/rbac/resources?id=${id}`, 204);
        },
        mutationKey: [RBAC__RESOURCE_DELETE],
        onSuccess: () => {
            queryClient.invalidateQueries(RBAC__RESOURCES_PAGINATED_GET).then();
            queryClient.invalidateQueries(RBAC__RESOURCES_GET).then();
        },
    });

    useEffect(() => {
        if (mutation.isError) {
            notify("error", mutation.error?.message);
        }

        if (mutation.isSuccess) {
            notify("success", `Resource deleted successfully.`);
        }
    }, [mutation.isError, mutation.isSuccess]);

    return mutation;
};

export const useSaveResourceMutation = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation<TResource, TError, TCreateResource>({
        mutationFn: async resource => {
            return await http.post("/rbac/resources", resource, 201);
        },
        mutationKey: [RBAC__RESOURCE_POST],
        onSuccess: () => {
            queryClient.invalidateQueries(RBAC__RESOURCES_GET).then();
            queryClient.invalidateQueries(RBAC__RESOURCES_PAGINATED_GET).then();
        },
    });

    useEffect(() => {
        if (mutation.isError) {
            notify("error", mutation.error?.message);
        }

        if (mutation.isSuccess) {
            notify("success", `New resource created: ${mutation?.data?.method} ${mutation?.data?.api}`);
        }
    }, [mutation.isError, mutation.isSuccess]);

    return mutation;
};

export const useEditResourceMutation = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation<TResource, TError, TEditResource>({
        mutationFn: async editResource => {
            return await http.patch(`/rbac/resources?id=${editResource.id}`, editResource, 200);
        },
        mutationKey: [RBAC__RESOURCE_PATCH],
        onSuccess: user => {
            queryClient.invalidateQueries(RBAC__RESOURCES_GET).then();
            queryClient.invalidateQueries(RBAC__RESOURCES_PAGINATED_GET).then();
        },
    });

    useEffect(() => {
        if (mutation.isError) {
            notify("error", mutation.error?.message);
        }

        if (mutation.isSuccess) {
            notify("success", `Resource updated: ${mutation?.data?.method} ${mutation?.data?.api}`);
        }
    }, [mutation.isError, mutation.isSuccess]);

    return mutation;
};

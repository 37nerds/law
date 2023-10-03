import type { TBase, TMethod, TPaginate } from "@helpers/types";
import type { TError } from "@helpers/types";

import { useMutation, useQuery, useQueryClient } from "react-query";

import http from "@helpers/http";
import useResourcesStore from "@states/resources_store";
import useMutationErrorMessage from "@hooks/useMutationErrorMessage";
import useMutationSuccessMessage from "@hooks/useMutationSuccessMessage";
import useQueryErrorMessage from "@hooks/useQueryErrorMessage";

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

const RBAC_RESOURCES__GET = "get.rbac-resources";
const RBAC_RESOURCE__DELETE = "delete.rbac-resources";
const RBAC_RESOURCE__POST = "post.rbac-resources";
const RBAC_RESOURCE__PATCH = "patch.rbac-resources";
const RBAC_RESOURCES__PAGINATED__GET = "get.paginated.rbac-resources";
const RBAC_RESOURCE__GET = "get.rbac-resource";

export const useResourcesQuery = () => {
    const q = useQuery<TResource[], TError>({
        queryFn: () => http.get("/rbac/resources", 200),
        queryKey: [RBAC_RESOURCES__GET],
        retry: false,
    });
    useQueryErrorMessage(q);
    return q;
};

export const usePaginatedResourcesQuery = () => {
    const { page, sortColumn, sortOrder, searchQuery } = useResourcesStore(state => state.filters);
    const q = useQuery<TPaginate<TResource>, TError>({
        queryFn: () => {
            let uri =
                `/rbac/resources?foo=bar` +
                `&per_page=10&page=${page}` +
                `&sort_column=${sortColumn}` +
                `&sort_order=${sortOrder}` +
                `&paginated=true`;

            if (searchQuery.trim() !== "") {
                uri += `&search=${encodeURIComponent(searchQuery.trim())}`;
            }
            return http.get(uri, 200);
        },
        queryKey: [RBAC_RESOURCES__PAGINATED__GET, page, searchQuery, sortColumn, sortOrder],
        retry: false,
    });
    useQueryErrorMessage(q);
    return q;
};

export const useResourceQuery = (resourceId: string) => {
    const q = useQuery<TResource, TError>({
        queryFn: () => (!resourceId ? Promise.resolve({}) : http.get_q(`/rbac/resources`, { id: resourceId }, 200)),
        queryKey: [RBAC_RESOURCE__GET, resourceId],
    });
    useQueryErrorMessage(q);
    return q;
};

export const useDeleteResourceMutation = () => {
    const c = useQueryClient();
    const m = useMutation<null, TError, string>({
        mutationFn: id => http.delete(`/rbac/resources?foo=bar&id=${id}`, 204),
        mutationKey: [RBAC_RESOURCE__DELETE],
        onSuccess: () => {
            c.invalidateQueries(RBAC_RESOURCES__PAGINATED__GET).then();
            c.invalidateQueries(RBAC_RESOURCES__GET).then();
        },
    });
    useMutationErrorMessage(m);
    useMutationSuccessMessage(m, "Resource deleted successfully.");
    return m;
};

export const useSaveResourceMutation = () => {
    const c = useQueryClient();
    const m = useMutation<TResource, TError, TCreateResource>({
        mutationFn: resource => http.post("/rbac/resources", resource, 201),
        mutationKey: [RBAC_RESOURCE__POST],
        onSuccess: () => {
            c.invalidateQueries(RBAC_RESOURCES__GET).then();
            c.invalidateQueries(RBAC_RESOURCES__PAGINATED__GET).then();
        },
    });
    useMutationErrorMessage(m);
    useMutationSuccessMessage(m, `New resource created: ${m?.data?.method} ${m?.data?.api}`);
    return m;
};

export const useEditResourceMutation = () => {
    const c = useQueryClient();
    const m = useMutation<TResource, TError, TEditResource>({
        mutationFn: editResource => http.patch(`/rbac/resources?foo=bar&id=${editResource.id}`, editResource, 200),
        mutationKey: [RBAC_RESOURCE__PATCH],
        onSuccess: () => {
            c.invalidateQueries(RBAC_RESOURCES__GET).then();
            c.invalidateQueries(RBAC_RESOURCES__PAGINATED__GET).then();
        },
    });
    useMutationErrorMessage(m);
    useMutationSuccessMessage(m, `Resource updated: ${m?.data?.method} ${m?.data?.api}`);
    return m;
};

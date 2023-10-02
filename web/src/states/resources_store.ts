import type { TColumnErrors, TOrder } from "@helpers/types";
import type { TCreateResource, TEditResource, TSortableResourceColumn } from "@fetches/rbac/resources";

import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

type TFilters = {
    page: number;
    newResourceModalOpen: boolean;
    editResourceModalOpen: boolean;
    editResourceId: string;
    searchQuery: string;
    sortColumn: TSortableResourceColumn;
    sortOrder: TOrder;
};

type TStore = {
    filters: TFilters;
    setFiltersField: <K extends keyof TFilters>(key: K, value: TFilters[K]) => void;

    newResource: TCreateResource;
    setNewResourceField: (key: keyof TCreateResource, value: TCreateResource[keyof TCreateResource]) => void;
    setNewResourceEmpty: () => void;
    newResourceError: TColumnErrors;
    setNewResourceError: (newResourceError: TColumnErrors) => void;
    setNewResourceErrorField: (key: string, value: string[]) => void;
    setNewResourceErrorEmpty: () => void;

    editResource: TEditResource;
    setEditResource: (editResource: TEditResource) => void;
    setEditResourceField: (key: keyof TEditResource, value: TEditResource[keyof TEditResource]) => void;
    setEditResourceEmpty: () => void;
    editResourceError: TColumnErrors;
    setEditResourceError: (newResourceError: TColumnErrors) => void;
    setEditResourceErrorField: (key: string, value: string[]) => void;
    setEditResourceErrorEmpty: () => void;
};

const useResourcesStore = create<TStore>()(
    immer(
        devtools(set => ({
            filters: {
                page: 1,
                newResourceModalOpen: false,
                editResourceModalOpen: false,
                editResourceId: "",
                searchQuery: "",
                sortColumn: "created_at",
                sortOrder: "asc",
            },
            setFiltersField: (key, value) => {
                set(state => {
                    state.filters[key] = value;
                });
            },

            newResource: {
                api: "",
                web: [],
                method: "get",
                label: "",
                group: "",
                dependencies: [],
            },
            setNewResourceField: (key, value) => {
                set(state => {
                    state.newResource[key] = value as never;
                });
            },
            setNewResourceEmpty: () => {
                set(state => {
                    state.newResource.api = "";
                    state.newResource.web = [];
                    state.newResource.method = "get";
                    state.newResource.label = "";
                    state.newResource.group = "";
                    state.newResource.dependencies = [];
                });
            },
            newResourceError: {},
            setNewResourceError: (newResourceError: Record<string, string[]>) => {
                set(state => {
                    state.newResourceError = newResourceError;
                });
            },
            setNewResourceErrorField: (key, value) => {
                set(state => {
                    state.newResourceError[key] = value as never;
                });
            },
            setNewResourceErrorEmpty: () => {
                set(state => {
                    state.newResourceError = {};
                });
            },

            editResource: {
                id: "",
                api: "",
                web: [],
                method: "get",
                label: "",
                group: "",
                dependencies: [],
            },
            setEditResource: user => {
                set(state => {
                    state.editResource = user;
                });
            },
            setEditResourceField: (key, value) => {
                set(state => {
                    state.editResource[key] = value as never;
                });
            },
            setEditResourceEmpty: () => {
                set(state => {
                    state.editResource.api = "";
                    state.editResource.web = [];
                    state.editResource.method = "get";
                    state.editResource.label = "";
                    state.editResource.group = "";
                    state.editResource.dependencies = [];
                });
            },
            editResourceError: {},
            setEditResourceError: (newResourceError: Record<string, string[]>) => {
                set(state => {
                    state.editResourceError = newResourceError;
                });
            },
            setEditResourceErrorField: (key, value) => {
                set(state => {
                    state.editResourceError[key] = value as never;
                });
            },
            setEditResourceErrorEmpty: () => {
                set(state => {
                    state.newResourceError = {};
                });
            },
        }))
    )
);

export default useResourcesStore;

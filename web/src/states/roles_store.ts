import { TOrder } from "@helpers/types";
import type { TCreateRole, TEditRole, TRoleColumn } from "../queries/rbac/roles";

import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

type TFilters = {
    page: number;
    newRoleModalOpen: boolean;
    editRoleModalOpen: boolean;
    editRoleId: string;
    searchQuery: string;
    sortColumn: TRoleColumn;
    sortOrder: TOrder;
};

type TStore = {
    filters: TFilters;
    setFiltersField: (key: keyof TFilters, value: any) => void;

    newRole: TCreateRole;
    setNewRoleField: (key: keyof TCreateRole, value: any) => void;
    newRoleError: Record<string, string[]>;
    setNewRoleError: (newRoleError: Record<string, string[]>) => void;
    setNewRoleEmpty: () => void;

    editRole: TEditRole;
    setEditRole: (editRole: TEditRole) => void;
    setEditRoleField: (key: keyof TEditRole, value: any) => void;
    editRoleError: Record<string, string[]>;
    setEditRoleError: (newRoleError: Record<string, string[]>) => void;
    setEditRoleEmpty: () => void;
    setEditRoleErrorEmpty: () => void;

    selectionList: string[];
    setSelectionList: (selectionList: string[]) => void;
    toggleSelectionListItem: (roleId: string) => void;
};

const useRolesStore = create<TStore>()(
    immer(
        devtools(set => ({
            filters: {
                page: 1,
                newRoleModalOpen: false,
                editRoleModalOpen: false,
                editRoleId: "",
                searchQuery: "",
                sortColumn: "disable",
                sortOrder: "asc",
            },

            setFiltersField: (key, value) => {
                set(state => {
                    state.filters[key] = value as never;
                });
            },

            newRole: {
                name: "",
            },
            setNewRoleField: (key, value) => {
                set(state => {
                    state.newRole[key] = value as never;
                });
            },

            newRoleError: {},
            setNewRoleError: (newRoleError: Record<string, string[]>) => {
                set(state => {
                    state.newRoleError = newRoleError;
                });
            },

            setNewRoleEmpty: () => {
                set(state => {
                    state.newRole.name = "";
                });
            },

            editRole: {
                id: "",
                name: "",
                disable: false,
            },
            setEditRole: editRole => {
                set(state => {
                    state.editRole = editRole;
                });
            },
            setEditRoleField: (key, value) => {
                set(state => {
                    state.editRole[key] = value as never;
                });
            },
            editRoleError: {},
            setEditRoleError: (newRoleError: Record<string, string[]>) => {
                set(state => {
                    state.newRoleError = newRoleError;
                });
            },
            setEditRoleEmpty: () => {
                set(state => {
                    state.newRole.name = "";
                });
            },
            setEditRoleErrorEmpty: () => {
                set(state => {
                    state.editRoleError = {};
                });
            },

            selectionList: [],
            setSelectionList: selectionList => {
                set(state => {
                    state.selectionList = selectionList;
                });
            },
            toggleSelectionListItem: roleId => {
                set(state => {
                    if (!state.selectionList.find(s => s == roleId)) {
                        state.selectionList.push(roleId);
                    } else {
                        state.selectionList = state.selectionList.filter(s => s !== roleId);
                    }
                });
            },
        }))
    )
);

export default useRolesStore;

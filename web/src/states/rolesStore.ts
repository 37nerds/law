import { TCreateRole } from "@kinds/users";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

type TFilters = {
    page: number;
    newRoleModalOpen: boolean;
    editRoleModalOpen: boolean;
};

type TStore = {
    filters: TFilters;
    setFiltersField: (key: keyof TFilters, value: any) => void;

    newRole: TCreateRole;
    setNewRoleField: (key: keyof TCreateRole, value: any) => void;

    newRoleError: Record<string, string[]>;
    setNewRoleError: (newRoleError: Record<string, string[]>) => void;

    setNewRoleEmpty: () => void;
};

const useRolesStore = create<TStore>()(
    immer(
        devtools(set => ({
            filters: {
                page: 1,
                newRoleModalOpen: false,
                editRoleModalOpen: false,
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
        }))
    )
);

export default useRolesStore;

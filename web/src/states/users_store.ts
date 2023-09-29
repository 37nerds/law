import type { TCreateUser, TEditUser, TUserColumn } from "@fetches/rbac/users";
import type { TOrder } from "@helpers/types";

import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

type TFilters = {
    page: number;
    newUserModalOpen: boolean;
    editUserModalOpen: boolean;
    editUserId: string;
    searchQuery: string;
    sortColumn: TUserColumn;
    sortOrder: TOrder;
};

type TStore = {
    filters: TFilters;
    setFiltersField: <K extends keyof TFilters>(key: K, value: TFilters[K]) => void;

    newUser: TCreateUser;
    setNewUserField: (key: keyof TCreateUser, value: TCreateUser[keyof TCreateUser]) => void;
    setNewUserEmpty: () => void;
    newUserError: Record<string, string[]>;
    setNewUserError: (newUserError: Record<string, string[]>) => void;
    setNewUserErrorField: (key: string, value: string[]) => void;
    setNewUserErrorEmpty: () => void;

    editUser: TEditUser;
    setEditUser: (user: TEditUser) => void;
    setEditUserField: (key: keyof TEditUser, value: TEditUser[keyof TEditUser]) => void;
    setEditUserEmpty: () => void;
    editUserError: Record<string, string[]>;
    setEditUserError: (newUserError: Record<string, string[]>) => void;
    setEditUserErrorField: (key: string, value: string[]) => void;
    setEditUserErrorEmpty: () => void;
};

const useUsersStore = create<TStore>()(
    immer(
        devtools(set => ({
            filters: {
                page: 1,
                newUserModalOpen: false,
                editUserModalOpen: false,
                editUserId: "",
                searchQuery: "",
                sortColumn: "created_at",
                sortOrder: "asc",
            },
            setFiltersField: (key, value) => {
                console.log("Here", key, value);
                set(state => {
                    state.filters[key] = value;
                });
            },

            newUser: {
                username: "",
                name: "",
                email: "",
                phone: "",
                role_id: "",
                address: "",
                password: "",
            },
            setNewUserField: (key, value) => {
                set(state => {
                    state.newUser[key] = value as never;
                });
            },
            setNewUserEmpty: () => {
                set(state => {
                    state.newUser.username = "";
                    state.newUser.name = "";
                    state.newUser.email = "";
                    state.newUser.phone = "";
                    state.newUser.role_id = "";
                    state.newUser.address = "";
                    state.newUser.password = "";
                });
            },
            newUserError: {},
            setNewUserError: (newUserError: Record<string, string[]>) => {
                set(state => {
                    state.newUserError = newUserError;
                });
            },
            setNewUserErrorField: (key, value) => {
                set(state => {
                    state.newUserError[key] = value as never;
                });
            },
            setNewUserErrorEmpty: () => {
                set(state => {
                    state.newUserError = {};
                });
            },

            editUser: {
                username: "",
                name: "",
                email: "",
                phone: "",
                role_id: "",
                address: "",
            },
            setEditUser: user => {
                set(state => {
                    state.editUser = user;
                });
            },
            setEditUserField: (key, value) => {
                set(state => {
                    state.editUser[key] = value as never;
                });
            },
            setEditUserEmpty: () => {
                set(state => {
                    state.editUser.username = "";
                    state.editUser.name = "";
                    state.editUser.email = "";
                    state.editUser.phone = "";
                    state.editUser.role_id = "";
                    state.editUser.address = "";
                });
            },
            editUserError: {},
            setEditUserError: (newUserError: Record<string, string[]>) => {
                set(state => {
                    state.editUserError = newUserError;
                });
            },
            setEditUserErrorField: (key, value) => {
                set(state => {
                    state.editUserError[key] = value as never;
                });
            },
            setEditUserErrorEmpty: () => {
                set(state => {
                    state.newUserError = {};
                });
            },
        }))
    )
);

export default useUsersStore;

import { TCreateUser, TEditUser } from "@kinds/users";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

type TFilters = {
    page: number;
    newUserModalOpen: boolean;
    editUserModalOpen: boolean;
    editUserId: string;
};

type TStore = {
    filters: TFilters;
    setFiltersField: (key: keyof TFilters, value: any) => void;

    newUser: TCreateUser;
    setNewUserField: (key: keyof TCreateUser, value: any) => void;
    setNewUserEmpty: () => void;
    newUserError: Record<string, string[]>;
    setNewUserError: (newUserError: Record<string, string[]>) => void;
    setNewUserErrorField: (key: string, value: string[]) => void;

    editUser: TEditUser;
    setEditUser: (user: TEditUser) => void;
    setEditUserField: (key: keyof TEditUser, value: any) => void;
    editUserError: Record<string, string[]>;
    setEditUserError: (newUserError: Record<string, string[]>) => void;
    setEditUserErrorField: (key: string, value: string[]) => void;
};

const useUsersStore = create<TStore>()(
    immer(
        devtools(set => ({
            filters: {
                page: 1,
                newUserModalOpen: false,
                editUserModalOpen: false,
                editUserId: "",
            },
            setFiltersField: (key, value) => {
                set(state => {
                    state.filters[key] = value as never;
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
        }))
    )
);

export default useUsersStore;

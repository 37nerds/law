import { TCreateUser } from "@kinds/users";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

type TFilters = {
    page: number;
    newUserModalOpen: boolean;
};

type TStore = {
    newUser: TCreateUser;
    setNewUserField: (key: keyof TCreateUser, value: any) => void;
    setNewUserEmpty: () => void;
    newUserError: Record<string, string[]>;
    setNewUserError: (newUserError: Record<string, string[]>) => void;
    setNewUserErrorField: (key: string, value: string[]) => void;

    filters: TFilters;
    setFiltersField: (key: keyof TFilters, value: any) => void;
};

const useUsersStore = create<TStore>()(
    immer(
        devtools(set => ({
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

            filters: {
                page: 1,
                newUserModalOpen: false,
            },
            setFiltersField: (key, value) => {
                set(state => {
                    state.filters[key] = value as never;
                });
            },
        }))
    )
);

export default useUsersStore;

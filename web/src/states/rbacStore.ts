import { TCreateUser } from "@kinds/users";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

type TUserFilters = {
    page: number;
};

type TState = {
    user: TCreateUser;
    userFilters: TUserFilters;
    rolesFilters: TUserFilters;
};

type TAction = {
    setUser: (user: TCreateUser) => void;
    setUserFiltersField: (key: keyof TUserFilters, value: any) => void;
    setRolesFiltersField: (key: keyof TUserFilters, value: any) => void;
    setUserField: (key: keyof TCreateUser, value: any) => void;
};

const useUsersStore = create<TState & TAction>()(
    immer(
        devtools(set => ({
            user: {
                username: "",
                name: "",
                email: "",
                phone: "",
                role_id: "",
                address: "",
                password: "",
            },

            userFilters: {
                page: 1,
            },

            rolesFilters: {
                page: 1,
            },

            setUser: user => {
                set(state => {
                    state.user = user;
                });
            },

            setUserField: (key, value) => {
                set(state => {
                    state.user[key] = value as never;
                });
            },

            setUserFiltersField: (key, value) => {
                set(state => {
                    state.userFilters[key] = value as never;
                });
            },

            setRolesFiltersField: (key, value) => {
                set(state => {
                    state.rolesFilters[key] = value as never;
                });
            },
        }))
    )
);

export default useUsersStore;

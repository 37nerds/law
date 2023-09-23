import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

type TUserFilters = {
    page: number;
};

type TState = {
    userFilters: TUserFilters;
    rolesFilters: TUserFilters;
};

type TAction = {
    setUserFiltersField: (key: keyof TUserFilters, value: any) => void;
    setRolesFiltersField: (key: keyof TUserFilters, value: any) => void;
};

const useUsersStore = create<TState & TAction>()(
    immer(
        devtools(set => ({
            userFilters: {
                page: 1,
            },

            rolesFilters: {
                page: 1,
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

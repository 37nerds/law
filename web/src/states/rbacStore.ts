import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

type TClientsFilters = {
    page: number;
};

type TState = {
    userFilters: TClientsFilters;
};

type TAction = {
    setUserFiltersField: (key: keyof TClientsFilters, value: any) => void;
};

const useUsersStore = create<TState & TAction>()(
    immer(
        devtools(set => ({
            userFilters: {
                page: 1,
            },

            setUserFiltersField: (key, value) => {
                set(state => {
                    state.userFilters[key] = value as never;
                });
            },
        }))
    )
);

export default useUsersStore;

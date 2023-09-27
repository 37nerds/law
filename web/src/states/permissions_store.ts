import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

type TFilters = {
    role_id: string;
};

type TStore = {
    filters: TFilters;
    setFiltersField: (key: keyof TFilters, value: any) => void;
};

const usePermissionsStore = create<TStore>()(
    immer(
        devtools(set => ({
            filters: {
                role_id: "",
            },

            setFiltersField: (key, value) => {
                set(state => {
                    state.filters[key] = value as never;
                });
            },
        }))
    )
);

export default usePermissionsStore;

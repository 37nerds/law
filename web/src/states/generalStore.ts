import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { devtools } from "zustand/middleware";

type TState = {
    pageTitle: string;
};

type TAction = {
    setPageTitle: (title: string) => void;
};

const useGeneralStore = create<TState & TAction>()(
    immer(
        devtools(set => ({
            pageTitle: "Home",
            setPageTitle: title => {
                set(state => {
                    state.pageTitle = title;
                });
            },
        }))
    )
);

export default useGeneralStore;

export const selectPageTitle = () => {
    const { pageTitle } = useGeneralStore();
    return pageTitle;
};

import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { devtools } from "zustand/middleware";

type TState = {
    pageTitle: string;
};

type TAction = {
    setPageTitle: (title: string) => void;
};

const useAppStore = create<TState & TAction>()(
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

export default useAppStore;

export const selectPageTitle = () => {
    const { pageTitle } = useAppStore();
    return pageTitle;
};

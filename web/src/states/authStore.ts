import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { devtools } from "zustand/middleware";
import { TLoggedUser } from "@kinds/users";

type TState = {
    logged_user: TLoggedUser | null;
};

type TAction = {
    setLoggedUser: (logged_user: TLoggedUser) => void;
};

const useAuthStore = create<TState & TAction>()(
    immer(
        devtools(set => ({
            logged_user: null,
            setLoggedUser: logged_user => {
                set(state => {
                    state.logged_user = logged_user;
                });
            },
        }))
    )
);

export const selectLoggedUser = (): TLoggedUser | null => {
    return useAuthStore.getState().logged_user;
};

export const selectLoggedUserAvatar = (): string | null => {
    const logged_user = selectLoggedUser();
    if (!logged_user) return null;
    return logged_user.avatar;
};

export const isUserLoggedIn = (): boolean => {
    return !!selectLoggedUser();
};

export default useAuthStore;

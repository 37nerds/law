import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { devtools } from "zustand/middleware";
import { TLoggedUser } from "@kinds/users";

type TState = {
    loggedUser: TLoggedUser | null;
};

type TAction = {
    setLoggedUser: (logged_user: TLoggedUser) => void;
    setLoggedUserField: (field: keyof TLoggedUser, value: any) => void;
};

export const useAuthStore = create<TState & TAction>()(
    immer(
        devtools(set => ({
            loggedUser: null,
            setLoggedUser: logged_user => {
                set(state => {
                    state.loggedUser = logged_user;
                });
            },
            setLoggedUserField: (field, value) => {
                set(state => {
                    if (state.loggedUser) state.loggedUser[field] = value as never;
                });
            },
        }))
    )
);

export const selectLoggedUser = (): TLoggedUser | null => {
    return useAuthStore.getState().loggedUser;
};

export const selectLoggedUserAvatar = (): string | null => {
    const loggedUser = selectLoggedUser();
    if (!loggedUser) return null;
    return loggedUser.avatar;
};

export const isUserLoggedIn = (): boolean => {
    return !!selectLoggedUser();
};

export default useAuthStore;

import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { devtools } from "zustand/middleware";
import { TLoggedUser } from "@external/auth";

type TState = {
    loggedUser: TLoggedUser | null;
};

type TAction = {
    setLoggedUser: (loggedUser: TLoggedUser) => void;
};

const useAuthStore = create<TState & TAction>()(
    immer(
        devtools(set => ({
            loggedUser: null,
            setLoggedUser: loggedUser => {
                set(state => state.loggedUser);
            },
        }))
    )
);

export default useAuthStore;

export const selectLoggedUser = () => {
    return useAuthStore.getState().loggedUser;
};

export const selectLoggedUserAvatar = () => {
    const loggedUser = selectLoggedUser();
    if (!loggedUser) return null;
    return loggedUser.avatar;
};

export const isUserLoggedIn = () => {
    return !!useAuthStore.getState().loggedUser;
};

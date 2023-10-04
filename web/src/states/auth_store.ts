import type { TLoggedUser } from "../queries/auth/auth";
import type { TMethod } from "@helpers/types";

import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { devtools } from "zustand/middleware";

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
    return loggedUser?.avatar;
};

export const isUserLoggedIn = (): boolean => {
    return !!selectLoggedUser();
};

export const isPermitted = (api: string, method: TMethod) => {
    return !!useAuthStore.getState().loggedUser?.permissions?.some(permission => {
        return permission?.resource?.api === api && permission?.resource?.method === method;
    });
};

export const selectLoggedUserRoleId = (): string | undefined => {
    return useAuthStore(state => state.loggedUser?.role_id);
};

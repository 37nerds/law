import http from "@helpers/http";
import useAuthStore from "@states/authStore";

import { isEmail } from "@helpers/unkown";
import { useQuery } from "react-query";
import { TError } from "@kinds/general";
import { AUTH__LOGGED_USER_GET } from "@config/keys";

export const hitRegister = async (registerData: {
    username: string;
    name: string;
    email: string;
    password: string;
}) => {
    await http.get("/csrf-cookie", 204, {}, {}, false);
    return await http.post(
        "/auth/register",
        {
            ...registerData,
            password_confirmation: registerData.password,
        },
        201
    );
};

export type TLoggedUser = {
    id: number;
    name: string;
    email: string;
    avatar: string | null;
    email_verified_at: string | null;
    two_factor_secret: string | null;
    two_factor_recovery_codes: string | null;
    two_factor_confirmed_at: string | null;
    role: string;
    created_at: string;
    updated_at: string;
};

export const useFetchLoggedUserQuery = () => {
    return useQuery<TLoggedUser, TError>({
        queryFn: async (): Promise<TLoggedUser> => {
            const payload: TLoggedUser = (await http.get("/auth/logged-user", 200)) as any;
            useAuthStore.setState(state => {
                state.loggedUser = payload;
            });
            return payload;
        },
        queryKey: [AUTH__LOGGED_USER_GET],
        enabled: false,
    });
};

export const hitLogin = async (payload: { emailOrUsername: string; password: string }) => {
    const isItEmail = isEmail(payload.emailOrUsername);

    const username = isItEmail ? null : payload.emailOrUsername;
    const email = isItEmail ? payload.emailOrUsername : null;

    return await http.post(
        "/auth/login",
        {
            username,
            email,
            password: payload.password,
        },
        200
    );
};

export const hitLogout = async () => {
    return await http.post("/auth/logout", {}, 204);
};

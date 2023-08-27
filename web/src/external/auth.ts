import {
    AUTH__FORGET_PASSWORD__POST,
    AUTH__LOGIN__POST,
    AUTH__REGISTER__POST,
    AUTH__RESET_PASSWORD__POST,
} from "@config/keys";

import type { TLoggedUser } from "@kinds/users";
import type { TError } from "@kinds/general";
import { is_email } from "@helpers/unkown";
import { useEffect, useState } from "react";
import { useMutation } from "react-query";

import http from "@helpers/http";
import useAuthStore from "@states/authStore";

export const useRegisterMutation = () =>
    useMutation({
        mutationFn: async (registerData: { username: string; name: string; email: string; password: string }) => {
            return await http.csrf_post(
                "/auth/register",
                {
                    ...registerData,
                    password_confirmation: registerData.password,
                },
                201
            );
        },
        mutationKey: [AUTH__REGISTER__POST],
    });

export const useLoginMutation = () =>
    useMutation({
        mutationFn: async (payload: { emailOrUsername: string; password: string }) => {
            const isItEmail = is_email(payload.emailOrUsername);

            const username = isItEmail ? null : payload.emailOrUsername;
            const email = isItEmail ? payload.emailOrUsername : null;

            return await http.csrf_post(
                "/auth/login",
                {
                    username,
                    email,
                    password: payload.password,
                },
                200
            );
        },
        mutationKey: [AUTH__LOGIN__POST],
    });

export const useLogoutHit = () => {
    const hitLogout = async () => {
        return await http.post("/auth/logout", {}, 204);
    };

    return { hitLogout };
};

export const useLoggedUserFetch = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    const { setLoggedUser } = useAuthStore();

    useEffect(() => {
        (async () => {
            setIsLoading(true);
            setIsError(false);
            try {
                const payload: TLoggedUser = await http.get("/auth/logged-user", 200);
                setLoggedUser(payload);
            } catch (e: any) {
                setIsError(true);
            }
            setIsLoading(false);
        })();
    }, []);

    return { isLoading, isError };
};

export const useForgotPasswordMutation = () =>
    useMutation<any, TError, any>({
        mutationFn: async (email: string) => await http.csrf_post("/auth/forgot-password", { email }, 200),
        mutationKey: [AUTH__FORGET_PASSWORD__POST],
    });

export const useResetPasswordMutation = () =>
    useMutation<any, TError, any>({
        mutationFn: async (payload: {
            token: string;
            email: string;
            password: string;
            password_confirmation: string;
        }) => await http.post("/auth/reset-password", payload, 200),
        mutationKey: [AUTH__RESET_PASSWORD__POST],
    });

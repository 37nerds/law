import { isEmail } from "@helpers/unkown";
import { useEffect, useState } from "react";
import { TLoggedUser } from "@kinds/users";
import { useMutation } from "react-query";
import { AUTH__LOGIN__POST, AUTH__REGISTER__POST } from "@config/keys";

import http from "@helpers/http";
import useAuthStore from "@states/authStore";

export const useRegisterMutation = () =>
    useMutation({
        mutationFn: async (registerData: { username: string; name: string; email: string; password: string }) => {
            await http.get("/csrf-cookie", 204, {}, {}, false);
            return await http.post(
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
            const isItEmail = isEmail(payload.emailOrUsername);

            const username = isItEmail ? null : payload.emailOrUsername;
            const email = isItEmail ? payload.emailOrUsername : null;

            await http.get("/csrf-cookie", 204, {}, {}, false);
            return await http.post(
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

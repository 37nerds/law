import {
    AUTH__FORGET_PASSWORD__POST,
    AUTH__LOGIN__POST,
    AUTH__REGISTER__POST,
    AUTH__RESET_PASSWORD__POST,
    AUTH__UPLOAD_PROFILE_PICTURE__POST,
} from "@config/keys";

import type { TLoggedUser } from "@kinds/users";
import type { TError } from "@kinds/general";
import { is_email, notify } from "@helpers/unkown";
import { useEffect, useState } from "react";
import { useMutation } from "react-query";

import http from "@helpers/http";
import useAuthStore from "@states/authStore";

export const useRegisterMutation = () => {
    return useMutation<TLoggedUser, TError, { username: string; name: string; email: string; password: string }>({
        mutationFn: async registerData => {
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
};

export const useLoginMutation = () => {
    return useMutation<TLoggedUser, TError, { emailOrUsername: string; password: string }>({
        mutationFn: async payload => {
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
};

export const useLogoutHit = () => {
    const hitLogout = async () => {
        return await http.post("/auth/logout", {}, 204);
    };

    return { hitLogout };
};

export const useLoggedUserFetch = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const { setLoggedUser } = useAuthStore();

    useEffect(() => {
        (async () => {
            setIsLoading(true);
            setIsError(false);
            try {
                const payload: TLoggedUser = await http.get("/auth/logged-user", 200);
                setLoggedUser(payload);
                setIsSuccess(true);
            } catch (e: any) {
                setIsError(true);
            }
            setIsLoading(false);
        })();
    }, []);

    return { isLoading, isError, isSuccess };
};

export const useForgotPasswordMutation = () => {
    return useMutation<{ message: string }, TError, string>({
        mutationFn: async email => await http.csrf_post("/auth/forgot-password", { email }, 200),
        mutationKey: [AUTH__FORGET_PASSWORD__POST],
    });
};

export const useResetPasswordMutation = () =>
    useMutation<
        { message: string },
        TError,
        {
            token: string;
            email: string;
            password: string;
            password_confirmation: string;
        }
    >({
        mutationFn: async payload => await http.post("/auth/reset-password", payload, 200),
        mutationKey: [AUTH__RESET_PASSWORD__POST],
    });

export const useUploadProfilePictureMutation = () => {
    const { setLoggedUser } = useAuthStore();

    const mutation = useMutation<TLoggedUser, TError, File>({
        mutationFn: async imageFile => {
            const formData = new FormData();
            formData.append("profile-picture", imageFile);
            return await http.form_post("/auth/upload-profile-picture", formData, 200);
        },
        mutationKey: [AUTH__UPLOAD_PROFILE_PICTURE__POST],
    });

    useEffect(() => {
        if (mutation.isError) {
            notify("error", mutation.error?.message);
        }

        if (mutation.isSuccess) {
            setLoggedUser(mutation?.data);
        }
    }, [mutation.isError, mutation.isSuccess]);

    return mutation;
};

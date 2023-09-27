import type { TError } from "src/types";
import type { TUser } from "@fetches/rbac/users";
import type { TPermission } from "@fetches/rbac/permissions";

import { notify } from "@helpers/notify";
import { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { isEmail } from "@helpers/strings";

import http from "@helpers/http";
import useAuthStore from "@states/authStore";

export const AUTH__LOGIN__POST = "post.auth.login";
export const AUTH__LOGOUT__POST = "post.auth.logout";
export const AUTH__REGISTER__POST = "post.auth.register";
export const AUTH__FORGET_PASSWORD__POST = "post.auth.forget-password";
export const AUTH__RESET_PASSWORD__POST = "post.auth.reset-password";
export const AUTH__UPLOAD_PROFILE_PICTURE__POST = "post.auth.upload-profile-picture";
export const AUTH__UPDATE_USER__PATCH = "patch.auth.update-user";
export const AUTH__PASSWORD__PATCH = "patch.auth.password";

export type TLoggedUser = TUser & {
    permissions: TPermission[];
};

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
    return useMutation<
        TLoggedUser,
        TError,
        {
            emailOrUsername: string;
            password: string;
            remember: boolean;
        }
    >({
        mutationFn: async ({ remember, emailOrUsername, password }) => {
            const isItEmail = isEmail(emailOrUsername);

            const username = isItEmail ? null : emailOrUsername;
            const email = isItEmail ? emailOrUsername : null;

            return await http.csrf_post(
                "/auth/f/login",
                {
                    username,
                    email,
                    password,
                    remember,
                },
                200
            );
        },
        mutationKey: [AUTH__LOGIN__POST],
    });
};

export const useLogoutMutation = () => {
    return useMutation<void, TError>({
        mutationFn: async () => {
            return await http.post("/auth/logout", {}, 204);
        },
        mutationKey: [AUTH__LOGOUT__POST],
    });
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
                const payload: TLoggedUser = await http.get("/auth", 200);
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
        mutationFn: async email => await http.csrf_post("/auth/f/forgot-password", { email }, 200),
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
        mutationFn: async payload => await http.post("/auth/f/reset-password", payload, 200),
        mutationKey: [AUTH__RESET_PASSWORD__POST],
    });

export const useUploadProfilePictureMutation = () => {
    const { setLoggedUser } = useAuthStore();

    const mutation = useMutation<TLoggedUser, TError, File>({
        mutationFn: async imageFile => {
            const formData = new FormData();
            formData.append("profile-picture", imageFile);
            return await http.form_post("/auth/upload-avatar", formData, 200);
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

export const useUpdateUserMutation = () => {
    const { setLoggedUser } = useAuthStore();

    const mutation = useMutation<TLoggedUser, TError, { email: string; username: string; name: string }>({
        mutationFn: async payload => {
            return await http.patch("/auth", payload, 200);
        },
        mutationKey: [AUTH__UPDATE_USER__PATCH],
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

export const useUpdatePasswordMutation = () => {
    const mutation = useMutation<TLoggedUser, TError, { current_password: string; new_password: string }>({
        mutationFn: async payload => {
            return await http.patch("/auth/password", payload, 200);
        },
        mutationKey: [AUTH__PASSWORD__PATCH],
    });

    useEffect(() => {
        if (mutation.isError) {
            notify("error", mutation.error?.message);
        }

        if (mutation.isSuccess) {
            notify("success", "Password update successfully");
        }
    }, [mutation.isError, mutation.isSuccess]);

    return mutation;
};

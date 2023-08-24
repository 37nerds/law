import http from "@helpers/http";
import useAuthStore from "@states/useAuthStore";

export const registerUser = async (registerData: {
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
    email_verified_at: string | null;
    two_factor_secret: string | null;
    two_factor_recovery_codes: string | null;
    two_factor_confirmed_at: string | null;
    role: string;
    created_at: string;
    updated_at: string;
};

export const loggedUser = async (): Promise<TLoggedUser> => {
    const payload: TLoggedUser = (await http.get("/auth/logged-user", 200)) as any;
    useAuthStore.setState(state => {
        state.loggedUser = payload;
    });
    return payload;
};

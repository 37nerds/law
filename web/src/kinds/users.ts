export type TLoggedUser = {
    id: number;
    name: string;
    email: string;
    username: string;
    avatar: string | null;
    email_verified_at: string | null;
    two_factor_secret: string | null;
    two_factor_recovery_codes: string | null;
    two_factor_confirmed_at: string | null;
    role_id: string;
    created_at: string;
    updated_at: string;
};

export type TUser = {
    id: number;
    name: string;
    email: string;
    username: string;
    avatar: string | null;
    email_verified_at: string | null;
    role_id: string;
    created_at: string;
    updated_at: string;
};

export type TRole = {
    id: string;
    name: string;
    disable: number;
    created_at: string;
    updated_at: string;
};

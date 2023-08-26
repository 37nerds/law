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

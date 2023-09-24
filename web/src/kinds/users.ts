export type Base = {
    id: string;
    created_at: string;
    updated_at: string;
};

export type TRole = Base & {
    name: string;
    disable: number;
};

export type TUser = Base & {
    name: string;
    email: string;
    username: string;
    avatar: string | null;
    email_verified_at: string | null;
    role_id: string;
    role: TRole;
};

export type TResource = Base & {
    api: string;
    web: string;
    method: string;
    label: string;
    group: string;
};

export type TPermission = Base & {
    role_id: string;
    resource_id: string;
    resource: TResource;
};

export type TLoggedUser = {
    user: TUser;
    permissions: TPermission[];
};

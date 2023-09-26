export type Base = {
    id: string;
    created_at: string;
    updated_at: string;
};

export type TRole = Base & {
    name: string;
    disable: number;
    permissions: TPermission[];
};

export type TUser = Base & {
    id?: string;
    name: string;
    email: string;
    username: string;
    avatar: string | null;
    email_verified_at: string | null;
    role_id: string;
    role: TRole;
    address: string;
    phone: string;
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

export type TUserModalOpenFor = {
    id?: number;
    type: "new_user" | "edit_user";
};

export type TRoleModalOpenFor = {
    id?: number;
    type: "new_role" | "edit_role";
};

export type TCreateUser = {
    name: string;
    email: string;
    username: string;
    role_id: string;
    address: string;
    phone: string;
    password: string;
};

export type TEditUser = {
    id?: string;
    name: string;
    email: string;
    username: string;
    role_id: string;
    address: string;
    phone: string;
};

export type TCreateRole = {
    name: string;
};

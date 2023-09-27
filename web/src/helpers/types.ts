import type { ForwardRefExoticComponent, LazyExoticComponent, PropsWithoutRef, SVGProps, JSX } from "react";

export type TOption = {
    name: string;
    value: string;
};

export type TLadderOption = {
    name: string[];
    value: string;
};

export type TBottomButton = {
    type: string;
    handler?: () => void;
};

/**
 * JSON Serializable Type
 *
 * we can convert this type into json string with JSON.stringify() method
 *
 * we can pass this type of data in the request payload body
 */
export type TJsonS =
    | string
    | number
    | boolean
    | null
    | TJsonS[]
    | {
          [key: string]: TJsonS;
      };

export type TError = {
    message?: string;
    errors?: Record<string, string[]>;
};

export type TResponse = {
    status: number;
    payload: TJsonS;
};

export type TRoute = {
    path: string;
    component: LazyExoticComponent<() => JSX.Element>;
};

export type TNotificationType = "success" | "error";

export type TNotification = {
    message: string;
    type: TNotificationType;
};

export type TIcon = ForwardRefExoticComponent<PropsWithoutRef<SVGProps<SVGSVGElement>>>;

export type TSidebarLink = {
    name: string;
    path: string;
    icon: TIcon;
    group?: string;
    omit?: boolean;
    submenus?: TSidebarLink[];
};

export type TProfileDropdownLink = {
    title: string;
    link: string;
};

export type TPaginate<T> = {
    current_page: number;
    data: T[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: { url: string | null; label: string; active: boolean }[];
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
};

export type TBase = {
    id: string;
    created_at: string;
    updated_at: string;
};

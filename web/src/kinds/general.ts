import type { ForwardRefExoticComponent, LazyExoticComponent, PropsWithoutRef, SVGProps } from "react";

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
    message: string;
    errors?: any;
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
    submenus?: TSidebarLink[];
};

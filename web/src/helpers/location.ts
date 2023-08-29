import { guest_routes, protected_routes, public_routes } from "@config/routes";

export const get_pathname = (): string => {
    return location.pathname;
};

export const redirect = (pathname: string): void => {
    window.location.replace(pathname);
};

export const is_public_route = (pathname: string): boolean => {
    return !!public_routes.find(route => route.path === pathname);
};

export const is_guest_route = (pathname: string): boolean => {
    return !!guest_routes.find(route => route.path === pathname);
};

export const is_protected_route = (pathname: string): boolean => {
    return !!protected_routes.find(route => `/_${route.path}` === pathname);
};

export const is_valid_route = (pathname: string): boolean => {
    if (is_public_route(pathname)) {
        return true;
    }
    if (is_guest_route(pathname)) {
        return true;
    }
    return is_protected_route(pathname);
};

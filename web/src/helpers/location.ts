import { guest_routes, protected_routes, public_routes } from "../config/routes";

export const getPathname = (): string => {
    return location.pathname;
};

export const redirect = (pathname: string): void => {
    window.location.replace(pathname);
};

export const isPublicRoute = (pathname: string): boolean => {
    return !!public_routes.find(route => route.path === pathname);
};

export const isGuestRoute = (pathname: string): boolean => {
    return !!guest_routes.find(route => route.path === pathname);
};

export const isProtectedRoute = (pathname: string): boolean => {
    return !!protected_routes.find(route => `/_${route.path}` === pathname);
};

export const isValidRoute = (pathname: string): boolean => {
    if (isPublicRoute(pathname)) {
        return true;
    }
    if (isGuestRoute(pathname)) {
        return true;
    }
    return isProtectedRoute(pathname);
};

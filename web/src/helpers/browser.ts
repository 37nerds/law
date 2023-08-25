export const getPathname = (): string => {
    return location.pathname;
};

export const redirect = (pathname: string): void => {
    window.location.replace(pathname);
};

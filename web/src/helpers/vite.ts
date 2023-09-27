export const env = (name: string, defaultValue: string = "") => {
    return import.meta.env[name] || defaultValue;
};

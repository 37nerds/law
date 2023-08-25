const env = (name: string, defaultValue: string = "") => {
    return import.meta.env[name] || defaultValue;
};

export const SERVER_BASE_URL = env("VITE_SERVER_BASE_URL");

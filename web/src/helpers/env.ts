const env = (name: string, defaultValue: string = "") => {
    return import.meta.env[name] || defaultValue;
};

export const server_base_url = env("VITE_SERVER_BASE_URL", "http://api.develop.sm/api/v1");
export const assert_storage_url = env("VITE_ASSERT_STORAGE_URL", "http://api.develop.sm");

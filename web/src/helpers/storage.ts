const storage = {
    local: {
        set: (key: string, value: string): void => {
            localStorage.setItem(key, value);
        },
        get: (key: string, _default: string = ""): string => {
            return localStorage.getItem(key) || _default;
        },
    },
};

export default storage;

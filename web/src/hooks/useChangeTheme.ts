import { useEffect, useState } from "react";
import { DEFAULT_THEME } from "@config/general";

import storage from "@helpers/storage";

const THEME_STORAGE_KEY = "theme";

const useChangeTheme = () => {
    const [theme, setTheme] = useState(storage.local.get(THEME_STORAGE_KEY, DEFAULT_THEME));

    useEffect(() => {
        document.getElementById("root")?.setAttribute("data-theme", theme);

        storage.local.set(THEME_STORAGE_KEY, theme);
    }, [theme]);

    return { theme, setTheme };
};

export default useChangeTheme;

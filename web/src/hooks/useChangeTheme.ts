import { useEffect, useState } from "react";
import { default_theme } from "@config/general";

import storage from "../facades/storage";

const THEME_STORAGE_KEY = "theme";

const useChangeTheme = () => {
    const [theme, setTheme] = useState(storage.local.get(THEME_STORAGE_KEY, default_theme));

    useEffect(() => {
        document.getElementById("root")?.setAttribute("data-theme", theme);

        storage.local.set(THEME_STORAGE_KEY, theme);
    }, [theme]);

    return { theme, setTheme };
};

export default useChangeTheme;

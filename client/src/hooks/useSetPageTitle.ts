import { useEffect } from "react";

import useAppStore from "@states/appStore";

const useSetPageTitle = (title: string) => {
    const { setPageTitle } = useAppStore();

    useEffect(() => {
        setPageTitle(title);
    }, []);
};

export default useSetPageTitle;

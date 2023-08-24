import { useEffect } from "react";

import useGeneralStore from "@states/generalStore";

const useSetPageTitle = (title: string) => {
    const { setPageTitle } = useGeneralStore();

    useEffect(() => {
        setPageTitle(title);
    }, []);
};

export default useSetPageTitle;

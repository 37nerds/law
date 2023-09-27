import { useEffect } from "react";

import useGeneralStore from "@states/general_store";

const useSetPageTitle = (title: string) => {
    const { setPageTitle } = useGeneralStore();

    useEffect(() => {
        setPageTitle(title);
    }, []);
};

export default useSetPageTitle;

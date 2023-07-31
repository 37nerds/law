import { useAppDispatch } from "@app/hooks";
import { setPageTitle } from "@states/app/headerSlice";
import { useEffect } from "react";

const useSetPageTitle = (title: string) => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(setPageTitle({ title }));
    }, []);
};

export default useSetPageTitle;

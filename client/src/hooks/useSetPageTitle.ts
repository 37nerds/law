import { useAppDispatch } from "@app/hooks";
import { setPageTitle } from "../screens/features/common/headerSlice";
import { useEffect } from "react";

const useSetPageTitle = (title: string) => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(setPageTitle({ title }));
    }, []);
};

export default useSetPageTitle;

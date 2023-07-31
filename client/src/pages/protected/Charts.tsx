import { useAppDispatch } from "@app/hooks";
import Charts from "@components/features/charts/index";
import { setPageTitle } from "@states/app/headerSlice";
import { useEffect } from "react";

function InternalPage() {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(setPageTitle({ title: "Charts" }));
    }, []);

    return <Charts />;
}

export default InternalPage;

import { useAppDispatch } from "@app/hooks";
import Charts from "@features/charts/index";
import { setPageTitle } from "@features/common/headerSlice";
import { useEffect } from "react";

function InternalPage() {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(setPageTitle({ title: "Charts" }));
    }, []);

    return <Charts />;
}

export default InternalPage;

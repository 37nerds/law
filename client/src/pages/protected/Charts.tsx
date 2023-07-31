import { useAppDispatch } from "@app/hooks";
import Charts from "../../screens/features/charts/index";
import { setPageTitle } from "../../screens/features/common/headerSlice";
import { useEffect } from "react";

function InternalPage() {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(setPageTitle({ title: "Charts" }));
    }, []);

    return <Charts />;
}

export default InternalPage;

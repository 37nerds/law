import { useAppDispatch } from "@app/hooks";
import { setPageTitle } from "../../screens/features/common/headerSlice";
import Dashboard from "../../screens/features/dashboard/index";
import { useEffect } from "react";

function InternalPage() {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(setPageTitle({ title: "Dashboard" }));
    }, []);

    return <Dashboard />;
}

export default InternalPage;

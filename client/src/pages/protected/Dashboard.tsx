import { useAppDispatch } from "@app/hooks";
import { setPageTitle } from "@states/app/headerSlice";
import Dashboard from "@components/features/dashboard/index";
import { useEffect } from "react";

function InternalPage() {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(setPageTitle({ title: "Dashboard" }));
    }, []);

    return <Dashboard />;
}

export default InternalPage;

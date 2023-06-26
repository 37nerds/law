import { useAppDispatch } from "@app/hooks";
import { setPageTitle } from "@features/common/headerSlice";
import Leads from "@features/leads/index";
import { useEffect } from "react";

function InternalPage() {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(setPageTitle({ title: "Leads" }));
    }, []);

    return <Leads />;
}

export default InternalPage;

import { useAppDispatch } from "@app/hooks";
import { setPageTitle } from "@states/app/headerSlice";
import Integration from "@components/features/integration";
import { useEffect } from "react";

function InternalPage() {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(setPageTitle({ title: "Integrations" }));
    }, []);

    return <Integration />;
}

export default InternalPage;

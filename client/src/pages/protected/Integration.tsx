import { useAppDispatch } from "@app/hooks";
import { setPageTitle } from "../../screens/features/common/headerSlice";
import Integration from "../../screens/features/integration";
import { useEffect } from "react";

function InternalPage() {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(setPageTitle({ title: "Integrations" }));
    }, []);

    return <Integration />;
}

export default InternalPage;

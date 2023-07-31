import { useAppDispatch } from "@app/hooks";
import { useEffect } from "react";
import { setPageTitle } from "@states/app/headerSlice";
import Billing from "@components/features/settings/billing";

const InternalPage = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(setPageTitle({ title: "Bills" }));
    }, []);

    return <Billing />;
};

export default InternalPage;

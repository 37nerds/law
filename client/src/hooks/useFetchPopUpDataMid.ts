import { useEffect } from "react";

import { useFetchPopUpDataQuery } from "@states/customers/customerApi";
import { selectPopUpData } from "@states/customers/customerSelector";
import useNotify from "@hooks/useNotify";
import { NOTIFICATION_TYPE } from "@states/app/appSlice";

const useFetchPopUpDataMid = () => {
    const { error, isLoading } = useFetchPopUpDataQuery({});
    const notify = useNotify();

    useEffect(() => {
        if (error) {
            const { data } = (error as any) || {};
            notify(
                NOTIFICATION_TYPE.ERROR,
                `In fetching pop up data: ${data?.message}`
            );
        }
    }, [error]);

    const { companies, units } = selectPopUpData() || {};

    return { isLoading, companies, units };
};

export default useFetchPopUpDataMid;

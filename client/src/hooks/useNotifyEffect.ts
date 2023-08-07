import useNotify from "@hooks/useNotify";
import { useEffect } from "react";
import { NOTIFICATION_TYPE } from "@states/app/appSlice";

const useNotifyEffect = (
    error: any,
    errorPrefix: string,
    isSuccess: boolean = false,
    successMessage: string = ""
) => {
    const notify = useNotify();

    useEffect(() => {
        if (error) {
            const { data } = (error as any) || {};
            notify(
                NOTIFICATION_TYPE.ERROR,
                `${errorPrefix || "X"}: ${data?.message}`
            );
        }
    }, [error]);

    useEffect(() => {
        if (isSuccess) {
            notify(NOTIFICATION_TYPE.SUCCESS, successMessage);
        }
    }, [isSuccess]);
};

export default useNotifyEffect;

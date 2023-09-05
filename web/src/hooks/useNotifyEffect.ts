import { useEffect } from "react";
import { notify } from "@helpers/unknown";

const useNotifyEffect = (error: any, errorPrefix: string, isSuccess: boolean = false, successMessage: string = "") => {
    useEffect(() => {
        if (error) {
            const { data } = (error as any) || {};
            notify("error", `${errorPrefix || "X"}: ${data?.message}`);
        }
    }, [error]);

    useEffect(() => {
        if (isSuccess) {
            notify("success", successMessage);
        }
    }, [isSuccess]);
};

export default useNotifyEffect;

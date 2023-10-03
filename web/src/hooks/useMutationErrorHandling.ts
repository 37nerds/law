import { useEffect } from "react";
import { notify } from "@helpers/notify";
import { UseMutationResult } from "react-query";
import { TError } from "@helpers/types";

const useMutationErrorHandling = <T, T2>(mutation: UseMutationResult<T, TError, T2>) => {
    useEffect(() => {
        if (mutation.isError) {
            notify("error", mutation.error?.message);
        }
    }, [mutation.isError]);
};

export default useMutationErrorHandling;

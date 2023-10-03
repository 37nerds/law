import type { UseMutationResult } from "react-query";
import type { TError } from "@helpers/types";

import { useEffect } from "react";
import { notify } from "@helpers/notify";

const useMutationErrorMessage = <T, T2>(mutation: UseMutationResult<T, TError, T2>, message: string) => {
    useEffect(() => {
        if (mutation.isSuccess) notify("success", message);
    }, [mutation.isSuccess]);
};

export default useMutationErrorMessage;

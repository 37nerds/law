import type { UseQueryResult } from "react-query";
import type { TError } from "@helpers/types";

import { useEffect } from "react";
import { notify } from "@helpers/notify";

const useQueryErrorMessage = <T>(query: UseQueryResult<T, TError>) => {
    useEffect(() => {
        if (query.isError) {
            notify("error", query.error?.message);
        }
    }, [query.isError]);
};

export default useQueryErrorMessage;

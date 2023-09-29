import type { ReactNode } from "react";
import type { TError } from "@helpers/types";
import type { UseQueryResult } from "react-query";

import ErrorText from "@components/pure/ErrorText";
import Loading from "@components/pure/Loading";

const QueryWrapper = <T,>({ query, children }: { query: UseQueryResult<T, TError>; children: ReactNode }) => {
    return (
        <>
            {query.isLoading ? (
                <Loading />
            ) : query.isError ? (
                <ErrorText>{query.error?.message || ""}</ErrorText>
            ) : !query.data ? (
                <ErrorText>{"data is null"}</ErrorText>
            ) : (
                <>{children}</>
            )}
        </>
    );
};

export default QueryWrapper;

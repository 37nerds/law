import type { ReactNode } from "react";
import type { TError } from "@helpers/types";
import type { UseQueryResult } from "react-query";

import ErrorText from "../pure/ErrorText";
import Loading from "../pure/Loading";

const QueryLayout = <T,>({ query, children }: { query: UseQueryResult<T, TError>; children: ReactNode }) => {
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

export default QueryLayout;

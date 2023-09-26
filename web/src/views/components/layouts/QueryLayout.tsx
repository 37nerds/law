import { TError } from "@kinds/general";
import { ReactNode } from "react";
import { UseQueryResult } from "react-query";

import ErrorText from "@components/pure/ErrorText";
import Loading from "@components/pure/Loading";

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

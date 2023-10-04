import type { TError, TPaginate } from "@helpers/types";
import type { UseQueryResult } from "react-query";
import type { ReactNode } from "react";

import QueryWrapper from "@components/wrappers/QueryWrapper";
import Paginator from "@components/pure/Paginator";

const PaginationWrapper = <T,>({
    query,
    children,
    page,
    onSetPage,
}: {
    query: UseQueryResult<TPaginate<T>, TError>;
    children: ReactNode;
    page: number;
    onSetPage: (page: number) => void;
}) => {
    return (
        <QueryWrapper<TPaginate<T>> query={query}>
            {query.data && query.data?.data?.length !== 0 ? (
                <div className="flex flex-col gap-2">
                    {children}
                    <div className={`flex items-center justify-between gap-5 rounded-lg border border-base-300 py-2`}>
                        <div>
                            <Paginator
                                currentPage={page}
                                totalPages={query.data.last_page}
                                totalItems={query.data?.total}
                                totalPerPageItems={query.data?.per_page}
                                onSetCurrentPage={onSetPage}
                            />
                        </div>
                        <div className="px-4">
                            Showing <span className="text-success">{(page - 1) * query.data?.per_page + 1}</span> to{" "}
                            <span className="text-success">
                                {Math.min(page * query.data?.per_page, query.data.total)}
                            </span>{" "}
                            of {query.data?.total} items
                        </div>
                    </div>
                </div>
            ) : (
                <div className="mt-5 text-center text-error">No data found!</div>
            )}
        </QueryWrapper>
    );
};

export default PaginationWrapper;

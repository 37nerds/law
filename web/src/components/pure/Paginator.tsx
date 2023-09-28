import { Pagination, PaginationList, PaginationNext, PaginationPrev } from "react-unstyled-pagination";

const Paginator = ({
    currentPage,
    totalPages,
    totalItems,
    totalPerPageItems,
    onSetCurrentPage,
    className = "",
}: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    totalPerPageItems: number;
    onSetCurrentPage: (page: number) => void;
    className?: string;
}) => {
    return (
        <>
            {totalItems > totalPerPageItems ? (
                <Pagination
                    page={currentPage}
                    onPageChange={onSetCurrentPage}
                    total={totalPages}
                    boundaries={1}
                    siblings={1}
                    className={`flex items-center rounded-lg border border-base-300 py-2 ${className}`}
                >
                    <PaginationPrev className="h-[40px] w-[40px] data-[disabled=true]:cursor-not-allowed data-[disabled=true]:opacity-50">{`<`}</PaginationPrev>
                    <PaginationList className="relative h-[40px] w-[40px] rounded-lg transition-all data-[active=true]:bg-success data-[active=true]:text-base-100" />
                    <PaginationNext className="h-[40px] w-[40px] data-[disabled=true]:cursor-not-allowed data-[disabled=true]:opacity-50">{`>`}</PaginationNext>
                </Pagination>
            ) : (
                <></>
            )}
        </>
    );
};

export default Paginator;

import { Pagination, PaginationList, PaginationNext, PaginationPrev } from "react-unstyled-pagination";

const Paginator = ({
    currentPage,
    totalPages,
    onSetCurrentPage,
}: {
    currentPage: number;
    totalPages: number;
    onSetCurrentPage: (page: number) => void;
}) => {
    return (
        <Pagination
            page={currentPage}
            onPageChange={onSetCurrentPage}
            total={totalPages}
            boundaries={1}
            siblings={1}
            className="flex items-center"
        >
            <PaginationPrev className="h-[40px] w-[40px] data-[disabled=true]:cursor-not-allowed data-[disabled=true]:opacity-50">{`<`}</PaginationPrev>
            <PaginationList className="relative h-[40px] w-[40px] rounded-lg transition-all data-[active=true]:bg-indigo-500" />
            <PaginationNext className="h-[40px] w-[40px] data-[disabled=true]:cursor-not-allowed data-[disabled=true]:opacity-50">{`>`}</PaginationNext>
        </Pagination>
    );
};

export default Paginator;

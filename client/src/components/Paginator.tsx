const Paginator = ({
    currentPage,
    totalPages,
    onSetCurrentPage,
}: {
    currentPage: number;
    totalPages: number;
    onSetCurrentPage: (newPage: number) => void;
}) => {
    const renderPageButtons = () => {
        const buttons = [];
        const maxButtons = 5;
        const startPage =
            totalPages <= maxButtons ? 1 : Math.max(1, currentPage - 2);
        const endPage =
            totalPages <= maxButtons
                ? totalPages
                : Math.min(totalPages, currentPage + 2);

        if (currentPage > 1 && maxButtons < totalPages) {
            buttons.push(
                <div
                    key="previous"
                    className="btn"
                    onClick={() => onSetCurrentPage(currentPage - 1)}
                >
                    Previous
                </div>
            );
        }

        if (startPage !== 1 && maxButtons < totalPages) {
            buttons.push(
                <button key={1} className="btn-disabled btn">
                    ...
                </button>
            );
        }

        for (let i = startPage; i <= endPage; i++) {
            const isActive = i === currentPage;
            const buttonClass = isActive ? "btn btn-active" : "btn";
            buttons.push(
                <div
                    key={i}
                    className={buttonClass}
                    onClick={() => onSetCurrentPage(i)}
                >
                    {i}
                </div>
            );
        }

        if (endPage !== totalPages && maxButtons < totalPages) {
            buttons.push(
                <button key={totalPages} className="btn-disabled btn">
                    ...
                </button>
            );
        }

        if (currentPage < totalPages && maxButtons < totalPages) {
            buttons.push(
                <div
                    key="next"
                    className="btn"
                    onClick={() => onSetCurrentPage(currentPage + 1)}
                >
                    Next
                </div>
            );
        }

        return buttons;
    };

    return <div className="btn-group">{renderPageButtons()}</div>;
};

export default Paginator;

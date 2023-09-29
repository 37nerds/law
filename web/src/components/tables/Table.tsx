import type { ReactNode } from "react";

const Table = ({ children }: { children: ReactNode }) => {
    return (
        <div className="w-full rounded-lg border border-base-300">
            <table className="table table-sm w-full">{children}</table>
        </div>
    );
};

export default Table;

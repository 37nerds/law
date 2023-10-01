import type { ReactNode } from "react";
import type { TOrder } from "@helpers/types";

import ArrowDownIcon from "@heroicons/react/24/outline/ArrowDownIcon";
import ArrowUpIcon from "@heroicons/react/24/outline/ArrowUpIcon";
import SortIcon from "@components/icons/SortIcon";

const Th = <T,>({
    onClick,
    order,
    column,
    name,
    label,
}: {
    onClick: (name: T) => void;
    order: TOrder;
    column: T;
    name: T | null;
    label: string | ReactNode;
}) => {
    return (
        <>
            {name ? (
                <th className="cursor-pointer " onClick={() => onClick(name)}>
                    <div className="flex items-center gap-1">
                        {label}
                        {column === name ? (
                            order === "asc" ? (
                                <SortIcon sort={"asc"} />
                            ) : (
                                <SortIcon sort={"desc"} />
                            )
                        ) : (
                            <SortIcon />
                        )}
                    </div>
                </th>
            ) : (
                <th>{label}</th>
            )}
        </>
    );
};

export default Th;

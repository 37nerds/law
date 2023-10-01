import type { ReactNode } from "react";
import type { TOrder } from "@helpers/types";

import ArrowDownIcon from "@heroicons/react/24/outline/ArrowDownIcon";
import ArrowUpIcon from "@heroicons/react/24/outline/ArrowUpIcon";
import MinusIcon from "@heroicons/react/24/outline/MinusIcon";

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
                                <ArrowDownIcon className="w-4" />
                            ) : (
                                <ArrowUpIcon className="w-4" />
                            )
                        ) : (
                            <MinusIcon className="w-4" />
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

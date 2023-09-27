import type { ReactNode } from "react";

const Td = ({ children }: { children: string | number | undefined | null | ReactNode }) => {
    return <td>{children || "N/A"}</td>;
};

export default Td;

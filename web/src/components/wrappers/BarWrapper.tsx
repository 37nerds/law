import type { ReactNode } from "react";

const BarWrapper = ({ children }: { children: ReactNode }) => {
    return <div className="flex justify-between rounded-lg border border-base-300 p-2">{children}</div>;
};

export default BarWrapper;

import { ReactNode } from "react";

const Subtitle = ({ className, children }: { className?: string; children: ReactNode }) => {
    return <div className={`text-xl font-semibold ${className}`}>{children}</div>;
};

export default Subtitle;

import type { ReactNode } from "react";

const PageCard = ({ children, className = "" }: { children: ReactNode; className?: string }) => {
    return (
        <div className={`card flex w-full flex-col gap-3 rounded-lg bg-base-100 p-6 shadow-md ${className}`}>
            {children}
        </div>
    );
};

export default PageCard;

import { ReactNode } from "react";

const Title = ({
    className,
    children,
}: {
    children: ReactNode;
    className?: string;
}) => {
    return <h2 className={`text-2xl font-bold  ${className}`}>{children}</h2>;
};

export default Title;

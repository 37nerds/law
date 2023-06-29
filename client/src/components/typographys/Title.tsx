import { ReactNode } from "react";

type Props = {
    className?: string;
    children: ReactNode;
};

const Title = ({ className, children }: Props) => {
    return <p className={`text-2xl font-bold  ${className}`}>{children}</p>;
};

export default Title;

import { ReactNode } from "react";

type Props = {
    className?: string;
    children: ReactNode;
};

const HelperText = ({ className, children }: Props) => {
    return <div className={`text-slate-400 ${className}`}>{children}</div>;
};

export default HelperText;

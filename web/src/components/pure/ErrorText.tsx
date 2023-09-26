import { ReactNode } from "react";

const ErrorText = ({ children, className }: { children: ReactNode; className?: string }) => {
    return <p className={`text-center text-error ${className}`}>{children}</p>;
};

export default ErrorText;

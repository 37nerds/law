import { ReactNode } from "react";

const ErrorText = ({
    children,
    styleClass,
}: {
    children: ReactNode;
    styleClass?: string;
}) => {
    return <p className={`text-center text-error ${styleClass}`}>{children}</p>;
};

export default ErrorText;

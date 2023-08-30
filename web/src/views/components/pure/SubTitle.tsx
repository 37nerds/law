import { ReactNode } from "react";

const SubTitle = ({
    className,
    children,
    divider = false,
}: {
    children: ReactNode;
    className?: string;
    divider?: boolean;
}) => {
    return (
        <div>
            <h3 className={`text-xl font-semibold ${className}`}>{children}</h3>
            {divider ? <div className="divider my-0"></div> : <></>}
        </div>
    );
};

export default SubTitle;

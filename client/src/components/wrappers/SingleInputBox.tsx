import { ReactElement } from "react";

const SingleInputBox = ({
    label,
    element,
}: {
    label: string;
    element: ReactElement;
}) => {
    return (
        <div className="flex w-full flex-col items-center gap-1 lg:flex-row">
            <div className="w-full lg:w-1/5">{label}</div>
            <div className="w-full lg:w-4/5">{element}</div>
        </div>
    );
};

export default SingleInputBox;

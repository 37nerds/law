import { ReactElement } from "react";

const SingleInputBox = ({
    label,
    element,
    required = false,
}: {
    label: string;
    element: ReactElement;
    required?: boolean;
}) => {
    return (
        <div className="flex w-full flex-col items-center lg:flex-row">
            <div className="w-full lg:w-1/6">
                {label}
                {required ? " * " : ""}
            </div>
            <div className="w-full lg:w-5/6">{element}</div>
        </div>
    );
};

export default SingleInputBox;

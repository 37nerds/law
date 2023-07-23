import { ReactElement } from "react";

const DoubleInputBox = ({
    label1,
    element1,
    required1 = false,
    label2,
    element2,
    required2 = false,
}: {
    label1: string;
    element1: ReactElement;
    required1?: boolean;
    label2: string;
    element2: ReactElement;
    required2?: boolean;
}) => {
    return (
        <div className="flex w-full flex-col items-center lg:flex-row">
            <div className="w-full lg:w-1/6">
                {label1} {required1 ? " * " : ""}
            </div>
            <div className="w-full lg:w-2/6">{element1}</div>
            <div className="w-full lg:w-1/6 lg:pl-3">
                {label2} {required2 ? " * " : ""}
            </div>
            <div className="w-full lg:w-2/6">{element2}</div>
        </div>
    );
};

export default DoubleInputBox;

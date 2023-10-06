import { ReactElement } from "react";

const DoubleInputBox = ({
    label1,
    element1,
    required1 = false,
    errorMessage1,
    label2,
    element2,
    required2 = false,
    errorMessage2,
}: {
    label1: string;
    element1: ReactElement;
    required1?: boolean;
    errorMessage1?: string[];
    label2: string;
    element2: ReactElement;
    required2?: boolean;
    errorMessage2?: string[];
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

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
        <div className="flex w-full flex-col items-center gap-1 lg:flex-row">
            <div className="w-full lg:w-1/5">
                {label1} {required1 ? " * " : ""}
            </div>
            <div className="flex w-full flex-col items-center gap-1 lg:w-4/5 lg:flex-row lg:gap-5">
                <div className="w-full lg:w-[42.85%]">{element1}</div>
                <div className="w-full lg:w-[14.29%]">
                    {label2} {required2 ? " * " : ""}
                </div>
                <div className="w-full lg:w-[42.85%]">{element2}</div>
            </div>
        </div>
    );
};

export default DoubleInputBox;

import type { ReactElement } from "react";

import { prepareErrorString } from "@helpers/strings";

import InputError from "../pure/InputError";

const SingleInputBox = ({
    label,
    element,
    required = false,
    errorMessage = null,
}: {
    label: string;
    element: ReactElement;
    required?: boolean;
    errorMessage?: string[] | null;
}) => {
    return (
        <div className="flex flex-col gap-2">
            <div className="flex w-full flex-col items-center lg:flex-row">
                <div className="w-full lg:w-1/6">
                    {label}
                    {required ? " * " : ""}
                </div>
                <div className="w-full lg:w-5/6">{element}</div>
            </div>
            <div className="flex w-full justify-end">
                <div className="w-full lg:w-5/6">
                    {errorMessage && <InputError message={prepareErrorString(errorMessage)} />}
                </div>
            </div>
        </div>
    );
};

export default SingleInputBox;

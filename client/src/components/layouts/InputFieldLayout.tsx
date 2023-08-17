import { ReactNode } from "react";

import InputError from "@components/inputs/fields/InputError";
import InputLabel from "@components/inputs/fields/InputLabel";

const InputFieldLayout = ({
    children,
    errorMessage = "",
    label = "",
}: {
    children: ReactNode;
    errorMessage?: string;
    label?: string;
}) => {
    return (
        <div className="flex flex-col gap-2">
            {label && <InputLabel label={label} />}
            {children}
            {errorMessage && <InputError message={errorMessage} />}
        </div>
    );
};

export default InputFieldLayout;

import { ReactNode } from "react";

import InputLabel from "@components/pure/InputLabel";
import InputError from "@components/pure/InputError";

const InputLayout = ({
    input,
    label = null,
    required = false,
    errorMessage = null,
}: {
    input: ReactNode;
    label?: string | null;
    required?: boolean;
    errorMessage?: string | null;
}) => {
    return (
        <div className="form-control flex w-full flex-col">
            {label && <InputLabel label={`${label} ${required ? "*" : ""}`} />}
            <div className="flex flex-col gap-2">
                {input}
                {errorMessage && <InputError message={errorMessage} />}
            </div>
        </div>
    );
};

export default InputLayout;

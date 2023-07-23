import InputError from "@components/inputs/InputError";
import { ReactNode } from "react";

const InputFieldBox = ({
    children,
    errorMessage,
}: {
    children: ReactNode;
    errorMessage?: string;
}) => {
    return (
        <div className="flex flex-col gap-2">
            {children}
            <InputError message={errorMessage} />
        </div>
    );
};

export default InputFieldBox;

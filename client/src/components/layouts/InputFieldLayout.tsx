import InputError from "@components/inputs/fields/InputError";
import { ReactNode } from "react";

const InputFieldLayout = ({
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

export default InputFieldLayout;

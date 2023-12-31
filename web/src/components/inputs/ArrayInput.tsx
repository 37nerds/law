import { useState } from "react";

import Input from "@components/inputs/Input";
import ArrayInputLayout from "@components/inputs/ArrayInputLayout";

const ArrayInput = ({
    value,
    setValue,
    placeholder = "",
    required = false,
    disabled = false,
    label = null,
    errorMessage = null,
    id = "",
}: {
    value: string[];
    setValue?: (value: string[]) => void;
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
    label?: string | null;
    errorMessage?: string | null;
    id?: string;
}) => {
    const [text, setText] = useState("");

    return (
        <ArrayInputLayout
            input={
                <Input
                    value={text}
                    type="text"
                    placeholder="Enter here"
                    setValue={setText}
                    disabled={disabled}
                    id={id}
                    autoComplete="on"
                />
            }
            errorMessage={errorMessage}
            label={label}
            placeholder={placeholder}
            required={required}
            setText={setText}
            setValue={setValue}
            text={text}
            value={value}
        />
    );
};

export default ArrayInput;

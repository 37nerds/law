import type { TOption } from "@helpers/types";

import { useState } from "react";

import ArrayInputLayout from "@components/inputs/ArrayInputLayout";
import Select from "@components/inputs/Select";

const ArraySelectInput = ({
    value,
    setValue,
    placeholder = "",
    required = false,
    disabled = false,
    label = null,
    errorMessage = null,
    id = "",
    options,
}: {
    value: string[];
    setValue?: (value: string[]) => void;
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
    label?: string | null;
    errorMessage?: string | null;
    id?: string;
    options: TOption[];
}) => {
    const [text, setText] = useState("");

    return (
        <ArrayInputLayout
            input={
                <Select
                    placeholder={placeholder}
                    value={text}
                    setValue={setText}
                    disabled={disabled}
                    required={required}
                    options={options}
                    id={id}
                />
            }
            errorMessage={errorMessage}
            label={label}
            required={required}
            setText={setText}
            setValue={setValue}
            text={text}
            value={value}
        />
    );
};

export default ArraySelectInput;

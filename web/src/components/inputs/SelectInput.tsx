import type { TOption } from "@helpers/types";

import InputLayout from "./InputLayout";
import Select from "./Select";

const SelectInput = ({
    value,
    setValue,
    options,
    placeholder = "",
    required = false,
    disabled = false,
    label = null,
    errorMessage = null,
    id = "",
}: {
    value: string;
    setValue: (_: string) => void;
    options: TOption[];
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
    label?: string | null;
    errorMessage?: string | null;
    id?: string;
}) => {
    return (
        <InputLayout
            input={
                <Select
                    placeholder={placeholder}
                    value={value || ""}
                    setValue={setValue}
                    disabled={disabled}
                    required={required}
                    options={options}
                    id={id}
                />
            }
            label={label}
            required={required}
            errorMessage={errorMessage}
        />
    );
};

export default SelectInput;

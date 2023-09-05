import { TOption } from "@kinds/general";

import InputLayout from "@components/inputs/internal/InputLayout";
import Select from "@components/inputs/internal/Select";

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

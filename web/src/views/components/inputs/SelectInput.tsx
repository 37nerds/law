import { TOption } from "@kinds/general";

import InputLayout from "./internal/InputLayout";

const SelectInput = ({
    value,
    setValue,
    options,
    placeholder = "",
    required = false,
    disabled = false,
    label = null,
    errorMessage = null,
}: {
    value: string;
    setValue: (_: string) => void;
    options: TOption[];
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
    label?: string | null;
    errorMessage?: string | null;
}) => {
    return (
        <InputLayout
            input={
                <select
                    className="select-bordered select w-full"
                    value={value || ""}
                    onChange={e => setValue(e.target.value)}
                    disabled={disabled}
                    required={required}
                >
                    <option disabled value="">
                        {placeholder}
                    </option>
                    {options.map((o, k) => {
                        return (
                            <option value={o.value || o.name} key={k}>
                                {o.name}
                            </option>
                        );
                    })}
                </select>
            }
            label={label}
            required={required}
            errorMessage={errorMessage}
        />
    );
};

export default SelectInput;

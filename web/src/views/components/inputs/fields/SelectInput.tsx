import InputFieldLayout from "@layouts/InputFieldLayout";
import { TOption } from "@kinds/general";

const SelectInput = ({
    value,
    setValue,
    options,
    placeholder = "",
    errorMessage = "",
    disabled = false,
}: {
    value: string;
    setValue: (_: string) => void;
    options: TOption[];
    placeholder?: string;
    errorMessage?: string;
    disabled?: boolean;
}) => {
    return (
        <InputFieldLayout errorMessage={errorMessage}>
            <select
                className="select-bordered select w-full"
                value={value || ""}
                onChange={e => setValue(e.target.value)}
                disabled={disabled}
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
        </InputFieldLayout>
    );
};

export default SelectInput;

import type { TOption } from "@helpers/types";

const Select = ({
    value,
    setValue,
    options,
    placeholder = "",
    required = false,
    disabled = false,
    id = "",
    className = "",
}: {
    value: string;
    setValue: (value: string) => void;
    options: TOption[];
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
    id?: string;
    className?: string;
}) => {
    return (
        <select
            className={`select select-bordered w-full ${className}`}
            value={value || ""}
            onChange={e => setValue(e.target.value)}
            disabled={disabled}
            required={required}
            id={id}
        >
            {placeholder && (
                <option disabled value="">
                    {placeholder}
                </option>
            )}
            {options.map((o, k) => {
                return (
                    <option value={o.value} key={k}>
                        {o.name}
                    </option>
                );
            })}
        </select>
    );
};

export default Select;

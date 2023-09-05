import { TOption } from "@kinds/general";

const Select = ({
    value,
    setValue,
    options,
    placeholder = "",
    required = false,
    disabled = false,
    id = "",
}: {
    value: string;
    setValue: (value: string) => void;
    options: TOption[];
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
    id?: string;
}) => {
    return (
        <select
            className="select-bordered select w-full"
            value={value || ""}
            onChange={e => setValue(e.target.value)}
            disabled={disabled}
            required={required}
            id={id}
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
    );
};

export default Select;

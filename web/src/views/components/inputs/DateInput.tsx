import InputLayout from "./internal/InputLayout";

/**
 * Select date with native html api
 */
const DateInput = ({
    value,
    setValue,
    placeholder = "",
    required = false,
    disabled = false,
    label = null,
    errorMessage = null,
}: {
    value: string;
    setValue: (value: string) => void;
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
    label?: string | null;
    errorMessage?: string | null;
}) => {
    return (
        <InputLayout
            input={
                <input
                    value={value || ""}
                    type="date"
                    placeholder={placeholder}
                    onChange={e => setValue && setValue(e.target.value)}
                    className="input-bordered input w-full"
                    required={required}
                    disabled={disabled}
                />
            }
            label={label}
            required={required}
            errorMessage={errorMessage}
        />
    );
};

export default DateInput;

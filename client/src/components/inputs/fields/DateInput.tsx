import InputFieldLayout from "@components/layouts/InputFieldLayout";

/**
 * Select date with native html api
 */
const DateInput = ({
    value,
    setValue,
    placeholder = "",
    errorMessage = "",
    required = false,
    disabled = false,
}: {
    value: string;
    setValue: (_: string) => void;
    placeholder?: string;
    errorMessage?: string;
    required?: boolean;
    disabled?: boolean;
}) => {
    return (
        <InputFieldLayout errorMessage={errorMessage}>
            <input
                value={value || ""}
                type="date"
                placeholder={placeholder}
                onChange={e => setValue && setValue(e.target.value)}
                className="input-bordered input w-full"
                required={required}
                disabled={disabled}
            />
        </InputFieldLayout>
    );
};

export default DateInput;

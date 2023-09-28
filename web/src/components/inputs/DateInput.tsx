import Input from "./Input";
import InputLayout from "./InputLayout";

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
    id = "",
}: {
    value: string;
    setValue: (value: string) => void;
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
                <Input
                    value={value || ""}
                    type="date"
                    placeholder={placeholder}
                    setValue={setValue}
                    required={required}
                    disabled={disabled}
                    id={id}
                />
            }
            label={label}
            required={required}
            errorMessage={errorMessage}
        />
    );
};

export default DateInput;

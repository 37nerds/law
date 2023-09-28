import Input from "./Input";
import InputLayout from "./InputLayout";

const EmailInput = ({
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
                    type="email"
                    placeholder={placeholder}
                    setValue={setValue}
                    required={required}
                    disabled={disabled}
                    id={id}
                    autoComplete="email"
                />
            }
            label={label}
            required={required}
            errorMessage={errorMessage}
        />
    );
};

export default EmailInput;

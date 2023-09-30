import InputLayout from "@components/inputs/InputLayout";
import Input from "@components/inputs/Input";

const StringInput = ({
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
    setValue?: (value: string) => void;
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
                    type="text"
                    placeholder={placeholder}
                    setValue={setValue}
                    required={required}
                    disabled={disabled}
                    id={id}
                    autoComplete="on"
                />
            }
            label={label}
            required={required}
            errorMessage={errorMessage}
        />
    );
};

export default StringInput;

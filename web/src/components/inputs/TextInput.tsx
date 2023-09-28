import InputLayout from "./InputLayout";

const TextInput = ({
    value,
    setValue,
    label = null,
    placeholder = "",
    errorMessage = null,
    required = false,
    disabled = false,
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
                <textarea
                    value={value || ""}
                    className="textarea textarea-bordered w-full"
                    placeholder={placeholder}
                    onChange={e => setValue(e.target.value)}
                    required={required}
                    disabled={disabled}
                ></textarea>
            }
            label={label}
            required={required}
            errorMessage={errorMessage}
        />
    );
};

export default TextInput;

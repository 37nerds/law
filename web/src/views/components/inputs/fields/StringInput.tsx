import InputFieldLayout from "@layouts/InputFieldLayout";

const StringInput = ({
    value,
    setValue,
    placeholder = "",
    errorMessage = "",
    required = false,
    type = "text",
    disabled = false,
    label = "",
}: {
    value: string;
    setValue: (value: string) => void;
    placeholder?: string;
    errorMessage?: string;
    required?: boolean;
    type?: "text" | "email";
    disabled?: boolean;
    label?: string;
}) => {
    return (
        <InputFieldLayout errorMessage={errorMessage} label={`${label} ${required ? "*" : ""}`}>
            <input
                value={value || ""}
                type={type}
                placeholder={placeholder}
                onChange={e => setValue && setValue(e.target.value)}
                className="input-bordered input w-full"
                required={required}
                disabled={disabled}
            />
        </InputFieldLayout>
    );
};

export default StringInput;

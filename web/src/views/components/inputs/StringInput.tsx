import InputLayout from "./internal/InputLayout";

const StringInput = ({
    value,
    setValue,
    type = "text",
    placeholder = "",
    required = false,
    disabled = false,
    label = null,
    errorMessage = null,
}: {
    value: string;
    setValue: (value: string) => void;
    type?: "text" | "email";
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
                    type={type}
                    placeholder={placeholder}
                    onChange={e => setValue && setValue(e.target.value)}
                    className="input-bordered input w-full"
                    required={required}
                    disabled={disabled}
                    autoComplete={type === "email" ? "email" : "on"}
                />
            }
            label={label}
            required={required}
            errorMessage={errorMessage}
        />
    );
};

export default StringInput;

import InputFieldLayout from "@components/layouts/InputFieldLayout";

const StringInput = ({
    value,
    setValue,
    placeholder = "",
    errorMessage = "",
    required = false,
    type = "text",
    disabled = false,
}: {
    value: string;
    setValue: (_: string) => void;
    placeholder?: string;
    errorMessage?: string;
    required?: boolean;
    type?: "text" | "email";
    disabled?: boolean;
}) => {
    return (
        <InputFieldLayout errorMessage={errorMessage}>
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

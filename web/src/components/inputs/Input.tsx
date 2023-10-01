const Input = ({
    value,
    setValue,
    type = "text",
    placeholder = "",
    required = false,
    disabled = false,
    id = "",
    autoComplete = "",
    className = "",
}: {
    value: string;
    setValue?: (value: string) => void;
    type?: "text" | "email" | "password" | "date";
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
    id?: string;
    autoComplete?: string;
    className?: string;
}) => {
    return (
        <input
            value={value || ""}
            type={type}
            placeholder={placeholder}
            onChange={e => setValue && setValue(e.target.value)}
            className={`input input-bordered w-full rounded-lg ${className}`}
            required={required}
            disabled={disabled}
            autoComplete={autoComplete}
            id={id}
            name={id}
        />
    );
};

export default Input;

import InputFieldLayout from "@components/layouts/InputFieldLayout";

const StringInput = ({
    value,
    setValue,
    placeholder = "",
    errorMessage = "",
    required = false,
    type = "text",
}: {
    value: string;
    setValue: (_: string) => void;
    placeholder?: string;
    errorMessage?: string;
    required?: boolean;
    type?: string;
}) => {
    return (
        <InputFieldLayout errorMessage={errorMessage}>
            <input
                value={value}
                type={type}
                placeholder={placeholder}
                onChange={e => setValue(e.target.value)}
                className="input-bordered input w-full"
                required={required}
            />
        </InputFieldLayout>
    );
};

export default StringInput;

import InputFieldLayout from "@layouts/InputFieldLayout";

const TextAreaInput = ({
    value,
    setValue,
    placeholder = "",
    errorMessage = "",
    disabled = false,
}: {
    value: string;
    setValue: (_: string) => void;
    placeholder?: string;
    errorMessage?: string;
    disabled?: boolean;
}) => {
    return (
        <InputFieldLayout errorMessage={errorMessage}>
            <textarea
                value={value || ""}
                className="textarea-bordered textarea w-full"
                placeholder={placeholder}
                onChange={e => setValue(e.target.value)}
            ></textarea>
        </InputFieldLayout>
    );
};

export default TextAreaInput;

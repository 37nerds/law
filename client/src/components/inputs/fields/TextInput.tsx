import InputFieldLayout from "@components/layouts/InputFieldLayout";

const TextAreaInput = ({
    value,
    setValue,
    placeholder = "",
    errorMessage = "",
}: {
    value: string;
    setValue: (_: string) => void;
    placeholder?: string;
    errorMessage?: string;
}) => {
    return (
        <InputFieldLayout errorMessage={errorMessage}>
            <textarea
                value={value}
                className="textarea-bordered textarea w-full"
                placeholder={placeholder}
                onChange={e => setValue(e.target.value)}
            ></textarea>
        </InputFieldLayout>
    );
};

export default TextAreaInput;

import InputFieldBox from "@components/wrappers/InputFieldBox";

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
        <InputFieldBox errorMessage={errorMessage}>
            <textarea
                value={value}
                className="textarea-bordered textarea w-full"
                placeholder={placeholder}
                onChange={e => setValue(e.target.value)}
            ></textarea>
        </InputFieldBox>
    );
};

export default TextAreaInput;

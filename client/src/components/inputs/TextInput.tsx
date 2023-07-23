const TextAreaInput = ({
    value,
    setValue,
    placeholder = "",
}: {
    value: string;
    setValue: (_: string) => void;
    placeholder?: string;
}) => {
    return (
        <textarea
            value={value}
            className="textarea-bordered textarea w-full"
            placeholder={placeholder}
            onChange={e => setValue(e.target.value)}
        ></textarea>
    );
};

export default TextAreaInput;

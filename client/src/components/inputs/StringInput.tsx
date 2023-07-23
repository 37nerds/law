const StringInput = ({
    value,
    setValue,
    placeholder = "",
}: {
    value: string;
    setValue: (_: string) => void;
    placeholder?: string;
}) => {
    return (
        <input
            value={value}
            type="text"
            placeholder={placeholder}
            onChange={e => setValue(e.target.value)}
            className="input-bordered input w-full"
        />
    );
};

export default StringInput;

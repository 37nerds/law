type Props = {
    value: string;
    setValue: (_: string) => void;
    type?: string;
    placeholder?: string;
};

const InputField2 = ({
    value,
    setValue,
    type = "text",
    placeholder = "",
}: Props) => {
    return (
        <input
            value={value}
            type={type}
            placeholder={placeholder}
            onChange={e => setValue(e.target.value)}
            className="input-bordered input w-full"
        />
    );
};

export default InputField2;

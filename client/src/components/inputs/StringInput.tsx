import InputError from "@components/inputs/InputError";
import InputFieldBox from "@components/wrappers/InputFieldBox";

const StringInput = ({
    value,
    setValue,
    placeholder = "",
    errorMessage = "",
    required = false,
}: {
    value: string;
    setValue: (_: string) => void;
    placeholder?: string;
    errorMessage?: string;
    required?: boolean;
}) => {
    return (
        <InputFieldBox errorMessage={errorMessage}>
            <input
                value={value}
                type="text"
                placeholder={placeholder}
                onChange={e => setValue(e.target.value)}
                className="input-bordered input w-full"
                required={required}
            />
        </InputFieldBox>
    );
};

export default StringInput;

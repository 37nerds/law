import InputError from "@components/inputs/InputError";
import InputFieldBox from "@components/wrappers/InputFieldBox";
import { TOption } from "@utils/types";

const SelectInput = ({
    value,
    setValue,
    options,
    placeholder = "",
    errorMessage = "",
}: {
    value: string;
    setValue: (_: string) => void;
    options: TOption[];
    placeholder?: string;
    errorMessage?: string;
}) => {
    return (
        <InputFieldBox errorMessage={errorMessage}>
            <select
                className="select-bordered select w-full"
                value={value}
                onChange={e => setValue(e.target.value)}
            >
                <option disabled value="">
                    {placeholder}
                </option>
                {options.map((o, k) => {
                    return (
                        <option value={o.value || o.name} key={k}>
                            {o.name}
                        </option>
                    );
                })}
            </select>
        </InputFieldBox>
    );
};

export default SelectInput;

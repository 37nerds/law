type TOption = {
    name: string;
    value: string;
};

const SelectInput = ({
    value,
    setValue,
    options,
    placeholder = "",
}: {
    value: string;
    setValue: (_: string) => void;
    options: TOption[];
    placeholder?: string;
}) => {
    return (
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
    );
};

export default SelectInput;

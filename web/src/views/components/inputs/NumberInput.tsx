import { NumericFormat } from "react-number-format";

import InputLayout from "@components/layouts/InputLayout";

const NumberInput = ({
    value,
    setValue,
    placeholder = "",
    required = false,
    disabled = false,
    label = null,
    errorMessage = null,
}: {
    value: number | "";
    setValue: (value: number) => void;
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
    label?: string | null;
    errorMessage?: string | null;
}) => {
    return (
        <InputLayout
            input={
                <NumericFormat
                    value={value || ""}
                    onValueChange={values => {
                        setValue(Number(values.value));
                    }}
                    placeholder={placeholder}
                    className="input input-bordered w-full"
                    required={required}
                    decimalScale={2}
                    fixedDecimalScale
                    disabled={disabled}
                />
            }
            label={label}
            required={required}
            errorMessage={errorMessage}
        />
    );
};

export default NumberInput;

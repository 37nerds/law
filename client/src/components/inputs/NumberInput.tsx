import InputFieldBox from "@components/wrappers/InputFieldBox";
import { NumericFormat } from "react-number-format";

const NumberInput = ({
    value,
    setValue,
    placeholder = "",
    errorMessage = "",
    required = false,
    disabled = false,
}: {
    value: string;
    setValue: (_: number) => void;
    placeholder?: string;
    errorMessage?: string;
    required?: boolean;
    disabled?: boolean;
}) => {
    return (
        <InputFieldBox errorMessage={errorMessage}>
            <NumericFormat
                value={value}
                onValueChange={values => {
                    setValue(Number(values.value));
                }}
                placeholder={placeholder}
                className="input-bordered input w-full"
                required={required}
                decimalScale={2}
                fixedDecimalScale
                disabled={disabled}
            />
        </InputFieldBox>
    );
};

export default NumberInput;

import InputFieldLayout from "@components/layouts/InputFieldLayout";
import { NumericFormat } from "react-number-format";

const NumberInput = ({
    value,
    setValue,
    placeholder = "",
    errorMessage = "",
    required = false,
    disabled = false,
}: {
    value: number | "";
    setValue: (_: number) => void;
    placeholder?: string;
    errorMessage?: string;
    required?: boolean;
    disabled?: boolean;
}) => {
    return (
        <InputFieldLayout errorMessage={errorMessage}>
            <NumericFormat
                value={value || ""}
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
        </InputFieldLayout>
    );
};

export default NumberInput;

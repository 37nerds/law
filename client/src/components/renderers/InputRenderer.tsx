import { TOption } from "@utils/types";
import StringInput from "@components/inputs/StringInput";
import TextInput from "@components/inputs/TextInput";
import SelectInput from "@components/inputs/SelectInput";

const InputRenderer = ({
    type,
    field,
    options,
    values,
    setValue,
    errors,
}: {
    type: string;
    field: string;
    values: any;
    setValue: (field: string, value: any) => void;
    errors: any;
    options?: TOption[];
}) => {
    return type === "string" || type === "email" ? (
        <StringInput
            type={type}
            value={values[field]}
            setValue={value => setValue(field, value)}
            errorMessage={errors[field]}
        />
    ) : type === "text" ? (
        <TextInput
            value={values[field]}
            setValue={value => setValue(field, value)}
            errorMessage={errors[field]}
        />
    ) : type === "select" ? (
        <SelectInput
            value={values[field]}
            setValue={value => setValue(field, value)}
            options={options || []}
            placeholder="Select"
            errorMessage={errors[field]}
        />
    ) : (
        <></>
    );
};

export default InputRenderer;

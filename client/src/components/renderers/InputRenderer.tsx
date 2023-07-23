import { TOption } from "@utils/types";
import StringInput from "@components/inputs/StringInput";
import TextInput from "@components/inputs/TextInput";
import SelectInput from "@components/inputs/SelectInput";
import SelectEditablInput from "@components/inputs/SelectEditablInput";
import NumberInput from "@components/inputs/NumberInput";

const InputRenderer = ({
    type,
    field,
    values,
    setValue,
    errors,
    options,
}: {
    type: string;
    field: string;
    values: any;
    setValue: (field: string, value: any) => void;
    errors: any;
    options?: TOption[];
}): JSX.Element => {
    const inputComponents: any = {
        string: (
            <StringInput
                type={type}
                value={values[field]}
                setValue={value => setValue(field, value)}
                errorMessage={errors[field]}
            />
        ),
        email: (
            <StringInput
                type={type}
                value={values[field]}
                setValue={value => setValue(field, value)}
                errorMessage={errors[field]}
            />
        ),
        text: (
            <TextInput
                value={values[field]}
                setValue={value => setValue(field, value)}
                errorMessage={errors[field]}
            />
        ),
        number: (
            <NumberInput
                value={values[field]}
                setValue={value => setValue(field, value)}
                errorMessage={errors[field]}
            />
        ),
        select: (
            <SelectInput
                value={values[field]}
                setValue={value => setValue(field, value)}
                options={options || []}
                placeholder="Select"
                errorMessage={errors[field]}
            />
        ),
        editableSelect: (
            <SelectEditablInput
                value={values[field]}
                setValue={value => setValue(field, value)}
                options={options || []}
                placeholder="Select"
                errorMessage={errors[field]}
                type={type}
            />
        ),
    };

    return inputComponents[type] || <></>;
};

export default InputRenderer;

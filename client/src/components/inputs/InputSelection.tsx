import StringInput from "@components/inputs/fields/StringInput";
import TextInput from "@components/inputs/fields/TextInput";
import SelectInput from "@components/inputs/fields/SelectInput";
import SelectEditableInput from "@components/inputs/fields/SelectEditableInput";
import NumberInput from "@components/inputs/fields/NumberInput";
import LadderSelectInput from "@components/inputs/fields/LadderSelectInput";
import { TLadderOption, TOption } from "@config/general";

const InputSelection = ({
    type,
    field,
    values,
    setValue,
    errors,
    options,
    ladderOptions,
}: {
    type: string;
    field: string;
    values: any;
    setValue: (field: string, value: any) => void;
    errors: any;
    options?: TOption[];
    ladderOptions?: TLadderOption[];
}): JSX.Element => {
    const inputComponents: any = {
        string: (
            <StringInput
                type={type as any}
                value={values[field]}
                setValue={value => setValue(field, value)}
                errorMessage={errors[field]}
            />
        ),
        email: (
            <StringInput
                type={type as any}
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
            <SelectEditableInput
                value={values[field]}
                setValue={value => setValue(field, value)}
                options={options || []}
                placeholder="Select"
                errorMessage={errors[field]}
                type={type}
            />
        ),
        ladderSelect: (
            <LadderSelectInput
                value={values[field]}
                setValue={value => setValue(field, value)}
                options={ladderOptions || []}
                placeholder="Select"
                errorMessage={errors[field]}
            />
        ),
        editableLadderSelect: (
            <SelectEditableInput
                value={values[field]}
                setValue={value => setValue(field, value)}
                options={options || []}
                ladderOptions={ladderOptions || []}
                placeholder="Select"
                errorMessage={errors[field]}
                type={type}
            />
        ),
    };

    return inputComponents[type] || <></>;
};

export default InputSelection;

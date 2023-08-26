import StringInput from "./fields/StringInput";
import TextInput from "./fields/TextInput";
import SelectInput from "./fields/SelectInput";
import SelectEditableInput from "./fields/SelectEditableInput";
import NumberInput from "./fields/NumberInput";
import LadderSelectInput from "./fields/LadderSelectInput";
import DateInput from "./fields/DateInput";
import { TLadderOption, TOption } from "@kinds/general";

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
                errorMessage={errors && errors[field]}
            />
        ),
        email: (
            <StringInput
                type={type as any}
                value={values[field]}
                setValue={value => setValue(field, value)}
                errorMessage={errors && errors[field]}
            />
        ),
        text: (
            <TextInput
                value={values[field]}
                setValue={value => setValue(field, value)}
                errorMessage={errors && errors[field]}
            />
        ),
        number: (
            <NumberInput
                value={values[field]}
                setValue={value => setValue(field, value)}
                errorMessage={errors && errors[field]}
            />
        ),
        select: (
            <SelectInput
                value={values[field]}
                setValue={value => setValue(field, value)}
                options={options || []}
                placeholder="Select"
                errorMessage={errors && errors[field]}
            />
        ),
        editableSelect: (
            <SelectEditableInput
                value={values[field]}
                setValue={value => setValue(field, value)}
                options={options || []}
                placeholder="Select"
                errorMessage={errors && errors[field]}
                type={type}
            />
        ),
        ladderSelect: (
            <LadderSelectInput
                value={values[field]}
                setValue={value => setValue(field, value)}
                options={ladderOptions || []}
                placeholder="Select"
                errorMessage={errors && errors[field]}
            />
        ),
        editableLadderSelect: (
            <SelectEditableInput
                value={values[field]}
                setValue={value => setValue(field, value)}
                options={options || []}
                ladderOptions={ladderOptions || []}
                placeholder="Select"
                errorMessage={errors && errors[field]}
                type={type}
            />
        ),
        date: (
            <DateInput
                value={values[field]}
                setValue={value => setValue(field, value)}
                errorMessage={errors && errors[field]}
            />
        ),
    };

    return inputComponents[type] || <></>;
};

export default InputSelection;

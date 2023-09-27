import type { TLadderOption, TOption } from "@helpers/types";

import StringInput from "../inputs/StringInput";
import TextInput from "../inputs/TextInput";
import SelectInput from "../inputs/SelectInput";
import SelectEditableInput from "../inputs/SelectEditableInput";
import NumberInput from "../inputs/NumberInput";
import LadderSelectInput from "../inputs/LadderSelectInput";
import DateInput from "../inputs/DateInput";
import EmailInput from "../inputs/EmailInput";

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
                value={values[field]}
                setValue={value => setValue(field, value)}
                errorMessage={errors && errors[field]}
            />
        ),
        email: (
            <EmailInput
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

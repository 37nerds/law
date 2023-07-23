import { useState } from "react";

export type TUpdateFormValue = (_: {
    updateType?: string;
    value: string;
}) => void;

type Props = {
    labelTitle: string;
    defaultValue: string;
    updateFormValue: TUpdateFormValue;
    labelStyle?: string;
    containerStyle?: string;
    placeholder?: string;
    updateType?: string;
    type?: string;
};

const InputText = ({
    labelTitle,
    labelStyle,
    type,
    containerStyle,
    defaultValue,
    placeholder,
    updateFormValue,
    updateType,
}: Props) => {
    const [value, setValue] = useState(defaultValue);

    const updateInputValue = (val: string) => {
        setValue(val);
        updateFormValue({ updateType, value: val });
    };

    return (
        <div className={`form-control w-full ${containerStyle}`}>
            <label className="label">
                <span
                    className={"text-layouts-content label-text " + labelStyle}
                >
                    {labelTitle}
                </span>
            </label>
            <input
                type={type || "text"}
                value={value}
                placeholder={placeholder || ""}
                onChange={e => updateInputValue(e.target.value)}
                className="input-bordered  input w-full "
            />
        </div>
    );
};

export default InputText;

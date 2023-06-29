import { useState } from "react";

type TUpdateFormValue = (_: { updateType?: string; value: string }) => void;

type Props = {
    labelTitle: string;
    defaultValue: string;
    updateFormValue: TUpdateFormValue;
    labelStyle?: string;
    containerStyle?: string;
    placeholder?: string;
    updateType?: string;
};

const TextAreaInput = ({
    labelTitle,
    labelStyle,
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
                <span className={"label-text text-base-content " + labelStyle}>
                    {labelTitle}
                </span>
            </label>
            <textarea
                value={value}
                className="textarea-bordered textarea w-full"
                placeholder={placeholder || ""}
                onChange={e => updateInputValue(e.target.value)}
            ></textarea>
        </div>
    );
};

export default TextAreaInput;

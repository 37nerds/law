import { useState } from "react";

export type TUpdateFormValue = (_: {
    updateType: string;
    value: boolean;
}) => void;

type Props = {
    labelTitle: string;
    updateType: string;
    defaultValue: boolean;
    updateFormValue: TUpdateFormValue;
    labelStyle?: string;
    containerStyle?: string;
};

const ToggleInput = ({
    labelTitle,
    labelStyle,
    containerStyle,
    defaultValue,
    updateFormValue,
    updateType,
}: Props) => {
    const [value, setValue] = useState(defaultValue);

    const updateToggleValue = () => {
        setValue(!value);
        updateFormValue({ updateType, value: !value });
    };

    return (
        <div className={`form-control w-full ${containerStyle}`}>
            <label className="label cursor-pointer">
                <span
                    className={"text-layouts-content label-text " + labelStyle}
                >
                    {labelTitle}
                </span>
                <input
                    type="checkbox"
                    className="toggle"
                    checked={value}
                    onChange={e => updateToggleValue()}
                />
            </label>
        </div>
    );
};

export default ToggleInput;
